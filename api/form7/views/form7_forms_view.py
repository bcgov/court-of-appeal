import json
import re
import datetime

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

from form7.models import NoticeOfAppeal, MSopParty, Party, PartyAlias, PartyLegalRep

# from form7.form7_service.form7_create_form_service import create_new_form
from form7.form7_service.form7_modify_form_service import modify_form
from form7.form7_service.form7_get_form_service import get_form


LOGGER = logging.getLogger(__name__)


class Form7FormsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)


    def get(self, request, pk=None, format=None):
        
        uid = request.user.id
        if not uid:
            return HttpResponseForbidden("Missing user ID")
        
        forms = get_form(pk, request.user.account_id)
        return Response(forms)




    def put(self, request, pk=None, format=None):
        
        uid = request.user.id
        if not uid:
            return HttpResponseForbidden("Missing user ID")        
        if not pk:
             return HttpResponseBadRequest("Missing record ID")
        if not request.data:
            return HttpResponseBadRequest("Missing request body")
        
        body = dict(request.data)
        form_id = modify_form(pk, body, request.user.account_id, request.user.client_id)
        return Response(form_id)



    def post(self, request: Request):
        uid = request.user.id
        if not uid:
            return HttpResponseForbidden("Missing user ID")

        if not request.data:
            return HttpResponseBadRequest("Missing request body")
        
        body = dict(request.data)
        # form_id = create_new_form(body, request.user.account_id, request.user.client_id)
        form_id = modify_form(None, body, request.user.account_id, request.user.client_id)
        return Response(form_id)
       

    def delete(self, request: Request):

        uid = request.user.id
        if not uid:
            return HttpResponseForbidden("Missing user ID")
        if not request.data:
            return HttpResponseBadRequest("Missing request body")

        body = request.data
        for id in body['noticeOfAppealIds']:
            notice_query = NoticeOfAppeal.objects.filter(noticeOfAppealId = id)
            notice_query.delete()
        
        return Response('success')

#__________________________________________________
