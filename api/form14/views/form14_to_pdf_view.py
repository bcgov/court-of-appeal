import json
import logging

from django.conf import settings
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.utils import timezone

from rest_framework import permissions
from rest_framework import generics

from core.pdf import render as render_pdf, create_zip_download_response, create_download_response
from form14.models import ConsentRemoveInactiveAppeal, FormPdf

LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."



class Form14ToPdfView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)



    def get_consent_remove_inactive_appeal_for_user(self, consent_remove_inactive_appeal_id, uid):
        try:
            consent_remove_inactive_appeal = ConsentRemoveInactiveAppeal.objects.get(id=consent_remove_inactive_appeal_id, user_id=uid)
            return consent_remove_inactive_appeal
        except (ConsentRemoveInactiveAppeal.DoesNotExist):
            LOGGER.debug(no_record_found)
            return
 


    def get_pdf_by_consent_remove_inactive_appeal_id_and_type(self, id, pdf_type):
        try:
            pdf_result = FormPdf.objects.get(consent_remove_inactive_appeal_id=id, pdf_type=pdf_type)
            return pdf_result
        except (FormPdf.DoesNotExist, ConsentRemoveInactiveAppeal.DoesNotExist):
            LOGGER.debug(no_record_found)
            return
    


    def get(self, request, consent_remove_inactive_appeal_id = None):

        uid = request.user.id

        pdf_type = request.query_params.get("pdf_type")
        if pdf_type is None:
            return HttpResponseBadRequest("Missing pdf_type parameters.")

        consent_remove_inactive_appeal_ids = request.query_params.getlist("id")                            

        if not consent_remove_inactive_appeal_ids:        
            consent_remove_inactive_appeal = self.get_consent_remove_inactive_appeal_for_user(consent_remove_inactive_appeal_id, uid)
            if not consent_remove_inactive_appeal:
                return HttpResponseNotFound(no_record_found)

            prepared_pdf = self.get_pdf_by_consent_remove_inactive_appeal_id_and_type(consent_remove_inactive_appeal_id, pdf_type)
            if prepared_pdf is None:
                return HttpResponseNotFound(no_record_found)
                
            pdf_content = settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)
            return create_download_response(pdf_content)
        else :
            pdf_contents = list()
            for consent_remove_inactive_appealId in consent_remove_inactive_appeal_ids:
                consent_remove_inactive_appeal = self.get_consent_remove_inactive_appeal_for_user(consent_remove_inactive_appealId, uid)
                if not consent_remove_inactive_appeal:
                    continue

                prepared_pdf = self.get_pdf_by_consent_remove_inactive_appeal_id_and_type(consent_remove_inactive_appealId, pdf_type)
                if prepared_pdf is None:
                    continue

                pdf_contents.append({"id":consent_remove_inactive_appealId, "type":pdf_type, "pdf": settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)})
            if not pdf_contents:
                return HttpResponseNotFound(no_record_found)
            return create_zip_download_response(pdf_contents)



    def post(self, request, consent_remove_inactive_appeal_id):
        html = request.data['html']
        json_data = request.data['json_data']
        
        uid = request.user.id
        consent_remove_inactive_appeal = self.get_consent_remove_inactive_appeal_for_user(consent_remove_inactive_appeal_id, uid)
        if not consent_remove_inactive_appeal:
            return HttpResponseNotFound(no_record_found)

        name = request.query_params.get("name")
        pdf_type = request.query_params.get("pdf_type")
        version = request.query_params.get("version")
        if None in [name, pdf_type, version]:
            return HttpResponseBadRequest("Missing parameters.")


        try:
            pdf_result = self.get_pdf_by_consent_remove_inactive_appeal_id_and_type(consent_remove_inactive_appeal_id, pdf_type)            
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
                    consent_remove_inactive_appeal=consent_remove_inactive_appeal,
                    data=pdf_content_enc,
                    json_data=json_enc,
                    key_id=pdf_key_id,
                    pdf_type=pdf_type,
                    version=version,
                )
            pdf_result.save()

            consent_remove_inactive_appeal.pdf_types = pdf_type
            consent_remove_inactive_appeal.save()

        except Exception as ex:
            LOGGER.error("ERROR: Pdf generation failed %s", ex)
            raise

        if request.query_params.get("noDownload"):
            return HttpResponse(status=204)
        else:
            return create_download_response(pdf_content)
