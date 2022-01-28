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
            "fileNumber": "CA"+ data["formSevenNumber"].replace("CA", ""),
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
                request, f"submitted/{case.id}/success/APP"
            ),
            "errorUrl": self.url_from_headers(
                request, f"submitted/{case.id}/error/APP"
            ),
            "cancelUrl": self.url_from_headers(
                request, f"submitted/{case.id}/cancel/APP"
            ),
        }

        return converted_data


    def convert_form7_data_for_efiling(self, request, notice, documents):
        
        id = str(notice.noticeOfAppealId)
        converted_data = {
            "formId": id,
            "fileNumber": 20191119, #"S"+notice.lowerCourtFileNo.replace("S", ""),
            "locationCode":"COA", #  notice.lowerCourtRegistryId,
            "parties":[],
            # "parties": flatten(
            #     [
                    
            #         {
            #             "partyType": "IND",
            #             "roleType": "Appellant",
            #             "firstName": "firstName",
            #             "middleName": "",
            #             "lastName": "lastName",
            #         }                        
                   
            #         # [
            #         #     {
            #         #         "partyType": "IND",
            #         #         "roleType": "Respondent",
            #         #         "firstName": respondent["firstName"],
            #         #         "middleName": "",
            #         #         "lastName": respondent["lastName"],
            #         #     }
            #         #     for respondent in data["respondents"]
            #         # ],
            #     ]
            # ),  
            "organizationParties": [],
            "documents": documents,            
            "successUrl": self.url_from_headers(
                request, f"submitted/{id}/success/NAA"
            ),
            "errorUrl": self.url_from_headers(
                request, f"submitted/{id}/error/NAA"
            ),
            "cancelUrl": self.url_from_headers(
                request, f"submitted/{id}/cancel/NAA"
            ),
        }

        return converted_data
