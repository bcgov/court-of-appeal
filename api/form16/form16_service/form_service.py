import json
from django.conf import settings
from zeep import helpers

import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form16.models import OfferToSettleCosts




def create_response(offer_to_settle_costs):

    data_dec = settings.ENCRYPTOR.decrypt(offer_to_settle_costs.key_id, offer_to_settle_costs.data)
    offer_to_settle_costs_data = json.loads(data_dec)
    return {
        "id": offer_to_settle_costs.id,
        "type": offer_to_settle_costs.type,  
        "status":offer_to_settle_costs.status,              
        "modified": offer_to_settle_costs.modified,                
        "pdf_types": offer_to_settle_costs.pdf_types,
        "description": offer_to_settle_costs.description,            
        "packageNumber": offer_to_settle_costs.package_number,
        "packageUrl": offer_to_settle_costs.package_url, 
        "data": offer_to_settle_costs_data,               
    }



def get_form(offer_to_settle_costs_id, uid):

    if offer_to_settle_costs_id:
        try:
            offer_to_settle_costs = OfferToSettleCosts.objects.get(id=offer_to_settle_costs_id, user_id=uid)
            
            response_data = create_response(offer_to_settle_costs)

        except OfferToSettleCosts.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        offer_to_settle_costss = OfferToSettleCosts.objects.filter(user_id=uid)
        response_data = list()
        for offer_to_settle_costs in offer_to_settle_costss:
            response_data.append(create_response(offer_to_settle_costs))
       
    return helpers.serialize_object(response_data)


       
def modify_form(offer_to_settle_costs_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    offer_to_settle_costs_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    offer_to_settle_costs = OfferToSettleCosts.objects.update_or_create(
        defaults=offer_to_settle_costs_body,
        id=offer_to_settle_costs_id,
        user_id=uid
    )[0] 
    offer_to_settle_costs_id = offer_to_settle_costs.id

    return {"file_id": offer_to_settle_costs_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

