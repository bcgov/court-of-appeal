import json
from django.conf import settings
from zeep import helpers

import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form15.models import ConsentOrderGeneral




def create_response(consent_order_general):

    data_dec = settings.ENCRYPTOR.decrypt(consent_order_general.key_id, consent_order_general.data)
    consent_order_general_data = json.loads(data_dec)
    return {
        "id": consent_order_general.id,
        "type": consent_order_general.type,  
        "status":consent_order_general.status,              
        "modified": consent_order_general.modified,                
        "pdf_types": consent_order_general.pdf_types,
        "description": consent_order_general.description,            
        "packageNumber": consent_order_general.package_number,
        "packageUrl": consent_order_general.package_url, 
        "data": consent_order_general_data,               
    }



def get_form(consent_order_general_id, uid):

    if consent_order_general_id:
        try:
            consent_order_general = ConsentOrderGeneral.objects.get(id=consent_order_general_id, user_id=uid)
            
            response_data = create_response(consent_order_general)

        except ConsentOrderGeneral.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        consent_order_generals = ConsentOrderGeneral.objects.filter(user_id=uid)
        response_data = list()
        for consent_order_general in consent_order_generals:
            response_data.append(create_response(consent_order_general))
       
    return helpers.serialize_object(response_data)


       
def modify_form(consent_order_general_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    consent_order_general_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    consent_order_general = ConsentOrderGeneral.objects.update_or_create(
        defaults=consent_order_general_body,
        id=consent_order_general_id,
        user_id=uid
    )[0] 
    consent_order_general_id = consent_order_general.id

    return {"file_id": consent_order_general_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

