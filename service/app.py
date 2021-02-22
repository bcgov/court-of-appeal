import logging
from flask import Flask, request, abort
from waitress import serve
from zeep import helpers
from utils.ches_email import ChesEmail
from utils.efiling_submission import EFilingSubmission
from utils.efiling_packaging import EfilingPackaging
from utils.form7_search import Form7Search

app = Flask(__name__)
logger = logging.getLogger(__name__)

# CSO
@app.route("/form7s")
def form7_search():
    case_number = request.args.get('caseNumber')
    form7_search = Form7Search()
    result = form7_search.execute_search(case_number)
    if (result == 'NOT FOUND'):
        abort(404)
    return helpers.serialize_object(result)


# CHES Email
@app.route("/email", methods=['POST'])
def send_email():
    payload = request.json
    body = payload['body']
    subject = payload['subject']
    recipent_email = payload['recipentEmail']
    attachment = payload['recipentEmail']
    ches_email = ChesEmail()
    ches_email.send_email(body, "html", subject, recipent_email, attachment)
    return 'ok'


# JAG - Efiling Integration
@app.route("/efiling/uploadForm2", methods=['POST'])
def document_upload():
    payload = request.json
    bceid_guid = payload['bceidGuid']
    transaction_id = payload['transactionId']
    pdf_data = payload['pdf']['data']
    files = [("files", ('form2.pdf', "".join(map(chr, pdf_data)), 'application/pdf'))]
    packaging = EfilingPackaging()
    efiling = EFilingSubmission(packaging)
    response = efiling.upload_documents(bceid_guid, transaction_id, files)
    return response


@app.route("/efiling/submit", methods=['POST'])
def submit():
    payload = request.json
    bceid_guid = payload['bceidGuid']
    transaction_id = payload['transactionId']
    submission_id = payload['submissionId']
    data = payload['data']
    packaging = EfilingPackaging()
    efiling = EFilingSubmission(packaging)
    response = efiling.generate_efiling_url(bceid_guid, transaction_id, submission_id, data)
    return response


if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=5000)
