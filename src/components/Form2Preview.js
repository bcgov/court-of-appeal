import React from 'react';
import './Form2Preview.css';

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
                <div id="form2-preview" className="form-section">
                    <div className="row form-heading">
                        <h2 className="text-center">FORM 2 (RULES 5 (A), 13 (A) AND 17 (A))</h2>
                    </div>
                    <div className="row text-right">
                        <span>Court of Appeal File No. ......</span>
                        <span>{this.props.formSevenNumber}</span>
                    </div>
                    <div className="row text-center">
                        <strong>COURT OF APPEAL</strong>
                    </div>
                    <table width="100%"><tbody>
                    <tr>
                        <td style={{ fontWeight:'bold', verticalAlign:'top' }}>BETWEEN:</td>
                        <td id="appellant-name" className="preview-data">{this.props.data.appellants.map( (appellant, index) => {
                            if (index === this.props.data.appellants.length - 1) {
                                return appellant.name;
                            } else {
                                return appellant.name + ', ';
                            }
                        } ) }
                        </td>
                        <td className="text-right" style={{ fontWeight:'bold', paddingLeft:'70px', verticalAlign:'top' }}>Appellant{this.props.data.appellants.length > 1 ? 's' : '' }</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight:'bold', verticalAlign:'top' }}>AND:</td>
                        <td id="respondent-name" className="preview-data">{this.props.data.respondents.map( (respondent, index) => {
                            if (index === this.props.data.respondents.length - 1) {
                                return respondent.name;
                            } else {
                                return respondent.name + ', ';
                            }
                        } ) }
                        </td>
                        <td className="text-right" style={{ fontWeight:'bold', paddingLeft:'70px', verticalAlign:'top' }}>Respondent{this.props.data.respondents.length > 1 ? 's' : '' }</td>
                    </tr>
                    </tbody></table>
                    <p className="text-center">
                        <strong>NOTICE OF APPEARANCE</strong>
                    </p>
                    <p>
                        Enter an appearance on behalf of
                    </p>
                    <table width="100%"><tbody>
                    <tr>
                        <td>
                            { selectedRespondent.name }
                        </td>
                        <td style={{ whiteSpace:'no-wrap', textAlign:'left', verticalAlign:'top' }}>
                            <i>[Respondent's name]</i>
                        </td>                        
                    </tr>                        
                    <tr>                            
                        <td>
                            {selectedRespondent.address ? selectedRespondent.address.addressLine1 : ''}
                            &nbsp;
                            {selectedRespondent.address ? selectedRespondent.address.addressLine2 : ''}
                            
                            <br/>
                            {selectedRespondent.address ? selectedRespondent.address.city : ''}
                            , {selectedRespondent.address ? selectedRespondent.address.province : ''}
                            , {selectedRespondent.address ? selectedRespondent.address.postalCode : ''}
                            <br/>CANADA
                        </td>
                        <td style={{ whiteSpace:'no-wrap', textAlign:'left', verticalAlign:'top' }}>
                            <i>[Respondent's Address for service]</i>
                        </td>
                    </tr>    
                    </tbody></table>                    

                    <p className="text-right">
                        ............................................................................................................
                        <br/>
                        <i>Respondent/Solicitor for the Respondent</i>
                    </p>
                    <p className="text-right">
                        
                    </p>

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