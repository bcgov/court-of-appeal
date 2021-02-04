import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import ProgressStatusBar from '../../components/progress/ProgressStatusBar';
import '../Form.css';
import './Form2Fill.css';
import DefaultService from "../../service/default.service";
import RespondentListSelect from "../../components/fields/RespondentListSelect";
import ContactSelect from "../../components/fields/ContactSelect";
import SpinnerButton from '../../components/SpinnerButton';
import { standardizeParties } from './standardize.parties'

class Form2Fill extends Component {

    constructor(props) {
        super(props);
        this.homePath = (process.env.PUBLIC_URL === '') ? '/' : process.env.PUBLIC_URL
        this.service = props.service;
        this.state = props.location && props.location.state ? props.location.state : {};
        if (this.state.useServiceEmail === undefined) { this.state.useServiceEmail = false }
        if (this.state.sendNotifications === undefined) { this.state.sendNotifications = false }
        if (this.state.selectedContactIndex === undefined) { this.state.selectedContactIndex = 0 }

        this.backToAccess = this.backToAccess.bind(this)
        this.selectedRespondents = this.selectedRespondents.bind(this)
        this.updateSelectedRespondents = this.updateSelectedRespondents.bind(this)
        this.selectAllRespondents = this.selectAllRespondents.bind(this)
        this.updateSelectedContact = this.updateSelectedContact.bind(this)
        this.displaySelected = this.displaySelected.bind(this)
        this.updateContact = this.updateContact.bind(this)
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
            this.selectAllRespondents()
        })
    }

    render() {
        return (
        <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>

            <ProgressStatusBar activeStep={2} steps={["Access","Form 2","Preview","Payment"]} />

            <div className="row section section-gray">
                <div className="col-xs-12">
                    <div className="page-title">Notice of Appearance</div>
                    <div className="page-subtitle">Form 2 (RULES 5 (A), 13(A) AND 17(A))</div>
                </div>
            </div>

            <div className="row section section-white">
                <div className="col-xs-12">
                    <div className="section-title">
                        When Do You Use the Notice of Appearance (Form2)?
                    </div>
                    <p>
                        If you have been served a Notice of Appeal (Form 7), and you want to respond,
                        fill out the Notice of Appearance (Form 2). If you do not respond,
                        you will not be includedin future court proceedings related to this case,
                        and will not have access to the case documents filed.
                    </p>
                    <p>
                        You have 10 days to serve a filed copy of the Notice of Appearance to the appelant,
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
                              selectedIndex={this.state.selectedContactIndex}
                          />
                      </div>
                  </div>

                  <div className="row address-row address-section">
                    <div className="row">
                          <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                              <span className="mandatory-field">*</span>
                              Address Line 1
                          </div>
                          <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6">
                              <div>
                                  <input id="addressLine1"
                                      value={this.displaySelected('addressLine1')}
                                      onChange={ e => this.updateContact('addressLine1', e.target.value) }/>
                                  <div className="row address-hint">
                                      Street address, P.O. box, company name, c/o
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
                                  onChange={ e => this.updateContact('addressLine2', e.target.value) }/>
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
                                  onChange={ e => this.updateContact('city', e.target.value) }/>
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
                                  value={this.displaySelected('postalCode')}
                                  onChange={ e => this.updateContact('postalCode', e.target.value) }/>
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
                                  <i className="oi oi-question-mark" aria-hidden="true" data-tip="The registry may contact you by phone to schedule your appeal"></i>
                              </div>
                              <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                  <input id="phone"
                                      value={this.displaySelected('phone')}
                                      onChange={ e => this.updateContact('phone', e.target.value) }/>
                              </div>
                          </div>
                          <div className="row address-row">
                              <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 address-label">
                                  <span id="emailasterisks" className="mandatory-field" style={{display:(this.state.useServiceEmail || this.state.sendNotifications)?'inline-block':'none'}}>*</span>
                                  Email address&nbsp;
                                  <i className="oi oi-question-mark" aria-hidden="true" data-tip="Receive electronic document status change notifications or be served electonically by another party (you need to agree to this using the checkboxes below)"></i>
                              </div>
                              <div className="col-lg-10 col-md-10 col-sm-6 col-xs-6 ">
                                  <input id="email"
                                      value={this.displaySelected('email')}
                                      onChange={ e => this.updateContact('email', e.target.value) }/>
                              </div>
                          </div>
                      </div>
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
                    <div className="col-xs-4" style={{textAlign:'left', padding:'0px'}}>
                        <div >
                            <button id="back"
                                    className="btn btn-primary round-borders"
                                    onClick={this.backToAccess}>
                                    <i className="glyphicon glyphicon-triangle-left" />
                                    Back to Access
                            </button>
                        </div>
                    </div>
                    <div className="col-xs-4" style={{textAlign:'center', padding:'0px'}}>
                        <SpinnerButton  ref= { el => this.saveButton = el }
                                        content= "Save as Draft"
                                        id= "save-as-draft"
                                        width= "100"
                                        disabled= { this.disableSave() }
                                        onClick= { this.save } />
                    </div>
                    <div className="col-xs-4" style={{textAlign:'right', padding:'0px'}}>
                        <button id= "continue"
                                className= "btn btn-primary round-borders action-button"
                                disabled= { this.disableContinue() }
                                onClick= { this.continue }>
                                Continue
                                <i className="glyphicon glyphicon-triangle-right" />
                        </button>
                    </div>
                  </div>
                </div>
            </div>

            <ReactTooltip/>
        </div>
        );
    }

    backToAccess() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/access',state: this.state })
    }
    continue() {
        this.save(()=>{
            this.props.history.push({pathname: process.env.PUBLIC_URL + '/preview',state: this.state })
        })
    }
    selectedRespondents() {
       return this.state.parties.respondents.filter((respondent) => respondent.selected);
    }
    updateSelectedRespondents(event) {
        let parties = this.state.parties
        let respondents = parties.respondents
        if ('clear' === event.action ) {
            respondents.forEach((respondent) => respondent.selected = false)
        } else if ('selectAll' === event.action) {
            respondents.forEach((respondent) => respondent.selected = true);
        } else {
            respondents[event.target.value].selected = event.target.selected;
        }
        this.setState({ parties:parties })
    }
    selectAllRespondents() {
        this.updateSelectedRespondents({ action:'selectAll' })
    }
    updateSelectedContact(event) {
        this.setState({ selectedContactIndex: event.target.value })
    }
    displaySelected(field) {
        let value = ''
        if (this.state.selectedContactIndex >= 0
            && this.state.parties.respondents[this.state.selectedContactIndex].address) {
            value = this.state.parties.respondents[this.state.selectedContactIndex].address[field]
        }
        return value ? value: ''
    }
    updateContact(field, value) {
        if (this.state.selectedContactIndex >= 0) {
            let parties = this.state.parties
            let respondents = parties.respondents
            respondents[this.state.selectedContactIndex].address[field] = value
            this.setState({ parties:parties })
        }
    }
    updatesendNotifications(event) {
        this.setState({ sendNotifications: event.target.checked })
    }
    updateUseServiceEmail(event) {
        this.setState({ useServiceEmail: event.target.checked });
    }
    save(next) {
        this.saveButton.startSpinner()
        var form = {
            formSevenNumber: this.state.caseNumber,
            appellants: this.state.parties.appellants,
            respondents: this.state.parties.respondents,
            useServiceEmail: this.state.useServiceEmail,
            sendNotifications: this.state.sendNotifications,
            selectedContactIndex: this.state.selectedContactIndex,
            account: this.state.account,
            authorizations: this.state.authorizations
        }
        if (!this.state.id) {
            this.service.createForm2(form, (formId) => {
                this.saveButton.stopSpinner()
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
            this.service.updateForm2(form, this.state.id, (data) => {
                this.saveButton.stopSpinner()
                if (next) { next() }
            })
        }
    }
    disableSave() {
        let disabled = false

        if (this.displaySelected('addressLine1') === '') { disabled=true }
        if (this.displaySelected('city') === '') { disabled=true }
        if (this.displaySelected('postalCode') === '') { disabled=true }
        if (this.displaySelected('phone') === '') { disabled=true }

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
