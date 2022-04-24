import logging

from zeep import helpers

from django.http import (
    HttpResponseNotFound,
    HttpResponseBadRequest
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from csows.csows_service.csows_file_detail import FileDetail

logger = logging.getLogger(__name__)



class FileDetailView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.file_detail = FileDetail()
   

    def get(self, request):

        court_level = request.query_params.get("courtLevel")
        location_id = request.query_params.get("locationId")
        file_number = request.query_params.get("fileNumber")

        if None in [court_level, location_id, file_number]:
            return HttpResponseBadRequest("Missing parameters.")
        
        file_detail = self.file_detail.get_file_detail(court_level, location_id, file_number)
           
        if file_detail is not None:
            return Response(helpers.serialize_object(file_detail))
        else:
            return HttpResponseNotFound()       
        

                