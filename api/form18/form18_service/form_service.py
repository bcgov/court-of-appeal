import json
from django.conf import settings
from zeep import helpers


import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form18.models import ChangeOfAddress




def create_response(change_of_address):

    data_dec = settings.ENCRYPTOR.decrypt(change_of_address.key_id, change_of_address.data)
    change_of_address_data = json.loads(data_dec)
    return {
        "id": change_of_address.id,
        "type": change_of_address.type,  
        "status":change_of_address.status,              
        "modified": change_of_address.modified,                
        "pdf_types": change_of_address.pdf_types,
        "description": change_of_address.description,            
        "packageNumber": change_of_address.package_number,
        "packageUrl": change_of_address.package_url, 
        "data": change_of_address_data,               
    }



def get_form(change_of_address_id, uid):

    if change_of_address_id:
        try:
            change_of_address = ChangeOfAddress.objects.get(id=change_of_address_id, user_id=uid)
            
            response_data = create_response(change_of_address)

        except ChangeOfAddress.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        change_of_addresss = ChangeOfAddress.objects.filter(user_id=uid)
        response_data = list()
        for change_of_address in change_of_addresss:
            response_data.append(create_response(change_of_address))
       
    return helpers.serialize_object(response_data)


       
def modify_form(change_of_address_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    change_of_address_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    change_of_address = ChangeOfAddress.objects.update_or_create(
        defaults=change_of_address_body,
        id=change_of_address_id,
        user_id=uid
    )[0] 
    change_of_address_id = change_of_address.id

    return {"file_id": change_of_address_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

