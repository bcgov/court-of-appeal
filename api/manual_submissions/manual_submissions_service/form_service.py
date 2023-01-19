import json
from django.conf import settings
from zeep import helpers

import logging
LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

from manual_submissions.models import ManualSubmission




def create_response(manual_submission):

    data_dec = settings.ENCRYPTOR.decrypt(manual_submission.key_id, manual_submission.data)
    manual_submission_data = json.loads(data_dec)
    return {
        "id": manual_submission.id,
        "type": manual_submission.type,  
        "status":manual_submission.status,              
        "modified": manual_submission.modified,                
        "pdf_types": manual_submission.pdf_types,
        "description": manual_submission.description,            
        "packageNumber": manual_submission.package_number,
        "packageUrl": manual_submission.package_url, 
        "data": manual_submission_data,               
    }



def get_form(manual_submission_id, uid, submitted=None):

    if manual_submission_id:
        try:
            manual_submission = ManualSubmission.objects.get(id=manual_submission_id, user_id=uid)            
            response_data = create_response(manual_submission)

        except ManualSubmission.DoesNotExist:
            raise Exception("Couldn't find person or form.")
       
    else:
        manual_submissions = ManualSubmission.objects.filter(user_id=uid)
        if submitted:
            manual_submissions = manual_submissions.exclude(status="Draft")
        response_data = list()
        for manual_submission in manual_submissions:
            response_data.append(create_response(manual_submission))
       
    return helpers.serialize_object(response_data)


       
def modify_form(manual_submission_id, body, uid):
        
    (data_key_id, data_enc) = encrypt_data(body["data"])

    description = ""
    if body.get("description"):
        description = body.get("description")

    manual_submission_body = {
        'type':body.get("type"),
        'description':description,
        'status':'Draft',            
        'data': data_enc,
        'key_id':data_key_id,            
        'user_id':uid
    }

    manual_submission = ManualSubmission.objects.update_or_create(
        defaults=manual_submission_body,
        id=manual_submission_id,
        user_id=uid
    )[0] 
    manual_submission_id = manual_submission.id

    return {"file_id": manual_submission_id}
    


def encrypt_data(data):
    try:
        data_bin = json.dumps(data).encode("ascii")
        (data_key_id, data_enc) = settings.ENCRYPTOR.encrypt(data_bin)
        return (data_key_id, data_enc)
    except Exception as ex:
        LOGGER.error("ERROR! %s", ex)

