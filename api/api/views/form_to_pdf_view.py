import json
import logging

from io import BytesIO
from zipfile import ZipFile

from django.conf import settings
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.utils import timezone

from rest_framework import permissions
from rest_framework import generics
from rest_framework.parsers import JSONParser

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
    
    def create_zip_download_response(self, pdf_contents):

        in_memory = BytesIO()
        zip = ZipFile(in_memory, "a")

        for pdf_content in pdf_contents:
            zip.writestr(pdf_content["type"]+"_"+pdf_content["id"]+".pdf", pdf_content["pdf"])        

        for file in zip.filelist:
            file.create_system = 0

        zip.close()

        response = HttpResponse(content_type="application/zip")
        response["Content-Disposition"] = 'attachment; filename="report.zip"'
        in_memory.seek(0)    
        response.write(in_memory.read())
        return response

    def get(self, request, case_id = None):

        user_id = request.user.id

        pdf_type = request.query_params.get("pdf_type")
        if pdf_type is None:
            return HttpResponseBadRequest("Missing pdf_type parameters.")

        case_ids = request.query_params.getlist("id")
                                

        if not case_ids:        
            case = get_case_for_user(case_id, user_id)
            if not case:
                return HttpResponseNotFound(no_record_found)            
            prepared_pdf = self.get_pdf_by_case_id_and_type(case_id, pdf_type)
            if prepared_pdf is None:
                return HttpResponseNotFound(no_record_found)
            pdf_content = settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)
            return self.create_download_response(pdf_content)
        else :
            pdf_contents = list()
            for caseId in case_ids:
                case = get_case_for_user(caseId, user_id)
                if not case:
                    continue
                prepared_pdf = self.get_pdf_by_case_id_and_type(caseId, pdf_type)
                if prepared_pdf is None:
                    continue
                pdf_contents.append({"id":caseId, "type":pdf_type, "pdf": settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)})
            if not pdf_contents:
                return HttpResponseNotFound(no_record_found)
            return self.create_zip_download_response(pdf_contents)

    def post(self, request, case_id):
        html = request.data['html']
        json_data = request.data['json_data']
        user_id = request.user.id
        case = get_case_for_user(case_id, user_id)
        if not case:
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

            case.pdf_types = pdf_type
            case.save()
        except Exception as ex:
            LOGGER.error("ERROR: Pdf generation failed %s", ex)
            raise

        if request.query_params.get("noDownload"):
            return HttpResponse(status=204)
        else:
            return self.create_download_response(pdf_content)
