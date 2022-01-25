
from form7.models import NoticeOfAppeal, MSopParty, Party, PartyAlias, PartyLegalRep

import datetime
from zeep import helpers




def get_form(notice_id, account_id):

    fields = get_notice_fields()

    if notice_id:
        notice_query = NoticeOfAppeal.objects.filter(noticeOfAppealId=notice_id, accountId=account_id).values(*fields)           
        
        if len(notice_query)>0: 
            notice_query = add_notice_relations(notice_query).first()
    else:
        notice_query = NoticeOfAppeal.objects.filter(accountId=account_id).values(*fields)
        notice_query = add_notice_relations(notice_query)
        
    return helpers.serialize_object(notice_query)



def get_notice_fields():
    fields = [f.name for f in NoticeOfAppeal._meta.get_fields()]
    fields.remove('parties')
    fields.remove('manualSop')
    return fields



def add_notice_relations(notice_query):

    for notice in notice_query:
        parties_query = Party.objects.filter(noticeOfAppeal_id=notice['noticeOfAppealId']).values()
        for party in parties_query:
            alias_query = PartyAlias.objects.filter(party_id=party['partyId']).values()
            party['aliases']=alias_query
            legal_query = PartyLegalRep.objects.filter(party_id=party['partyId']).values()
            party['legalReps']=legal_query

        notice['parties']=parties_query

        msop_party_query = MSopParty.objects.filter(noticeOfAppeal_id=notice['noticeOfAppealId']).values()
        notice['manualSop']=msop_party_query
        
        if notice['readOnlyUsers'] is not None:
            readOnlyUsers = list(notice['readOnlyUsers'][1:-1].split(","))
            notice['readOnlyUsers']= [int(x) for x in readOnlyUsers if len(x)>0] 
        
        if notice['readWriteUsers'] is not None:
            readWriteUsers = list(notice['readWriteUsers'][1:-1].split(","))
            notice['readWriteUsers']= [int(x) for x in readWriteUsers if len(x)>0]
    
    return notice_query
        
