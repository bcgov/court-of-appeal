import React, { Component } from 'react';
import './active.forms.css';
import DefaultService from '../service/default.service.js';
import CaseList from '../components/CaseList.js';
import _ from 'lodash';
import update from 'immutability-helper';

class MyApplications extends Component {
  
  
    constructor(props) {
        super(props);
        this.service = props.service; 
        this.state = {
            fetch: props.fetch !== 'false',
            cases: [],
            displayMyCasesEmptyLabel:true
        };
        this.fetchCases = this.fetchCases.bind(this);
        this.updateCases = this.updateCases.bind(this);
    }

    componentDidMount() {

        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
        if (this.state.fetch) { this.fetchCases(); }
    }

    fetchCases() {
        let self = this;
        this.service.getMyCases({}, (data) => {
            if (data && data.cases && data.cases.length > 0) {
                this.setState({ 
                    cases:data.cases.map(function(item) { 
                        return {
                            id:item.id,
                            parties: self.parties(item.data),
                            status: item.status,
                            modified: item.modified,
                            data: item.data
                        };
                    }),
                    displayMyCasesEmptyLabel: false 
                });
            } else {
                this.setState({
                    cases:[],
                    displayMyCasesEmptyLabel: true
                })
            }
        });
    }
    parties(data) {
        let appellantName = '?';
        let respondentName = '?';
        if (data.appellant) {
            appellantName = data.appellant;
        }
        if (data.appellants && data.appellants[0]) {
            appellantName = data.appellants[0].name;
        }
        if (data.respondent) {
            respondentName = data.respondent.name;
        }
        if (data.respondents && data.respondents[0]) {
            respondentName = data.respondents[0].name;
        }
        return appellantName + ' / ' + respondentName
    }

    updateCases(data, id) {
        let cases = this.state.cases;
        _.forEach(cases, (doc) => {
            if (doc.id === id) {
                doc.data = data;
            }
        });
        this.setState(update(this.state, {cases: {$set: cases}}));
    }

    render() {
        return (
            <div id="topicTemplate" className="template container gov-container form">
                <div className="row">
                    <div id="main-content" role="main" className="contentPageMainColumn col-sm-12">   
                        <div className="col-sm-12">
                            <div id="active-forms" className="form-section" ref={ (element)=> {this.element = element }}>
                                <CaseList
                                    cases={this.state.cases}                   
                                    service={this.service}
                                    updateCases={this.updateCases}
                                />
                                <div id="my-cases-empty-label" style={{ display:this.state.displayMyCasesEmptyLabel?'block':'none' }}>
                                        No open cases found
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        


            
        )
    }
}

export default MyApplications;
