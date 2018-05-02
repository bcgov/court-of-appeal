import React from 'react';
import TextField from "./TextField";
import PostalCodeField from "./PostalCodeField";
import PhoneField from "./PhoneField";

class Form2DataSection extends React.Component {

    render() {
        if (this.props.show) {
            return (
                <div>
                    <div className="form-section" style={{display: this.props.displayData}}>
                        <h2 style={{fontWeight: 'bold'}}>Enter an Appearance (on Behalf
                            of {this.props.data.respondent.name})</h2>
                        <div className="row address-row">
                            <div className="col-lg-2">
                                <div>
                                    Respondent's name:
                                </div>
                            </div>
                            <div className="col-lg-10">
                                <select>
                                    <option>Bob Jones</option>
                                    <option>Celine Dion</option>
                                </select>
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-12">
                            Respondent's mailing address for service: &nbsp;
                                <i className="fa fa-question-circle" aria-hidden="true" title="What is the address where you would like to receive documents?"></i>
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-2 address-label">Address Line 1: </div>
                            <div className="col-lg-10">
                                <div>
                                    <TextField
                                        value={this.props.data ? this.props.data.respondent.address.addressLine1 : ''}
                                        handleFieldChange={this.props.handleFieldChange}
                                        name="respondent.addressLine1"
                                    />
                                    <div className="row address-hint">
                                        Street address, P.O. box, company name, c/o
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-2 address-label">Address Line 2:</div>
                            <div className="col-lg-10">
                                <div>
                                <TextField
                                    value={this.props.data ? this.props.data.respondent.address.addressLine2 : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.addressLine2"
                                />
                                    <div className="row address-hint">
                                        Apartment, suite, unit, building, floor, etc.
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-2 address-label">City: </div>
                            <div className="col-lg-10">
                                <div >
                                <TextField
                                    value={this.props.data ? this.props.data.respondent.address.city : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.city"
                                />
                                </div>
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-2 address-label">Province: </div>
                            <div className="col-lg-10">
                                <TextField
                                    value='BC'
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.province"
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-2 address-label">Country:</div>
                            <div className="col-lg-10 ">
                                <TextField
                                    value='Canada'
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.country"
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-2 address-label">Postal code:</div>
                            <div className="col-lg-10 ">
                                <PostalCodeField
                                    value={this.props.data ? this.props.data.respondent.address.postalCode : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.postalCode"
                                />
                            </div>
                        </div>
                        <hr/>
                        <div className="row address-row">
                            <div className="col-lg-2 ">Phone:</div>
                            <div className="col-lg-10 ">
                                <PhoneField
                                    value={this.props.data ? this.props.data.respondent.phone : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.phone"
                                />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-2 ">Email address:</div>
                            <div className="col-lg-10 ">
                                <TextField
                                    value={this.props.data ? this.props.data.respondent.email : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.email"
                                    maxLength={254}
                                />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-6 ">Would you like any documents to be sent / served to you by email?</div>
                            <div className="col-lg-6 " style={{textAlign: 'left'}}>
                               <input
                                   type="checkbox"
                                   onChange={this.props.handleFieldChange}
                                   name="respondent.useServiceEmail"
                                   checked={this.props.data.respondent.useServiceEmail}
                               />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-6 ">Would you like email notifications when a document status changes?</div>
                            <div className="col-lg-6 " style={{textAlign: 'left'}}>
                                <input
                                    type="checkbox"
                                    onChange={this.props.handleFieldChange}
                                    name="respondent.sendNotifications"
                                    checked={this.props.data.respondent.sendNotifications}
                                />
                            </div>
                        </div>

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