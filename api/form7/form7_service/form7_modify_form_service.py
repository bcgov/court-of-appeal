import datetime
from form7.models import NoticeOfAppeal, MSopParty, Party, PartyAlias, PartyLegalRep
from form7.form7_cso_web_service.library.due_dates import DueDates
from .form7_create_form_service import SetSurrogateClassCode, FixNameCapitalization



def modify_form(notice_id, body, account_id, client_id):

    parties = body.get('parties')
    manualSops = body.get('manualSop')

    body = clean_fields(NoticeOfAppeal, body, ['noticeOfAppealId', 'parties', 'manualSop'])
    
    # readOnlyUsers: "[]",  ->depends on data fromat from db migration
    # readWriteUsers: "[753]",->depends on data format from db migration
    body = SetSurrogateClassCode(body)
    
    dateOfJudgement = datetime.datetime.fromisoformat(body['dateOfJudgement'])
    body['appealSubmissionDeadline'] = DueDates().GetDateDue(dateOfJudgement, body['lowerCourtClassCd'])

    body['accountId'] = account_id
    body['createdByClientId'] = client_id
    body['lastModifiedByClientId'] = client_id
    body['lowerCourtFileNo'] = body['lowerCourtFileNo'].upper()
    
    notice = NoticeOfAppeal.objects.update_or_create(
        defaults=body,
        noticeOfAppealId=notice_id, 
        accountId=account_id
    )[0] 
    notice_id = notice.noticeOfAppealId
    
    delete_manual_sop(notice_id)
    for manualSop in manualSops:
        manualSop = clean_fields(MSopParty, manualSop, ['mSopPartyId'])        
        manualSop['noticeOfAppeal'] = notice           
        db_manual_sop = MSopParty(**manualSop)
        db_manual_sop.save()
    

    party_ids=list()
    for party in parties:
        partyId = party.get('partyId')
        aliases = party.get('aliases')
        legalReps = party.get('legalReps')
        party = clean_fields(Party, party, ['partyId','aliases','legalReps'])
        party = FixNameCapitalization(party)
        party['noticeOfAppeal'] = notice

        db_party = Party.objects.update_or_create(
            defaults=party, 
            partyId=partyId, 
            noticeOfAppeal_id=notice_id
        )[0]
        partyId = db_party.partyId
        party_ids.append(partyId)
        

        alias_ids=list()
        for alias in aliases:
            aliasId = alias.get('partyAliasId')
            alias = clean_fields(PartyAlias, alias, ['partyAliasId'])
            alias['party']=db_party
            
            db_party_alias = PartyAlias.objects.update_or_create( 
                defaults=alias,
                partyAliasId=aliasId,
                party_id=partyId
            )[0]
            alias_ids.append(db_party_alias.partyAliasId)
        delete_aliases(alias_ids, partyId)

        legal_rep_ids=list()
        for legalRep in legalReps:
            legalRepId = legalRep.get('partyLegalRepId')
            legalRep = clean_fields(PartyLegalRep, legalRep, ['partyLegalRepId'])
            legalRep['party']=db_party
            db_party_legal = PartyLegalRep.objects.update_or_create(
                defaults=legalRep,
                partyLegalRepId=legalRepId,
                party_id=partyId
            )[0]
            legal_rep_ids.append(db_party_legal.partyLegalRepId)
        delete_legal_reps(legal_rep_ids, partyId)

    delete_parties(party_ids, notice_id)


    return {"file_id": notice_id}

    

def delete_parties(party_ids, notice_id):

    parties_query = Party.objects.filter(noticeOfAppeal_id=notice_id).all()
    for party in parties_query:
        if party.partyId not in party_ids:
            party_query = Party.objects.get(partyId = party.partyId)
            party_query.delete()



def delete_aliases(alias_ids, partyId):

    aliases_query = PartyAlias.objects.filter(party_id=partyId).all()
    for alias in aliases_query:
        if alias.partyAliasId not in alias_ids:
            alias_query = PartyAlias.objects.get(partyAliasId = alias.partyAliasId)
            alias_query.delete()



def delete_legal_reps(legal_rep_ids, partyId):

    legals_query = PartyLegalRep.objects.filter(party_id=partyId).all()
    for legal in legals_query:
        if legal.partyLegalRepId not in legal_rep_ids:
            legal_query = PartyLegalRep.objects.get(partyLegalRepId = legal.partyLegalRepId)
            legal_query.delete()



def delete_manual_sop(notice_id):

    msops_query = MSopParty.objects.filter(noticeOfAppeal_id=notice_id)
    for msop in msops_query:
        msop.delete()



def clean_fields(db, body, extra_fields_to_remove):

    fields = [f.name for f in db._meta.get_fields()]
    
    body_keys_to_remove = extra_fields_to_remove
    
    for key in body.keys():
        if key not in fields:
            body_keys_to_remove.append(key)

    for key in body_keys_to_remove:
        body.pop(key, None)

    return body

