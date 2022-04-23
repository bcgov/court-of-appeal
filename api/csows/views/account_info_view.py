import logging

from zeep import helpers

from django.http import (
    HttpResponseNotFound
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from csows.csows_service.csows_account_info import AccountInfo

logger = logging.getLogger(__name__)



class AccountInfoView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.csows_account_info = AccountInfo()
   
    def get(self, request):
               
        account_info = self.csows_account_info.get_account_info(request.user.account_id, request.user.client_id, request.user)
        
        if account_info is not None:
            return Response(helpers.serialize_object(account_info))
        else:
            return HttpResponseNotFound()       

                