import React from 'react';
import Form2DataSection from "./Form2DataSection";
import FormButtonBar from "./FormButtonBar";
import Form2Preview from "./Form2Preview";
import CaseList from './CaseList.js';

class MultiSelectionCaseList extends CaseList {

    toggleSelection(item) {        
        this.props.toggleSelected(item.id);
    }

    render() {
        return (
            <div id="case-list" ref={ (element)=> {this.element = element} } onClick={this.handleClickOffForm.bind(this)}>
                <table id="my-cases" className="not-printable" >
                    <thead>
                    <tr className="header">
                        <td></td>
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
                                <td><input type="checkbox" value={item.id} checked={item.checked} onChange={this.toggleSelection.bind(this, item)} /></td>
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
                    <div className="modal-title green">
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
                    <div className="modal-title green not-printable">
                        <span id="close-modal" onClick={this.closeEditModal.bind(this)}>&times;</span>
                        Preview Form 2
                    </div>
                    <div className="modal-content">
                        <div className="form-section" style={{display: this.props.displayData}}>
                            <Form2Preview
                                closeForm={this.backToEdit}
                                show={this.state.previewMode}
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
}

export default MultiSelectionCaseList;