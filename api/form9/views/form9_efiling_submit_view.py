import hashlib
import logging
import json
import uuid

from django.conf import settings
from django.http import JsonResponse, HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.http.response import Http404
from django.utils import timezone

from form9.models import Requisition, FormPdf

from rest_framework import permissions, generics
from rest_framework.exceptions import NotFound

from api.efiling import EFilingPackaging, EFilingSubmission, EFilingParsing
from api.utils import convert_document_to_multi_part

from core.utils.json_message_response import JsonMessageResponse

logger = logging.getLogger(__name__)
no_record_found = "No record found."



class Form9EFilingSubmitView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.efiling_parsing = EFilingParsing()
        self.efiling_submission = EFilingSubmission(EFilingPackaging())

    # """ This inserts our generated file, iterates over files and converts to PDF if necessary. """

    def get_requisition_for_user(self, requisition_id, uid):
        try:
            requisition_query = Requisition.objects.get(id=requisition_id, user_id=uid)
            return requisition_query
        except (Requisition.DoesNotExist):
            logger.debug(no_record_found)
            return


    def _get_pdf_content(self, requisition, document_type):
        outgoing_documents = [] 
        #Modify If more than one form type exist in the future       
        
        current_document_type = "FORM"
        try:                      
            prepared_pdf = FormPdf.objects.get(
                requisition_id=requisition.id, pdf_type=f"{current_document_type}"
            )
        except FormPdf.DoesNotExist:
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
        document_json.update({"applicationId": requisition.id})

        
        outgoing_documents.append(
            {
                "type": f"{document_type}",
                "name": "form9.pdf",
                "file_data": pdf_content,
                "data": document_json,
                "md5": hashlib.md5(pdf_content).hexdigest(),
            }
        )
        return outgoing_documents


    def put(self, request, requisition_id):
        uid = request.user.id
        body = request.data

        requisition = self.get_requisition_for_user(requisition_id, uid)
        if not requisition:        
            return HttpResponseNotFound("no record found")

        if not requisition.submission_id or  not requisition.transaction_id:
            return HttpResponseNotFound("no record found")

        requisition.package_number = body.get("packageNumber")
        requisition.package_url = body.get("packageUrl")
        requisition.status="Submitted"
        requisition.last_filed = timezone.now()
        requisition.save()
        return HttpResponse(status=204)


    def post(self, request, requisition_id):
        
        document_type = "REQ" # type Form9 for Efiling
        uid = request.user.id

        requisition = self.get_requisition_for_user(requisition_id, uid)        
        if not requisition:
            return HttpResponseNotFound("no record found")

        if requisition.package_number or requisition.package_url: 
            return JsonMessageResponse("This application has already been submitted.", status=500)

        outgoing_documents = self._get_pdf_content(requisition, document_type)               
        data_for_efiling = self.efiling_parsing.convert_data_for_efiling(
            request, requisition, outgoing_documents, document_type
        )
        
        # EFiling upload document.
        transaction_id = str(uuid.uuid4())
        requisition.transaction_id = transaction_id
        requisition.save()

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
            requisition.submission_id = submission_id 
            requisition.last_filed = timezone.now()            
            requisition.save()

            return JsonResponse({"redirectUrl": redirect_url, "message": message})

        return JsonMessageResponse(message, status=500)