import hashlib
import logging
import json
import uuid
# from collections import Counter
from django.conf import settings
from django.http import JsonResponse, HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.http.response import Http404
from django.utils import timezone

# from numpy import unique
from api.models import PreparedPdf

from rest_framework import permissions, generics
from rest_framework.exceptions import NotFound

from api.efiling import EFilingPackaging, EFilingSubmission, EFilingParsing
from api.utils import (
    convert_document_to_multi_part,
    get_case_for_user,    
    # is_valid_json,
)
# from core.pdf import rotate_images_and_convert_pdf
from core.utils.json_message_response import JsonMessageResponse


logger = logging.getLogger(__name__)


class EFilingSubmitView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.efiling_parsing = EFilingParsing()
        self.efiling_submission = EFilingSubmission(EFilingPackaging())

    # """ This inserts our generated file, iterates over files and converts to PDF if necessary. """

    def _get_pdf_content(self, case, document_type):
        outgoing_documents = [] 
        #Modify If more than one form type exist in the future       
        
        current_document_type = "FORM"
        try:                      
            prepared_pdf = PreparedPdf.objects.get(
                case_id=case.id, pdf_type=f"{current_document_type}"
            )
        except PreparedPdf.DoesNotExist:
            raise NotFound(
                detail=f"Missing document type {current_document_type} from database."
            )
        pdf_content = settings.ENCRYPTOR.decrypt(
            prepared_pdf.key_id, prepared_pdf.data
        )
        document_json = json.loads(
            settings.ENCRYPTOR.decrypt(
                prepared_pdf.key_id, prepared_pdf.json_data
            ).decode("utf-8")
        )
        document_json.update({"applicationId": case.id})

        
        outgoing_documents.append(
            {
                "type": f"{document_type}",
                "name": "Form2.pdf",
                "file_data": pdf_content,
                "data": document_json,
                "md5": hashlib.md5(pdf_content).hexdigest(),
            }
        )
        return outgoing_documents

    def put(self, request, case_id):
        user_id = request.user.id
        body = request.data
        case = get_case_for_user(case_id, user_id)
        
        if not case:
            return HttpResponseNotFound("no record found")

        if not case.submission_id or  not case.transaction_id:
            return HttpResponseNotFound("no record found")

        case.package_number = body.get("packageNumber")
        case.package_url = body.get("packageUrl")
        case.status="Submitted"
        case.last_filed = timezone.now()
        case.save()
        return HttpResponse(status=204)

    def post(self, request, case_id):
        
        document_type = "APP" #type Form2 for Efiling

        user_id = request.user.id
        case = get_case_for_user(case_id, user_id)        
        if not case:
            return HttpResponseNotFound("no record found")

        if case.package_number or case.package_url: 
            return JsonMessageResponse("This application has already been submitted.", status=500)

        outgoing_documents = self._get_pdf_content(case, document_type)               
        data_for_efiling = self.efiling_parsing.convert_data_for_efiling(
            request, case, outgoing_documents, document_type
        )
        
        # EFiling upload document.
        transaction_id = str(uuid.uuid4())
        case.transaction_id = transaction_id
        case.save()

        outgoing_files = convert_document_to_multi_part(outgoing_documents)
        del outgoing_documents
        upload_result = self.efiling_submission.upload_documents(
            request.user.universal_id, transaction_id, outgoing_files
        )
       
        if upload_result is None or "submissionId" not in upload_result:
            message = (
                upload_result["message"]
                if upload_result and "message" in upload_result
                else "Document Upload Failed."
            )
            return JsonMessageResponse(message, status=500)

    
        # EFiling package submission.
        submission_id = upload_result["submissionId"]
        redirect_url, message = self.efiling_submission.generate_efiling_url(
            request.user.universal_id, transaction_id, submission_id, data_for_efiling
        )

        if redirect_url is not None:
            case.submission_id = submission_id
            case.last_filed = timezone.now()
            case.save()

            return JsonResponse({"redirectUrl": redirect_url, "message": message})

        return JsonMessageResponse(message, status=500)

