import React, { Component } from 'react';
import './Form.css';
import './Form.2.css';
import Find from './find.js';
import DefaultService from '../service/default.service.js';
import FormRow from '../components/FormRow.js'

class Form2 extends Component {

   //TODO: populate this with any existing data from the server.  So, we may also need a default set of props.
    constructor(props) {
        super(props);
        this.service = props.service;
        this.state = {
            appellant: {
                name: '',
                address: ''
            },
            respondent: {
                name: '',
                address: '',
                useServiceEmail: false,
                email: '',
                serviceFiler: ''
            },
            displayData: 'none',
            displaySaveSuccess: false,
            displaySaveError: false,
            useServiceEmail: false
        };

        this.found = this.found.bind(this);
        this.save = this.save.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
        this.closeSuccessModal = this.closeSuccessModal.bind(this);
        this.hideShowEmail = this.hideShowEmail.bind(this);
    }

    componentDidMount() {
        let window = this.element.ownerDocument.defaultView;
        if (this.service == null) { this.service = new DefaultService(window); }        
        this.address.value = this.state.respondent.address;
    }

    found(data) {
        if (data) {
            this.setState({
                appellant: { name:data.parties.appellant.name, address:data.parties.appellant.address },
                respondent: {name:data.parties.respondent.name, address:data.parties.respondent.address },
                displayData: 'block'
            });
            this.address.value = data.parties.respondent.address;
        } else {
            this.setState({
                appellant: { name:'' },
                respondent: {name:'' },
                displayData: 'none'
            });
            this.address.value = '';
        }
    }

    save() {
        this.service.saveForm2({
                formSevenNumber: this.findComponent.textInput.value,
                appellant: this.state.appellant.name,
                respondent: {
                    name: this.state.respondent.name,
                    address: this.state.respondent.address,
                    useServiceEmail: this.state.useServiceEmail,
                    email: this.state.respondent.email,
                    serviceFiler: this.state.respondent.serviceFiler
                }
            }, (data) => {
            if (data !== undefined) {
                this.setState({
                    displaySaveSuccess: true
                });
            } else {
                this.setState({
                    displaySaveError: true
                });
            }
        });
    }

    closeErrorModal() {
        this.setState({
            displaySaveError: false
        });
    }

    closeSuccessModal() {
        this.setState({
            displaySaveSuccess: false
        });
    }

    hideShowEmail() {
        this.setState({useServiceEmail:!this.state.useServiceEmail});
    }

    render() {
        return (
          <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>

            <div id="breadcrumbContainer">
                <ol className="breadcrumb">

                    <li>
                        <a id="home" href="/">Home</a>
                    </li>
                    <li>
                        <a href="">Notice of Appearance (Form 2)</a>
                    </li>
                </ol>
            </div>
            <div className="row">

                <div id="main-content" role="main" className="contentPageMainColumn col-sm-12">

                    <div id="steps">
                        <ol>
                            <li><span className="step-circle in-progress">1</span><span className="step-title in-progress">Form 2</span></li>
                            <li><span className="step-circle future">2</span><span className="step-title future">Preview</span></li>
                            <li><span className="step-circle future">3</span><span className="step-title future">Payment</span></li>
                        </ol>
                    </div>

                    <div className="form-title">
                        <h1>NOTICE OF APPEARANCE</h1>
                        Form 2 (RULES 5 (A), 13 (A) AND 17 (A))
                    </div>

                    <div className="form-section">
                      <h2 style={{ fontWeight:'bold' }}>When Do You Use the Notice of Appearance (Form 2)?</h2>
                      <p>
                        If you have been served a Notice of Appeal (Form 7), and you want to respond,
                        fill out the Notice of Appearance (Form 2).
                        If you do not respond, you will not be included in future court proceedings related to this case,
                        and will not have access to the case documents filed.
                      </p>
                      <p>
                        You have <span style={{ fontWeight:'bold' }}>10 days</span> to serve a filed copy of the Notice of Appearance
                        to the appellant, after receiving a Notice of Appeal.
                      </p>
                    </div>

                    <Find callback={this.found} ref={(element) => { this.findComponent = element; }} />

                    <div className="form-section" style={{ display:this.state.displayData }}>
                        <h2 style={{ fontWeight:'bold' }}>Style of Proceeding (Parties) in Case 20160430</h2>

                        <table><tbody>
                            <tr>
                                <td style={{ fontWeight:'bold' }}>BETWEEN:</td>
                                <td id="appellant-name">{ this.state.appellant.name }</td>
                                <td style={{ fontWeight:'bold', paddingLeft:'70px' }}>Appellant</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight:'bold' }}>AND:</td>
                                <td id="respondent-name" >{ this.state.respondent.name }</td>
                                <td style={{ fontWeight:'bold', paddingLeft:'70px' }}>Respondent</td>
                            </tr>
                        </tbody></table>
                    </div>

