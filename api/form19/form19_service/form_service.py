import json
from django.conf import settings
from zeep import helpers

import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form19.models import WithdrawLawyer




def create_response(withdraw_lawyer):

    data_dec = settings.ENCRYPTOR.decrypt(withdraw_lawyer.key_id, withdraw_lawyer.data)
    withdraw_lawyer_data = json.loads(data_dec)
    return {
        "id": withdraw_lawyer.id,
        "type": withdraw_lawyer.type,  
        "status":withdraw_lawyer.status,              
        "modified": withdraw_lawyer.modified,                
        "pdf_types": withdraw_lawyer.pdf_types,
        "description": withdraw_lawyer.description,            
        "packageNumber": withdraw_lawyer.package_number,
        "packageUrl": withdraw_lawyer.package_url, 
        "data": withdraw_lawyer_data,               
    }



def get_form(withdraw_lawyer_id, uid):

    if withdraw_lawyer_id:
        try:
            withdraw_lawyer = WithdrawLawyer.objects.get(id=withdraw_lawyer_id, user_id=uid)
            
            response_data = create_response(withdraw_lawyer)

        except WithdrawLawyer.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        withdraw_lawyers = WithdrawLawyer.objects.filter(user_id=uid)
        response_data = list()
        for withdraw_lawyer in withdraw_lawyers:
            response_data.append(create_response(withdraw_lawyer))
       
    return helpers.serialize_object(response_data)


       
def modify_form(withdraw_lawyer_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    withdraw_lawyer_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    withdraw_lawyer = WithdrawLawyer.objects.update_or_create(
        defaults=withdraw_lawyer_body,
        id=withdraw_lawyer_id,
        user_id=uid
    )[0] 
    withdraw_lawyer_id = withdraw_lawyer.id

    return {"file_id": withdraw_lawyer_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

