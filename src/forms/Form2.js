import React, { Component } from 'react';
import './Form.css';
import './Form2.css';
import './Form2.print.css';
import Find from './Find.js';
import DefaultService from '../service/default.service.js';
import update from 'immutability-helper';
import Form2DataSection from "../components/Form2DataSection";
import FormButtonBar from "../components/FormButtonBar";
import ProgressStatusBar from "../components/progress/ProgressStatusBar";
let { validateForm2, errorMessage } = require('../utils/AddressUtils');
let { updateDocument } = require('../utils/Form2DocumentUpdate');

class Form2 extends Component {

    constructor(props) {
        super(props);
        this.homePath = props.homePath || (process.env.PUBLIC_URL === "") ? '/' : process.env.PUBLIC_URL;
        this.service = props.service;
        this.state = this.initialState();

        this.found = this.found.bind(this);
        this.createOrUpdate = this.createOrUpdate.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.closeDataLossWarning = this.closeDataLossWarning.bind(this);
        this.acceptDataLoss = this.acceptDataLoss.bind(this);
        this.formHasData = this.formHasData.bind(this);
        this.preview = this.preview.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.selectAllRespondents = this.selectAllRespondents.bind(this);
    }

    initialState(formSevenNumber) {
        this.getUserForm2()
        if (this.props.history && this.props.history.location.state) {
            return this.props.history.location.state;
        }
        return {
            formSevenNumber: formSevenNumber || 'CA',
            document: {
                appellants: [
                    {
                        name: '',
                        address: {
                            addressLine1: '',
                            addressLine2: '',
                            city: '',
                            province: '',
                            postalCode: ''
                        }
                    }
                ],
                respondents: [
                    {
                        name: '',
                        address: {
                            addressLine1: '',
                            addressLine2: '',
                            city: '',
                            province: '',
                            postalCode: ''
                        },
                        selected: false
                    }
                ],
                selectedContactIndex: 0,
                phone: '',
                useServiceEmail: false,
                sendNotifications: false,
                email: ''
            },

            displayData: 'none',
            displayPreview: 'none',
            showForm2: false,
            previewMode: false,
            dataLoss: false,
            displayWarning: 'none',
            formHasUnsavedChanges: false,
            notFoundError: '',
            previewShouldBeDisabled: true,
            submitShouldBeDisabled: true,
            phoneIsValid: true,
            emailIsValid: true,
            postalCodeIsValid: true,
            previewButtonErrorMsg: '',
            id: null,
            previewContent: ''
        };
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
        this.validateForm();
    }

    found(data) {
        if (data) {
            if (!data.error) {
                this.setState({notFoundError: ''});
                const appellants = this.mapIncomingData(data.parties.appellants);
                const respondents = this.selectAllRespondents(this.mapIncomingData(data.parties.respondents));
                if (appellants && respondents) {
                    this.setState(update(this.state, {document: {appellants: {$set: appellants}}}));
                    this.setState(update(this.state, {document: {respondents: {$set: respondents}}}));
                    this.setState({
                        displayData: 'block',
                        showForm2: true
                    }, ()=>{
                        if(this.props.history) this.props.history.replace(this.props.history.location.pathname, this.state)
                    });

                } else {
                    this.setState({notFoundError: 'Something went wrong with the document requested'});
                }
            }
        } else {
            this.setState({notFoundError: 'No such Court of Appeal document found'});
        }
    }

    mapIncomingData(parties) {
        if (parties === undefined) { return undefined; }

        return parties.map((entity, index) => {
            let entityMap = {};
            if (entity.name) {
                entityMap['name'] = entity.name;
            } else if (entity.organization) {
                entityMap['name'] = entity.organization;
            } else if (entity.solicitor) {
                entityMap['name'] = entity.solicitor.name;
            }

            if (entity.solicitor && entity.solicitor.address) {
                entityMap['address'] = entity.solicitor.address;
            } else if (entity.organization && entity.organization.address) {
                entityMap['address'] = entity.organization.address;
            } else if (entity.address) {
                entityMap['address'] = entity.address;
            } else {
                entityMap['address'] = {}
            }

            // when entities are their own object in the db, replace the index with the db id
            entityMap['id'] = index
            return entityMap;
        });
    }

    closeForm() {
        this.props.history.push(process.env.PUBLIC_URL + '/');
    }

    createOrUpdate(event, callback) {
        this.formButtonBar.startSaveSpinner();
        var form = {
            formSevenNumber: this.state.formSevenNumber,
            appellants: this.state.document.appellants,
            respondents: this.state.document.respondents,
            phone: this.state.document.phone,
            email: this.state.document.email,
            useServiceEmail: this.state.document.useServiceEmail,
            sendNotifications: this.state.document.sendNotifications,
            selectedContactIndex: this.state.document.selectedContactIndex,
        };
        if (!this.state.id) {
            this.service.createForm2(form, (id) => {
                this.formButtonBar.stopSaveSpinner();
                if (!id.error) {
                    this.setState({
                        formHasUnsavedChanges: false,
                        id: id
                    }, () => {
                        if(this.props.history) this.props.history.replace(this.props.history.location.pathname, this.state);
                        if (callback) {
                            callback();
                        }
                    });
                }
            });
        }
        else {
            this.service.updateForm2(form, this.state.id, (data) => {
                this.formButtonBar.stopSaveSpinner();
                this.setState({
                    formHasUnsavedChanges: false
                }, () => {
                    if(this.props.history) this.props.history.replace(this.props.history.location.pathname, this.state);
                    if (callback) { callback(); }
                });
            });
        }
    }

