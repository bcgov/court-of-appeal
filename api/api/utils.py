import json
import random
from string import ascii_lowercase, digits

from api.models import User
from api.models.case import Case
from api.models.journeymap import Journeymap

from django.http import Http404


def generate_random_username(
    length=16, chars=ascii_lowercase + digits, split=4, delimiter="-", prefix=""
):
    username = "".join([random.choice(chars) for i in range(length)])

    if split:
        username = delimiter.join(
            [
                username[start : start + split]
                for start in range(0, len(username), split)
            ]
        )
    username = prefix + username

    try:
        User.objects.get(username=username)
        return generate_random_username(
            length=length, chars=chars, split=split, delimiter=delimiter
        )
    except User.DoesNotExist:
        return username


def get_firstname_lastname(display_name, user_type):
    # Extract first name and last name from a display name
    if user_type == "Internal":
        names = display_name.split(",")
        if len(names) > 1:
            last_name = names[0]
            first_name = names[1].strip().split(" ")[0]

            return first_name, last_name

    names = display_name.split(" ")
    if len(names) > 1:
        last_name = names[1]
        first_name = names[0]

        return first_name, last_name

    if len(names) > 0:
        return names[0], None

    return None, None


def get_case_for_user(pk, uid, includeArchives=False):
    if uid is None:
        raise Http404
    try:
        if pk:
            return Case.objects.get(pk=pk, user_id=uid)
        else:
            if includeArchives:
                return Case.objects.filter(user_id=uid)
            else:
                return Case.objects.filter(user_id=uid, archive=False)

    except Case.DoesNotExist:
        raise Http404

def get_journeymap_for_user(uid):
    if uid is None:
        raise Http404
    try:        
        return Journeymap.objects.get(user_id=uid)
    except Journeymap.DoesNotExist:
        return None


def convert_document_to_multi_part(documents):
    outgoing_files = []
    for document in documents:
        outgoing_files.append(
            (
                "files",
                (
                    document["name"],
                    document["file_data"],
                    "application/pdf",
                ),
            )
        )
    return outgoing_files


def is_valid_json(data):
    if data is None:
        return False
    try:
        json.loads(data)
        return True
    except ValueError:
        return False
