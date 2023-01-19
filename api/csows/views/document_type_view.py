import logging

from zeep import helpers

from django.http import (
    HttpResponseNotFound
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from api.efiling.efiling_courts_address import EfilingCourtsAddress

logger = logging.getLogger(__name__)

class DocumentTypesView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        document_types = EfilingCourtsAddress().get_document_types()
        return Response(document_types)
     

                