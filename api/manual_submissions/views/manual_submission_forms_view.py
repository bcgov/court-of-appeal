import logging

from django.http import (
    HttpResponseBadRequest,
    HttpResponseNotFound, HttpResponseForbidden
) 

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView

from manual_submissions.manual_submissions_service.form_service import get_form, modify_form
from manual_submissions.models import ManualSubmission


LOGGER = logging.getLogger(__name__)


class ManualSubmissionFormsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)


    def get(self, request, pk=None):
        
        uid = request.user.id
        if not uid:
            return HttpResponseForbidden("Missing user ID")
        
        forms = get_form(pk, uid, True)
        return Response(forms)


    def delete(self, request: Request):

        uid = request.user.id
        if not uid:
            return HttpResponseForbidden("Missing user ID")
        if not request.data:
            return HttpResponseBadRequest("Missing request body")

        body = request.data
        for id in body['ids']:
            manual_submission_query = ManualSubmission.objects.filter(
                id = id, 
                user_id = uid, 
                package_number = None, 
                package_url = None 
            )
            manual_submission_query.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)

