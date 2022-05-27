import json
from django.conf import settings
from zeep import helpers

import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form13.models import ConsentExtendFilingTime




def create_response(consent_extend_filing_time):

    data_dec = settings.ENCRYPTOR.decrypt(consent_extend_filing_time.key_id, consent_extend_filing_time.data)
    consent_extend_filing_time_data = json.loads(data_dec)
    return {
        "id": consent_extend_filing_time.id,
        "type": consent_extend_filing_time.type,  
        "status":consent_extend_filing_time.status,              
        "modified": consent_extend_filing_time.modified,                
        "pdf_types": consent_extend_filing_time.pdf_types,
        "description": consent_extend_filing_time.description,            
        "packageNumber": consent_extend_filing_time.package_number,
        "packageUrl": consent_extend_filing_time.package_url, 
        "data": consent_extend_filing_time_data,               
    }



def get_form(consent_extend_filing_time_id, uid):

    if consent_extend_filing_time_id:
        try:
            consent_extend_filing_time = ConsentExtendFilingTime.objects.get(id=consent_extend_filing_time_id, user_id=uid)
            
            response_data = create_response(consent_extend_filing_time)

        except ConsentExtendFilingTime.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        consent_extend_filing_times = ConsentExtendFilingTime.objects.filter(user_id=uid)
        response_data = list()
        for consent_extend_filing_time in consent_extend_filing_times:
            response_data.append(create_response(consent_extend_filing_time))
       
    return helpers.serialize_object(response_data)


       
def modify_form(consent_extend_filing_time_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    consent_extend_filing_time_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    consent_extend_filing_time = ConsentExtendFilingTime.objects.update_or_create(
        defaults=consent_extend_filing_time_body,
        id=consent_extend_filing_time_id,
        user_id=uid
    )[0] 
    consent_extend_filing_time_id = consent_extend_filing_time.id

    return {"file_id": consent_extend_filing_time_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

