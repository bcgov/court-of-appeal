import json
from django.conf import settings
from zeep import helpers

import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form22.models import OrderNofeesPayable




def create_response(order_nofees_payable):

    data_dec = settings.ENCRYPTOR.decrypt(order_nofees_payable.key_id, order_nofees_payable.data)
    order_nofees_payable_data = json.loads(data_dec)
    return {
        "id": order_nofees_payable.id,
        "type": order_nofees_payable.type,  
        "status":order_nofees_payable.status,              
        "modified": order_nofees_payable.modified,                
        "pdf_types": order_nofees_payable.pdf_types,
        "description": order_nofees_payable.description,            
        "packageNumber": order_nofees_payable.package_number,
        "packageUrl": order_nofees_payable.package_url, 
        "data": order_nofees_payable_data,               
    }



def get_form(order_nofees_payable_id, uid):

    if order_nofees_payable_id:
        try:
            order_nofees_payable = OrderNofeesPayable.objects.get(id=order_nofees_payable_id, user_id=uid)
            
            response_data = create_response(order_nofees_payable)

        except OrderNofeesPayable.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        order_nofees_payables = OrderNofeesPayable.objects.filter(user_id=uid)
        response_data = list()
        for order_nofees_payable in order_nofees_payables:
            response_data.append(create_response(order_nofees_payable))
       
    return helpers.serialize_object(response_data)


       
def modify_form(order_nofees_payable_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    order_nofees_payable_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    order_nofees_payable = OrderNofeesPayable.objects.update_or_create(
        defaults=order_nofees_payable_body,
        id=order_nofees_payable_id,
        user_id=uid
    )[0] 
    order_nofees_payable_id = order_nofees_payable.id

    return {"file_id": order_nofees_payable_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

