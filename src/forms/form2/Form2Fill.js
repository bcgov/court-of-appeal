import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import ProgressStatusBar from '../../components/progress/ProgressStatusBar';
import '../Form.css';
import './Form2Fill.css';
import DefaultService from "../../service/default.service";
import RespondentListSelect from "../../components/fields/RespondentListSelect";

class Form2Fill extends Component {

    constructor(props) {
        super(props);
        this.homePath = (process.env.PUBLIC_URL === '') ? '/' : process.env.PUBLIC_URL
        this.service = props.service;
        this.state = props.location && props.location.state ? props.location.state : {};
        console.log(this.state);
        this.backToAccess = this.backToAccess.bind(this)
        this.selectedRespondents = this.selectedRespondents.bind(this)
        this.updateSelectedRespondents = this.updateSelectedRespondents.bind(this)
        this.selectAllRespondents = this.selectAllRespondents.bind(this);
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
        this.selectAllRespondents()
    }

    render() {
        return (
            <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>

                <div id="breadcrumbContainer">
                    <ol className="breadcrumb">
                        <li>
                            <a id="home" href={this.homePath}>Home</a>
                        </li>
                        <li>
                            <a href={this.homePath + 'start'}>Start</a>
                        </li>
                        <li>
                            <a href='#' onClick={this.backToAccess}>Access</a>
                        </li>
                    </ol>
                </div>

                  <ProgressStatusBar
                      activeStep={2}
                      steps={["Access","Form 2","Preview","Payment"]}
                  />

                <div className="row">
                    <div id="viewFormModal" className="col col-lg-12 col-md-12 col-sm-12 preview-form">
                    <div className="page-title-section">
                            <div className="page-title">Notice of Appearance</div>
                        <div className="page-subtitle">Form 2 (RULES 5 (A), 13(A) AND 17(A))</div>
                    </div>
                        <div className="form-section">
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
                        <div className="form-section">
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

                            <div className="row ">
                               <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6 respondent-name-label">
                                   <div style={{fontWeight: "bolder"}}>
                                       Responding: &nbsp;
                                       <i className="oi oi-question-mark" aria-hidden="true"
                                          data-tip={this.state.parties.respondents.length > 1 ?
                                              'What are the names of the parties responding to the appeal?' :
                                              'What is the name of the party responding to the appeal?'}/>
                                  </div>
                               </div>
                           </div>

                           <div className="row proceeding-style">
                              <div className="col-lg-offset-1 col-md-offset-1 col-lg-9 col-md-9 col-sm-8 col-xs-8" id="respondent-select" >
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
                        </div>
                    </div>
                </div>

                <ReactTooltip/>
            </div>
        );
    }

    backToAccess() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/access',state: { caseNumber:this.state.caseNumber, parties:this.state.parties }});
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
}
export default Form2Fill;
