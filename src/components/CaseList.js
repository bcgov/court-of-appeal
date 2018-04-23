import React from 'react';
import update from 'immutability-helper';
import DefaultService from "../service/default.service";
import Form2DataSection from "./Form2DataSection"

class CaseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            selectedDocumentId: '',
            selectedDocument: {
                formSevenNumber: '',
                appellant: {
                    name: '',
                    address: ''
                },
                respondent: {
                    name: '',
                    address: '',
                    email: '',
                    phone: '',
                    serviceFiler: '',
                    useServiceEmail: false
                }
            }
        };
        this.service = this.props.service;
        this.updateForm2 = this.updateForm2.bind(this);
        this.hideShowEmail = this.hideShowEmail.bind(this);
        this.fieldChanged = this.fieldChanged.bind(this);
    }

    componentDidMount() {
        let window = this.element.ownerDocument.defaultView;
        console.log("Did mount CaseList window is null: ", this.props.window);

        if (this.service === null || this.service === undefined) {
            this.service = new DefaultService(window);
        }

    }

    fieldChanged(e) {
        let keys = e.target.name.split(".");
        debugger;
        switch (keys[1]) {
            case 'name' :
                this.setState(update(this.state, {selectedDocument: {respondent: {name: {$set: e.target.value}}}}));
                break;
            case 'address' :
                this.setState(update(this.state, {selectedDocument: {respondent: {address: {$set: e.target.value}}}}));
                break;
            case 'useServiceEmail' :
                this.setState(update(this.state, {selectedDocument: {respondent: {useServiceEmail: {$set: e.target.checked}}}}));
                break;
            case 'email' :
                this.setState(update(this.state, {selectedDocument: {respondent: {email: {$set: e.target.value}}}}));
                break;
            case 'phone' :
                this.setState(update(this.state, {selectedDocument: {respondent: {phone: {$set: e.target.value}}}}));
                break;
            case 'serviceFiler' :
                this.setState(update(this.state, {selectedDocument: {respondent: {serviceFiler: {$set: e.target.value}}}}));
                break;
            default :
                return;
        }
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
                                        <i className="fas fa-pencil-alt"/></button>
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
                        <Form2DataSection
                            closeEditModal={this.closeEditModal.bind(this)}
                            show={this.state.editMode}
                            fieldChanged={this.fieldChanged}
                            className="case-list-modal"
                            renderer="CaseList"
                            data={this.state.selectedDocument}
                            hideShowEmail={this.hideShowEmail}
                            updateForm2={this.updateForm2}
                        />
                    </div>
                </div>
            </div>
        );
    }

    updateForm2() {
        debugger;
        this.service.updateForm2(
            this.state.selectedDocument, this.state.selectedDocumentId,
            (data) => {
                if (data !== undefined) {
                    this.setState({
                        displaySaveSuccess: true
                    });
                } else {
                    this.setState({
                        displaySaveError: true
                    });
                }
            });
        this.closeEditModal();
    }

    hideShowEmail(e) {
        debugger;
        let state = update(this.state, {selectedDocument: {respondent: {useServiceEmail: {$set: e.target.checked}}}});
        this.setState(state);
    }

    openEditModal(data, id) {
        debugger;
        this.setState({selectedDocument: data, editMode: true, selectedDocumentId: id});
    }

    closeEditModal() {
        this.setState({editMode: false});

    }
}

export default CaseList;