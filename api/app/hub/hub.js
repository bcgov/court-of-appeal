const { default: axios } = require('axios');
const { v4: uuidv4 } = require('uuid');
var { request } = require('http');
var {
    extractParties,
    buildPartyInfo,
    rawAppellants,
    rawRespondents,
    extractCaseType
} = require('./parsing.form7');

const { buildEFilingPackage } = require('./build.efiling');

function Hub(url, timeout) {
    this.url = url;
    this.host = this.extractHost(url)
    this.port = this.extractPort(url)
    this.timeout = timeout;
};

Hub.prototype.extractHost = function(url) {
    var value = url.substring(url.indexOf('://')+3)
    if (value.indexOf(':') != -1) {
        return value.substring(0, value.indexOf(':'))
    }
    if (value.indexOf('/') != -1) {
        return value.substring(0, value.indexOf('/'))
    }
    return value
};

Hub.prototype.extractPort = function(url) {
    var value = url.substring(url.indexOf('://')+3)
    value = value.substring(value.indexOf(':')+1)
    var port = parseInt(value)
    return isNaN(port) ? 80 : port
};

Hub.prototype.submitForm = async function(request, bceidGuid, data, pdf, callback) {
    let efilingData = buildEFilingPackage(request, data, pdf);
    let transactionId = uuidv4();
    let submissionId;
    try {
        let url = `http://${this.host}:${this.port}/efiling/uploadForm2`;
        const document_submit = await axios.post(url, {bceidGuid, transactionId, pdf});
        submissionId = document_submit.data.submissionId;
    } catch (error) {
        console.log(error.message);
    }

    //This is very unlikely to happen, as we're in control of the document generation.
    if (!submissionId) {
        console.log('No submissionId returned from document upload.')
        callback({ error: {code:500, message: 'Error with document upload.'}}, transactionId, null)
        return;
    }

    try {
        const url = `http://${this.host}:${this.port}/efiling/submit`
        const efiling_submit = await axios.post(url, 
            {bceidGuid, transactionId, submissionId, 'data': efilingData});
        const data = efiling_submit.data;
        callback(data, transactionId, submissionId);
    } catch (error) {
        console.log(error);
        callback({ error: {code:500, message: 'Error with submission.'}}, transactionId, submissionId)
    }
};

Hub.prototype.searchForm7 = function(file, callback) {
    var options = {
        method: 'GET',
        host: this.host,
        port: this.port,
        path: '/form7s?caseNumber='+file,
        timeout: this.timeout
    }
    var timedout = false
    var search = request(options, function(response) {
        if (timedout) { return }

        if (response.statusCode === 503) {
            callback({ error: {code:503} });
        }
        else {
            if (response.statusCode === 200) {
                var body = ''
                response.on('data', (chunk) => {
                    body += chunk
                })
                response.on('end', () => {
                    var data = JSON.parse(body);
                    var caseType = extractCaseType(data)
                    if (caseType == 'Criminal') {
                        callback({ error: {code:404, message:'criminal'} });
                    }
                    else {
                        var parties = extractParties(data);
                        if (parties) {
                            let appellants = rawAppellants(parties).map(buildPartyInfo);
                            let respondents = rawRespondents(parties).map(buildPartyInfo);
                            if (!respondents || respondents.length === 0 || !appellants || appellants.length === 0)
                            {
                                console.error(`Bad file: ${file} missing appellants or respondents.`);
                                callback({ error: {code:404} });
                                return;
                            }
                            callback({
                                appellants: appellants,
                                respondents: respondents
                            });
                        }
                        else {
                            callback({ error: {code:404} });
                        }
                    }
                })
            }
            else {
                callback({ error: {code:404} });
            }
        }
    })
    search.on('error', (err)=>{
        callback({ error: {code:503} })
    })
    search.on('timeout', (err)=>{
        timedout = true
        callback({ error: {code:503} })
    })
    search.end()
};

module.exports = Hub;
