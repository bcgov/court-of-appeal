import json
import logging

from django.conf import settings
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.utils import timezone

from rest_framework import permissions
from rest_framework import generics

from core.pdf import render as render_pdf, create_zip_download_response, create_download_response
from form17.models import CertificateOfCosts, FormPdf

LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."



class Form17ToPdfView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)



    def get_certificate_of_costs_for_user(self, certificate_of_costs_id, uid):
        try:
            certificate_of_costs = CertificateOfCosts.objects.get(id=certificate_of_costs_id, user_id=uid)
            return certificate_of_costs
        except (CertificateOfCosts.DoesNotExist):
            LOGGER.debug(no_record_found)
            return
 


    def get_pdf_by_certificate_of_costs_id_and_type(self, id, pdf_type):
        try:
            pdf_result = FormPdf.objects.get(certificate_of_costs_id=id, pdf_type=pdf_type)
            return pdf_result
        except (FormPdf.DoesNotExist, CertificateOfCosts.DoesNotExist):
            LOGGER.debug(no_record_found)
            return
    


    def get(self, request, certificate_of_costs_id = None):

        uid = request.user.id

        pdf_type = request.query_params.get("pdf_type")
        if pdf_type is None:
            return HttpResponseBadRequest("Missing pdf_type parameters.")

        certificate_of_costs_ids = request.query_params.getlist("id")                            

        if not certificate_of_costs_ids:        
            certificate_of_costs = self.get_certificate_of_costs_for_user(certificate_of_costs_id, uid)
            if not certificate_of_costs:
                return HttpResponseNotFound(no_record_found)

            prepared_pdf = self.get_pdf_by_certificate_of_costs_id_and_type(certificate_of_costs_id, pdf_type)
            if prepared_pdf is None:
                return HttpResponseNotFound(no_record_found)
                
            pdf_content = settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)
            return create_download_response(pdf_content)
        else :
            pdf_contents = list()
            for certificate_of_costsId in certificate_of_costs_ids:
                certificate_of_costs = self.get_certificate_of_costs_for_user(certificate_of_costsId, uid)
                if not certificate_of_costs:
                    continue

                prepared_pdf = self.get_pdf_by_certificate_of_costs_id_and_type(certificate_of_costsId, pdf_type)
                if prepared_pdf is None:
                    continue

                pdf_contents.append({"id":certificate_of_costsId, "type":pdf_type, "pdf": settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)})
            if not pdf_contents:
                return HttpResponseNotFound(no_record_found)
            return create_zip_download_response(pdf_contents)



    def post(self, request, certificate_of_costs_id):
        html = request.data['html']
        json_data = request.data['json_data']
        
        uid = request.user.id
        certificate_of_costs = self.get_certificate_of_costs_for_user(certificate_of_costs_id, uid)
        if not certificate_of_costs:
            return HttpResponseNotFound(no_record_found)

        name = request.query_params.get("name")
        pdf_type = request.query_params.get("pdf_type")
        version = request.query_params.get("version")
        if None in [name, pdf_type, version]:
            return HttpResponseBadRequest("Missing parameters.")


        try:
            pdf_result = self.get_pdf_by_certificate_of_costs_id_and_type(certificate_of_costs_id, pdf_type)            
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
                    certificate_of_costs=certificate_of_costs,
                    data=pdf_content_enc,
                    json_data=json_enc,
                    key_id=pdf_key_id,
                    pdf_type=pdf_type,
                    version=version,
                )
            pdf_result.save()

            certificate_of_costs.pdf_types = pdf_type
            certificate_of_costs.save()

        except Exception as ex:
            LOGGER.error("ERROR: Pdf generation failed %s", ex)
            raise

        if request.query_params.get("noDownload"):
            return HttpResponse(status=204)
        else:
            return create_download_response(pdf_content)
