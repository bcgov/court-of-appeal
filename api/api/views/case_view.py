import json
import logging
from django.conf import settings
from django.http import (
    HttpResponseBadRequest,
    HttpResponseNotFound, HttpResponseForbidden
)
from django.utils import timezone
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView

from api.models import Case
from api.utils import get_case_for_user

LOGGER = logging.getLogger(__name__)


class CaseView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    # def encrypt_steps(self, steps):
    #     try:
    #         steps_bin = json.dumps(steps).encode("ascii")
    #         (steps_key_id, steps_enc) = settings.ENCRYPTOR.encrypt(steps_bin)
    #         return (steps_key_id, steps_enc)
    #     except Exception as ex:
    #         LOGGER.error("ERROR! %s", ex)

    def get(self, request, pk=None, format=None):
        uid = request.user.id
        if pk:
            case = get_case_for_user(pk, uid)
        

        # # steps_dec = settings.ENCRYPTOR.decrypt(application.key_id, application.steps)
        # # steps = json.loads(steps_dec)
        # # submission = EFilingSubmission.objects.filter(
        # #     id=application.last_efiling_submission_id
        # # ).first()
            data = {"id": case.id,
                    "type": case.type,  
                    "status":case.status,              
                    "modified": case.modified,
                    "personId": case.user_id,                
                    # "packageNumber": submission.package_number if submission is not None else "",
                    # "packageUrl": submission.package_url if submission is not None else "",                
                    "version": case.version}
        else:
            cases = get_case_for_user(pk, uid)
            data = list()
            for case in cases:
                data.append({"id": case.id,
                    "type": case.type,  
                    "status":case.status,              
                    "modified": case.modified,
                    "personId": case.user_id,                
                    # "packageNumber": submission.package_number if submission is not None else "",
                    # "packageUrl": submission.package_url if submission is not None else "",                
                    "version": case.version})            
        return Response(data)

    def post(self, request: Request):
        uid = request.user.id
        if not uid:
            return HttpResponseForbidden("Missing user ID")

        body = request.data
        if not body:
            return HttpResponseBadRequest("Missing request body")

        # (steps_key_id, steps_enc) = self.encrypt_steps(body["steps"])

        db_app = Case(            
            type=body.get("type"),
            status=body.get("status"),            
            modified = timezone.now(),
            version=body.get("version"),            
            user_id=uid)

        db_app.save()
        return Response({"app_id": db_app.pk})

    def put(self, request, pk, format=None):
        uid = request.user.id
        body = request.data
        if not body:
            return HttpResponseBadRequest("Missing request body")

        app = get_case_for_user(pk, uid)
        if not app:
            return HttpResponseNotFound("No record found")

        # (steps_key_id, steps_enc) = self.encrypt_steps(body["steps"])

        app.modified = timezone.now()
        app.type = body.get("type")
        app.status = body.get("status")        
        app.version = body.get("version")
        app.save()

        return Response("success")

    # def delete(self, request, pk, format=None):
    #     uid = request.user.id
    #     application = get_application_for_user(pk, uid)
    #     application.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
