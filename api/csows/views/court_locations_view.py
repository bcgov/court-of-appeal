import logging

from zeep import helpers

from django.http import (
    HttpResponseNotFound
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from csows.csows_service import CourtLocations

logger = logging.getLogger(__name__)

class CourtLocationsView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.csows_locations = CourtLocations()
   
    def get(self, request):
        
        addSupreme = (request.query_params.get("supreme")=="true")
        addProvincial = (request.query_params.get("provincial")=="true")
        
        locations = self.csows_locations.get_court_locations(addSupreme, addProvincial)
        
        if locations is not None:
            return Response(helpers.serialize_object(locations))
        else:
            return HttpResponseNotFound()       

                