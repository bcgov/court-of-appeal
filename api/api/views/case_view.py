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

    def encrypt_data(self, data):
        try:
            data_bin = json.dumps(data).encode("ascii")
            (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
            return (data_key_id, data_enc)
        except Exception as ex:
            LOGGER.error("ERROR! %s", ex)

    def get(self, request, pk=None, format=None):
        uid = request.user.id
        if pk:
            case = get_case_for_user(pk, uid)        

            data_dec = settings.ENCRYPTOR.decrypt(case.key_id, case.data)
            case_data = json.loads(data_dec)
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
                    "data": case_data,               
                    }
        else:
            cases = get_case_for_user(pk, uid)
            data = list()
            for case in cases:
                data_dec = settings.ENCRYPTOR.decrypt(case.key_id, case.data)
                case_data = json.loads(data_dec)
                data.append({"id": case.id,
                    "type": case.type,  
                    "status":case.status,              
                    "modified": case.modified,
                    "personId": case.user_id,
                    "data": case_data,            
                    # "packageNumber": submission.package_number if submission is not None else "",
                    # "packageUrl": submission.package_url if submission is not None else "",                
                    })            
        return Response(data)

    def post(self, request: Request):
        uid = request.user.id
        if not uid:
            return HttpResponseForbidden("Missing user ID")

        body = request.data
        if not body:
            return HttpResponseBadRequest("Missing request body")

        (data_key_id, data_enc) = self.encrypt_data(body["data"])

        db_app = Case(            
            type=body.get("type"),
            status="Draft",            
            modified = timezone.now(),
            data=data_enc,
            key_id=data_key_id,            
            user_id=uid)

        db_app.save()
        return Response({"case_id": db_app.pk})

    def put(self, request, pk, format=None):
        uid = request.user.id
        body = request.data
        if not body:
            return HttpResponseBadRequest("Missing request body")

        app = get_case_for_user(pk, uid)
        if not app:
            return HttpResponseNotFound("No record found")

        (data_key_id, data_enc) = self.encrypt_data(body["data"])        

        app.modified = timezone.now()
        app.type = body.get("type")
        app.status = body.get("status")        
        app.data = data_enc
        app.key_id = data_key_id
        app.save()

        return Response("success")

    # def delete(self, request, pk, format=None):
    #     uid = request.user.id
    #     application = get_application_for_user(pk, uid)
    #     application.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
