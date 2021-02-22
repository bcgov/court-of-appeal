import logging
import settings

logger = logging.getLogger(__name__)


class EfilingPackaging:
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
                    "fileNumber": "",
                },
                "documents": self.build_documents(data["documents"]),
                "parties": data["parties"],
                "navigationUrls": {
                    "success": data["successUrl"],
                    "error": data["errorUrl"],
                    "cancel": data["cancelUrl"],
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
                    "md5": document["md5"],
                }
            )
        return built_documents
