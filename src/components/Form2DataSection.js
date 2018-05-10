import React from 'react';
import TextField from "./TextField";
import PostalCodeField from "./PostalCodeField";
import PhoneField from "./PhoneField";

class Form2DataSection extends React.Component {

    render() {
        if (this.props.show) {
            return (
                <div>

                    <div className="form-section" >
                        <div className="row form-heading"><h2>Style of Proceeding (Parties) in Case 20160430</h2></div>

                        <table><tbody>
                        <tr>
                            <td style={{ fontWeight:'bold' }}>BETWEEN:</td>
                            <td id="appellant-name">{ this.props.data.appellant.name }</td>
                            <td style={{ fontWeight:'bold', paddingLeft:'70px' }}>Appellant</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight:'bold' }}>AND:</td>
                            <td id="respondent-name" >{ this.props.data.respondent.name }</td>
                            <td style={{ fontWeight:'bold', paddingLeft:'70px' }}>Respondent</td>
                        </tr>
                        </tbody></table>
                    </div>
                        <div className="row address-row">
                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6">
                                <div>
                                    Respondent's name:
                                </div>
                            </div>
                            <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                                <select onChange={this.props.handleFieldChange} name={"respondent.name"}>
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
                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">Address Line 1: </div>
                            <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                                <div>
                                    <TextField
                                        value={this.props.data ? this.props.data.respondent.address.addressLine1 : ''}
                                        handleFieldChange={this.props.handleFieldChange}
                                        name="respondent.addressLine1"
                                        readOnly={this.props.readOnly}
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
                                    value={this.props.data ? this.props.data.respondent.address.addressLine2 : ''}
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
                                    value={this.props.data ? this.props.data.respondent.address.city : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.city"
                                    readOnly={this.props.readOnly}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">Province: </div>
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
                                    value={this.props.data ? this.props.data.respondent.address.postalCode : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.postalCode"
                                    readOnly={this.props.readOnly}
                                />
                            </div>
                        </div>
                        <hr/>
                        <div className="row address-row">
                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 ">Phone:</div>
                            <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                <PhoneField
                                    value={this.props.data ? this.props.data.respondent.phone : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.phone"
                                    readOnly={this.props.readOnly}
                                />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 ">Email address:</div>
                            <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                <TextField
                                    value={this.props.data ? this.props.data.respondent.email : ''}
                                    handleFieldChange={this.props.handleFieldChange}
                                    name="respondent.email"
                                    maxLength={254}
                                    readOnly={this.props.readOnly}
                                />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">Would you like any documents to be sent / served to you by email?</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 " style={{textAlign: 'left'}}>
                               <input
                                   type="checkbox"
                                   onChange={this.props.handleFieldChange}
                                   name="respondent.useServiceEmail"
                                   checked={this.props.data.respondent.useServiceEmail}
                                   disabled={this.props.readOnly}
                               />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">Would you like email notifications when a document status changes?</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 " style={{textAlign: 'left'}}>
                                <input
                                    type="checkbox"
                                    onChange={this.props.handleFieldChange}
                                    name="respondent.sendNotifications"
                                    checked={this.props.data.respondent.sendNotifications}
                                    disabled={this.props.readOnly}
                                />
                            </div>
                        </div>
                        <div className="row address-row">
                            <div className="col-lg-4 col-md-4 col-sm-4 ">Electronically submitted by:</div>
                            <div className="col-lg-8 col-md-8 col-sm-8 ">
                                <input
                                    value={this.props.data.respondent.name || this.props.data.respondent.serviceFiler}
                                    disabled={true}
                                />
                            </div>
                        </div>
                   </div>

            );
        } else {
            return null;
        }
    }
}

export default Form2DataSection;
// note to self:
// back button for modal should close the modal and then open a new modal to confirm