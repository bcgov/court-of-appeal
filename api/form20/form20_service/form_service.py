import json
from django.conf import settings
from zeep import helpers


import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form20.models import ObjectionWithdraw




def create_response(objection_withdraw):

    data_dec = settings.ENCRYPTOR.decrypt(objection_withdraw.key_id, objection_withdraw.data)
    objection_withdraw_data = json.loads(data_dec)
    return {
        "id": objection_withdraw.id,
        "type": objection_withdraw.type,  
        "status":objection_withdraw.status,              
        "modified": objection_withdraw.modified,                
        "pdf_types": objection_withdraw.pdf_types,
        "description": objection_withdraw.description,            
        "packageNumber": objection_withdraw.package_number,
        "packageUrl": objection_withdraw.package_url, 
        "data": objection_withdraw_data,               
    }



def get_form(objection_withdraw_id, uid):

    if objection_withdraw_id:
        try:
            objection_withdraw = ObjectionWithdraw.objects.get(id=objection_withdraw_id, user_id=uid)
            
            response_data = create_response(objection_withdraw)

        except ObjectionWithdraw.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        objection_withdraws = ObjectionWithdraw.objects.filter(user_id=uid)
        response_data = list()
        for objection_withdraw in objection_withdraws:
            response_data.append(create_response(objection_withdraw))
       
    return helpers.serialize_object(response_data)


       
def modify_form(objection_withdraw_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    objection_withdraw_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    objection_withdraw = ObjectionWithdraw.objects.update_or_create(
        defaults=objection_withdraw_body,
        id=objection_withdraw_id,
        user_id=uid
    )[0] 
    objection_withdraw_id = objection_withdraw.id

    return {"file_id": objection_withdraw_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

