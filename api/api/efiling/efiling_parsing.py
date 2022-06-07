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

      
        
    def convert_data_for_efiling(self, request, case, documents, doc_type):

        data_dec = settings.ENCRYPTOR.decrypt(case.key_id, case.data)
        data = json.loads(data_dec)
        
        file_number=''
        if ("formSevenNumber" in data) and data["formSevenNumber"]:
            file_number = "CA"+ data["formSevenNumber"].upper().replace("CA", "")


        converted_data = {
            "formId": case.id,
            "fileNumber": file_number,
            "locationCode": "COA",

            "parties": flatten(
                [
                    [
                        {
                            "partyType": "IND",
                            "roleType": "APL",
                            "firstName": applicant["firstName"],
                            "middleName": "",
                            "lastName": applicant["lastName"],
                        }
                        for applicant in data["appellants"] if ("firstName" in applicant and "lastName" in applicant)
                    ],
                    [
                        {
                            "partyType": "IND",
                            "roleType": "RES",
                            "firstName": respondent["firstName"],
                            "middleName": "",
                            "lastName": respondent["lastName"],
                        }
                        for respondent in data["respondents"] if ("firstName" in respondent and "lastName" in respondent)
                    ],
                ]
            ),

            "organizationParties": flatten(
                [
                    [
                        {
                            "partyType": "ORG",
                            "roleType": "APL",
                            "name": applicant["name"],                            
                        }
                        for applicant in data["appellants"] if ("organization" in applicant)
                    ],
                    [
                        {
                            "partyType": "ORG",
                            "roleType": "RES",
                            "name": respondent["organization"],                            
                        }
                        for respondent in data["respondents"] if ("organization" in respondent)
                    ],                                     
                ]
            ),

            "documents": documents,            
            "successUrl": self.url_from_headers(
                request, f"submitted/{case.id}/success/{doc_type}"
            ),
            "errorUrl": self.url_from_headers(
                request, f"submitted/{case.id}/error/{doc_type}"
            ),
            "cancelUrl": self.url_from_headers(
                request, f"submitted/{case.id}/cancel/{doc_type}"
            ),
        }
        #form2 APP , form5 NHA
        return converted_data

        
    def convert_form1_data_for_efiling(self, request, notice, parties, documents, doc_type):

        id = str(notice.id)

        converted_data = {
            "formId": id,
            "fileNumber": '',
            "locationCode":"COA", 

            "parties": flatten(
                [
                    [
                        {
                            "partyType": "IND",
                            "roleType": self.get_party_type_code(party['appealRole']) if 'appealRole' in party else None,
                            "firstName": party['firstGivenName'] if 'firstGivenName' in party else None,
                            "middleName": self.get_party_middle_name(party['secondGivenName'], party['thirdGivenName']) if 'secondGivenName' in party and 'thirdGivenName' in party else None,
                            "lastName": party['surname'] if 'surname' in party else None,
                        }
                        for party in parties if ('isOrganization' in party and party['isOrganization']==False)
                    ],                                      
                ]
            ),
           
            "organizationParties": flatten(
                [
                    [
                        {
                            "partyType": "ORG",
                            "roleType": self.get_party_type_code(party['appealRole']) if 'appealRole' in party else None,
                            "name": party['organizationName'] if 'organizationName' in party else None,                            
                        }
                        for party in parties if (('isOrganization' in party and party['isOrganization']==True) or ('surname' in party and party['surname'] is None))
                    ],                                      
                ]
            ),
            "documents": documents,            
            "successUrl": self.url_from_headers(
                request, f"submitted/{id}/success/{doc_type}"
            ),
            "errorUrl": self.url_from_headers(
                request, f"submitted/{id}/error/{doc_type}"
            ),
            "cancelUrl": self.url_from_headers(
                request, f"submitted/{id}/cancel/{doc_type}"
            ),
        }

        return converted_data

    def get_party_type_code(self, party_type):
        if party_type=='Appellant': return 'APL'	
        elif party_type=='Respondent': return 'RES'       
        else: return ''
    
    def get_party_middle_name(self, second, third):
        name = ''
        if second: name = second + ' '
        if third: name = name + third + ' '
        if len(name)>1: return name[:-1]
        else: return ''
