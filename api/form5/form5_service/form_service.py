import json
from django.conf import settings
import datetime
from zeep import helpers
from django.utils import timezone

import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from form5.models import NoticeOfHearing




def create_response(notice):

    data_dec = settings.ENCRYPTOR.decrypt(notice.key_id, notice.data)
    notice_data = json.loads(data_dec)
    return {
        "id": notice.id,
        "type": notice.type,  
        "status":notice.status,              
        "modified": notice.modified,                
        "pdf_types": notice.pdf_types,
        "description": notice.description,            
        "packageNumber": notice.package_number,
        "packageUrl": notice.package_url, 
        "data": notice_data,               
    }



def get_form(notice_id, uid):

    if notice_id:
        try:
            notice = NoticeOfHearing.objects.get(id=notice_id, user_id=uid)
            
            response_data = create_response(notice)

        except NoticeOfHearing.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        notices = NoticeOfHearing.objects.filter(user_id=uid)
        response_data = list()
        for notice in notices:
            response_data.append(create_response(notice))
       
    return helpers.serialize_object(response_data)


       
def modify_form(notice_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    hearing_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    notice = NoticeOfHearing.objects.update_or_create(
        defaults=hearing_body,
        id=notice_id,
        user_id=uid
    )[0] 
    notice_id = notice.id

    return {"file_id": notice_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

