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
        includeArchives = bool(request.query_params.get("includeArchives")=="true")

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
                    "archive": case.archive,
                    "pdf_types": case.pdf_types,
                    "description": case.description,            
                    "packageNumber": case.package_number,
                    "packageUrl": case.package_url, 
                    "data": case_data,               
                    }
        else:
            cases = get_case_for_user(pk, uid, includeArchives)
            data = list()
            for case in cases:
                data_dec = settings.ENCRYPTOR.decrypt(case.key_id, case.data)
                case_data = json.loads(data_dec)
                data.append({"id": case.id,
                    "type": case.type,  
                    "status":case.status,              
                    "modified": case.modified,
                    "personId": case.user_id,
                    "archive": case.archive,
                    "pdf_types": case.pdf_types,
                    "description": case.description,
                    "data": case_data,
                    "packageNumber": case.package_number,
                    "packageUrl": case.package_url,
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

        description = ""
        if body.get("description"):
            description = body.get("description")

        db_app = Case(            
            type=body.get("type"),
            description=description,
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

        case_ids = request.query_params.getlist("id")
        if not case_ids:
            case = get_case_for_user(pk, uid)
            if not case:
                return HttpResponseNotFound("No record found")

            (data_key_id, data_enc) = self.encrypt_data(body["data"])        

            description = case.description
            if body.get("description"):
                description = body.get("description")

            case.modified = timezone.now()
            case.type = body.get("type")
            case.status = body.get("status")
            case.description =  description
            case.data = data_enc
            case.key_id = data_key_id           
            case.save()
            return Response("success")
        else:
            for caseId in case_ids:
                case = get_case_for_user(caseId, uid)
                if not case:
                    continue

                case.modified = timezone.now()                
                if body.get("status"):
                    case.status = body.get("status")
                        
                case.archive = body.get("archive")
                case.save()

            return Response("success")

    def delete(self, request, pk, format=None):
        uid = request.user.id

        case_ids = request.query_params.getlist("id")
        if not case_ids:
            case = get_case_for_user(pk, uid)
            if not case or pk==0:
                return HttpResponseNotFound("No record found")

            if case.package_number or case.package_url:
                return HttpResponseBadRequest("Not able to delete submitted application")

            case.delete()
        else:
            for caseId in case_ids:
                case = get_case_for_user(caseId, uid)
                if not case:
                    continue
                
                if case.package_number or case.package_url:
                    continue

                case.delete()


        return Response(status=status.HTTP_204_NO_CONTENT)
