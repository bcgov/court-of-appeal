import logging

from django.http import (
    HttpResponseNotFound, HttpResponse, JsonResponse
)

from rest_framework import permissions
from rest_framework.views import APIView

from api.form7_cso_web_service.form7_static_list import get_form7_static_list

logger = logging.getLogger(__name__)

class Form7LookupView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):        
        return JsonResponse(get_form7_static_list())

                