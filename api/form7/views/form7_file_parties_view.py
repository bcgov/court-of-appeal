import logging

from zeep import helpers

from django.http import (
    HttpResponseNotFound
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from form7.form7_cso_web_service.form7_csows_file_parties import Form7FileParties

logger = logging.getLogger(__name__)



class Form7FilePartiesView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.form7_file_parties = Form7FileParties()
   

    def get(self, request, fileId):
           
        file_parties = self.form7_file_parties.get_file_parties(fileId, request.user.account_id, request.user.client_id)
        
        if file_parties is not None:
            return Response(helpers.serialize_object(file_parties))
        else:
            return HttpResponseNotFound()       
