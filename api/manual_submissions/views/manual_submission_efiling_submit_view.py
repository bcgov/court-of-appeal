import logging
import json
import uuid


from django.http import JsonResponse, HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.utils import timezone

from manual_submissions.models import ManualSubmission
from manual_submissions.manual_submissions_service.form_service import get_form, modify_form

from rest_framework import permissions, generics

from api.efiling import EFilingPackaging, EFilingSubmission, EFilingParsing
from api.utils import convert_document_to_multi_part

from core.utils.json_message_response import JsonMessageResponse
from core.attachment_files_util import (_get_validation_errors, _unique_file_names, _process_incoming_files_and_documents)

logger = logging.getLogger(__name__)
no_record_found = "No record found."



class ManualSubmissionEFilingSubmitView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.efiling_parsing = EFilingParsing()
        self.efiling_submission = EFilingSubmission(EFilingPackaging())

    # """ This inserts our generated file, iterates over files and converts to PDF if necessary. """

    def get_manual_submission_for_user(self, manual_submission_id, uid):
        try:
            manual_submission_query = ManualSubmission.objects.get(id=manual_submission_id, user_id=uid)
            return manual_submission_query
        except (ManualSubmission.DoesNotExist):
            logger.debug(no_record_found)
            return


    def delete_extra_file(self, uid):
        
        manual_submission_query = ManualSubmission.objects.filter(
            user_id = uid,
            submission_id = None, 
            package_number = None, 
            package_url = None )
        
        manual_submission_query.delete()        
        

    def put(self, request, manual_submission_id):
        uid = request.user.id
        body = request.data

        manual_submission = self.get_manual_submission_for_user(manual_submission_id, uid)
        if not manual_submission:        
            return HttpResponseNotFound("no record found")

        if not manual_submission.submission_id or  not manual_submission.transaction_id:
            return HttpResponseNotFound("no record found")

        manual_submission.package_number = body.get("packageNumber")
        manual_submission.package_url = body.get("packageUrl")
        manual_submission.status="Submitted"
        manual_submission.last_filed = timezone.now()
        manual_submission.save()
        return HttpResponse(status=204)


    def post(self, request, manual_submission_id):
                
        uid = request.user.id

        documents_string = request.POST.get("documents")
        attachment_files = request.FILES.getlist("files")
        data_body = json.loads(request.POST.get("body"))
        
        # print(data_body["data"])

        # self.delete_extra_file(uid)
        created_manual_submission = modify_form(None, data_body, uid)
        manual_submission_id = created_manual_submission.get('file_id')
        # print(manual_submission_id)

        manual_submission = self.get_manual_submission_for_user(manual_submission_id, uid)        
        if not manual_submission:
            return HttpResponseNotFound("no record found")

        if manual_submission.package_number or manual_submission.package_url: 
            return JsonMessageResponse("This application has already been submitted.", status=500)
        

        # Validations.
        validations_errors = _get_validation_errors(
            attachment_files, documents_string
        )
        if validations_errors:
            return validations_errors

         # Unique names.
        attachment_files = _unique_file_names(attachment_files)

        # Data conversion.
        incoming_documents = json.loads(documents_string)

        outgoing_documents = _process_incoming_files_and_documents(
            incoming_documents, attachment_files, []
        )
        del attachment_files

       
        # print(outgoing_documents)

        data_for_efiling = self.efiling_parsing.convert_data_for_efiling(
            request, manual_submission, outgoing_documents, "MANUALSUB"
        )

        # print(data_for_efiling)
        
        # EFiling upload document.
        transaction_id = str(uuid.uuid4())
        manual_submission.transaction_id = transaction_id
        manual_submission.save()

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
            manual_submission.submission_id = submission_id 
            manual_submission.last_filed = timezone.now()            
            manual_submission.save()

            return JsonResponse({"redirectUrl": redirect_url, "message": message})

        return JsonMessageResponse(message, status=500)