    preview(e) {
        this.createOrUpdate(e, ()=>{
            this.service.previewForm(this.state.id, (html)=>{
                if (!html.error) {
                    this.props.history.push({pathname: process.env.PUBLIC_URL + '/preview/form2',state: {
                        formId:this.state.id,
                        previewContent: html
                    }});
                    // this.setState({editMode: false, previewMode: true, displayPreview: 'block', previewContent:html });
                }
            });
        });
    }

    openDataLossWarning() {
        if (!this.formHasData() || !this.state.formHasUnsavedChanges) {
            this.props.history.push(process.env.PUBLIC_URL + '/');
        } else {
            this.setState({ dataLoss : true, displayWarning: 'block'});
        }
    }

    closeDataLossWarning() {
        this.setState({
            dataLoss:false,
            displayWarning: 'none'
        })
    }

    acceptDataLoss() {
        this.closeDataLossWarning();
        this.closeForm();
    }

    handleSearchFieldChange(e) {
        this.setState(update(this.state, { formSevenNumber: { $set: e.target.value.trim() } }));
        this.setState({ notFoundError: '' });
    }

    handleFieldChange(e) {
        let document = updateDocument(this.state.document, e);
        this.setState({ document:document, formHasUnsavedChanges: true }, ()=>{ this.validateForm(); });
    }

    formHasData() {
            let selectedContact = this.state.document.respondents[this.state.document.selectedContactIndex];
            let hasData = selectedContact ?
                (selectedContact.address.addressLine1 !== '') ||
                (selectedContact.address.addressLine2 !== '') ||
                (selectedContact.address.city !== '') ||
                (selectedContact.address.postalCode !== '') ||
                (selectedContact.phone !== '') ||
                (selectedContact.email !== '')
                : false;
            return ( hasData );
    }

    render() {
        return (
          <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>

            <div id="breadcrumbContainer">
                <ol className="breadcrumb">
                    <li>
                        <a id="home" href={this.homePath}>Home</a>
                    </li>
                    <li>
                        <a href="">Notice of Appearance (Form 2)</a>
                    </li>
                </ol>
            </div>

              <ProgressStatusBar
                  activeStep={this.getStep()}
                  steps={["Access","Form 2","Preview","Payment"]}
              />

            <div className="row">
                <div id="main-content" role="main" className="contentPageMainColumn col-sm-12">
                    <div className="form-title not-printable">
                        <h1>NOTICE OF APPEARANCE</h1>
                        Form 2 (RULES 5 (A), 13 (A) AND 17 (A))
                    </div>

                    <div className="form-section not-printable">
                      <h2 style={{ fontWeight:'bold' }}>When Do You Use the Notice of Appearance (Form 2)?</h2>
                      <p>
                        If you have been served a Notice of Appeal (Form 7), and you want to respond,
                        fill out the Notice of Appearance (Form 2).
                        If you do not respond, you will not be included in future court proceedings related to this case,
                        and will not have access to the case documents filed.
                      </p>
                      <p>
                        You have <span style={{ fontWeight:'bold' }}>10 days</span> to serve a filed copy of the Notice of Appearance
                        to the appellant, after receiving a Notice of Appeal.
                      </p>
                    </div>

                    <Find
                        formSevenNumber={this.state.formSevenNumber}
                        callback={this.found}
                        handleFieldChange={this.handleSearchFieldChange.bind(this)}
                        service={this.service}
                        notFoundError={this.state.notFoundError}
                        startSearching={this.startNewSearch.bind(this)}
                    />
                    <div id="form-data-section" className="form-section" style={{display: this.state.displayData}}>
                        <Form2DataSection
                            show={this.state.showForm2}
                            handleFieldChange={this.handleFieldChange}
                            data={this.state.document}
                            saveForm={this.createOrUpdate}
                            closeForm={this.closeForm}
                            validate={this.validateField}
                        />
                        <FormButtonBar
                            back={this.openDataLossWarning.bind(this)}
                            save={this.createOrUpdate}
                            preview={this.preview}
                            disablePreview={this.state.previewShouldBeDisabled}
                            formErrorMessage={this.state.previewButtonErrorMsg}

                            ref={ (element)=> {this.formButtonBar = element }}
                        />
                    </div>

                    <div id="dataLossWarning" className="modal not-printable"
                         style={{ display:(this.state.displayWarning) }} >
                        <div className="modal-title warning">
                            <span id="close-modal" onClick={this.closeDataLossWarning}>&times;</span>
                            Warning!
                        </div>
                        <div className="modal-content">
                            <div>
                                All changes will be lost!
                            </div>
                            <FormButtonBar
                                continue={this.acceptDataLoss.bind(this)}
                                continueMessage="Continue anyway.  I don't care about the data."
                                back={this.closeDataLossWarning.bind(this)}
                                backMessage="Go back so I can save the form as draft."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
      }

      validateForm() {
            let [valid, validStreetAddress] = validateForm2(this.state.document, this.state);
            this.setState({
                previewShouldBeDisabled: !valid,
                submitShouldBeDisabled: !valid,
                previewButtonErrorMsg: errorMessage(valid, validStreetAddress)
            });
      }

    validateField(isValid, fieldName) {
        let flag = {};
        flag[fieldName + 'IsValid'] = isValid;
        this.setState(flag, ()=> { this.validateForm(); });
    }

    startNewSearch() {
        this.setState(this.initialState(this.state.formSevenNumber));
    }

    /**
     * Select All Respondents by default for a new form 2.
     * @param respondents
     * @returns {*}
     */
    selectAllRespondents(respondents) {
        if (!respondents) return []
        return respondents.map((respondent) => {
           return {
               ...respondent,
               selected: true
           }
        });
    }

    getStep() {
        if (!this.state.showForm2) return 1;
        if (this.state.showForm2 && !this.state.previewMode) return 2;
        else return 3;

    }

    getUserForm2() {
        // to do : get the existing form 2 data for the user
    }
}

export default Form2;
