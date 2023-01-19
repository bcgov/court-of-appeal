import logging

from zeep import helpers

from django.http import (
    HttpResponseNotFound
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from csows.csows_service.csows_file_parties import FileParties

logger = logging.getLogger(__name__)



class FilePartiesView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.file_parties = FileParties()
   

    def get(self, request, fileId):
           
        file_parties = self.file_parties.get_file_parties(fileId, request.user.account_id, request.user.client_id)
        
        if file_parties is not None:
            return Response(helpers.serialize_object(file_parties))
        else:
            return HttpResponseNotFound()       
