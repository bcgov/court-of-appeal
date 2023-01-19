import logging
import re

from .library.static_lookup import StaticLookup
from .csows_caller_base import CsowsCallerBase

logger = logging.getLogger(__name__)



class FileParties:


    def __init__(self):
        CsowsCallerBase.__init__(self)
             

    def get_file_parties(self, file_id, account_id, client_id):
                
        UserId = 1
        SearchId = 0

        parties_detail = self.client.service.getParties(
            UserId, 
            SearchId, 
            file_id, 
            account_id, 
            client_id            
        )
        # print(parties_detail)
        return self.create_file_parties_response(parties_detail)


    def create_file_parties_response(self, parties):

        if parties is None:
            return []

        details = list()

        for party in parties:

            firstRoleCheck = True

            surname = party['surnameNm']
            isOrganization = False
            if ((party['organizationNm'] is not None and len(party['organizationNm'])>0) or
                (surname is None or len(surname)==0)            
            ):
                isOrganization = True
            else:
                surname = surname.title()

            roles = [ role['partyRole'] for role in party['roleResult']['array'] ]
            if len(roles) > 1:                
                for lcRole in roles:

                    lowerCourtRole = None
                    if firstRoleCheck:
                        lowerCourtRole = self.GetLowerCourtRole(party)
                    elif lcRole.lower() not in StaticLookup().PrimaryLowerCourtRoles():
                        lowerCourtRole = lcRole 
                    
                    details.append({
                        'ceisPartyId': int(party['partyId']),
                        'isOrganization' : isOrganization,
                        'firstGivenName' : party['firstNm'],
                        'organizationName' : party['organizationNm'],
                        'secondGivenName' : party['secondNm'],
                        'thirdGivenName' : None,
                        'surname' : surname,
                        'fullName' : party['partyNm'],
                        'lowerCourtRole' : lowerCourtRole,
                        'counselName' : party['counselNm'],
                        'aliases' : self.GetAliases(party),
                        'legalReps' : self.GetLegalReps(party)
                    })

                    firstRoleCheck = False
            else:
                details.append({
                    'ceisPartyId': int(party['partyId']),
                    'isOrganization' : isOrganization,
                    'firstGivenName' : party['firstNm'],
                    'organizationName' : party['organizationNm'],
                    'secondGivenName' : party['secondNm'],
                    'thirdGivenName' : None,
                    'surname' : surname,
                    'fullName' : party['partyNm'],
                    'lowerCourtRole' : self.GetLowerCourtRole(party),
                    'counselName' : party['counselNm'],
                    'aliases' : self.GetAliases(party),
                    'legalReps' : self.GetLegalReps(party)
                })

        return details

    
    def GetAliases(self, party):
        if party['aliasResult'] is not None:
            return [ 
                {
                    'nameType':alias['nameType'].lower(), 
                    'name':self.UndoLastNameFirst(alias['otherName'])
                } 
                for alias in party['aliasResult']['array'] 
            ]
        else:
            return []


    def GetLegalReps(self, party):
        if party['legalrepResult'] is not None:
            return [
                {   'RepType': legal['legalRepTypeDesc'].lower(),
                    'RepTypeCd': legal['legalRepTypeCode'],
                    'Name': self.UndoLastNameFirst(legal['legalRepNm']) 
                }
                for legal in party['legalrepResult']['array']
            ]
        else:
            return []

                
    def UndoLastNameFirst(self, name):
    
        if "," not in name:        
            return name
        
        beginsWithCapitals = re.compile("^[A-Z]{2,}")
        if bool(beginsWithCapitals.match(name)):

            splitNames = name.split(',')

            if len(splitNames) == 2:            
                firstName = splitNames[1].strip()
                surname = splitNames[0].strip().title()
                return f"{firstName} {surname}"
        
        return name
        

    def GetLowerCourtRole(self, party):
        
        roles = [role['partyRole'] for role in party['roleResult']['array'] if 'partyRole' in role]
        allKnownRoles =[ role.lower() for role in StaticLookup().LowerCourtRolesKeys()]

        # roles used Style of Cause for sorting rules get the highest priority.
        # In some cases, we may be throwing away extra roles here, but this is
        # necessary to do the sorting later
        tier1Roles = [role for role in roles if (role.lower() in StaticLookup().PrimaryLowerCourtRoles())]
      

        if len(tier1Roles)>0:        
            return " & ".join(tier1Roles)        

        # roles that appear in the drop down list get higher priority than roles that do not appear
        tier2Roles = [role for role in roles if (role.lower() in allKnownRoles)]

        if len(tier2Roles)>0:
            return " & ".join(tier2Roles)
        
        partyRole = [role['partyRolefor'] for role in party['roleResult']['array'] if 'partyRolefor' in role ]
        return " & ".join(partyRole)
               



    
    