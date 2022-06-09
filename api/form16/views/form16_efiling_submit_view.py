import hashlib
import logging
import json
import uuid

from django.conf import settings
from django.http import JsonResponse, HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.http.response import Http404
from django.utils import timezone

from form16.models import OfferToSettleCosts, FormPdf

from rest_framework import permissions, generics
from rest_framework.exceptions import NotFound

from api.efiling import EFilingPackaging, EFilingSubmission, EFilingParsing
from api.utils import convert_document_to_multi_part

from core.utils.json_message_response import JsonMessageResponse

logger = logging.getLogger(__name__)
no_record_found = "No record found."



class Form16EFilingSubmitView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.efiling_parsing = EFilingParsing()
        self.efiling_submission = EFilingSubmission(EFilingPackaging())

    # """ This inserts our generated file, iterates over files and converts to PDF if necessary. """

    def get_offer_to_settle_costs_for_user(self, offer_to_settle_costs_id, uid):
        try:
            offer_to_settle_costs_query = OfferToSettleCosts.objects.get(id=offer_to_settle_costs_id, user_id=uid)
            return offer_to_settle_costs_query
        except (OfferToSettleCosts.DoesNotExist):
            logger.debug(no_record_found)
            return


    def _get_pdf_content(self, offer_to_settle_costs, document_type):
        outgoing_documents = [] 
        #Modify If more than one form type exist in the future       
        
        current_document_type = "FORM"
        try:                      
            prepared_pdf = FormPdf.objects.get(
                offer_to_settle_costs_id=offer_to_settle_costs.id, pdf_type=f"{current_document_type}"
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
        document_json.update({"applicationId": offer_to_settle_costs.id})

        
        outgoing_documents.append(
            {
                "type": f"{document_type}",
                "name": "form16.pdf",
                "file_data": pdf_content,
                "data": document_json,
                "md5": hashlib.md5(pdf_content).hexdigest(),
            }
        )
        return outgoing_documents


    def put(self, request, offer_to_settle_costs_id):
        uid = request.user.id
        body = request.data

        offer_to_settle_costs = self.get_offer_to_settle_costs_for_user(offer_to_settle_costs_id, uid)
        if not offer_to_settle_costs:        
            return HttpResponseNotFound("no record found")

        if not offer_to_settle_costs.submission_id or  not offer_to_settle_costs.transaction_id:
            return HttpResponseNotFound("no record found")

        offer_to_settle_costs.package_number = body.get("packageNumber")
        offer_to_settle_costs.package_url = body.get("packageUrl")
        offer_to_settle_costs.status="Submitted"
        offer_to_settle_costs.last_filed = timezone.now()
        offer_to_settle_costs.save()
        return HttpResponse(status=204)


    def post(self, request, offer_to_settle_costs_id):
        
        document_type = "UNKNOWN" # type Form16 for Efiling
        uid = request.user.id

        offer_to_settle_costs = self.get_offer_to_settle_costs_for_user(offer_to_settle_costs_id, uid)        
        if not offer_to_settle_costs:
            return HttpResponseNotFound("no record found")

        if offer_to_settle_costs.package_number or offer_to_settle_costs.package_url: 
            return JsonMessageResponse("This application has already been submitted.", status=500)

        outgoing_documents = self._get_pdf_content(offer_to_settle_costs, document_type)               
        data_for_efiling = self.efiling_parsing.convert_data_for_efiling(
            request, offer_to_settle_costs, outgoing_documents, document_type
        )
        
        # EFiling upload document.
        transaction_id = str(uuid.uuid4())
        offer_to_settle_costs.transaction_id = transaction_id
        offer_to_settle_costs.save()

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
            offer_to_settle_costs.submission_id = submission_id 
            offer_to_settle_costs.last_filed = timezone.now()            
            offer_to_settle_costs.save()

            return JsonResponse({"redirectUrl": redirect_url, "message": message})

        return JsonMessageResponse(message, status=500)