                    <div className="form-section" style={{ display:this.state.displayData }}>
                        <h2 style={{ fontWeight:'bold' }}>Enter an Appearance (on Behalf of)</h2>

                        <table><tbody>
                          <tr>
                            <td>
                                <span style={{ color:'red' }}>*</span>
                                Respondent&apos;s name &nbsp;
                                <i className="fa fa-question-circle" aria-hidden="true" title="Who is responding to the Notice of Appeal?"></i>
                                :
                            </td>
                            <td>
                              <select>
                                  <option>Bob Jones</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td>
                                <span style={{ color:'red' }}>*</span>
                                Respondent&apos;s mailing address for service &nbsp;
                                <i className="fa fa-question-circle" aria-hidden="true" title="Where would you like to receive documents related to this case?"></i>
                                :
                            </td>
                            <td>
                              <input size="40" style={{ backgroundColor:'lightyellow' }} name="respondent-address" ref={(input) => { this.address = input; }} />
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
                            field={<input id="receive-email-checkbox" type="checkbox" onClick={ this.hideShowEmail } />}
                          />
                          <FormRow
                            show={this.state.useServiceEmail}
                            labelText="Respondent's email:"
                            name="respondent-email"
                            inputRef={(input) => { this.email = input; }}
                            id="respondent-email"
                          />
                          <FormRow
                            mandatory={true}
                            labelText="Respondent's phone:"
                            inputRef={(input) => { this.phone = input; }}
                          />
                          <FormRow
                            mandatory={true}
                            labelText="Respondent name (or Solicitor name):"
                            inputRef={(input) => { this.formfiler = input; }}
                            iconText="Who is filing this Notice of Appearance?"
                          />
                        </tbody></table>
                    </div>

                    <button id="save" onClick={this.save} className="btn btn-primary btn-green pull-right"  style={{ display:this.state.displayData }}>Confirm</button>

                    <div id="validationModal" className="modal" ref={(element) => { this.validationModal = element; }}>
                        <div className="modal-title">
                            <span id="close-modal">&times;</span>
                            Form Validation
                        </div>
                        <div className="modal-content">
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="100"
                                    aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}>
                                    <span>100%</span>
                                </div>
                            </div>
                            <table id="validations"><tbody>
                                <tr>
                                    <td className="validation">All required fields filled in</td>
                                    <td><i className="far fa-check-circle"></i></td>
                                </tr>
                                <tr>
                                    <td className="validation">Address for Service is in BC</td>
                                    <td><i className="far fa-check-circle"></i></td>
                                </tr>
                            </tbody></table>
                            <hr/>
                            <div>
                                <span className="success">Your form has been successfully verified. Please proceed to review.</span>
                                <button className="btn btn-primary">Preview Form ></button>
                            </div>
                        </div>
                    </div>

                    <div id="saveErrorModal" className="modal"
                        style={{ display:(this.state.displaySaveError?'block':'none') }} >
                        <div className="modal-title red">
                            <span id="close-modal" onClick={this.closeErrorModal}>&times;</span>
                            Save failed
                        </div>
                        <div className="modal-content">
                            <div>
                                Something unexpected happened.
                            </div>
                        </div>
                    </div>
                    <div id="saveSucessModal" className="modal"
                        style={{ display:(this.state.displaySaveSuccess?'block':'none') }} >
                        <div className="modal-title green">
                            <span id="close-modal" onClick={this.closeSuccessModal}>&times;</span>
                            Saved!
                        </div>
                        <div className="modal-content">
                            <div>
                                Form saved, you can return to dashboard
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
      }
}

export default Form2;
