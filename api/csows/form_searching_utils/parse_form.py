import re

class Struct:
    def __init__(self, **entries):
        self.__dict__.update(entries)

class FormParsing:

    def extractCaseType(self, data):
        if data.SearchByCaseNumberResponse:
            return data.SearchByCaseNumberResult.CaseType
        elif data.ViewCasePartyResult:
            return data.ViewCasePartyResult.CaseType
        else:
            return None

    def extractParties(self, data):
        if data.ViewCasePartyResult and data.ViewCasePartyResult.Parties and data.ViewCasePartyResult.Parties.Party:
            return data.ViewCasePartyResult.Parties.Party
        else:
            return None

    def getName(self, name):       
        if name:
            return name
        else:
            return ""

    def getFullName(self, person):        
        return self.getName(person.FirstName) + ' ' + self.getName(person.LastName)

    def getLawyer(self, party):
        if party.LegalRepresentation:
            return party.LegalRepresentation.Lawyer 
        else:
            return None

    def getLawyerFirm(self, party):
        lawyer = self.getLawyer(party)[0]
        if lawyer:
            return lawyer.Firm
        else:
            return None

    def getLawyerFirmAddress(self, party):
        firm = self.getLawyerFirm(party)
        if firm is not None:
            return {
                "firmName": firm.FirmName,
                "firmPhone": firm.Phone,
                "addressLine1":firm.Address1,
                "addressLine2":firm.Address2,
                "city":firm.City,
                "postalCode":firm.PostalCode,
                "province":firm.Province
            }
        else:
            return {"firmName": "","firmPhone": "","addressLine1":"","addressLine2":"","city":"","postalCode":"","province":""}

    def buildPartyInfo(self, party):
        info = {}
        
        if party.FirstName: 
            info["name"] = self.getFullName(party)
            info["firstName"] = party.FirstName
            info["lastName"] = party.LastName
        elif party.Organization:            
            info["name"] = party.Organization
            info["organization"] = party.Organization    
        else:
            raise Exception("Couldn't find person or organization in party.")

        lawyer = self.getLawyer(party)

        if lawyer is not None:
            solicitor = {
                "name": self.getFullName(lawyer[0]),
                "counselFirstName": lawyer[0].FirstName,
                "counselLastName": lawyer[0].LastName,
            }            
            solicitor.update(self.getLawyerFirmAddress(party))
            info["solicitor"] = solicitor
    
        info["partyId"] = party.PartyID
        return info

    def getAppellants(self, parties):
        appellants = list()
        for party in parties:
            if party.PartyRole == 'Appellant':
                appellant = self.buildPartyInfo(party)
                appellants.append(appellant)
        
        return appellants

    def getRespondents(self, parties):        
        respondents = list()
        for party in parties:
            if party.PartyRole == 'Respondent':
                respondant = self.buildPartyInfo(party)
                respondents.append(respondant)

        return respondents

    def cleanName(self, name):
        if name:
            return re.sub("/\s*\(.*?\)\s*/g", "",name).replace(",", "").strip().lower()
        else:
            return " "
    
    def searchForPartyInRespondents(self, respondents, lastName, firstName, organizationName, searchBy):

        if searchBy == "Individual":
            for respondant in respondents:                
                if ('firstName' in respondant and 'lastName' in respondant and
                    self.cleanName(respondant["lastName"]) == lastName.strip().lower() and                     
                    self.cleanName(respondant["firstName"]) == firstName.strip().lower() 
                ):
                    return True
            return False
        else:
            orgName = organizationName.strip().lower()
            for respondant in respondents:
                if "organization" in respondant:
                    cleanOrg = self.cleanName(respondant["organization"])
                else:
                    cleanOrg = ''

                if( 
                    (cleanOrg==orgName and len(orgName)>0) or
                    (orgName in cleanOrg and len(orgName)>10)                
                ):
                    return True
            return False

    def parse(self, result, firstName, lastName, searchBy, organizationName):
        
        data = Struct(**result) 

        parties = self.extractParties(data)
        if parties is not None:       
            appellants = self.getAppellants(parties)
            respondents = self.getRespondents(parties)
            
            # print(respondents)

            if self.searchForPartyInRespondents(respondents, lastName, firstName, organizationName, searchBy):
                return {
                    "parties":{
                        "appellants": appellants,
                        "respondents": respondents
                    }
                }
            else:
                return None
        else:
            return None
