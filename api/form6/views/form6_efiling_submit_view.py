import hashlib
import logging
import json
import uuid

from django.conf import settings
from django.http import JsonResponse, HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.http.response import Http404
from django.utils import timezone

from form6.models import NoticeOfSettlement, FormPdf

from rest_framework import permissions, generics
from rest_framework.exceptions import NotFound

from api.efiling import EFilingPackaging, EFilingSubmission, EFilingParsing
from api.utils import convert_document_to_multi_part

from core.utils.json_message_response import JsonMessageResponse

logger = logging.getLogger(__name__)
no_record_found = "No record found."



class Form6EFilingSubmitView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.efiling_parsing = EFilingParsing()
        self.efiling_submission = EFilingSubmission(EFilingPackaging())

    # """ This inserts our generated file, iterates over files and converts to PDF if necessary. """

    def get_notice_for_user(self, notice_id, uid):
        try:
            notice_query = NoticeOfSettlement.objects.get(id=notice_id, user_id=uid)
            return notice_query
        except (NoticeOfSettlement.DoesNotExist):
            logger.debug(no_record_found)
            return


    def _get_pdf_content(self, notice, document_type):
        outgoing_documents = [] 
        #Modify If more than one form type exist in the future       
        
        current_document_type = "ABA"
        try:                      
            prepared_pdf = FormPdf.objects.get(
                notice_of_settlement_id=notice.id, pdf_type=f"{current_document_type}"
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
        document_json.update({"applicationId": notice.id})

        
        outgoing_documents.append(
            {
                "type": f"{document_type}",
                "name": "form6.pdf",
                "file_data": pdf_content,
                "data": document_json,
                "md5": hashlib.md5(pdf_content).hexdigest(),
            }
        )
        return outgoing_documents


    def put(self, request, notice_id):
        uid = request.user.id
        body = request.data

        notice = self.get_notice_for_user(notice_id, uid)
        if not notice:        
            return HttpResponseNotFound("no record found")

        if not notice.submission_id or  not notice.transaction_id:
            return HttpResponseNotFound("no record found")

        notice.package_number = body.get("packageNumber")
        notice.package_url = body.get("packageUrl")
        notice.status="Submitted"
        notice.last_filed = timezone.now()
        notice.save()
        return HttpResponse(status=204)


    def post(self, request, notice_id):

        
        
        if 'document_type' in request.data:
            document_type = request.data['document_type']
        else: 
            document_type ="ABA" # type Form6 for Efiling
        
        uid = request.user.id

        notice = self.get_notice_for_user(notice_id, uid)        
        if not notice:
            return HttpResponseNotFound("no record found")

        if notice.package_number or notice.package_url: 
            return JsonMessageResponse("This application has already been submitted.", status=500)

        outgoing_documents = self._get_pdf_content(notice, document_type)               
        data_for_efiling = self.efiling_parsing.convert_data_for_efiling(
            request, notice, outgoing_documents, document_type
        )
        
        # EFiling upload document.
        transaction_id = str(uuid.uuid4())
        notice.transaction_id = transaction_id
        notice.save()

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
            notice.submission_id = submission_id 
            notice.last_filed = timezone.now()            
            notice.save()

            return JsonResponse({"redirectUrl": redirect_url, "message": message})

        return JsonMessageResponse(message, status=500)