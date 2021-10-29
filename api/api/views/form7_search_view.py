import os
import logging
from zeep import Client
from zeep.cache import InMemoryCache
from zeep.transports import Transport
from requests import Session
from requests.auth import HTTPBasicAuth

from django.http import (
    HttpResponseBadRequest,
    HttpResponseNotFound, HttpResponseForbidden
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView

logger = logging.getLogger(__name__)

COA_USERNAME = os.environ.get("COA_USERNAME")
COA_PASSWORD = os.environ.get("COA_PASSWORD")
COA_SEARCH_ENDPOINT = os.environ.get("COA_SEARCH_ENDPOINT")

class Form7SearchView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        caseNumber = request.query_params.get("caseNumber")
        print("+++++++++++++++++++++++++++")
        print(caseNumber)
        result = self.execute_search(caseNumber)
        if (result == 'NOT FOUND'):
            return HttpResponseNotFound()
        print(result)
        return Response("OK")

    def __init__(self):
        session = Session()
        session.auth = HTTPBasicAuth(COA_USERNAME, COA_PASSWORD)
        self.client = Client(
            COA_SEARCH_ENDPOINT,
            transport=Transport(cache=InMemoryCache(), session=session),
        )

    def _has_publication_ban(self, case_basics):
        return (
            "SecurityFlags" in case_basics
            and case_basics.SecurityFlags is not None
            and case_basics.SecurityFlags.SecurityFlag
            and any(
                x.Name == "Publication Ban"
                for x in case_basics.SecurityFlags.SecurityFlag
            )
        )

    def _has_restricted_files(self, case_basics):
        return (
            "SecurityFlags" in case_basics
            and case_basics.SecurityFlags is not None
            and case_basics.SecurityFlags.SecurityFlag
            and any(
                x.Name == "Family & Restricted Files"
                for x in case_basics.SecurityFlags.SecurityFlag
            )
        )

    def _has_family_law(self, case_basics):
        return case_basics.HighLevelCategory == "Family Law"

    def execute_search(self, case_number):
        print("________________")
        print(case_number)
        print(self.client.service.SearchByCaseNumber(case_number))
        print("===========")
        search_by_case_number = self.client.service.SearchByCaseNumber(case_number)
        print("________________")        
        print(search_by_case_number)

        return("OK")
        # if search_by_case_number is None or search_by_case_number["CaseId"] == -1:
        #     return self.handle_not_found(case_number)
        # elif search_by_case_number["CaseType"] == "Civil":
        #     return self.handle_civil_search(search_by_case_number["CaseId"])
        # elif search_by_case_number["CaseType"] == "Criminal":
        #     return {"SearchByCaseNumberResult": search_by_case_number}

    def handle_not_found(self, case_number):
        logger.info("Case not found: " + case_number)
        return "NOT FOUND"

    def handle_civil_search(self, case_id) -> {}:
        case_basics = self.client.service.ViewCaseBasics(case_id)
        if self._has_publication_ban(case_basics):
            logger.info("Publication ban found.")
            return {"ViewCaseBasicsResult": case_basics}
        elif self._has_restricted_files(case_basics):
            logger.info("Restricted files found.")
            return {"ViewCaseBasicsResult": case_basics}
        elif self._has_family_law(case_basics):
            logger.info("Family Law found.")
            return {"ViewCaseBasicsResult": case_basics}

        case_party = self.client.service.ViewCaseParty(case_id)
        return {"ViewCasePartyResult": case_party, "ViewCaseBasicsResult": case_basics}
