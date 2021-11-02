import json
import logging

from django.conf import settings
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.utils import timezone

from rest_framework import permissions
from rest_framework import generics

from core.pdf import render as render_pdf
from api.models.case import Case
from api.models.prepared_pdf import PreparedPdf
from api.utils import get_case_for_user

LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

class FormToPdfView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def generate_pdf(self, name, data):
        pdf_content = render_pdf(data)        
        return pdf_content

    def get_pdf_by_case_id_and_type(self, id, pdf_type):
        try:
            pdf_result = PreparedPdf.objects.get(case_id=id, pdf_type=pdf_type)
            return pdf_result
        except (PreparedPdf.DoesNotExist, Case.DoesNotExist):
            LOGGER.debug(no_record_found)
            return

    def create_download_response(self, pdf_content):
        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = 'attachment; filename="report.pdf"'
        response.write(pdf_content)
        return response

    def get(self, request, case_id):
        user_id = request.user.id
        app = get_case_for_user(case_id, user_id)
        if not app:
            return HttpResponseNotFound(no_record_found)
        pdf_type = request.query_params.get("pdf_type")
        if pdf_type is None:
            return HttpResponseBadRequest("Missing parameters.")
        prepared_pdf = self.get_pdf_by_case_id_and_type(case_id, pdf_type)
        if prepared_pdf is None:
            return HttpResponseNotFound(no_record_found)
        pdf_content = settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)
        return self.create_download_response(pdf_content)

    def post(self, request, case_id):
        html = request.data['html']
        json_data = request.data['json_data']
        user_id = request.user.id
        app = get_case_for_user(case_id, user_id)
        if not app:
            return HttpResponseNotFound(no_record_found)

        name = request.query_params.get("name")
        pdf_type = request.query_params.get("pdf_type")
        version = request.query_params.get("version")
        if None in [name, pdf_type, version]:
            return HttpResponseBadRequest("Missing parameters.")

        try:
            pdf_result = self.get_pdf_by_case_id_and_type(case_id, pdf_type)
            pdf_content = self.generate_pdf(name, html)
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
                pdf_result = PreparedPdf(
                    case_id=case_id,
                    data=pdf_content_enc,
                    json_data=json_enc,
                    key_id=pdf_key_id,
                    pdf_type=pdf_type,
                    version=version,
                )
            pdf_result.save()

            # app.last_printed = timezone.now()
            # app.save()
        except Exception as ex:
            LOGGER.error("ERROR: Pdf generation failed %s", ex)
            raise

        if request.query_params.get("noDownload"):
            return HttpResponse(status=204)
        else:
            return self.create_download_response(pdf_content)
