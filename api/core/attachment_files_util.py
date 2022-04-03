import hashlib
from core.utils.json_message_response import JsonMessageResponse
from collections import Counter
from numpy import unique
from api.utils import (  
    is_valid_json,
)
from core.pdf import rotate_images_and_convert_pdf



file_byte_size_limit = 1024 * 1024 * 10  # 10 MBytes
allowed_extensions = ["pdf", "jpg", "jpeg", "gif", "png"]




def _file_size_too_large(size):
    return size > file_byte_size_limit


def _invalid_file_extension(file):
    extension = file.name.split(".")[-1]
    return extension.lower() not in allowed_extensions


def _get_validation_errors(request_files, documents):

    total_file_size = 0 
    if not is_valid_json(documents):
        return JsonMessageResponse("Invalid json data for documents.", status=400)
    if len(request_files) > 30:
        return JsonMessageResponse("Too many files.", status=400)
    
    for file in request_files:
        total_file_size = total_file_size + file.size
        if file.size == 0:
            return JsonMessageResponse("One of the files was empty.", status=400)
        if _file_size_too_large(file.size):
            return JsonMessageResponse(
                "Filesize limit exceeded: 10 MB.", status=400
            )
        if _invalid_file_extension(file):
            return JsonMessageResponse("Wrong file format.", status=400)
    

    if _file_size_too_large(total_file_size):
        return JsonMessageResponse(
            "The total Files size limit exceeded: 10 MB.", status=400
        )
    
    return None

def _unique_file_names(request_files):
    file_names =  [file.name.split('.')[0] for file in request_files]
    dup = dict(Counter(file_names))
    l_uniq = unique(file_names)
    unique_names = [key if i == 0 else key + str(i+1) for key in l_uniq for i in range(dup[key])]
    for i, unique_name in enumerate(unique_names):
        request_files[i].name = f"{unique_name}.{request_files[i].name.split('.')[1]}"
    return request_files



def _process_incoming_files_and_documents(incoming_documents, incoming_files, outgoing_documents):    
        
    for incoming_document in incoming_documents:
        if "files" not in incoming_document:
            continue
        
        file_indexes = incoming_document["files"]
        files = [incoming_files[index] for index in file_indexes]

        # 1 PDF and 2 JPG for example, we need to split into 2 PDFs.
        pdf_files = [x for x in files if x.name.endswith(".pdf")]
        image_files = [x for x in files if not x.name.endswith(".pdf")]
        
        for file in pdf_files:
            data = file.read()
            file_name = file.name
            outgoing_documents.append(
                {
                    "type": incoming_document["type"],
                    "name": file_name,
                    "file_data": data,
                    "data": "",
                    "md5": hashlib.md5(data).hexdigest(),
                }
            )
        if len(image_files) > 0:
            rotations = incoming_document["rotations"]
            data = rotate_images_and_convert_pdf(image_files, rotations)
            file_name = f"{image_files[0].name.split('.')[0]}.pdf"
            outgoing_documents.append(
                {
                    "type": incoming_document["type"],
                    "name": file_name,
                    "file_data": data,
                    "data": "",
                    "md5": hashlib.md5(data).hexdigest(),
                }
            )
    return outgoing_documents