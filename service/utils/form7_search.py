import settings
import logging
from zeep import Client
from zeep.cache import InMemoryCache
from zeep.transports import Transport
from requests import Session
from requests.auth import HTTPBasicAuth

logger = logging.getLogger(__name__)


class Form7Search:
    def __init__(self):
        session = Session()
        session.auth = HTTPBasicAuth(settings.COA_USERNAME, settings.COA_PASSWORD)
        self.client = Client(
            settings.COA_SEARCH_ENDPOINT,
            transport=Transport(cache=InMemoryCache(), session=session),
        )

    def _has_publication_ban(self, case_basics):
        return (
            "SecurityFlags" in case_basics
            and case_basics.SecurityFlags is not None
            and case_basics.SecurityFlags.SecurityFlag.Name == "Publication Ban"
        )

    def _has_restricted_files(self, case_basics):
        return (
            "SecurityFlags" in case_basics
            and case_basics.SecurityFlags is not None
            and case_basics.SecurityFlags.SecurityFlag.Name
            == "Family &amp; Restricted Files"
        )

    def _has_family_law(self, case_basics):
        return case_basics.HighLevelCategory == "Family Law"

    def execute_search(self, case_number) -> {}:
        search_by_case_number = self.client.service.SearchByCaseNumber(case_number)

        if search_by_case_number is None:
            return self.handle_not_found(case_number)
        elif search_by_case_number["CaseType"] == "Civil":
            return self.handle_civil_search(search_by_case_number["CaseId"])
        elif search_by_case_number["CaseType"] == "Criminal":
            return {"SearchByCaseNumberResult": search_by_case_number}

    def handle_not_found(self, case_number):
        logger.info("Case not found")
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
