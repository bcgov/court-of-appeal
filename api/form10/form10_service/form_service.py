import json
from django.conf import settings
from zeep import helpers

import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form10.models import OrderOfSingleJustice




def create_response(order_of_single_justice):

    data_dec = settings.ENCRYPTOR.decrypt(order_of_single_justice.key_id, order_of_single_justice.data)
    order_of_single_justice_data = json.loads(data_dec)
    return {
        "id": order_of_single_justice.id,
        "type": order_of_single_justice.type,  
        "status":order_of_single_justice.status,              
        "modified": order_of_single_justice.modified,                
        "pdf_types": order_of_single_justice.pdf_types,
        "description": order_of_single_justice.description,            
        "packageNumber": order_of_single_justice.package_number,
        "packageUrl": order_of_single_justice.package_url, 
        "data": order_of_single_justice_data,               
    }



def get_form(order_of_single_justice_id, uid):

    if order_of_single_justice_id:
        try:
            order_of_single_justice = OrderOfSingleJustice.objects.get(id=order_of_single_justice_id, user_id=uid)
            
            response_data = create_response(order_of_single_justice)

        except OrderOfSingleJustice.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        order_of_single_justices = OrderOfSingleJustice.objects.filter(user_id=uid)
        response_data = list()
        for order_of_single_justice in order_of_single_justices:
            response_data.append(create_response(order_of_single_justice))
       
    return helpers.serialize_object(response_data)


       
def modify_form(order_of_single_justice_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    order_of_single_justice_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    order_of_single_justice = OrderOfSingleJustice.objects.update_or_create(
        defaults=order_of_single_justice_body,
        id=order_of_single_justice_id,
        user_id=uid
    )[0] 
    order_of_single_justice_id = order_of_single_justice.id

    return {"file_id": order_of_single_justice_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

