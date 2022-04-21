import json
from django.conf import settings
from zeep import helpers

import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form8.models import NoticeOfApplicationToVaryOrder




def create_response(notice_of_application_to_vary_order):

    data_dec = settings.ENCRYPTOR.decrypt(notice_of_application_to_vary_order.key_id, notice_of_application_to_vary_order.data)
    notice_of_application_to_vary_order_data = json.loads(data_dec)
    return {
        "id": notice_of_application_to_vary_order.id,
        "type": notice_of_application_to_vary_order.type,  
        "status":notice_of_application_to_vary_order.status,              
        "modified": notice_of_application_to_vary_order.modified,                
        "pdf_types": notice_of_application_to_vary_order.pdf_types,
        "description": notice_of_application_to_vary_order.description,            
        "packageNumber": notice_of_application_to_vary_order.package_number,
        "packageUrl": notice_of_application_to_vary_order.package_url, 
        "data": notice_of_application_to_vary_order_data,               
    }



def get_form(notice_of_application_to_vary_order_id, uid):

    if notice_of_application_to_vary_order_id:
        try:
            notice_of_application_to_vary_order = NoticeOfApplicationToVaryOrder.objects.get(id=notice_of_application_to_vary_order_id, user_id=uid)
            
            response_data = create_response(notice_of_application_to_vary_order)

        except NoticeOfApplicationToVaryOrder.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        notice_of_application_to_vary_orders = NoticeOfApplicationToVaryOrder.objects.filter(user_id=uid)
        response_data = list()
        for notice_of_application_to_vary_order in notice_of_application_to_vary_orders:
            response_data.append(create_response(notice_of_application_to_vary_order))
       
    return helpers.serialize_object(response_data)


       
def modify_form(notice_of_application_to_vary_order_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    notice_of_application_to_vary_order_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    notice_of_application_to_vary_order = NoticeOfApplicationToVaryOrder.objects.update_or_create(
        defaults=notice_of_application_to_vary_order_body,
        id=notice_of_application_to_vary_order_id,
        user_id=uid
    )[0] 
    notice_of_application_to_vary_order_id = notice_of_application_to_vary_order.id

    return {"file_id": notice_of_application_to_vary_order_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

