import logging

from zeep import helpers

from django.http import (
    HttpResponseNotFound
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from api.form7_searching_utils import Form7Search, Form7Parsing

logger = logging.getLogger(__name__)

class Form7SearchView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.form7_search = Form7Search()
        self.parsing_form7 = Form7Parsing()
   
    def get(self, request):
        caseNumber = request.query_params.get("caseNumber")
         
        result = self.form7_search.execute_search(caseNumber)
        if (result == 'NOT FOUND'):
            return HttpResponseNotFound()

        parseForm7 = self.parsing_form7.parse(result)
        if parseForm7 is not None:
            return Response(helpers.serialize_object(parseForm7))
        else:
            return HttpResponseNotFound()            