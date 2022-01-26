import re
from form7.models import NoticeOfAppeal, MSopParty, Party, PartyAlias, PartyLegalRep
from form7.form7_cso_web_service.library.due_dates import DueDates
import datetime



def create_new_form(body, account_id, client_id):

        parties = body.get('parties')
        manualSops = body.get('manualSop')
        
        body.pop('id', None)
        body.pop('parties', None)
        body.pop('manualSop', None)
        # readOnlyUsers: "[]",  ->depends on data fromat from db migration
        # readWriteUsers: "[753]",->depends on data format from db migration
        body = SetSurrogateClassCode(body)
        
        dateOfJudgement = datetime.datetime.fromisoformat(body['dateOfJudgement'])
        body['appealSubmissionDeadline'] = DueDates().GetDateDue(dateOfJudgement, body['lowerCourtClassCd'])

        body['accountId'] = account_id
        body['createdByClientId'] = client_id
        body['lastModifiedByClientId'] = client_id
        body['lowerCourtFileNo'] = body['lowerCourtFileNo'].upper()
        
        db_notice = NoticeOfAppeal(**body)        
        db_notice.save()

        for manualSop in manualSops:
            db_manual_sop = MSopParty(
                appealRole=manualSop['appealRole'],
                lowerCourtRole=manualSop['lowerCourtRole'],
                conjunction=manualSop['conjunction'],
                partyName=manualSop['partyName'],
                plural=manualSop['plural'],
                noticeOfAppeal=db_notice
            )
            db_manual_sop.save()

        for party in parties:
            aliases = party.get('aliases')
            legalReps = party.get('legalReps')
            party.pop('partyId', None)
            party.pop('aliases', None)
            party.pop('legalReps', None)
            party = FixNameCapitalization(party)
            party['noticeOfAppeal'] = db_notice

            db_party = Party(**party)
            db_party.save()

            for alias in aliases:
                db_party_alias = PartyAlias(             
                    name=alias['name'],                
                    nameType=alias['nameType'],
                    party=db_party
                )
                db_party_alias.save()

            for legalRep in legalReps:
                db_party_legal = PartyLegalRep(
                    name=legalRep['name'],
                    repType=legalRep['repType'],
                    party=db_party
                )
                db_party_legal.save()


        return {"file_id": db_notice.noticeOfAppealId}

        

def SetSurrogateClassCode(form):
    if form['ceisFileId'] is None:
        form['lowerCourtClassCd'] = GetSurrogateClassCode(form['lowerCourtFileNo'])
    
    return form

def GetSurrogateClassCode(lowerCourtFileNo):
    
    if ((lowerCourtFileNo is not None) and len(lowerCourtFileNo.strip())>0):
        firstLetter = lowerCourtFileNo[0:1]
        supremeClassCodes = [
            "B",
            "E",
            "H",
            "L",
            "M",
            "N",
            "P",
            "S"
        ]
        if firstLetter.upper() in supremeClassCodes:            
            return firstLetter.upper()            
    
    return ""
    

def FixNameCapitalization(party):
    
    beginsWithCapital = re.compile("^[A-Z]{1,}")

    if (party['organizationName'] is not None and len(party['organizationName'])>0):        
        party['organizationName'] = party['organizationName'].upper()
    
    if (party['surname'] is not None and bool(beginsWithCapital.match(party['surname']))):        
        party['surname'] = party['surname'].title()

    if (party['firstGivenName'] is not None and bool(beginsWithCapital.match(party['firstGivenName']))):        
        party['firstGivenName'] = party['firstGivenName'].title()

    if (party['secondGivenName'] is not None and bool(beginsWithCapital.match(party['secondGivenName']))):        
        party['secondGivenName'] = party['secondGivenName'].title()
    
    if (party['thirdGivenName'] is not None and bool(beginsWithCapital.match(party['thirdGivenName']))):
        party['thirdGivenName'] = party['thirdGivenName'].title()
    
    return party