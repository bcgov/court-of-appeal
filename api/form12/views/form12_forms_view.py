import logging

from django.http import (
    HttpResponseBadRequest,
    HttpResponseNotFound, HttpResponseForbidden
) 

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView

from form12.form12_service.form_service import get_form, modify_form
from form12.models import OrderToVaryOrderOfJustice


LOGGER = logging.getLogger(__name__)


class Form12FormsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)


    def get(self, request, pk=None):
        
        uid = request.user.id
        if not uid:
            return HttpResponseForbidden("Missing user ID")
        
        forms = get_form(pk, uid)
        return Response(forms)




    def put(self, request, pk=None):
        
        uid = request.user.id
        if not uid:
            return HttpResponseForbidden("Missing user ID")        
        if not pk:
             return HttpResponseBadRequest("Missing record ID")
        if not request.data:
            return HttpResponseBadRequest("Missing request body")
        
        body = dict(request.data)
        form_id = modify_form(pk, body, uid)
        return Response(form_id)



    def post(self, request: Request):
        uid = request.user.id
        if not uid:
            return HttpResponseForbidden("Missing user ID")

        if not request.data:
            return HttpResponseBadRequest("Missing request body")
        
        body = dict(request.data)       
        form_id = modify_form(None, body, uid)
        return Response(form_id)
       

    def delete(self, request: Request):

        uid = request.user.id
        if not uid:
            return HttpResponseForbidden("Missing user ID")
        if not request.data:
            return HttpResponseBadRequest("Missing request body")

        body = request.data
        for id in body['ids']:
            order_to_vary_order_of_justice_query = OrderToVaryOrderOfJustice.objects.filter(
                id = id, 
                user_id = uid, 
                package_number = None, 
                package_url = None 
            )
            order_to_vary_order_of_justice_query.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)

#__________________________________________________
