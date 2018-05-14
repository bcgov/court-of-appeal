import React from 'react';
import update from 'immutability-helper';
import DefaultService from "../service/default.service";
import Form2DataSection from "./Form2DataSection";
import FormButtonBar from "./FormButtonBar";

class CaseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            previewMode: false,
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
    }

    componentDidMount() {
        let window = this.element.ownerDocument.defaultView;
        if (this.service === null || this.service === undefined) {
            this.service = new DefaultService(window);
        }
    }

    handleFieldChange(e) {
        const keys = e.target.name.split(".");
        const respondents = this.state.selectedDocument.respondents.slice();
        switch (keys[1]) {
            case 'form-seven' :
                this.setState(update(this.state, {formSevenNumber: {$set: e.target.value}}));
                break;
            case 'name' :
                this.setState(update(this.state, {selectedDocument: {selectedRespondentIndex: {$set: e.target.value}}}));
                break;
            case 'addressLine1' :
                respondents[this.state.selectedDocument.selectedRespondentIndex]['address']['addressLine1'] = e.target.value;
                this.setState(update(this.state, {selectedDocument: {respondents: {$set: respondents}}}));
                break;
            case 'addressLine2' :
                respondents[this.state.selectedDocument.selectedRespondentIndex]['address']['addressLine2'] = e.target.value;
                this.setState(update(this.state, {selectedDocument: {respondents: {$set: respondents}}}));
                break;
            case 'city' :
                respondents[this.state.selectedDocument.selectedRespondentIndex]['address']['city'] = e.target.value;
                this.setState(update(this.state, {selectedDocument: {respondents: {$set: respondents}}}));
                break;
            case 'postalCode' :
                respondents[this.state.selectedDocument.selectedRespondentIndex]['address']['postalCode'] = e.target.value;
                this.setState(update(this.state, {selectedDocument: {respondents: {$set: respondents}}}));
                break;
            case 'useServiceEmail' :
                this.setState(update(this.state, {selectedDocument: {useServiceEmail: {$set: e.target.checked}}}));
                break;
            case 'sendNotifications' :
                this.setState(update(this.state, {selectedDocument: {sendNotifications: {$set: e.target.checked}}}));
                break;
            case 'email' :
                this.setState(update(this.state, {selectedDocument: {email: {$set: e.target.value}}}));
                break;
            case 'phone' :
                this.setState(update(this.state, {selectedDocument: {phone: {$set: e.target.value}}}));
                break;
            case 'serviceFiler' :
                this.setState(update(this.state, {selectedDocument: {serviceFiler: {$set: e.target.value}}}));
                break;
            default :
                break;
        }
        this.setState({formHasUnsavedChanges: true});
    }

    render() {
        return (
            <div ref={ (element)=> {this.element = element } }>
                <table id="my-cases">
                    <thead>
                    <tr className="header">
                        <td>Edit</td>
                        <td>File #</td>
                        <td>Parties</td>
                        <td>Status</td>
                        <td>Deadline to File</td>
                        <td>Recently Modified</td>
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
                                <td></td>
                                <td>{item.modified}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <div id="editFormModal" className="modal"
                     style={{display: (this.state.editMode ? 'block' : 'none')}}>
                    <div className="modal-title green">
                        <span id="close-modal" onClick={this.closeEditModal.bind(this)}>&times;</span>
                        Edit Form 2
                    </div>
                    <div className="modal-content">
                        <div className="form-section" style={{display: this.props.displayData}}>
                            <Form2DataSection
                                show={this.state.editMode}
                                handleFieldChange={this.handleFieldChange}
                                className="case-list-modal"
                                renderer="CaseList"
                                data={this.state.selectedDocument}
                            />
                            <FormButtonBar
                                back={this.cancel}
                                save={this.updateForm2}
                                preview={this.preview}
                            />
                        </div>
                    </div>
                </div>

                <div id="viewFormModal" className="modal"
                     style={{display: (this.state.previewMode ? 'block' : 'none')}}>
                    <div className="modal-title green">
                        <span id="close-modal" onClick={this.closeEditModal.bind(this)}>&times;</span>
                        Edit Form 2
                    </div>
                    <div className="modal-content">
                        <div className="form-section" style={{display: this.props.displayData}}>
                            <Form2DataSection
                                closeForm={this.backToEdit}
                                show={this.state.previewMode}
                                readOnly={this.state.previewMode}
                                className="case-list-modal"
                                renderer="CaseList"
                                data={this.state.selectedDocument}
                            />
                            <FormButtonBar
                                back={this.backToEdit}
                                save={this.updateForm2}
                                submit={this.updateForm2}/>
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

    updateForm2() {
        let doc = this.state.selectedDocument;
        let id = this.state.selectedDocumentId;
        this.service.updateForm2(
            this.state.selectedDocument, this.state.selectedDocumentId,
            (data) => {
                if (data !== undefined) {
                    this.setState({
                        displaySaveSuccess: true,
                        formHasUnsavedChanges: false
                    });
                    this.props.updateCases(doc, id);
                } else {
                    this.setState({
                        displaySaveError: true,
                        formHasUnsavedChanges: false
                    });
                }
            });
        this.closeEditModal();
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
        this.setState({editMode: false, previewMode: true});
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
}

export default CaseList;