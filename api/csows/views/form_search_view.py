import logging

from zeep import helpers

from django.http import (
    HttpResponseNotFound,
    HttpResponseBadRequest
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from csows.form_searching_utils import FormSearch, FormParsing, FormCaseBasicsParsing

logger = logging.getLogger(__name__)

class FormSearchView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.form_search = FormSearch()
   
    def get(self, request):
        caseNumber = request.query_params.get("caseNumber")        
        firstName = request.query_params.get("firstName")
        lastName = request.query_params.get("lastName")
        searchBy = request.query_params.get("searchBy")
        organizationName = request.query_params.get("organizationName")

        if not caseNumber:
            return HttpResponseBadRequest("Missing request parameters")

        result = self.form_search.execute_search(caseNumber)
        if (result == 'NOT FOUND'):
            return HttpResponseNotFound()

        parseForm = FormParsing().parse(result,firstName,lastName,searchBy, organizationName)
        parseForm = FormCaseBasicsParsing().parse(result, parseForm)
        
        if parseForm is not None:
            return Response(helpers.serialize_object(parseForm))
        else:
            return HttpResponseNotFound()            