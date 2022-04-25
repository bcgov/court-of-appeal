import logging

from django.http import (
    HttpResponseNotFound, HttpResponse, JsonResponse
)

from rest_framework import permissions
from rest_framework.views import APIView

from csows.csows_service.static_list import get_static_list

logger = logging.getLogger(__name__)

class LookupView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):        
        return JsonResponse(get_static_list())

                