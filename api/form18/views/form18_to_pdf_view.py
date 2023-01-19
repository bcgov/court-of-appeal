import json
import logging

from django.conf import settings
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.utils import timezone

from rest_framework import permissions
from rest_framework import generics

from core.pdf import render as render_pdf, create_zip_download_response, create_download_response
from form18.models import ChangeOfAddress, FormPdf

LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."



class Form18ToPdfView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)



    def get_change_of_address_for_user(self, change_of_address_id, uid):
        try:
            change_of_address = ChangeOfAddress.objects.get(id=change_of_address_id, user_id=uid)
            return change_of_address
        except (ChangeOfAddress.DoesNotExist):
            LOGGER.debug(no_record_found)
            return
 


    def get_pdf_by_change_of_address_id_and_type(self, id, pdf_type):
        try:
            pdf_result = FormPdf.objects.get(change_of_address_id=id, pdf_type=pdf_type)
            return pdf_result
        except (FormPdf.DoesNotExist, ChangeOfAddress.DoesNotExist):
            LOGGER.debug(no_record_found)
            return
    


    def get(self, request, change_of_address_id = None):

        uid = request.user.id

        pdf_type = request.query_params.get("pdf_type")
        if pdf_type is None:
            return HttpResponseBadRequest("Missing pdf_type parameters.")

        change_of_address_ids = request.query_params.getlist("id")                            

        if not change_of_address_ids:        
            change_of_address = self.get_change_of_address_for_user(change_of_address_id, uid)
            if not change_of_address:
                return HttpResponseNotFound(no_record_found)

            prepared_pdf = self.get_pdf_by_change_of_address_id_and_type(change_of_address_id, pdf_type)
            if prepared_pdf is None:
                return HttpResponseNotFound(no_record_found)
                
            pdf_content = settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)
            return create_download_response(pdf_content)
        else :
            pdf_contents = list()
            for each_change_of_address_id in change_of_address_ids:
                change_of_address = self.get_change_of_address_for_user(each_change_of_address_id, uid)
                if not change_of_address:
                    continue

                prepared_pdf = self.get_pdf_by_change_of_address_id_and_type(each_change_of_address_id, pdf_type)
                if prepared_pdf is None:
                    continue

                pdf_contents.append({"id":each_change_of_address_id, "type":pdf_type, "pdf": settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)})
            if not pdf_contents:
                return HttpResponseNotFound(no_record_found)
            return create_zip_download_response(pdf_contents)



    def post(self, request, change_of_address_id):
        html = request.data['html']
        json_data = request.data['json_data']
        
        uid = request.user.id
        change_of_address = self.get_change_of_address_for_user(change_of_address_id, uid)
        if not change_of_address:
            return HttpResponseNotFound(no_record_found)

        name = request.query_params.get("name")
        pdf_type = request.query_params.get("pdf_type")
        version = request.query_params.get("version")
        if None in [name, pdf_type, version]:
            return HttpResponseBadRequest("Missing parameters.")


        try:
            pdf_result = self.get_pdf_by_change_of_address_id_and_type(change_of_address_id, pdf_type)            
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
                    change_of_address=change_of_address,
                    data=pdf_content_enc,
                    json_data=json_enc,
                    key_id=pdf_key_id,
                    pdf_type=pdf_type,
                    version=version,
                )
            pdf_result.save()

            change_of_address.pdf_types = pdf_type
            change_of_address.save()

        except Exception as ex:
            LOGGER.error("ERROR: Pdf generation failed %s", ex)
            raise

        if request.query_params.get("noDownload"):
            return HttpResponse(status=204)
        else:
            return create_download_response(pdf_content)
