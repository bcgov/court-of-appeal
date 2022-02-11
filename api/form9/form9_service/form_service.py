import json
from django.conf import settings
import datetime
from zeep import helpers
from django.utils import timezone

import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form9.models import Requisition




def create_response(requisition):

    data_dec = settings.ENCRYPTOR.decrypt(requisition.key_id, requisition.data)
    requisition_data = json.loads(data_dec)
    return {
        "id": requisition.id,
        "type": requisition.type,  
        "status":requisition.status,              
        "modified": requisition.modified,                
        "pdf_types": requisition.pdf_types,
        "description": requisition.description,            
        "packageNumber": requisition.package_number,
        "packageUrl": requisition.package_url, 
        "data": requisition_data,               
    }



def get_form(requisition_id, uid):

    if requisition_id:
        try:
            requisition = Requisition.objects.get(id=requisition_id, user_id=uid)
            
            response_data = create_response(requisition)

        except Requisition.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        requisitions = Requisition.objects.filter(user_id=uid)
        response_data = list()
        for requisition in requisitions:
            response_data.append(create_response(requisition))
       
    return helpers.serialize_object(response_data)


       
def modify_form(requisition_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    requisition_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    requisition = Requisition.objects.update_or_create(
        defaults=requisition_body,
        id=requisition_id,
        user_id=uid
    )[0] 
    requisition_id = requisition.id

    return {"file_id": requisition_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

