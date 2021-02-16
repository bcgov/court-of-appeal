import settings
import logging
from zeep import Client
from zeep.cache import InMemoryCache
from zeep.transports import Transport
from requests import Session
from requests.auth import HTTPBasicAuth

LOGGER = logging.getLogger(__name__)


class Form7Search:
    def __init__(self):
        session = Session()
        session.auth = HTTPBasicAuth(settings.COA_USERNAME, settings.COA_PASSWORD)
        self.client = Client(
            settings.COA_SEARCH_ENDPOINT,
            transport=Transport(cache=InMemoryCache(), session=session),
        )

    def execute_search(self, case_number) -> {}:
        search_by_case_number = self.client.service.SearchByCaseNumber(case_number)

        if search_by_case_number is None:
            return self.handle_not_found(case_number)
        elif search_by_case_number["CaseType"] == "Civil":
            return self.handle_civil_search(search_by_case_number["CaseId"])
        elif search_by_case_number["CaseType"] == "Criminal":
            return {"SearchByCaseNumberResult": search_by_case_number}

    def handle_not_found(self, case_number):
        LOGGER.info("Case not found")
        return "NOT FOUND"

    def handle_civil_search(self, case_id) -> {}:
        case_basics = self.client.service.ViewCaseBasics(case_id)
        if (
            "SecurityFlags" in case_basics
            and case_basics.SecurityFlags is not None
            and case_basics.SecurityFlags.SecurityFlag.Name
            == "Publication Ban"
        ):
            LOGGER.info("Publication ban found.")
            return {"ViewCaseBasicsResult": case_basics}
        elif (
            "SecurityFlags" in case_basics
            and case_basics.SecurityFlags is not None
            and case_basics.SecurityFlags.SecurityFlag.Name
            == "Family &amp; Restricted Files"
        ):
            LOGGER.info("Restricted files found.")
            return {"ViewCaseBasicsResult": case_basics}
        elif case_basics.HighLevelCategory == "Family Law":
            LOGGER.info("Family Law found.")
            return {"ViewCaseBasicsResult": case_basics}

        case_party = self.client.service.ViewCaseParty(case_id)
        return {"ViewCasePartyResult": case_party, "ViewCaseBasicsResult": case_basics}
