import json
from django.conf import settings
from django.contrib.admin.utils import flatten

class EFilingParsing:
    def url_from_headers(self, request, extra):
        if "HTTP_X_FORWARDED_HOST" in request.META:
            host = request.META["HTTP_X_FORWARDED_HOST"]
            proto = request.META["HTTP_X_FORWARDED_PROTO"]
        else:
            host = request.META["HTTP_HOST"]
            proto = "http"
        return f"{proto}://{host}{settings.FORCE_SCRIPT_NAME}{extra}"

    def convert_data_for_efiling(self, request, case, documents):
        data_dec = settings.ENCRYPTOR.decrypt(case.key_id, case.data)
        data = json.loads(data_dec)
        
        converted_data = {
            "formId": case.id,
            "fileNumber": data["formSevenNumber"].replace("CA", ""),
            "locationCode": "COA",
            "parties":[],
            # "parties": flatten(
            #     [
            #         [
            #             {
            #                 "partyType": "IND",
            #                 "roleType": "Appellant",
            #                 "firstName": applicant["firstName"],
            #                 "middleName": "",
            #                 "lastName": applicant["lastName"],
            #             }
            #             for applicant in data["appellants"]
            #         ],
            #         [
            #             {
            #                 "partyType": "IND",
            #                 "roleType": "Respondent",
            #                 "firstName": respondent["firstName"],
            #                 "middleName": "",
            #                 "lastName": respondent["lastName"],
            #             }
            #             for respondent in data["respondents"]
            #         ],
            #     ]
            # ),
            "organizationParties": [],
            "documents": documents,            
            "successUrl": self.url_from_headers(
                request, f"submitted/{case.id}/success"
            ),
            "errorUrl": self.url_from_headers(
                request, f"submitted/{case.id}/error"
            ),
            "cancelUrl": self.url_from_headers(
                request, f"submitted/{case.id}/cancel"
            ),
        }

        return converted_data
