import React, { Component, Fragment } from 'react';
import ReactTooltip from "react-tooltip";
import ProgressStatusBar from '../../components/progress/ProgressStatusBar';
import '../Form.css';
import './Form2Fill.css';
import DefaultService from "../../service/default.service";
import RespondentListSelect from "../../components/fields/RespondentListSelect";
import ContactSelect from "../../components/fields/ContactSelect";
import SpinnerButton from '../../components/SpinnerButton';
import { standardizeParties } from './standardize.parties'
import validator from 'validator';

class Form2Fill extends Component {

    constructor(props) {
        super(props);
        this.homePath = (process.env.PUBLIC_URL === '') ? '/' : process.env.PUBLIC_URL
        this.service = props.service;
        this.state = props.location && props.location.state ? props.location.state : {};
        if (this.state.serviceInformation === undefined) { this.state.serviceInformation = { province: 'British Columbia', country: 'Canada', selectedContactId: null} }
        if (this.state.useServiceEmail === undefined) { this.state.useServiceEmail = false }
        if (this.state.sendNotifications === undefined) { this.state.sendNotifications = false }

        this.selectedRespondents = this.selectedRespondents.bind(this)
        this.updateSelectedRespondents = this.updateSelectedRespondents.bind(this)
        this.selectAllRespondents = this.selectAllRespondents.bind(this)
        this.updateSelectedContact = this.updateSelectedContact.bind(this)
        this.displaySelected = this.displaySelected.bind(this)
        this.updateServiceInformation = this.updateServiceInformation.bind(this)
        this.updateUseServiceEmail = this.updateUseServiceEmail.bind(this)
        this.updatesendNotifications = this.updatesendNotifications.bind(this)
        this.save = this.save.bind(this)
        this.continue = this.continue.bind(this)
        this.disableSave = this.disableSave.bind(this)
        this.disableContinue = this.disableContinue.bind(this)
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
        this.setState({
            parties: standardizeParties(this.state.parties)
        }, ()=>{
           if (!this.state.parties.respondents.some((respondent) => respondent.responding)) {
                this.selectAllRespondents()
           }
        })
    }

