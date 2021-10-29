import logging
import json
from django.conf import settings
from django.http import (
    HttpResponseBadRequest,
    HttpResponseNotFound, HttpResponseForbidden
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView


from api.models import Journeymap
from api.utils import get_journeymap_for_user

LOGGER = logging.getLogger(__name__)

class JourneyMapView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def encrypt_steps(self, steps):
        try:
            steps_bin = json.dumps(steps).encode("ascii")
            (steps_key_id, steps_enc) = settings.ENCRYPTOR.encrypt(steps_bin)
            return (steps_key_id, steps_enc)
        except Exception as ex:
            LOGGER.error("ERROR! %s", ex)

    def get(self, request):
        uid = request.user.id
        journey = get_journeymap_for_user(uid)
        if journey is None:
            return Response(None)

        steps_dec = settings.ENCRYPTOR.decrypt(journey.key_id, journey.steps)
        steps = json.loads(steps_dec)
        data = {
            "steps": steps, 
            "version": journey.version
        }
        
        return Response(data)



    def put(self, request: Request):
        uid = request.user.id
        body = request.data
        if not body:
            return HttpResponseBadRequest("Missing request body")
        
        (steps_key_id, steps_enc) = self.encrypt_steps(body["steps"])

        journey = get_journeymap_for_user(uid)
        if not journey:
            db_journey = Journeymap(            
                steps=steps_enc,
                key_id=steps_key_id,
                version=body.get("version"),
                user_id=uid
            )

            db_journey.save()
            return Response("success")
        else:
            journey.steps = steps_enc
            journey.key_id = steps_key_id
            journey.version = body.get("version")
            journey.save()
            return Response("success")
        
        