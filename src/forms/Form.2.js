import React, { Component } from 'react';
import './Form.css';
import './Form.2.css';
import Find from './Find.js';
import DefaultService from '../service/default.service.js';
import update from 'immutability-helper';
import Form2DataSection from "../components/Form2DataSection";
import FormButtonBar from "../components/FormButtonBar";
import Form2Preview from "../components/Form2Preview";

class Form2 extends Component {

    constructor(props) {
        super(props);
        this.service = props.service;
        this.state = {
            formSevenNumber: 'CA',
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
                        }
                    }
                ],
                selectedRespondentIndex: 0,
                phone: '',
                useServiceEmail: false,
                sendNotifications: false,
                email: '',
                serviceFiler: ''
            },

            displayData: 'none',
            displayPreview: 'none',
            showForm2: false,
            previewMode: false,
            displaySaveSuccess: false,
            displaySaveError: false,
            dataLoss: false,
            displayWarning: 'none',
            formHasUnsavedChanges: false,
            notFoundError: ''
        };

        this.found = this.found.bind(this);
        this.create = this.create.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
        this.closeSuccessModal = this.closeSuccessModal.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.closeDataLossWarning = this.closeDataLossWarning.bind(this);
        this.closePreview = this.closePreview.bind(this);
        this.acceptDataLoss = this.acceptDataLoss.bind(this);
        this.formHasData = this.formHasData.bind(this);
        this.preview = this.preview.bind(this);
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
    }

    found(data) {

        if (data) {
            this.setState({notFoundError: ''});
            const appellants = data.parties.appellants.map((appellant) => {
                let appellantMap = {};
                if (appellant.name) {
                    appellantMap['name'] = appellant.name;
                } else if (appellant.organization) {
                    appellantMap['name'] = appellant.organization;
                }
                if (appellant.solicitor) {
                    if (appellant.solicitor.name && !appellantMap.name) {
                        appellantMap['name'] = appellant.solicitor.name;
                    }
                    appellantMap['address'] = appellant.solicitor.address;
                }
                return appellantMap;
            });

            const respondents = data.parties.respondents.map( (respondent) => {
                let respondenttMap = {};
                if (respondent.name) {
                    respondenttMap['name'] = respondent.name;
                } else if (respondent.organization) {
                    respondenttMap['name'] = respondent.organization;
                }
                if (respondent.solicitor) {
                    if (respondent.solicitor.name && !respondenttMap.name) {
                        respondenttMap['name'] = respondent.solicitor.name;
                    }
                    respondenttMap['address'] = respondent.solicitor.address;
                }
                return respondenttMap;
            } );
            if (appellants && respondents) {
                this.setState(update(this.state, { document: { appellants: {$set: appellants} } }));
                this.setState(update(this.state, { document: { respondents: {$set: respondents} } }));
                this.setState({displayData: 'block',
                    showForm2: true
                });
            } else {
                this.setState({notFoundError: 'Something went wrong with the document requested'});
            }
        } else {
            this.setState({notFoundError: 'No such Court of Appeal document found'});
        }
    }

    closeForm() {
        this.props.history.push('/');
    }

    create() {
        let respondent = this.state.document.respondents[this.state.document.selectedRespondentIndex];
        respondent['phone'] = this.state.document.phone;
        respondent['email'] = this.state.document.email;
        respondent['useServiceEmail'] = this.state.document.useServiceEmail;
        respondent['sendNotifications'] =  this.state.document.sendNotifications;
        respondent['serviceFiler'] = this.state.document.serviceFiler;
        // TODO-SP ^^ get update as to how this data should be structured
        this.service.createForm2({
                formSevenNumber: this.state.formSevenNumber,
                appellants: this.state.document.appellants,
                respondents: this.state.document.respondents,
                phone: this.state.document.phone,
                email: this.state.document.email,
                useServiceEmail: this.state.document.useServiceEmail,
                sendNotifications: this.state.document.sendNotifications,
                serviceFiler: this.state.document.serviceFiler
            }, (data) => {
            if (data !== undefined) {
                this.setState({
                    formHasUnsavedChanges: false,
                    displaySaveSuccess: true
                });
            } else {
                this.setState({
                    displaySaveError: true
                });
            }
        });
    }

    closeErrorModal() {
        this.setState({
            displaySaveError: false
        });
    }

    closeSuccessModal() {
        this.setState({
            displaySaveSuccess: false
        });
        this.closePreview();
    }

    preview() {
        this.setState({
            previewMode: true,
            displayPreview: 'block'
        })
    }

    closePreview() {
        this.setState({
            previewMode: false,
            displayPreview: 'none'
        })
    }

    openDataLossWarning() {
        if (!this.formHasData() || !this.state.formHasUnsavedChanges) {
            this.props.history.push('/');
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

    handleFieldChange(e) {
        const keys = e.target.name.split(".");
        const respondents = this.state.document.respondents.slice();
        switch (keys[1]) {
            case 'form-seven' :
                this.setState(update(this.state, { formSevenNumber: { $set: e.target.value } }));
                this.setState({ notFoundError: '' });
                break;
            case 'name' :
                this.setState(update(this.state, { document: { selectedRespondentIndex: { $set: e.target.value } } }));
                break;
            case 'addressLine1' :
                debugger;
                respondents[this.state.document.selectedRespondentIndex]['address']['addressLine1'] = e.target.value;
                this.setState(update(this.state, { document: { respondents: { $set: respondents } } }));
                break;
            case 'addressLine2' :
                respondents[this.state.document.selectedRespondentIndex]['address']['addressLine2'] = e.target.value;
                this.setState(update(this.state, { document: { respondents: { $set: respondents } } }));
                break;
            case 'city' :
                debugger;
                respondents[this.state.document.selectedRespondentIndex]['address']['city'] = e.target.value;
                this.setState(update(this.state, { document: { respondents: { $set: respondents } } }));
                break;
            case 'postalCode' :
                respondents[this.state.document.selectedRespondentIndex]['address']['postalCode'] = e.target.value;
                this.setState(update(this.state, { document: { respondents: { $set: respondents } } }));
                break;
            case 'useServiceEmail' :
                this.setState(update(this.state, { document:  { useServiceEmail: { $set: e.target.checked } }}));
                break;
            case 'sendNotifications' :
                this.setState(update(this.state, { document:  { sendNotifications: { $set: e.target.checked } }}));
                break;
            case 'email' :
                this.setState(update(this.state, { document:  { email: { $set: e.target.value } } }));
                break;
            case 'phone' :
                this.setState(update(this.state, { document:  { phone: { $set: e.target.value } } }));
                break;
            case 'serviceFiler' :
                this.setState(update(this.state, { document: { serviceFiler: { $set: e.target.value } } }));
                break;
            default :
                break;
        }
        this.setState({formHasUnsavedChanges: true});
    }

    formHasData() {
            let respondent = this.state.document.respondents[this.state.document.selectedRespondentIndex];
            let hasData = respondent ?
                (respondent.address.addressLine1 !== '') ||
                (respondent.address.addressLine2 !== '') ||
                (respondent.address.city !== '') ||
                (respondent.address.postalCode !== '') ||
                (respondent.phone !== '') ||
                (respondent.email !== '')
                : false;
            return ( hasData );
    }

    render() {
        return (
          <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>

            <div id="breadcrumbContainer">
                <ol className="breadcrumb">
                    <li>
                        <a id="home" href="/">Home</a>
                    </li>
                    <li>
                        <a href="">Notice of Appearance (Form 2)</a>
                    </li>
                </ol>
            </div>
            <div className="row">
                <div id="main-content" role="main" className="contentPageMainColumn col-sm-12">
                    <div className="form-title">
                        <h1>NOTICE OF APPEARANCE</h1>
                        Form 2 (RULES 5 (A), 13 (A) AND 17 (A))
                    </div>

                    <div className="form-section">
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
                        handleFieldChange={this.handleFieldChange}
                        service={this.service}
                        notFoundError={this.state.notFoundError}
                    />
                    <div className="form-section" style={{display: this.state.displayData}}>
                        <Form2DataSection
                            show={this.state.showForm2}
                            handleFieldChange={this.handleFieldChange}
                            data={this.state.document}
                            saveForm={this.create}
                            closeForm={this.closeForm}
                        />
                        <FormButtonBar
                            back={this.openDataLossWarning.bind(this)}
                            save={this.create}
                            preview={this.preview}
                            formHasData={this.formHasData.bind(this)}
                        />
                    </div>

                    <div id="viewFormModal" className="modal" style={{display: this.state.displayPreview}}>
                        <div className="modal-title green">
                            <span id="close-modal" onClick={this.closeForm}>&times;</span>
                            Preview Form 2
                        </div>
                        <div className="modal-content">
                            <div className="form-section">
                                <Form2Preview
                                    closeForm={this.closeForm}
                                    show={this.state.showForm2}
                                    className="case-list-modal"
                                    data={this.state.document}
                                    handleFieldChange={this.handleFieldChange}
                                />
                                <FormButtonBar
                                    back={this.closePreview.bind(this)}
                                    save={this.create}
                                    submit={this.create}
                                    backMessage="Back to editing"
                                />
                            </div>
                        </div>
                    </div>

                    <div id="validationModal" className="modal" ref={(element) => { this.validationModal = element; }}>
                        <div className="modal-title">
                            <span id="close-modal">&times;</span>
                            Form Validation
                        </div>
                        <div className="modal-content">
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="100"
                                    aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}>
                                    <span>100%</span>
                                </div>
                            </div>
                            <table id="validations"><tbody>
                                <tr>
                                    <td className="validation">All required fields filled in</td>
                                    <td><i className="far fa-check-circle"></i></td>
                                </tr>
                                <tr>
                                    <td className="validation">Address for Service is in British Columbia</td>
                                    <td><i className="far fa-check-circle"></i></td>
                                </tr>
                            </tbody></table>
                            <hr/>
                            <div>
                                <span className="success">Your form has been successfully verified. Please proceed to review.</span>
                                <button className="btn btn-primary">Preview Form ></button>
                            </div>
                        </div>
                    </div>

                    <div id="saveErrorModal" className="modal"
                        style={{ display:(this.state.displaySaveError?'block':'none') }} >
                        <div className="modal-title red">
                            <span id="close-modal" onClick={this.closeErrorModal}>&times;</span>
                            Save failed
                        </div>
                        <div className="modal-content">
                            <div>
                                Something unexpected happened.
                            </div>
                        </div>
                    </div>
                    <div id="saveSucessModal" className="modal"
                        style={{ display:(this.state.displaySaveSuccess?'block':'none') }} >
                        <div className="modal-title green">
                            <span id="close-modal" onClick={this.closeSuccessModal}>&times;</span>
                            Saved!
                        </div>
                        <div className="modal-content">
                            <div>
                                Saved as draft!
                            </div>
                        </div>
                    </div>

                    <div id="dataLossWarning" className="modal"
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
}

export default Form2;
