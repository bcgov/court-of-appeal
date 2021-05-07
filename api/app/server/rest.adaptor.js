const queryString = require('query-string');
const axios = require('axios');
const fs = require('fs');
let { CreateFormTwo, PreviewForm2, SubmitForm,
    } = require('../features');
let { searchFormSevenResponse, myCasesResponse, createFormTwoResponse,
      updateFormTwoResponse, personInfoResponse,
      archiveCasesResponse, previewForm2Response, createJourneyResponse,
      myJourneyResponse, internalErrorJsonResponse, logErrorAndInternalServerResponse, notFoundResponse, successJsonResponse,  noContentJsonResponse } = require('./responses');
let archiver = require('archiver');

let RestAdaptor = function() {
    this.submitForm = new SubmitForm()
};

RestAdaptor.prototype.useHub = function(hub) {
    this.hub = hub;
    this.submitForm.useHub(hub);
};
RestAdaptor.prototype.useDatabase = function(database) {
    this.database = database;
    this.createFormTwo = new  CreateFormTwo(database);
    this.previewForm2 = new PreviewForm2(database);
    this.submitForm.useDatabase(database);
};
RestAdaptor.prototype.route = function(app, keycloak) {

   // Legacy routes.
   app.post('/api/searchForm7', keycloak.protect(), async (request, response)=> {
        //Need to write database for this search.
        const userId = request.session.userId;
        const ipAddress = request.header('x-real-ip');
        const body = request.body;
        try {
            await this.database.writeAuditCaseSearch(userId, ipAddress, body.file + '|' + body.lastName + '|' + body.firstName + '|' + body.organizationName, 'form7');
        }
        catch (error){
            logErrorAndInternalServerResponse(error, response);
            return;
        }
        this.hub.searchForm7({ 'file': body.file, 'lastName': body.lastName, 'firstName': body.firstName, 'organizationName': body.organizationName, 'searchBy': body.searchBy}, (data)=> {
            searchFormSevenResponse(data, response);
        });
    });

    app.post('/api/forms', keycloak.protect(), (request, response)=> {
        const login = request.session.universalId;
        this.database.savePerson(login, (id)=> {
            if (id.error) {
                createFormTwoResponse(id, response);
            }
            else {
                let params = request.body;
                params.person_id = id;
                this.createFormTwo.now(params, (formId)=> {
                    if (!formId.error) 
                        createFormTwoResponse(formId, response);
                    else 
                        console.log(formId.error);
                });
            }
        });
    });

    app.put('/api/forms/:id', keycloak.protect(), (request, response)=> {
        let data = request.body.data;
        this.database.updateForm({id: request.params.id, type:'form-2', data: data }, (data)=> {
            if (!data.error) 
                updateFormTwoResponse(data, response);
            else 
                console.log(data.error);
        });
    });

    app.get('/api/cases', keycloak.protect(), (request, response)=> {
        const login = request.session.universalId;
        this.database.myCases(login, (data)=> {
            myCasesResponse(data, response);
        });
    });

    app.post('/api/cases/archive', keycloak.protect(), (request, response)=> {
        const userId = request.session.userId;
        let ids = JSON.parse(request.body.ids);
        this.database.archiveCases(userId, ids, (data)=> {
            archiveCasesResponse(data, response);
        });
    });

  app.get('/api/forms/:id/preview', keycloak.protect(), (request, response) => {
        const id = request.params.id;
        const login = request.session.universalId;
        this.previewForm2.now(login, id, (html)=> {
            previewForm2Response(html, response);
        });
    });

    app.get('/api/zip', keycloak.protect(), async (request, response)=>{
        let error;
        var self = this;
        let ids = typeof request.query.id == 'string' ? [request.query.id] : request.query.id;
        var archive = archiver('zip');
        const login = request.session.universalId;
        var doItForEach = (id) => {
            var p = new Promise((resolve, reject)=>{
                self.previewForm2.now(login, id, async (html)=> {
                    if (html.error) {
                        error = html.error;
                        reject(error);
                    }
                    else {
                        try {
                            const name = `form2-${id}.pdf`;
                            let response = await axios.post(
                              `${process.env.PDF_SERVICE_URL}/pdf?filename=${name}`,
                              (data = Buffer.from(html, "utf-8")),
                              { responseType: "arraybuffer" }
                            );
                            archive.append(response.data, { name: name });
                            resolve();
                        }
                        catch (err) {
                            console.error(err);
                            error = { error: {code:503} };
                            reject(error);
                        }
                    }
                });
            });
            return p
        };
        try {
            for (var index=0; index<ids.length; index++) {
                var id = ids[index];
                await doItForEach(id);
            }
            archive.finalize();
            response.setHeader('Content-type', 'application/zip');
            response.attachment('forms.zip');
            archive.pipe(response);
        }
        catch (err2) {
            logErrorAndInternalServerResponse(err2, response);
        }
    });

    app.post('/api/journey', keycloak.protect(), (request, response)=> {
        const login = request.session.universalId;
        this.database.savePerson(login, (data)=> {
            if (data.error) {
                createJourneyResponse(data, response);
            }
            else {
                let params = request.body;
                params.userid = data;
                this.database.createJourney(params, (data)=> {
                    createJourneyResponse(data, response);
                });
            }
        });
    });

    app.put('/api/journey/:id', keycloak.protect(), (request, response)=> {
        request.body.id = request.params.id;
        this.database.updateJourney(request.body, (data)=> {
            createJourneyResponse(data, response);
        });
    });

    app.get('/api/journey', keycloak.protect(), (request, response)=> {
        const login = request.session.universalId;
        this.database.myJourney(login, (data)=> {
            myJourneyResponse(data, response);
        });
    });

    app.get('/api/persons/connected', keycloak.protect(), (request, response, next)=> {
        const login = request.session.universalId;
        let name = request.session.displayName;
        this.database.savePerson(login, (data)=>{
            if (data && !data.error) {
                this.database.personInfo(login, (user)=>{
                    personInfoResponse({
                        error: user.error,
                        login:login,
                        name:name
                    }, response);
                });
            }
            else {
                personInfoResponse(data, response);
            }
        })
    });

    // New routes.
    app.get('/api/forms/:id/submit', keycloak.protect(), async (request, response) => {
        const formId = request.params.id;
        const userId = request.session.userId;
        try {
            let data = await this.database.getEFilingInformation(formId, userId);
            if (data.length === 0)
                notFoundResponse(response);
            else {
                json = JSON.parse(data[0].data)
                result = {
                    packageNumber: data[0].package_number,
                    packageUrl: data[0].package_url,
                    caseNumber: json.formSevenNumber
                }
                successJsonResponse(result, response);
            }
        }
        catch (error) { logErrorAndInternalServerResponse(error, response); }
    });

    app.post('/api/forms/:id/submit', keycloak.protect(), async (request, response) => {
        const id = request.params.id;
        const userId = request.session.userId;
        const login = request.session.universalId;
        try {
            let html = await new Promise((resolve, reject) => {
                this.previewForm2.now(login, id, (html)=> {
                    if (html.error) 
                        reject(html)
                    else 
                        resolve(html);
                });
            });

            const name = `form2-${id}.pdf`;
            let pdfResponse = await axios.post(
                `${process.env.PDF_SERVICE_URL}/pdf?filename=${name}`,
                (data = Buffer.from(html, "utf-8")),
                { responseType: "arraybuffer" }
            );

            let submit = await new Promise((resolve, reject) => { 
                this.submitForm.now(request, login, id, pdfResponse.data, (data, transactionId, submissionId) => {
                    if (data.error) 
                        reject({data, transactionId, submissionId});
                    else 
                        resolve({data,transactionId, submissionId});
                });
            });

            if (submit.data.message === "success") {
                await this.database.createEFilingSubmission(submit.submissionId, submit.transactionId, userId, id);
                noContentJsonResponse(submit.data, response);
            }
            else {
                console.error(`Error submitting formId: ${id}, userId: ${userId}, message: ${submit.data.message}`)
                internalErrorJsonResponse(submit.data, response);
            }
        }
        catch (error) { logErrorAndInternalServerResponse(error, response); }
    });

    app.get('/api/forms/:id/success', keycloak.protect(), async (request, response) => {
        const userId = request.session.userId;
        const formId = request.params.id;
        let data = request.query.packageRef;
        let buff = new Buffer.from(data, 'base64');
        const packageUrl = buff.toString('ascii');
        const parsed = queryString.parse(packageUrl.split("?")[1]);
        const packageNumber = parsed['packageNo'];
        try {
            await this.database.updateEFilingSubmissionUrlAndNumber(formId, userId, packageNumber, packageUrl);
        }
        catch (error) { logErrorAndInternalServerResponse(error, response); }
        response.redirect(`${request.protocol}://${request.headers.host}${process.env.WEB_BASE_HREF}${formId}/submitted/success`);
    });

    app.get('/api/logoff', (request, response) => {
        let redirectUrl = request.query.redirect_url || "/";
        request.session.destroy((err) => {
            response.redirect(`${request.protocol}://${request.headers.host}${process.env.WEB_BASE_HREF}api/logout?redirect_url=${redirectUrl}`);
        })
    });

    app.get('/api/login', keycloak.protect(), (request, response) => {
        let redirectUrl = request.query.redirectUrl || "/";
        const universalId = request.kauth.grant.id_token.content['universal-id'];
        let notBCEID = !universalId;
        if (notBCEID) 
            response.redirect(`${request.protocol}://${request.headers.host}${process.env.WEB_BASE_HREF}api/logout?redirect_url=${redirectUrl}`);
        else 
        {
            this.database.savePerson(universalId, (id) => {
                request.session.universalId = request.kauth.grant.id_token.content['universal-id'];
                request.session.userId = id;
                response.redirect(redirectUrl);
            });
        }
    });

    app.get('/api/health', function (req, res) { res.send(); });
};


module.exports = RestAdaptor;
