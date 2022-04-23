import logging

from zeep import helpers

from django.http import (
    HttpResponseNotFound
)

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from csows.csows_service.csows_file_orders import FileOrders

logger = logging.getLogger(__name__)



class FileOrdersView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.file_orders = FileOrders()
   

    def get(self, request, fileId):
           
        file_orders = self.file_orders.get_file_orders(fileId, request.user.account_id, request.user.client_id)
        
        if file_orders is not None:
            return Response(helpers.serialize_object(file_orders))
        else:
            return HttpResponseNotFound()       


                