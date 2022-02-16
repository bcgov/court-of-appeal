import json
import logging

from django.conf import settings
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.utils import timezone

from rest_framework import permissions
from rest_framework import generics

from core.pdf import render as render_pdf, create_zip_download_response, create_download_response
from form19.models import WithdrawLawyer, FormPdf

LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."



class Form19ToPdfView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)



    def get_withdraw_lawyer_for_user(self, withdraw_lawyer_id, uid):
        try:
            withdraw_lawyer = WithdrawLawyer.objects.get(id=withdraw_lawyer_id, user_id=uid)
            return withdraw_lawyer
        except (WithdrawLawyer.DoesNotExist):
            LOGGER.debug(no_record_found)
            return
 


    def get_pdf_by_withdraw_lawyer_id_and_type(self, id, pdf_type):
        try:
            pdf_result = FormPdf.objects.get(withdraw_lawyer_id=id, pdf_type=pdf_type)
            return pdf_result
        except (FormPdf.DoesNotExist, WithdrawLawyer.DoesNotExist):
            LOGGER.debug(no_record_found)
            return
    


    def get(self, request, withdraw_lawyer_id = None):

        uid = request.user.id

        pdf_type = request.query_params.get("pdf_type")
        if pdf_type is None:
            return HttpResponseBadRequest("Missing pdf_type parameters.")

        withdraw_lawyer_ids = request.query_params.getlist("id")                            

        if not withdraw_lawyer_ids:        
            withdraw_lawyer = self.get_withdraw_lawyer_for_user(withdraw_lawyer_id, uid)
            if not withdraw_lawyer:
                return HttpResponseNotFound(no_record_found)

            prepared_pdf = self.get_pdf_by_withdraw_lawyer_id_and_type(withdraw_lawyer_id, pdf_type)
            if prepared_pdf is None:
                return HttpResponseNotFound(no_record_found)
                
            pdf_content = settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)
            return create_download_response(pdf_content)
        else :
            pdf_contents = list()
            for withdraw_lawyerId in withdraw_lawyer_ids:
                withdraw_lawyer = self.get_withdraw_lawyer_for_user(withdraw_lawyerId, uid)
                if not withdraw_lawyer:
                    continue

                prepared_pdf = self.get_pdf_by_withdraw_lawyer_id_and_type(withdraw_lawyerId, pdf_type)
                if prepared_pdf is None:
                    continue

                pdf_contents.append({"id":withdraw_lawyerId, "type":pdf_type, "pdf": settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)})
            if not pdf_contents:
                return HttpResponseNotFound(no_record_found)
            return create_zip_download_response(pdf_contents)



    def post(self, request, withdraw_lawyer_id):
        html = request.data['html']
        json_data = request.data['json_data']
        
        uid = request.user.id
        withdraw_lawyer = self.get_withdraw_lawyer_for_user(withdraw_lawyer_id, uid)
        if not withdraw_lawyer:
            return HttpResponseNotFound(no_record_found)

        name = request.query_params.get("name")
        pdf_type = request.query_params.get("pdf_type")
        version = request.query_params.get("version")
        if None in [name, pdf_type, version]:
            return HttpResponseBadRequest("Missing parameters.")


        try:
            pdf_result = self.get_pdf_by_withdraw_lawyer_id_and_type(withdraw_lawyer_id, pdf_type)            
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
                    withdraw_lawyer=withdraw_lawyer,
                    data=pdf_content_enc,
                    json_data=json_enc,
                    key_id=pdf_key_id,
                    pdf_type=pdf_type,
                    version=version,
                )
            pdf_result.save()

            withdraw_lawyer.pdf_types = pdf_type
            withdraw_lawyer.save()

        except Exception as ex:
            LOGGER.error("ERROR: Pdf generation failed %s", ex)
            raise

        if request.query_params.get("noDownload"):
            return HttpResponse(status=204)
        else:
            return create_download_response(pdf_content)
