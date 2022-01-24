import logging

from django.http import (
    HttpResponseNotFound, HttpResponse, JsonResponse
)

from rest_framework import permissions
from rest_framework.views import APIView

from form7.form7_cso_web_service.form7_static_list import get_form7_holidays_list

logger = logging.getLogger(__name__)

class Form7HolidaysListView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, year=None):
        if year is None:
            HttpResponseNotFound('Parameters missing!')
        return JsonResponse(get_form7_holidays_list(year))

                