import json
from django.conf import settings
from zeep import helpers

import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form17.models import CertificateOfCosts




def create_response(certificate_of_costs):

    data_dec = settings.ENCRYPTOR.decrypt(certificate_of_costs.key_id, certificate_of_costs.data)
    certificate_of_costs_data = json.loads(data_dec)
    return {
        "id": certificate_of_costs.id,
        "type": certificate_of_costs.type,  
        "status":certificate_of_costs.status,              
        "modified": certificate_of_costs.modified,                
        "pdf_types": certificate_of_costs.pdf_types,
        "description": certificate_of_costs.description,            
        "packageNumber": certificate_of_costs.package_number,
        "packageUrl": certificate_of_costs.package_url, 
        "data": certificate_of_costs_data,               
    }



def get_form(certificate_of_costs_id, uid):

    if certificate_of_costs_id:
        try:
            certificate_of_costs = CertificateOfCosts.objects.get(id=certificate_of_costs_id, user_id=uid)
            
            response_data = create_response(certificate_of_costs)

        except CertificateOfCosts.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        certificate_of_costss = CertificateOfCosts.objects.filter(user_id=uid)
        response_data = list()
        for certificate_of_costs in certificate_of_costss:
            response_data.append(create_response(certificate_of_costs))
       
    return helpers.serialize_object(response_data)


       
def modify_form(certificate_of_costs_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    certificate_of_costs_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    certificate_of_costs = CertificateOfCosts.objects.update_or_create(
        defaults=certificate_of_costs_body,
        id=certificate_of_costs_id,
        user_id=uid
    )[0] 
    certificate_of_costs_id = certificate_of_costs.id

    return {"file_id": certificate_of_costs_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

