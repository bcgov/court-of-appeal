import React from 'react';
import update from 'immutability-helper';
import DefaultService from "../service/default.service";
import Form2DataSection from "./Form2DataSection";
import FormButtonBar from "./FormButtonBar";
import Form2Preview from "./Form2Preview";
import {GENERAL_ERROR_MSG, INVALID_ADDRESS_MSG} from "../helpers/constants";
import validateForm2 from "../utils/AddressUtils";

class CaseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            previewMode: false,
            previewContent: '',
            selectedDocumentId: '',
            selectedDocument: {
                formSevenNumber: '',
                appellants: [],
                respondents: [],
                phone: '',
                useServiceEmail: false,
                sendNotifications: false,
                email: '',
                serviceFiler: '',
                selectedRespondentIndex: 0
            },
            dataLoss: false,
            displayWarning: 'none',
            formHasUnsavedChanges: false,
            previewShouldBeDisabled: true,
            submitShouldBeDisabled: true,
            phoneIsValid: true,
            emailIsValid: true,
            postalCodeIsValid: true,
            previewButtonErrorMsg: ''
        };
        this.service = this.props.service;
        this.updateForm2 = this.updateForm2.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.acceptDataLoss = this.acceptDataLoss.bind(this);
        this.closeDataLossWarning = this.closeDataLossWarning.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.cancel = this.cancel.bind(this);
        this.backToEdit = this.backToEdit.bind(this);
        this.preview = this.preview.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    componentDidMount() {

        if (this.service === null || this.service === undefined) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
    }

    handleFieldChange(e) {
        let value = e.target.value;
        const keys = e.target.name.split(".");
        const respondents = this.state.selectedDocument.respondents.slice();
        let address = respondents[this.state.selectedDocument.selectedRespondentIndex].address || {};
        switch (keys[1]) {
            case 'name' :
                this.setState(update(this.state, {selectedDocument: {selectedRespondentIndex: {$set: value}}}),
                    (prevState, props) => { this.validateForm()});
                break;
            case 'addressLine1' :
                address['addressLine1'] = value;
                respondents[this.state.selectedDocument.selectedRespondentIndex].address = address;
                this.setState(update(this.state, {selectedDocument: {respondents: {$set: respondents}}}),
                    (prevState, props) => { this.validateForm()}
                    );
                break;
            case 'addressLine2' :
                address['addressLine2'] = value;
                respondents[this.state.selectedDocument.selectedRespondentIndex].address = address;
                this.setState(update(this.state, {selectedDocument: {respondents: {$set: respondents}}}));
                break;
            case 'city' :
                address['city'] = value;
                respondents[this.state.selectedDocument.selectedRespondentIndex].address = address;
                this.setState(update(this.state, {selectedDocument: {respondents: {$set: respondents}}}),
                    (prevState, props) => { this.validateForm()}
                    );
                break;
            case 'postalCode' :
                address['postalCode'] = value;
                respondents[this.state.selectedDocument.selectedRespondentIndex].address = address;
                this.setState(update(this.state, {selectedDocument: {respondents: {$set: respondents}}}));
                break;
            case 'useServiceEmail' :
                this.setState(update(this.state, { selectedDocument:  { useServiceEmail: { $set: e.target.checked } }}),
                    (prevState, props) => { this.validateForm()} );
                break;
            case 'sendNotifications' :
                this.setState(update(this.state, { selectedDocument:  { sendNotifications: { $set: e.target.checked } }}),
                    (prevState, props) => { this.validateForm()} );
                break;
            case 'email' :
                this.setState(update(this.state, {selectedDocument: {email: {$set: value}}}));
                break;
            case 'phone' :
                this.setState(update(this.state, {selectedDocument: {phone: {$set: value}}}));
                break;
            case 'serviceFiler' :
                this.setState(update(this.state, {selectedDocument: {serviceFiler: {$set: value}}}));
                break;
            default :
                break;
        }
        this.setState({formHasUnsavedChanges: true});
    }

    render() {
        return (
            <div id="case-list" ref={ (element)=> {this.element = element} } onClick={this.handleClickOffForm.bind(this)}>
                <table id="my-cases" className="not-printable" >
                    <thead>
                    <tr className="header">
                        <td>Edit</td>
                        <td>File #</td>
                        <td>Parties</td>
                        <td>Status</td>
                        <td className="text-right">Recently Modified</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.cases.map((item) =>
                            <tr className="case-item" key={item.id}>
                                <td>
                                    <button className="btn" onClick={this.openEditModal.bind(this, item.data, item.id)}>
                                        <i className="fa fa-pencil"/></button>
                                </td>
                                <td>{item.id}</td>
                                <td>{item.parties}</td>
                                <td>{item.status}</td>
                                <td className="text-right">{item.modified}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <div id="editFormModal not-printable" className="modal"
                     style={{display: (this.state.editMode ? 'block' : 'none')}}>
                    <div className=" modal-title ">
                        <span id="close-modal" onClick={this.cancel}>&times;</span>
                        Edit Form 2
                    </div>
                    <div className="modal-content not-printable">
                        <div className="form-section" style={{display: this.props.displayData}}>
                            <Form2DataSection
                                show={this.state.editMode}
                                handleFieldChange={this.handleFieldChange}
                                className="case-list-modal"
                                renderer="CaseList"
                                data={this.state.selectedDocument}
                                validate={this.validateField}
                            />
                            <FormButtonBar
                                back={this.cancel}
                                save={this.updateForm2}
                                preview={this.preview}
                                disablePreview={this.state.previewShouldBeDisabled}
                                formErrorMessage={this.state.previewButtonErrorMsg}

                                ref={ (element)=> {this.formButtonBar = element }}
                            />
                        </div>
                    </div>
                </div>

                <div id="viewFormModal" className="modal"
                     style={{display: (this.state.previewMode ? 'block' : 'none')}}>
                    <div className="modal-title  not-printable">
                        <span id="close-modal" onClick={this.closeEditModal.bind(this)}>&times;</span>
                        Preview Form 2
                    </div>
                    <div className="modal-content">
                        <div className="form-section" style={{display: this.props.displayData}}>
                            <Form2Preview
                                closeForm={this.backToEdit}
                                show={this.state.previewMode}
                                content={this.state.previewContent}
                                className="case-list-modal"
                                data={this.state.selectedDocument}
                                formSevenNumber= {this.state.selectedDocument ? this.state.selectedDocument.formSevenNumber : ''}
                            />
                            <FormButtonBar
                                back={this.backToEdit}
                                printable="yes"
                                backMessage="Back to editing"
                                disableSubmit={this.state.submitShouldBeDisabled}
                            />
                        </div>
                    </div>
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
                            continue={this.acceptDataLoss}
                            continueMessage="Continue anyway.  I don't care about the data."
                            back={this.closeDataLossWarning}
                            backMessage="Go back so I can save the form as draft."
                        />
                    </div>
                </div>
            </div>
        );
    }

    updateForm2(callback) {
        let doc = this.state.selectedDocument;
        let id = this.state.selectedDocumentId;
        this.formButtonBar.startSaveSpinner();
        this.service.updateForm2(
            this.state.selectedDocument, this.state.selectedDocumentId,
            (data) => {     
                this.formButtonBar.stopSaveSpinner();           
                if (data.error) {                    
                    this.setState({
                        formHasUnsavedChanges: false
                    });                    
                } else {
                    this.setState({
                        formHasUnsavedChanges: false
                    });
                    this.props.updateCases(doc, id);                    
                }
                callback(id, data);
            });
    }

    openEditModal(data, id) {
        this.setState({selectedDocument: data, editMode: true, selectedDocumentId: id, selected: data});
    }

    closeEditModal() {
        this.setState({formHasUnsavedChanges: false, selectedDocument: null, editMode: false, previewMode: false, selectedDocumentId: -1});
    }

    /**
     * cancel or back button.
     */
    cancel() {
        if(this.state.formHasUnsavedChanges) {
            this.setState({ dataLoss : true, displayWarning: 'block'});
        } else {
            this.closeEditModal();
        }
    }

    backToEdit() {
        this.setState({editMode: true, previewMode: false});
    }

    preview() {        
        this.updateForm2((id, data)=>{
            if(!data.error) { 
                this.service.previewForm(id, (html)=>{
                    if (!html.error) {
                        this.setState({editMode: false, previewMode: true, previewContent:html });
                    }
                });
            }
        });
    }

    closeDataLossWarning() {
        this.setState({
            dataLoss: false,
            displayWarning: 'none'
        })
    }

    acceptDataLoss() {
        this.closeDataLossWarning();
        this.closeEditModal();
    }


    validateForm() {
        let fields = {
            phoneIsValid: this.state.phoneIsValid,
            postalCodeIsValid: this.state.postalCodeIsValid,
            emailIsValid: this.state.emailIsValid
        };
        let [valid, validStreetAddress] = validateForm2(this.state.selectedDocument, fields);
        if (!validStreetAddress) {
            this.setState({previewButtonErrorMsg: INVALID_ADDRESS_MSG});
        } else if (!valid) {
            this.setState({previewButtonErrorMsg: GENERAL_ERROR_MSG});
        } else {
            this.setState({previewButtonErrorMsg: ""});
        }
        this.setState({previewShouldBeDisabled: !valid, submitShouldBeDisabled: !valid});
    }

    validateField(isValid, fieldName) {
        switch (fieldName) {
            case 'phone':
                this.setState({phoneIsValid: isValid}, () => {
                    this.validateForm();
                });

                break;
            case 'email':
                this.setState({emailIsValid: isValid},() => {
                    this.validateForm();
                });
                break;
            case 'postalCode' :
                this.setState({postalCodeIsValid: isValid}, () => {
                    this.validateForm();
                });
                break;
            default:
                this.validateForm();
                break;
        }
    }

    // Make sure that the user is prompted when they click off the form.
    handleClickOffForm(e) {
        if (!e.target.id) {
            return;
        }
        if (this.state.editMode && e.target.id.includes('editFormModal')) {
            this.cancel();
        }
    }
}

export default CaseList;