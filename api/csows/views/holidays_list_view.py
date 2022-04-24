import logging

from django.http import (
    HttpResponseNotFound, HttpResponse, JsonResponse
)

from rest_framework import permissions
from rest_framework.views import APIView

from csows.csows_service.static_list import get_holidays_list

logger = logging.getLogger(__name__)

class HolidaysListView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, year=None):
        if year is None:
            HttpResponseNotFound('Parameters missing!')
        return JsonResponse(get_holidays_list(year))

                