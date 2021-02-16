from waitress import serve
import email
import logging
from flask import request
from flask import Flask
from zeep import helpers
from utils.efiling_submission import EFilingSubmission
from utils.efiling_packaging import EfilingPackaging
from utils.form7_search import Form7Search

app = Flask(__name__)
LOGGER = logging.getLogger(__name__)

# CSO
@app.route("/form7s")
def form7_search():
    case_number = request.args.get('caseNumber')
    form7_search = Form7Search()
    result = form7_search.execute_search(case_number)
    return helpers.serialize_object(result)


# CHES Email
@app.route("/email")
def send_email():
    body = request.args.get('body')
    subject = request.args.get('subject')
    recipent_email = request.args.get('recipentemail')
    attachment = request.args.get('attachment')
    email.send_email(body, "html", subject, recipent_email, attachment)
    return 'ok'


# JAG - Efiling Integration
@app.route("/efiling/uploadDocuments")
def document_upload():
    bceid_guid = request.args.get('bceid_guid')
    transaction_id = request.args.get('transaction_id')
    files = request.args.get('files')
    packaging = EfilingPackaging()
    efiling = EFilingSubmission(packaging)
    response = efiling.upload_documents(bceid_guid, transaction_id, files)
    return response


@app.route("/efiling/submit")
def submit():
    bceid_guid = request.args.get('bceid_guid')
    transaction_id = request.args.get('transaction_id')
    submission_id = request.args.get('submission_id')
    data = request.args.get('data')
    packaging = EfilingPackaging()
    efiling = EFilingSubmission(packaging)
    response = efiling.generate_efiling_url(bceid_guid, transaction_id, submission_id, data)
    return response


if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=5000)