    render() {
        return (
        <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>

            <ProgressStatusBar activeStep={1} steps={["Form 2","Preview","Submit"]} />

            <div className="row section section-gray">
                <div className="col-xs-12">
                    <div className="page-title">Notice of Appearance</div>
                    <div className="page-subtitle">Form 2 (RULES 5 (A), 13(A) AND 17(A))</div>
                </div>
            </div>

            <div className="row section section-white">
                <div className="col-xs-12">
                    <div className="section-title">
                        When Do You Use the Notice of Appearance (Form 2)?
                    </div>
                    <p>
                        If you have been served a Notice of Appeal (Form 7), and you want to respond,
                        fill out the Notice of Appearance (Form 2). If you do not respond,
                        you will not be included in future court proceedings related to this case,
                        and will not have access to the case documents filed.
                    </p>
                    <p>
                        You have 10 days to serve a filed copy of the Notice of Appearance to the appellant,
                        after receiving a Notice of Appeal.
                    </p>
                </div>
            </div>

            <div className="row section section-white">
                <div className="col-xs-12">
                    <div className="section-title">
                        Style of Proceeding (Parties) in Case
                    </div>

                    <div className="row  proceeding-style">
                        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 proceeding-style-col">BETWEEN:</div>

                        <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8" id="appellant-name">{
                            this.state.parties.appellants.map( (item) => item.name ).join(', ')
                            }
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 proceeding-style-col">Appellant{this.state.parties.appellants.length > 1 ? 's' : '' }</div>
                    </div>
                    <div className="row  proceeding-style">
                        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 proceeding-style-col">AND:</div>

                            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8" id="respondent-name" >
                                {this.state.parties.respondents.map( (item) => item.name ).join(', ')}
                            </div>

                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 proceeding-style-col">Respondent{this.state.parties.respondents.length > 1 ? 's' : '' }</div>
                    </div>

                    <div className="row">
                       <div style={{fontWeight: "bolder"}}>
                           Responding: &nbsp;
                           <i className="oi oi-question-mark" aria-hidden="true"
                              data-tip={this.state.parties.respondents.length > 1 ?
                                  'What are the names of the parties responding to the appeal?' :
                                  'What is the name of the party responding to the appeal?'}/>
                      </div>

                   </div>

                   <div className="row proceeding-style">
                      <div className="col-lg-offset-1 col-md-offset-1 col-lg-9 col-md-9 col-sm-8 col-xs-8">
                          <RespondentListSelect
                              selectedRespondents={this.selectedRespondents()}
                              respondents={this.state.parties.respondents}
                              handleFieldChange={this.updateSelectedRespondents}
                              id={"respondent-list"}
                              isMulti={true}
                              name={"form2.respondentList"}
                          />
                      </div>
                   </div>
                   <div className="row">
                        <div style={{fontWeight: "bolder", paddingLeft: '15px'}}>
                          Representation &nbsp;
                        </div>
                        <h4 className="col-lg-12 address-row-header" style={{marginBottom: '0px', fontSize: '14px'}}>
                            Are you self-represented?
                        </h4>
                        <div className="col-lg-offset-1">
                            <div onClick={e => this.setSelfRepresented(true)}>
                                <input type="radio" onChange={() => {}} checked={this.state.selfRepresented === true}/>
                                <label className="noselect" style={{marginLeft: '5px', marginRight: '10px'}} >
                                    Yes
                                </label>
                            </div>
                            <div onClick={e => this.setSelfRepresented(false)}>
                                <input type="radio" onChange={() => {}} checked={this.state.selfRepresented === false}/>
                                <label className="noselect" style={{marginLeft: '5px'}}>
                                    No
                                </label>
                            </div>
                        </div>
                        <br/>
                   </div>
                   { this.state.selfRepresented !== undefined &&
                   <Fragment>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                <div style={{fontWeight: "bolder"}}>
                                Mailing address for service &nbsp;
                                <i className="oi oi-question-mark" aria-hidden="true" data-tip="What is the address where you would like to receive documents?"></i>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 ">
                                <ContactSelect
                                    selectedRespondents={this.selectedRespondents()}
                                    handleFieldChange={this.updateSelectedContact}
                                    id={"respondent-list"}
                                    isMulti={false}
                                    name={"form2.contactList"}
                                    selectedId={this.state.serviceInformation.selectedContactId}
                                />
                            </div>
                        </div>
                        <br/>
                        <br/>
                  </Fragment>
                }
                { this.state.selfRepresented !== undefined && 
                    <div style={{fontWeight: "bolder", paddingLeft: '15px'}}>
                        Service Information &nbsp;
                        <br/>
                    </div>
                }
                <div id="serviceInformation" style={{opacity: this.selectedRespondents().length < 1 ? '.5' : '1'}}>
                    { this.state.selfRepresented === false && 
                        <Fragment>
                            <div className="row">                                
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                    <span className="mandatory-field">*</span>
                                    Counsel's First Name
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                                <div>
                                    <input id="solicitorFirstName"
                                        value={this.displaySelected('counselFirstName')}
                                        onChange={ e => this.updateServiceInformation('counselFirstName', e.target.value) }
                                        />
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                    <span className="mandatory-field">*</span>
                                    Counsel's Last Name
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                                <div>
                                    <input id="solicitorLastName"
                                        value={this.displaySelected('counselLastName')}
                                        onChange={ e => this.updateServiceInformation('counselLastName', e.target.value) }
                                        />
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                    <span className="mandatory-field">*</span>
                                    Firm Name
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                                    <div>
                                        <input id="firmName"
                                            value={this.displaySelected('firmName')}
                                            onChange={ e => this.updateServiceInformation('firmName', e.target.value) }
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                    <span className="mandatory-field">*</span>
                                    Firm's Phone&nbsp;
                                    <i className="oi oi-question-mark" aria-hidden="true" data-tip="The registry may contact you by phone to schedule your appeal"></i>
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                    <input id="phone"
                                        className={`${this.state.badFirmPhone ? "invalid-field" : ""}`}
                                        value={this.displaySelected('firmPhone')}
                                        onChange={ e => this.updateServiceInformation('firmPhone', e.target.value) }/>
                                        <div className="row address-hint">
                                        ex. 604-567-8901 x1234
                                    </div>
                                    
                                    <div className="row address-hint"  style={{color:'red', display: (this.state.badFirmPhone ? 'block': 'none' )}}>
                                            Please enter at least 10 digits.
                                        </div>
                                </div>
                            </div>
                        </Fragment>                                
                        }
                        { this.state.selfRepresented === true && 
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                    <span className="mandatory-field">*</span>
                                    {this.state.selfRepresented === false ? "Firm's" : ""} Phone&nbsp;
                                    <i className="oi oi-question-mark" aria-hidden="true" data-tip="The registry may contact you by phone to schedule your appeal"></i>
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                    <input id="phone"
                                        className={`${this.state.badPhone ? "invalid-field" : ""}`}
                                        value={this.displaySelected('phone')}
                                        onChange={ e => this.updateServiceInformation('phone', e.target.value) }/>
                                        <div className="row address-hint">
                                        ex. 604-567-8901 x1234
                                    </div>
                                    
                                    <div className="row address-hint"  style={{color:'red', display: (this.state.badPhone ? 'block': 'none' )}}>
                                            Please enter at least 10 digits.
                                    </div>
                                </div>
                            </div>
                        }
                        { this.state.selfRepresented !== undefined && 
                        <Fragment>
   
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                    <span id="emailasterisks" className="mandatory-field" style={{display:(this.state.useServiceEmail || this.state.sendNotifications)?'inline-block':'none'}}>*</span>
                                    Email address&nbsp;
                                    <i className="oi oi-question-mark" aria-hidden="true" data-tip="Receive electronic document status change notifications or be served electonically by another party (you need to agree to this using the checkboxes below)"></i>
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                    <input id="email"
                                        className={`${this.state.badEmail? "invalid-field" : ""}`}
                                        value={this.displaySelected('email')}
                                        onChange={ e => this.updateServiceInformation('email', e.target.value) }
                                        />
                                        <div className="row address-hint" style={{color:'red', display: (this.state.badEmail ? 'block': 'none' )}}>
                                            Please enter a valid email.
                                        </div>
                                </div>
                            </div>
                        </Fragment>
                        }
                { this.state.selfRepresented !== undefined &&
                <Fragment>
                    <div className="row">
                          <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                              <span className="mandatory-field">*</span>
                              Address Line 1
                          </div>
                          <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                              <div>
                                  <input id="addressLine1"
                                      value={this.displaySelected('addressLine1')}
                                      onChange={ e => this.updateServiceInformation('addressLine1', e.target.value) }
                                      type="text"
                                       style={{minWidth: '400px'}} />
                                  <div className="row address-hint">
                                      Street address
                                  </div>
                              </div>
                          </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                          Address Line 2
                        </div>
                        <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                          <div>
                              <input id="addressLine2"
                                  value={this.displaySelected('addressLine2')}
                                  onChange={ e => this.updateServiceInformation('addressLine2', e.target.value) }  style={{minWidth: '400px'}} />
                              <div className="row address-hint">
                                  Apartment, suite, unit, building, floor, etc.
                              </div>
                          </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                            <span className="mandatory-field">*</span>
                            City
                        </div>
                        <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                        <div>
                            <input id="city"
                                  value={this.displaySelected('city')}
                                  onChange={ e => this.updateServiceInformation('city', e.target.value) } />
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                            Province
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-readonly-value">
                            BC
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                            Country
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-readonly-value">
                            Canada
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                            <span className="mandatory-field">*</span>
                            Postal Code
                        </div>
 
                        <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                        <div>
                            <input id="postalcode"
                                  className={`${this.state.badPostalCode ? "invalid-field" : ""}`}
                                  value={this.displaySelected('postalCode')}
                                  onChange={ e => this.updateServiceInformation('postalCode', e.target.value) }/>
                            <div className="row address-hint" style={{color:'red', display: (this.state.badPostalCode ? 'block': 'none' )}}>
                                        Please enter a valid postal code.
                            </div>
                        </div>
                        </div>
                    </div>
                </Fragment>
                }

                { this.state.selfRepresented !== undefined &&
                <Fragment>
                  <div className="row">
                        <br/>
                  </div>

                  <div className="row">
                      <div className="row address-row-header">
                          <div className="row address-row">
                              <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 ">I would like to receive email notifications when the status of my document changes</div>
                              <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 " style={{textAlign: 'left'}}>
                                  <input id="sendNotificationss"
                                      type="checkbox"
                                      checked= { this.state.sendNotifications }
                                      onChange= { this.updatesendNotifications }/>
                              </div>
                          </div>
                          <div className="row address-row">
                              <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 ">
                                  I agree to be served documents electronically by another party
                                  &nbsp;<i className="oi oi-question-mark" aria-hidden="true"
                                     data-tip="Electronic service will replace in-person service if you select this option."></i>
                              </div>
                              <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 " style={{textAlign: 'left'}}>
                                  <input id="useServiceEmail"
                                      type="checkbox"
                                      checked= { this.state.useServiceEmail }
                                      onChange= { this.updateUseServiceEmail }/>
                              </div>
                          </div>
                      </div>
                  </div>

                  <hr/>
                  <div className="row">
                    <div className="col-xs-6" style={{textAlign:'left', padding:'0px'}}>
                        <SpinnerButton  ref= { el => this.saveButton = el }
                                        content= "Save as Draft"
                                        id= "save-as-draft"
                                        disabled= { this.disableSave() }
                                        onClick= { this.save } />
                    </div>
                    <div className="col-xs-6 right" style={{textAlign:'right', padding:'0px'}}>
                        <SpinnerButton ref= { el => this.continueButton = el }
                                            content= "Continue"
                                            id= "continue"
                                            disabled= { this.disableContinue() }
                                            onClick= { this.continue } 
                                            showArrow={true}
                                            >
                        </SpinnerButton>
                    </div>
                  </div>
                  </Fragment>
                }
                </div>
                </div>
            </div>
            <ReactTooltip/>
        </div>
        );
    }

    continue() {
        let validated = true;
        let serviceInformation = this.state.serviceInformation
        if (!validator.isPostalCode(serviceInformation['postalCode'], 'CA')) {
            validated = false;
            this.setState({badPostalCode: true});
        }        
        if (serviceInformation['email'] && 
        serviceInformation['email'].length > 0 && 
            !validator.isEmail(serviceInformation['email'])) {
                validated = false;
            this.setState({badEmail: true});
        }
        if (serviceInformation['firmPhone'] && 
        serviceInformation['firmPhone'].length !== 0 && 
        serviceInformation['firmPhone'].replace( /\D+/g, '').length < 10)
        {
            validated = false;
            this.setState({badFirmPhone: true});
        }
        if (serviceInformation['phone'] && 
        serviceInformation['phone'].length !== 0 && 
        serviceInformation['phone'].replace( /\D+/g, '').length < 10)
        {
            validated = false;
            this.setState({badPhone: true});
        }
        if (validated) {
            this.save(()=>{
                this.props.history.push({pathname: process.env.PUBLIC_URL + '/preview',state: this.state })
            })
        }
    }
    setSelfRepresented(state) {
        this.setState({ selfRepresented: state, serviceInformation: this.state.serviceInformation }, () => {
              ReactTooltip.rebuild();
            });
        window.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    }
    selectedRespondents() {
       return this.state.parties.respondents.filter((respondent) => respondent.responding);
    }
    updateSelectedRespondents(event) {
        let parties = this.state.parties
        let respondents = parties.respondents
        if ('clear' === event.action ) {
            respondents.forEach((respondent) => respondent.responding = false);
        } else if ('selectAll' === event.action) {
            respondents.forEach((respondent) => respondent.responding = true);
        } else {
            respondents[event.target.value].responding = event.target.responding;
        }
        this.setState({ parties:parties });
    }
    selectAllRespondents() {
        this.updateSelectedRespondents({ action:'selectAll' })
    }
    updateSelectedContact(event) {
        let respondent = this.state.parties.respondents[event.target.value];
        this.setState({
          serviceInformation: {
            ...this.state.serviceInformation,
            selectedContactId: event.target.value,
            ...respondent.solicitor,
            name: respondent.name
          }
        });
    }
    displaySelected(field) {
        return field in this.state.serviceInformation ? this.state.serviceInformation[field] || '' : ''
    }
    updateServiceInformation(field, value) {
        if (field === 'email')
            this.setState({badEmail: false});
        if (field === 'firmPhone')
            this.setState({badFirmPhone: false});
        if (field === 'phone')
            this.setState({badPhone: false});
        if (field === 'postalCode')
            this.setState({badPostalCode: false});
        
        let serviceInformation = this.state.serviceInformation
        serviceInformation[field] = value;
        this.setState({ serviceInformation: serviceInformation })
    }
    updatesendNotifications(event) {
        this.setState({ sendNotifications: event.target.checked })
    }
    updateUseServiceEmail(event) {
        this.setState({ useServiceEmail: event.target.checked });
    }
    save(next) {
        // Clean up the data.
        if (this.state.selfRepresented) {
            delete this.state.serviceInformation.counselFirstName;
            delete this.state.serviceInformation.counselLastName;
            delete this.state.serviceInformation.firmName;
            delete this.state.serviceInformation.firmPhone;
            let serviceInformation = this.state.serviceInformation;
            this.setState({ serviceInformation: serviceInformation });
        } else {
            delete this.state.serviceInformation.phone;
            this.setState({ serviceInformation: this.state.serviceInformation });
        }

        this.saveButton.startSpinner()
        this.continueButton.startSpinner()
        var form = {
            formSevenNumber: this.state.caseNumber,
            appellants: this.state.parties.appellants,
            respondents: this.state.parties.respondents,
            service: this.state.service,
            useServiceEmail: this.state.useServiceEmail,
            sendNotifications: this.state.sendNotifications,
            serviceInformation: this.state.serviceInformation,
            selfRepresented: this.state.selfRepresented,
            version: '0.1'
        }
        if (!this.state.formId) {
            this.service.createForm2(form, (formId) => {
                this.saveButton.stopSpinner()
                this.continueButton.stopSpinner()
                if (!formId.error) {
                    this.setState({
                        formId: formId
                    }, ()=>{
                        if (typeof next == 'function') { next() }
                    })
                }
            })
        }
        else {
            this.service.updateForm2(form, this.state.formId, (data) => {
                this.saveButton.stopSpinner()
                this.continueButton.stopSpinner()
                if (typeof next == 'function') { next() }
            })
        }
    }
    disableSave() {
        let disabled = false

        if (this.selectedRespondents().length < 1) { disabled = true }
        if (this.state.selfRepresented === false && this.displaySelected('firmName') === '') { disabled=true }
        if (this.state.selfRepresented === false && this.displaySelected('counselFirstName') === '') { disabled=true }
        if (this.state.selfRepresented === false && this.displaySelected('counselLastName') === '') { disabled=true }
        if (this.state.selfRepresented === false && this.displaySelected('firmPhone') === '') { disabled=true }
        if (this.displaySelected('addressLine1') === '') { disabled=true }
        if (this.displaySelected('city') === '') { disabled=true }
        if (this.displaySelected('postalCode') === '') { disabled=true }
        if (this.state.selfRepresented === true && this.displaySelected('phone') === '') { disabled=true }

        if (this.displaySelected('email') === '' && (
            this.state.useServiceEmail || this.state.sendNotifications
        )) { disabled=true }

        return disabled
    }
    disableContinue() {
        return this.disableSave()
    }
}
export default Form2Fill;
