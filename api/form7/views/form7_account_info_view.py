import logging

from zeep import helpers

from django.http import (
    HttpResponseNotFound
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from form7.form7_cso_web_service.form7_csows_account_info import Form7AccountInfo

logger = logging.getLogger(__name__)



class Form7AccountInfoView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.form7_csows_account_info = Form7AccountInfo()
   
    def get(self, request):
               
        account_info = self.form7_csows_account_info.get_account_info(request.user.account_id, request.user.client_id, request.user)
        
        if account_info is not None:
            return Response(helpers.serialize_object(account_info))
        else:
            return HttpResponseNotFound()       

                