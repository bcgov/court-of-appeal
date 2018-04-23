import React from 'react';
import DefaultService from "../service/default.service";
import FormRow from "./FormRow";

class Form2DataSection extends React.Component {

    constructor(props) {

        super(props);

        this.service = this.props.service || new DefaultService(undefined);
    }
    componentDidMount() {
        console.log("Mounted the Form2DataSection");
    }

    render() {
        if (this.props.show) {
            console.log("Data section props vs state ", this.props, this.state);
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
                            />
                            <FormRow
                                mandatory={true}
                                labelText="Respondent's mailing address for service "
                                iconText="Where would you like to receive documents related to this case?"
                                onChange={this.props.fieldChanged}
                                name="respondent.address"
                                value={this.props.data ? this.props.data.respondent.address : ''}
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
                            />
                            <FormRow
                                mandatory={true}
                                labelText="Respondent's phone "
                                onChange={this.props.fieldChanged}
                                name="respondent.phone"
                                value={this.props.data ? this.props.data.respondent.phone : ''}
                            />
                            <FormRow
                                mandatory={true}
                                labelText="Respondent name (or Solicitor name) "
                                iconText="Who is filing this Notice of Appearance?"
                                name="respondent.serviceFiler"
                                onChange={this.props.fieldChanged}
                                value={this.props.data ? this.props.data.respondent.serviceFiler : ''}
                            />
                            </tbody>
                        </table>
                    </div>

                    <button id="save" onClick={this.props.updateForm2} className="btn btn-primary btn-green pull-right"
                            style={{display: this.props.displayData}}>Confirm
                    </button>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Form2DataSection;