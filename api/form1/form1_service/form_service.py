import json
from django.conf import settings
from zeep import helpers


import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form1.models import NoticeOfAppeal




def create_response(notice_of_appeal):

    data_dec = settings.ENCRYPTOR.decrypt(notice_of_appeal.key_id, notice_of_appeal.data)
    notice_of_appeal_data = json.loads(data_dec)
    return {
        "id": notice_of_appeal.id,
        "type": notice_of_appeal.type,  
        "status":notice_of_appeal.status,              
        "modified": notice_of_appeal.modified,                
        "pdf_types": notice_of_appeal.pdf_types,
        "description": notice_of_appeal.description,            
        "packageNumber": notice_of_appeal.package_number,
        "packageUrl": notice_of_appeal.package_url, 
        "data": notice_of_appeal_data,               
    }



def get_form(notice_of_appeal_id, uid):

    if notice_of_appeal_id:
        try:
            notice_of_appeal = NoticeOfAppeal.objects.get(id=notice_of_appeal_id, user_id=uid)
            
            response_data = create_response(notice_of_appeal)

        except NoticeOfAppeal.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        notice_of_appeals = NoticeOfAppeal.objects.filter(user_id=uid)
        response_data = list()
        for notice_of_appeal in notice_of_appeals:
            response_data.append(create_response(notice_of_appeal))
       
    return helpers.serialize_object(response_data)


       
def modify_form(notice_of_appeal_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    notice_of_appeal_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    notice_of_appeal = NoticeOfAppeal.objects.update_or_create(
        defaults=notice_of_appeal_body,
        id=notice_of_appeal_id,
        user_id=uid
    )[0] 
    notice_of_appeal_id = notice_of_appeal.id

    return {"file_id": notice_of_appeal_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

