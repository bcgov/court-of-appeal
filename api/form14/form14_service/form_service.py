import json
from django.conf import settings
from zeep import helpers

import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form14.models import ConsentRemoveInactiveAppeal




def create_response(consent_remove_inactive_appeal):

    data_dec = settings.ENCRYPTOR.decrypt(consent_remove_inactive_appeal.key_id, consent_remove_inactive_appeal.data)
    consent_remove_inactive_appeal_data = json.loads(data_dec)
    return {
        "id": consent_remove_inactive_appeal.id,
        "type": consent_remove_inactive_appeal.type,  
        "status":consent_remove_inactive_appeal.status,              
        "modified": consent_remove_inactive_appeal.modified,                
        "pdf_types": consent_remove_inactive_appeal.pdf_types,
        "description": consent_remove_inactive_appeal.description,            
        "packageNumber": consent_remove_inactive_appeal.package_number,
        "packageUrl": consent_remove_inactive_appeal.package_url, 
        "data": consent_remove_inactive_appeal_data,               
    }



def get_form(consent_remove_inactive_appeal_id, uid):

    if consent_remove_inactive_appeal_id:
        try:
            consent_remove_inactive_appeal = ConsentRemoveInactiveAppeal.objects.get(id=consent_remove_inactive_appeal_id, user_id=uid)
            
            response_data = create_response(consent_remove_inactive_appeal)

        except ConsentRemoveInactiveAppeal.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        consent_remove_inactive_appeals = ConsentRemoveInactiveAppeal.objects.filter(user_id=uid)
        response_data = list()
        for consent_remove_inactive_appeal in consent_remove_inactive_appeals:
            response_data.append(create_response(consent_remove_inactive_appeal))
       
    return helpers.serialize_object(response_data)


       
def modify_form(consent_remove_inactive_appeal_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    consent_remove_inactive_appeal_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    consent_remove_inactive_appeal = ConsentRemoveInactiveAppeal.objects.update_or_create(
        defaults=consent_remove_inactive_appeal_body,
        id=consent_remove_inactive_appeal_id,
        user_id=uid
    )[0] 
    consent_remove_inactive_appeal_id = consent_remove_inactive_appeal.id

    return {"file_id": consent_remove_inactive_appeal_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

