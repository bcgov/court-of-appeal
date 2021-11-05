import logging
from django.conf import settings

logger = logging.getLogger(__name__)


class EFilingPackaging:
    def __init__(self):
        self.app_name = settings.EFILING_APP_NAME
        self.court_level = settings.EFILING_COURT_LEVEL
        self.court_class = settings.EFILING_COURT_CLASS
        self.court_division = settings.EFILING_COURT_DIVISION

    def build_efiling_body(self, data) -> {}:
        return {
            "clientAppName": self.app_name,
            "filingPackage": {
                "court": {
                    "location": data["locationCode"],
                    "level": self.court_level,
                    "courtClass": self.court_class,
                    "division": self.court_division,
                    "fileNumber": "CA"+data["fileNumber"],
                },
                "documents": [
                    {
                        "name": document["name"],
                        "type": document["type"],
                        "isAmendment": False,
                        "isSupremeCourtScheduling": False,
                        "data": document["data"],
                        "md5": document["md5"],
                    }
                    for document in data["documents"]
                ],
                "parties": [
                    {
                        "partyType": party["partyType"],
                        "roleType": party["roleType"],
                        "firstName": party["firstName"],
                        "middleName": party["middleName"],
                        "lastName": party["lastName"],
                    }
                    for party in data["parties"]
                ],
                "organizationParties": [
                    {
                        "roleType": organizationParty["roleType"],
                        "name": organizationParty["name"]
                    }
                    for organizationParty in data["organizationParties"]
                ]
            },
            "navigationUrls": {
                "success": data["successUrl"],
                "error": data["errorUrl"],
                "cancel": data["cancelUrl"],
            }
        }
