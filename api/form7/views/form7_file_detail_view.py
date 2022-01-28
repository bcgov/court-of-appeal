import logging

from zeep import helpers

from django.http import (
    HttpResponseNotFound,
    HttpResponseBadRequest
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from form7.form7_cso_web_service.form7_csows_file_detail import Form7FileDetail

logger = logging.getLogger(__name__)



class Form7FileDetailView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.form7_file_detail = Form7FileDetail()
   

    def get(self, request):

        court_level = request.query_params.get("courtLevel")
        location_id = request.query_params.get("locationId")
        file_number = request.query_params.get("fileNumber")

        if None in [court_level, location_id, file_number]:
            return HttpResponseBadRequest("Missing parameters.")
        
        file_detail = self.form7_file_detail.get_file_detail(court_level, location_id, file_number)
           
        if file_detail is not None:
            return Response(helpers.serialize_object(file_detail))
        else:
            return HttpResponseNotFound()       
        

                