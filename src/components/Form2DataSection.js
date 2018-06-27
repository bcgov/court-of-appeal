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

                            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8" id="appellant-name">{
                                this.props.data.appellants.map( (item) => item.name ).join(', ') 
                                }
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 proceeding-style-col">Appellant{this.props.data.appellants.length > 1 ? 's' : '' }</div>
                        </div>
                        <div className="row  proceeding-style">
                            <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 proceeding-style-col">AND:</div>

                                <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8" id="respondent-name" >{
                                    this.props.data.respondents.map( (item) => item.name ).join(', ') 
                                }
                                </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 proceeding-style-col">Respondent{this.props.data.respondents.length > 1 ? 's' : '' }</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row proceeding-style">
                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 respondent-name-label">
                                <div style={{whiteSpace: 'nowrap'}}>
                                    Respondent's name &nbsp;
                                    <i className="fa fa-question-circle" aria-hidden="true" data-tip="What is the name of the party responding to the appeal?"></i>
                                </div>
                            </div>
                            <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                                <select id="chosenRespondent"
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
                        <div className="row proceeding-style">
                            <div className="col-lg-12 address-row-header">
                                Mailing address for service &nbsp;
                                <i className="fa fa-question-circle" aria-hidden="true" data-tip="What is the address where you would like to receive documents?"></i>
                            </div>

                            <div className="row address-row">
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                    <span className="mandatory-field">*</span>
                                    Address Line 1  
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                                    <div>
                                        <TextField id="addressLine1"
                                            value={this.props.data && selectedRespondent.address ? selectedRespondent.address.addressLine1 : ''}
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
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">Address Line 2 </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                                    <div>
                                    <TextField id="addressLine2"
                                        value={this.props.data && selectedRespondent.address ? selectedRespondent.address.addressLine2 : ''}
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
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                    <span className="mandatory-field">*</span>
                                    City 
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                                    <div >
                                    <TextField id="city"
                                        value={this.props.data && selectedRespondent.address ? selectedRespondent.address.city : ''}
                                        handleFieldChange={this.props.handleFieldChange}
                                        name="respondent.city"
                                        readOnly={this.props.readOnly}
                                        validate={this.props.validate}
                                    />
                                    </div>
                                </div>
                            </div>
                            <div className="row address-row">
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                    <span className="mandatory-field">*</span>
                                    Province 
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                                    <TextField
                                        value='BC'
                                        handleFieldChange={this.props.handleFieldChange}
                                        name="respondent.province"
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                            <div className="row address-row">
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                    <span className="mandatory-field">*</span>
                                    Country 
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                    <TextField id="country"
                                        value='Canada'
                                        handleFieldChange={this.props.handleFieldChange}
                                        name="respondent.country"
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                            <div className="row address-row">
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                    <span className="mandatory-field">*</span>
                                    Postal code 
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                    <PostalCodeField id="postalCode"
                                        value={this.props.data && selectedRespondent.address ? selectedRespondent.address.postalCode : ''}
                                        handleFieldChange={this.props.handleFieldChange}
                                        name="respondent.postalCode"
                                        readOnly={this.props.readOnly}
                                        validate={this.props.validate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row proceeding-style">
                            <div className="col-lg-12 address-row-header">
                                Contact information                                
                            </div>
                            <div className="row address-row">
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                    <span className="mandatory-field">*</span>
                                    Phone&nbsp;
                                    <i className="fa fa-question-circle" aria-hidden="true" data-tip="The registry may contact you by phone to schedule your appeal"></i>
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                    <PhoneField id="phone"
                                        value={this.props.data ? this.props.data.phone : ''}
                                        handleFieldChange={this.props.handleFieldChange}
                                        name="respondent.phone"
                                        readOnly={this.props.readOnly}
                                        validate={this.props.validate}
                                    />
                                </div>
                            </div>
                            <div className="row address-row">
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                    <span id="emailasterisks" className="mandatory-field" style={{display:this.props.data.useServiceEmail || this.props.data.sendNotifications?'inline-block':'none'}}>*</span>
                                    Email address&nbsp;
                                    <i className="fa fa-question-circle" aria-hidden="true" data-tip="Receive electronic document status change notifications or be served electonically by another party (you need to aggree to this using the checkboxes below)"></i>
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                    <EmailField id="email"
                                        value={this.props.data ? this.props.data.email : ''}
                                        handleFieldChange={this.props.handleFieldChange}
                                        name="respondent.email"
                                        maxLength={254}
                                        readOnly={this.props.readOnly}
                                        validate={this.props.validate}
                                    />
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="row address-row-header">
                            <div className="row address-row">
                                <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 ">I would like to receive email notifications when the status of my document changes</div>
                                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 " style={{textAlign: 'left'}}>
                                    <input id="sendNotifications" ref={(element)=> { this.sendNotificationsCheckbox = element; }}
                                        type="checkbox"
                                        onChange={this.props.handleFieldChange}
                                        name="respondent.sendNotifications"
                                        checked={this.props.data.sendNotifications}
                                        disabled={this.props.readOnly}
                                    />
                                </div>
                            </div>
                            <div className="row address-row">
                                <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 ">I accept to be served documents electronically by another party</div>
                                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 " style={{textAlign: 'left'}}>
                                <input id="useServiceEmail" ref={(element)=> { this.serviceEmailCheckbox = element; }}
                                    type="checkbox"
                                    onChange={this.props.handleFieldChange}
                                    name="respondent.useServiceEmail"
                                    checked={this.props.data.useServiceEmail}
                                    disabled={this.props.readOnly}
                                />
                                </div>
                            </div>                            
                            <hr/>
                            <ReactTooltip/>
                        </div>
                    </div>
                    
                </div>  
            )
        } else {
            return null;
        }
    }
}

export default Form2DataSection;