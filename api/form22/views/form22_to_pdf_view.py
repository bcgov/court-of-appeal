import json
import logging

from django.conf import settings
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.utils import timezone

from rest_framework import permissions
from rest_framework import generics

from core.pdf import render as render_pdf, create_zip_download_response, create_download_response
from form22.models import OrderNofeesPayable, FormPdf

LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."



class Form22ToPdfView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)



    def get_order_nofees_payable_for_user(self, order_nofees_payable_id, uid):
        try:
            order_nofees_payable = OrderNofeesPayable.objects.get(id=order_nofees_payable_id, user_id=uid)
            return order_nofees_payable
        except (OrderNofeesPayable.DoesNotExist):
            LOGGER.debug(no_record_found)
            return
 


    def get_pdf_by_order_nofees_payable_id_and_type(self, id, pdf_type):
        try:
            pdf_result = FormPdf.objects.get(order_nofees_payable_id=id, pdf_type=pdf_type)
            return pdf_result
        except (FormPdf.DoesNotExist, OrderNofeesPayable.DoesNotExist):
            LOGGER.debug(no_record_found)
            return
    


    def get(self, request, order_nofees_payable_id = None):

        uid = request.user.id

        pdf_type = request.query_params.get("pdf_type")
        if pdf_type is None:
            return HttpResponseBadRequest("Missing pdf_type parameters.")

        order_nofees_payable_ids = request.query_params.getlist("id")                            

        if not order_nofees_payable_ids:        
            order_nofees_payable = self.get_order_nofees_payable_for_user(order_nofees_payable_id, uid)
            if not order_nofees_payable:
                return HttpResponseNotFound(no_record_found)

            prepared_pdf = self.get_pdf_by_order_nofees_payable_id_and_type(order_nofees_payable_id, pdf_type)
            if prepared_pdf is None:
                return HttpResponseNotFound(no_record_found)
                
            pdf_content = settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)
            return create_download_response(pdf_content)
        else :
            pdf_contents = list()
            for order_nofees_payableId in order_nofees_payable_ids:
                order_nofees_payable = self.get_order_nofees_payable_for_user(order_nofees_payableId, uid)
                if not order_nofees_payable:
                    continue

                prepared_pdf = self.get_pdf_by_order_nofees_payable_id_and_type(order_nofees_payableId, pdf_type)
                if prepared_pdf is None:
                    continue

                pdf_contents.append({"id":order_nofees_payableId, "type":pdf_type, "pdf": settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)})
            if not pdf_contents:
                return HttpResponseNotFound(no_record_found)
            return create_zip_download_response(pdf_contents)



    def post(self, request, order_nofees_payable_id):
        html = request.data['html']
        json_data = request.data['json_data']
        
        uid = request.user.id
        order_nofees_payable = self.get_order_nofees_payable_for_user(order_nofees_payable_id, uid)
        if not order_nofees_payable:
            return HttpResponseNotFound(no_record_found)

        name = request.query_params.get("name")
        pdf_type = request.query_params.get("pdf_type")
        version = request.query_params.get("version")
        if None in [name, pdf_type, version]:
            return HttpResponseBadRequest("Missing parameters.")


        try:
            pdf_result = self.get_pdf_by_order_nofees_payable_id_and_type(order_nofees_payable_id, pdf_type)            
            pdf_content = render_pdf(html)
            (pdf_key_id, pdf_content_enc) = settings.ENCRYPTOR.encrypt(pdf_content)
            (pdf_key_id, json_enc) = settings.ENCRYPTOR.encrypt(
                json.dumps(json_data).encode("utf-8")
            )
            if pdf_result:
                pdf_result.data = pdf_content_enc
                pdf_result.json_data = json_enc
                pdf_result.key_id = pdf_key_id
                pdf_result.pdf_type = pdf_type
                pdf_result.version = version
            else:
                pdf_result = FormPdf(
                    order_nofees_payable=order_nofees_payable,
                    data=pdf_content_enc,
                    json_data=json_enc,
                    key_id=pdf_key_id,
                    pdf_type=pdf_type,
                    version=version,
                )
            pdf_result.save()

            order_nofees_payable.pdf_types = pdf_type
            order_nofees_payable.save()

        except Exception as ex:
            LOGGER.error("ERROR: Pdf generation failed %s", ex)
            raise

        if request.query_params.get("noDownload"):
            return HttpResponse(status=204)
        else:
            return create_download_response(pdf_content)
