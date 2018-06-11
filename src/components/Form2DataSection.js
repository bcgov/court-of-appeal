import React from 'react';
import ReactTooltip from "react-tooltip";
import TextField from "./TextField";
import PostalCodeField from "./PostalCodeField";
import PhoneField from "./PhoneField";
import EmailField from "./EmailField";

class Form2DataSection extends React.Component {

    render() {
        if (this.props.show && this.props.data) {
            let selectedRespondent = this.props.data.respondents[this.props.data.selectedRespondentIndex || 0];
            return (
                <div>    
                    <div className="row">
                        <h2 style={{ fontWeight:'bold' }}>Style of Proceeding (Parties) in Case {this.props.data.formSevenNumber}</h2>
                        <div className="row  proceeding-style">
                            <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 proceeding-style-col">BETWEEN:</div>

                            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8" id="appellant-name">{this.props.data.appellants.map( (appellant, index) => {
                                if (index === this.props.data.appellants.length - 1) {
                                    return appellant.name;
                                } else {
                                    return appellant.name + ', ';
                                }
                            } ) }
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 proceeding-style-col">Appellant{this.props.data.appellants.length > 1 ? 's' : '' }</div>
                        </div>
                        <div className="row  proceeding-style">
                            <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 proceeding-style-col">AND:</div>

                                <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8" id="respondent-name" >{this.props.data.respondents.map( (respondent, index) => {
                                    if (index === this.props.data.respondents.length - 1) {
                                        return respondent.name;
                                    } else {
                                        return respondent.name + ', ';
                                    }
                                } ) }
                                </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 proceeding-style-col">Respondent{this.props.data.respondents.length > 1 ? 's' : '' }</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row proceeding-style">
                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 respondent-name-label">
                                <div style={{whiteSpace: 'nowrap'}}>
                                    Respondent's name: &nbsp;
                                    <i className="fa fa-question-circle" aria-hidden="true" data-tip="What is the name of the party responding to the appeal?"></i>
                                </div>
                            </div>
                            <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                                <select
                                    className="form-select"
                                    onChange={this.props.handleFieldChange}
                                    name={"respondent.name"}
                                    disabled={this.props.readOnly}
                                    value={this.props.data.selectedRespondentIndex}
                                >
                                    {this.props.data.respondents.map( (respondent, index) => <option key={index} value={index} >{respondent.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row address-row-header">
                            <div className="col-lg-12">
                            Respondent's mailing address for service: &nbsp;
                                <i className="fa fa-question-circle" aria-hidden="true" data-tip="What is the address where you would like to receive documents?"></i>
                            </div>
                        </div>
                    </div>
                    <div className="row address-row">
                        <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">Address Line 1: </div>
                        <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                            <div>
                                <TextField
                                    value={this.props.data ? selectedRespondent.address.addressLine1 : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.addressLine1"
                                    readOnly={this.props.readOnly}
                                    validate={this.props.validate}
                                />
                                <div className="row address-hint">
                                    Street address, P.O. box, company name, c/o
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row address-row">
                        <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">Address Line 2:</div>
                        <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                            <div>
                            <TextField
                                value={this.props.data ? selectedRespondent.address.addressLine2 : ''}
                                handleFieldChange={this.props.handleFieldChange}
                                name="respondent.addressLine2"
                                readOnly={this.props.readOnly}
                            />
                                <div className="row address-hint">
                                    Apartment, suite, unit, building, floor, etc.
                                </div>
                            </div>

                        </div>
                    </div>
                        <div className="row address-row">
                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">City: </div>
                            <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                                <div >
                                <TextField
                                    value={this.props.data ? selectedRespondent.address.city : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.city"
                                    readOnly={this.props.readOnly}
                                    validate={this.props.validate}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">Province: </div>
                            <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                                <TextField
                                    value='British Columbia'
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.province"
                                    readOnly={true}
                                />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">Country:</div>
                            <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                <TextField
                                    value='Canada'
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.country"
                                    readOnly={true}
                                />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">Postal code:</div>
                            <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                <PostalCodeField
                                    value={this.props.data ? selectedRespondent.address.postalCode : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.postalCode"
                                    readOnly={this.props.readOnly}
                                    validate={this.props.validate}
                                />
                            </div>
                        </div>
                        <hr/>
                        <div className="row address-row">
                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">Phone:</div>
                            <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                <PhoneField
                                    value={this.props.data ? this.props.data.phone : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.phone"
                                    readOnly={this.props.readOnly}
                                    validate={this.props.validate}
                                />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">Email address:</div>
                            <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                <EmailField
                                    value={this.props.data ? this.props.data.email : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.email"
                                    maxLength={254}
                                    readOnly={this.props.readOnly}
                                    validate={this.props.validate}
                                />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">Would you like to receive documents electronically?</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 " style={{textAlign: 'left'}}>
                               <input
                                   type="checkbox"
                                   onChange={this.props.handleFieldChange}
                                   name="respondent.useServiceEmail"
                                   checked={this.props.data.useServiceEmail}
                                   disabled={this.props.readOnly}
                               />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">Would you like email notifications when your document status changes?</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 " style={{textAlign: 'left'}}>
                                <input
                                    type="checkbox"
                                    onChange={this.props.handleFieldChange}
                                    name="respondent.sendNotifications"
                                    checked={this.props.data.sendNotifications}
                                    disabled={this.props.readOnly}
                                />
                            </div>
                        </div>
                    <hr/>
                    <ReactTooltip/>
                </div>  
            )
        } else {
            return null;
        }
    }
}

export default Form2DataSection;