let { SearchFormSeven, MyCases, CreateFormTwo, SavePerson, UpdateFormTwo,
    ArchiveCases, PreviewForm2, PersonInfo, SaveCustomization, CreateJourney,
    MyJourney, UpdateJourney, SubmitForm, AccountUsers,
    ConnectPerson} = require('../features');
let { searchFormSevenResponse, myCasesResponse, createFormTwoResponse,
      updateFormTwoResponse, savePersonResponse, personInfoResponse,
      archiveCasesResponse, previewForm2Response, createJourneyResponse,
      myJourneyResponse, submitForm2Response, accountUsersResponse } = require('./responses');
let ifNoError = require('./errors.handling');
let pdf = require('html-pdf-node');
let archiver = require('archiver');

let RestAdaptor = function() {
    this.submitForm = new SubmitForm()
    this.connectPerson = new ConnectPerson()
    this.defaultPdfOptions = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox', '--local-url-access=false'] };
};

RestAdaptor.prototype.useHub = function(hub) {
    this.searchFormSeven = new SearchFormSeven(hub);
    this.submitForm.useHub(hub);
    this.accountUsers = new AccountUsers(hub);
    this.connectPerson.useHub(hub);
};
RestAdaptor.prototype.useDatabase = function(database) {
    this.myCases = new MyCases(database);
    this.myJourney = new MyJourney(database);
    this.createFormTwo = new  CreateFormTwo(database);
    this.updateFormTwo = new UpdateFormTwo(database);
    this.savePerson = new SavePerson(database);
    this.archiveCases = new ArchiveCases(database);
    this.previewForm2 = new PreviewForm2(database);
    this.getPersonInfo = new PersonInfo(database);
    this.saveCustomization = new SaveCustomization(database);
    this.createJourney = new CreateJourney(database);
    this.updateJourney = new UpdateJourney(database);

    this.connectPerson.useDatabase(database);
    this.submitForm.useDatabase(database);
};
RestAdaptor.prototype.route = function(app, keycloak) {
    app.get('/api/login', keycloak.protect(), (request, response) => {
        let redirectUrl = request.query.redirectUrl || "/";
        let notBCEID = !request.kauth.grant.id_token.content['universal-id'];
        if (notBCEID) 
            response.redirect(`/api/logout?redirect_url=${redirectUrl}`);
        else 
            response.redirect(redirectUrl);
    });

   app.get('/api/forms', keycloak.protect(), (request, response)=> {
        this.searchFormSeven.now({ file:request.query.file }, (data)=> {
            searchFormSevenResponse(data, response);
        });
    });

    app.post('/api/forms', keycloak.protect(), (request, response)=> {
        let login = request.kauth.grant.id_token.content['universal-id'];
        this.savePerson.now(login, (id)=> {
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
        this.updateFormTwo.now(request.params.id, data, (data)=> {
            if (!data.error) 
                updateFormTwoResponse(data, response);
            else 
                console.log(data.error);
        });
    });

    app.get('/api/cases', keycloak.protect(), (request, response)=> {
        let login = request.kauth.grant.id_token.content['universal-id'];
        this.myCases.now(login, (data)=> {
            myCasesResponse(data, response);
        });
    });

    app.post('/api/persons', keycloak.protect(), (request, response)=> {
        let params = request.body;
        let person = params.data;
        this.savePerson.now(person, (data)=> {
            savePersonResponse(data, response);
        });
    });

    app.post('/api/cases/archive', keycloak.protect(), (request, response)=> {
        let ids = JSON.parse(request.body.ids);
        this.archiveCases.now(ids, (data)=> {
            archiveCasesResponse(data, response);
        });
    });

    app.post('/api/pdf', keycloak.protect(), (request, response) => {
        response.writeHead(200, {'Content-type': 'application/pdf'});
        let params = request.body;
        let html = params.html;
        pdf.generatePdf({ content: html }, this.defaultPdfOptions).then(pdfBuffer => {
            stream.pipe(response);
        })
    });

    app.get('/api/forms/:id/preview', keycloak.protect(), (request, response) => {
        let id = request.params.id;
        let login = request.kauth.grant.id_token.content['universal-id'];
        this.previewForm2.now(login, id, (html)=> {
            previewForm2Response(html, response);
        });
    });

    app.get('/api/zip', keycloak.protect(), async (request, response)=>{
        let error;
        var self = this;
        let ids = typeof request.query.id == 'string' ? [request.query.id] : request.query.id;
        var archive = archiver('zip');
        let login = request.kauth.grant.id_token.content['universal-id'];
        var doItForEach = (id) => {
            var p = new Promise((resolve, reject)=>{
                self.previewForm2.now(login, id, (html)=> {
                    if (html.error) {
                        error = html.error;
                        reject(error);
                    }
                    else {
                        pdf.generatePdf({ content: html }, this.defaultPdfOptions).then(pdfBuffer => {
                            const name = 'form2-' + id + '.pdf';
                            archive.append(pdfBuffer, { name: name });
                            resolve();
                        });
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
        }
        catch (ignored) {}
        finally {
            ifNoError({error:error}, response).then(()=> {
                archive.finalize();
                response.setHeader('Content-type', 'application/zip');
                response.attachment('forms.zip');
                archive.pipe(response);
            });
        }
    });

    app.post('/api/journey', keycloak.protect(), (request, response)=> {
        let login = request.kauth.grant.id_token.content['universal-id'];
        this.savePerson.now(login, (data)=> {
            if (data.error) {
                createJourneyResponse(data, response);
            }
            else {
                let params = request.body;
                params.userid = data;
                this.createJourney.now(params, (data)=> {
                    createJourneyResponse(data, response);

                });
            }
        });
    });

    app.put('/api/journey/:id', keycloak.protect(), (request, response)=> {
        this.updateJourney.now(request.params.id, request.body, (data)=> {
            createJourneyResponse(data, response);
        });
    });

    app.get('/api/journey', keycloak.protect(), (request, response)=> {
        let login = request.kauth.grant.id_token.content['universal-id'];
        this.myJourney.now(login, (data)=> {
            myJourneyResponse(data, response);
        });
    });

    app.post('/api/forms/:id/submit', keycloak.protect(), (request, response) => {
        let bceidGuid = request.kauth.grant.id_token.content['universal-id'];
        let id = request.params.id;
        let login = request.kauth.grant.id_token.content['universal-id'];
        this.previewForm2.now(login, id, (html)=> {
            if (html.error) {
                console.log('preview error', html.error);
                submitForm2Response(html, response);
            }
            else {
                pdf.generatePdf({ content: html }, this.defaultPdfOptions).then(pdfBuffer => {
                    if (err) console.log('pdf creation error', err);
                    this.submitForm.now(request, bceidGuid, id, pdfBuffer, (data, transactionId, submissionId)=>{
                        //Write to DB.  TransactionId, SubmissionId
                        this.submitForm.createSubmission(transactionId, submissionId);
                        submitForm2Response(data, response);
                    })
                });
            }
        });
    });

    app.put('/api/forms/:id/submit', keycloak.protect(), (request, response) => {
        let bceidGuid = request.kauth.grant.id_token.content['universal-id'];
        let id = request.params.id;
        //Ensure package belongs to user. 
        //update packageNumber, packageUrl
    });


    app.get('/api/persons/connected', keycloak.protect(), (request, response, next)=> {
        let login = request.kauth.grant.id_token.content['universal-id'];
        let name = request.kauth.grant.id_token.content.display_name;
        this.connectPerson.now(login, (data)=>{
            if (data && !data.error) {
                this.getPersonInfo.now(login, (user)=>{
                    personInfoResponse({
                        error: user.error,
                        login:login,
                        name:name,
                        customization:user.customization?user.customization:undefined,
                        clientId: user.clientId,
                        accountId: user.accountId
                    }, response);
                });
            }
            else {
                personInfoResponse(data, response);
            }
        })
    });

    app.get('/api/accountusers', keycloak.protect(), (request, response)=> {
        let login = request.kauth.grant.id_token.content['universal-id'];
        this.accountUsers.now(login, (data)=> {
            accountUsersResponse(data, response);
        });
    });
    
    app.get('/api/health', function (req, res) { res.send(); });
};


module.exports = RestAdaptor;
