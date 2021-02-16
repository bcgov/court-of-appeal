import logging
import settings
import hashlib

logger = logging.getLogger(__name__)


class EfilingPackaging:
    def __init__(self):
        self.app_name = settings.EFILING_APP_NAME
        self.court_level = settings.EFILING_COURT_LEVEL
        self.court_class = settings.EFILING_COURT_CLASS

    def build_efiling_body(self, data) -> {}:
        return {
            "clientAppName": self.app_name,
            "filingPackage": {
                "court": {
                    "location": data.location_id,
                    "level": self.court_level,
                    "courtClass": self.court_class,
                    "division": "I",
                    "fileNumber": None,
                },
                "documents": self.build_documents(data.documents),
                "parties": self.build_parties(data.applicant, data.respondent),
                "navigationUrls": {
                    "success": data.successUrl,
                    "error": data.errorUrl,
                    "cancel": data.cancelUrl,
                },
            },
        }

    def build_documents(self, documents) -> {}:
        built_documents = []
        for document in documents:
            built_documents.append(
                {
                    "name": document["name"],
                    "type": document["type"],
                    "isAmendment": False,
                    "isSupremeCourtScheduling": False,
                    "data": document["data"],
                    "md5": hashlib.md5(document["data"]),
                }
            )
        return built_documents

    # Change this in the future, to support more than two parties.
    def build_parties(self, applicant, respondent) -> {}:
        built_parties = []
        built_parties.append(
            {
                "partyType": respondent["partyType"],
                "roleType": "APP",
                "firstName": applicant["first"],
                "middleName": applicant["middle"],
                "lastName": applicant["last"],
            },
        )
        if respondent is not None:
            built_parties.append(
                {
                    "partyType": respondent["partyType"],
                    "roleType": "RES",
                    "firstName": respondent["first"],
                    "middleName": respondent["middle"],
                    "lastName": respondent["last"],
                }
            )
        return built_parties
