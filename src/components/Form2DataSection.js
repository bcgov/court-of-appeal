import React from 'react';
import FormRow from "./FormRow";
class Form2DataSection extends React.Component {

    render() {
        if (this.props.show) {
            return (
                <div>
                    <div className="form-section" style={{display: this.props.displayData}}>
                        <h2 style={{fontWeight: 'bold'}}>Enter an Appearance (on Behalf
                            of {this.props.data.respondent.name})</h2>
                        <table>
                            <tbody>
                            <FormRow
                                mandatory={true}
                                labelText="Respondent's name "
                                iconText="Who is responding to the Notice of Appeal?"
                                onChange={this.props.fieldChanged}
                                name="respondent.name"
                                field={<select>
                                    <option>Bob Jones</option>
                                </select>}
                                type="dropdown"
                            />
                            <FormRow
                                mandatory={true}
                                labelText="Respondent's mailing address for service "
                                iconText="Where would you like to receive documents related to this case?"
                                onChange={this.props.fieldChanged}
                                name="respondent.address"
                                value={this.props.data ? this.props.data.respondent.address : ''}
                                type="text"
                                placeholder={"Enter valid address for document service"}
                            />
                            <FormRow
                                labelText="Do you wish to use email for service?"
                                id="receive-email-checkbox"
                                field={<input id="receive-email-checkbox" type="checkbox"
                                              onClick={this.props.hideShowEmail}/>}
                            />
                            <FormRow
                                show={this.props.data ? this.props.data.respondent.useServiceEmail : false}
                                labelText="Respondent's email "
                                id="respondent-email"
                                name="respondent.email"
                                onChange={this.props.fieldChanged}
                                value={this.props.data ? this.props.data.respondent.email : ''}
                                type="email"
                                placeholder="Enter a valid email address for notifcations"
                            />
                            <FormRow
                                mandatory={true}
                                labelText="Respondent's phone "
                                onChange={this.props.fieldChanged}
                                name="respondent.phone"
                                value={this.props.data ? this.props.data.respondent.phone : ''}
                                type="phone"
                                placeholder="(###)###-####"
                            />
                            <FormRow
                                mandatory={true}
                                labelText="Respondent name (or Solicitor name) "
                                iconText="Who is filing this Notice of Appearance?"
                                name="respondent.serviceFiler"
                                onChange={this.props.fieldChanged}
                                value={this.props.data ? this.props.data.respondent.serviceFiler : ''}
                                type="text"
                                placeholder="Name of the representative or person filing"
                            />
                            </tbody>
                        </table>

                        <button id="cancel" onClick={this.props.closeForm} className="btn btn-warning"
                                style={{display: this.props.displayData}}>Cancel
                        </button>
                        <button id="save" onClick={this.props.saveForm} className="btn btn-primary pull-right"
                                style={{display: this.props.displayData}}>Confirm
                        </button>

                    </div>

                </div>
            );
        } else {
            return null;
        }
    }
}

export default Form2DataSection;