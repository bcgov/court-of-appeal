import json
from django.conf import settings
from zeep import helpers

import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form12.models import OrderToVaryOrderOfJustice




def create_response(order_to_vary_order_of_justice):

    data_dec = settings.ENCRYPTOR.decrypt(order_to_vary_order_of_justice.key_id, order_to_vary_order_of_justice.data)
    order_to_vary_order_of_justice_data = json.loads(data_dec)
    return {
        "id": order_to_vary_order_of_justice.id,
        "type": order_to_vary_order_of_justice.type,  
        "status":order_to_vary_order_of_justice.status,              
        "modified": order_to_vary_order_of_justice.modified,                
        "pdf_types": order_to_vary_order_of_justice.pdf_types,
        "description": order_to_vary_order_of_justice.description,            
        "packageNumber": order_to_vary_order_of_justice.package_number,
        "packageUrl": order_to_vary_order_of_justice.package_url, 
        "data": order_to_vary_order_of_justice_data,               
    }



def get_form(order_to_vary_order_of_justice_id, uid):

    if order_to_vary_order_of_justice_id:
        try:
            order_to_vary_order_of_justice = OrderToVaryOrderOfJustice.objects.get(id=order_to_vary_order_of_justice_id, user_id=uid)
            
            response_data = create_response(order_to_vary_order_of_justice)

        except OrderToVaryOrderOfJustice.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        order_to_vary_order_of_justices = OrderToVaryOrderOfJustice.objects.filter(user_id=uid)
        response_data = list()
        for order_to_vary_order_of_justice in order_to_vary_order_of_justices:
            response_data.append(create_response(order_to_vary_order_of_justice))
       
    return helpers.serialize_object(response_data)


       
def modify_form(order_to_vary_order_of_justice_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    order_to_vary_order_of_justice_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    order_to_vary_order_of_justice = OrderToVaryOrderOfJustice.objects.update_or_create(
        defaults=order_to_vary_order_of_justice_body,
        id=order_to_vary_order_of_justice_id,
        user_id=uid
    )[0] 
    order_to_vary_order_of_justice_id = order_to_vary_order_of_justice.id

    return {"file_id": order_to_vary_order_of_justice_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

