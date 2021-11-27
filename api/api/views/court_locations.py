import logging

from zeep import helpers

from django.http import (
    HttpResponseNotFound
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from api.form7_cso_web_service import Form7Csows

logger = logging.getLogger(__name__)

class CourtLocations(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.form7_csows = Form7Csows()
   
    def get(self, request):
        
        addSupreme = bool(request.query_params.get("supreme"))
        addProvincial = bool(request.query_params.get("provincial"))
        
        locations = self.form7_csows.get_court_locations(addSupreme, addProvincial)
        
        if locations is not None:
            return Response(helpers.serialize_object(locations))
        else:
            return HttpResponseNotFound()       

                