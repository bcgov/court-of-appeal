import React from 'react';
import FormRow from './FormRow.js';

class CaseList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false
        };
    }

    render() {
        return (
            <div>
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
                                    <button className="btn" onClick={this.openEditModal.bind(this)}><i
                                        className="fas fa-pencil-alt"/></button>
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
                        <div className="form-section" style={{display: this.state.displayData}}>
                            <h2 style={{fontWeight: 'bold'}}>Enter an Appearance (on Behalf of)</h2>

                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <span style={{color: 'red'}}>*</span>
                                        Respondent&apos;s name &nbsp;
                                        <i className="fa fa-question-circle" aria-hidden="true"
                                           title="Who is responding to the Notice of Appeal?"></i>
                                        :
                                    </td>
                                    <td>
                                        <select>
                                            <option>Bob Jones</option>
                                        </select>
                                    </td>
                                </tr>
                                <FormRow
                                    mandatory={true}
                                    labelText="Respondent's mailing address for service:"
                                    iconText="Where would you like to receive documents related to this case?"
                                />
                                <FormRow
                                    labelText="Do you wish to use email for service?"
                                    id="receive-email-checkbox"
                                    field={<input id="receive-email-checkbox" type="checkbox"
                                                  onClick={this.hideShowEmail}/>}
                                />
                                <FormRow
                                    show={this.state.useServiceEmail}
                                    labelText="Respondent's email:"
                                    name="respondent-email"
                                    inputRef={(input) => {
                                        this.email = input;
                                    }}
                                    id="respondent-email"
                                />
                                <FormRow
                                    mandatory={true}
                                    labelText="Respondent's phone:"
                                    inputRef={(input) => {
                                        this.phone = input;
                                    }}
                                />
                                <FormRow
                                    mandatory={true}
                                    labelText="Respondent name (or Solicitor name):"
                                    inputRef={(input) => {
                                        this.formfiler = input;
                                    }}
                                    iconText="Who is filing this Notice of Appearance?"
                                />
                                </tbody>
                            </table>

                            <button id="cancelModal" onClick={this.closeEditModal.bind(this)} className="btn btn-primary btn-red"
                                    style={{display: this.state.displayData}}>Cancel
                            </button>

                            <button id="saveModal" onClick={this.save.bind(this)}
                                    className="btn btn-primary btn-green pull-right"
                                    style={{display: this.state.displayData}}>Save Draft
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    openEditModal() {
        this.setState({editMode: true});
    }

    closeEditModal() {
        this.setState({editMode: false});

    }

    save() {
        console.log("TODO: save the form in the shared state!!!!");
        this.closeEditModal();
    }
}
export default CaseList;