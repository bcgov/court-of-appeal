import React from 'react';

class Form2Preview extends React.Component {

    constructor(props) {
        super(props);

        this.checked = this.checked.bind(this);
        this.unchecked = this.unchecked.bind(this);
    }

    checked(flag) {
        if (flag) {
            return <i className="fa fa-check"></i>
        }
    }
    unchecked(flag) {
        if (!flag) {
            return <i className="fa fa-times"></i>
        }
    }

    render() {
        if (this.props.show && this.props.data) {
            let selectedRespondent = this.props.data.respondents[this.props.data.selectedRespondentIndex || 0];
            return (
                <div>

                    <div className="form-section" >
                        <div className="row form-heading"><h2>Style of Proceeding (Parties) in Case {this.props.data.formSevenNumber}</h2></div>

                        <table><tbody>
                        <tr>
                            <td style={{ fontWeight:'bold' }}>BETWEEN:</td>
                            <td id="appellant-name">{this.props.data.appellants.map( (appellant, index) => {
                                if (index === this.props.data.appellants.length - 1) {
                                    return appellant.name;
                                } else {
                                    return appellant.name + ', ';
                                }
                            } ) }
                            </td>
                            <td style={{ fontWeight:'bold', paddingLeft:'70px' }}>Appellant{this.props.data.appellants.length > 1 ? 's' : '' }</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight:'bold' }}>AND:</td>
                            <td id="respondent-name" >{this.props.data.respondents.map( (respondent, index) => {
                                if (index === this.props.data.respondents.length - 1) {
                                    return respondent.name;
                                } else {
                                    return respondent.name + ', ';
                                }
                            } ) }
                            </td>
                            <td style={{ fontWeight:'bold', paddingLeft:'70px' }}>Respondent{this.props.data.respondents.length > 1 ? 's' : '' }</td>
                        </tr>
                        </tbody></table>
                    </div>
                    <div className="row address-row">
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                            <div>
                                Respondent's name:
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-6 col-xs-6">
                            { selectedRespondent.name }
                        </div>
                    </div>                        
                        <div className="row address-row">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                                Address for service:
                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-6 col-xs-6">
                                {selectedRespondent.address ? selectedRespondent.address.addressLine1 : ''}
                                &nbsp;
                                {selectedRespondent.address ? selectedRespondent.address.addressLine2 : ''}
                                
                                <br/>
                                {selectedRespondent.address ? selectedRespondent.address.city : ''}
                                , {selectedRespondent.address ? selectedRespondent.address.province : ''}
                                , {selectedRespondent.address ? selectedRespondent.address.postalCode : ''}
                                <br/>CANADA
                            </div>
                        </div>                                                

                        <div className="not-printable">
                            <hr/>
                            <div className="row address-row">
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">Phone:</div>
                                <div className="col-lg-9 col-md-9 col-sm-6 col-xs-6 ">
                                    {this.props.data ? this.props.data.phone : ''}
                                </div>
                            </div>
                            <div className="row address-row">
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">Email address:</div>
                                <div className="col-lg-9 col-md-9 col-sm-6 col-xs-6 ">
                                    {this.props.data ? this.props.data.email : ''}
                                </div>
                            </div>
                            <div className="row address-row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">Would you like any documents to be sent / served to you by email?</div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 " style={{textAlign: 'left'}}>
                                { this.checked(this.props.data.useServiceEmail) }
                                { this.unchecked(this.props.data.useServiceEmail) }
                                </div>
                            </div>
                            <div className="row address-row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">Would you like email notifications when a document status changes?</div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 " style={{textAlign: 'left'}}>
                                    { this.checked(this.props.data.sendNotifications) }
                                    { this.unchecked(this.props.data.sendNotifications) }
                                </div>
                            </div>
                            <hr/>
                        </div>

                        <div className="row address-row">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">Electronically submitted by:</div>
                            <div className="col-lg-9 col-md-9 col-sm-6 col-xs-6 ">
                                {selectedRespondent.name || this.props.data.serviceFiler}
                            </div>
                        </div>
                   </div>

            );
        } else {
            return null;
        }
    }
}

export default Form2Preview;
// note to self:
// back button for modal should close the modal and then open a new modal to confirm