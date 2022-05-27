import hashlib
import logging
import json
import uuid

from django.conf import settings
from django.http import JsonResponse, HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.http.response import Http404
from django.utils import timezone

from form15.models import ConsentOrderGeneral, FormPdf

from rest_framework import permissions, generics
from rest_framework.exceptions import NotFound

from api.efiling import EFilingPackaging, EFilingSubmission, EFilingParsing
from api.utils import convert_document_to_multi_part

from core.utils.json_message_response import JsonMessageResponse

logger = logging.getLogger(__name__)
no_record_found = "No record found."



class Form15EFilingSubmitView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.efiling_parsing = EFilingParsing()
        self.efiling_submission = EFilingSubmission(EFilingPackaging())

    # """ This inserts our generated file, iterates over files and converts to PDF if necessary. """

    def get_consent_order_general_for_user(self, consent_order_general_id, uid):
        try:
            consent_order_general_query = ConsentOrderGeneral.objects.get(id=consent_order_general_id, user_id=uid)
            return consent_order_general_query
        except (ConsentOrderGeneral.DoesNotExist):
            logger.debug(no_record_found)
            return


    def _get_pdf_content(self, consent_order_general, document_type):
        outgoing_documents = [] 
        #Modify If more than one form type exist in the future       
        
        current_document_type = "FORM"
        try:                      
            prepared_pdf = FormPdf.objects.get(
                consent_order_general_id=consent_order_general.id, pdf_type=f"{current_document_type}"
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
        document_json.update({"applicationId": consent_order_general.id})

        
        outgoing_documents.append(
            {
                "type": f"{document_type}",
                "name": "form15.pdf",
                "file_data": pdf_content,
                "data": document_json,
                "md5": hashlib.md5(pdf_content).hexdigest(),
            }
        )
        return outgoing_documents


    def put(self, request, consent_order_general_id):
        uid = request.user.id
        body = request.data

        consent_order_general = self.get_consent_order_general_for_user(consent_order_general_id, uid)
        if not consent_order_general:        
            return HttpResponseNotFound("no record found")

        if not consent_order_general.submission_id or  not consent_order_general.transaction_id:
            return HttpResponseNotFound("no record found")

        consent_order_general.package_number = body.get("packageNumber")
        consent_order_general.package_url = body.get("packageUrl")
        consent_order_general.status="Submitted"
        consent_order_general.last_filed = timezone.now()
        consent_order_general.save()
        return HttpResponse(status=204)


    def post(self, request, consent_order_general_id):
        
        document_type = "CNWD" # type Form15 for Efiling
        uid = request.user.id

        consent_order_general = self.get_consent_order_general_for_user(consent_order_general_id, uid)        
        if not consent_order_general:
            return HttpResponseNotFound("no record found")

        if consent_order_general.package_number or consent_order_general.package_url: 
            return JsonMessageResponse("This application has already been submitted.", status=500)

        outgoing_documents = self._get_pdf_content(consent_order_general, document_type)               
        data_for_efiling = self.efiling_parsing.convert_data_for_efiling(
            request, consent_order_general, outgoing_documents, document_type
        )
        
        # EFiling upload document.
        transaction_id = str(uuid.uuid4())
        consent_order_general.transaction_id = transaction_id
        consent_order_general.save()

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
            consent_order_general.submission_id = submission_id 
            consent_order_general.last_filed = timezone.now()            
            consent_order_general.save()

            return JsonResponse({"redirectUrl": redirect_url, "message": message})

        return JsonMessageResponse(message, status=500)