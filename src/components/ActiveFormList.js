import React, { Component } from 'react';
import '../forms/active.forms.css';
import DefaultService from '../service/default.service.js';
import CaseList from '../components/CaseList.js';
import _ from 'lodash';
import update from 'immutability-helper';

class ActiveFormList extends Component {

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
        let window = this.element.ownerDocument.defaultView;
        if (this.service == null) { this.service = new DefaultService(window); }
        if (this.state.fetch) { this.fetchCases(); }
    }

    fetchCases() {
        this.service.getMyCases({}, (data) => {             
            if (data && data.cases && data.cases.length > 0) {
                this.setState({ 
                    cases:data.cases.slice(0, 5).map(function(item) { 
                        return {
                            id:item.id,
                            parties: item.data.appellants[0].name + ' / ' + item.data.respondents[0].name,
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

    /**
     * Update the cases in the state so we don't need to call the api to get the updated cases after a successful update.
     */
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
            <div id="active-forms" className="form-section" ref={ (element)=> {this.element = element }}>
                <div>
                    <h3 style={{ display:'inline-block' }}>Document Reminders</h3>
                    <div style={{ display:'inline-block', float:'right', marginTop:'15px' }}>
                        <a href="/my-applications.html" className="btn btn-primary round-borders">View All Documents</a>
                    </div>
                </div>
                <CaseList
                    cases={this.state.cases}                   
                    service={this.service}
                    updateCases={this.updateCases}
                />
                <div id="my-cases-empty-label" style={{ display:this.state.displayMyCasesEmptyLabel?'block':'none' }}>
                        No open cases found
                </div>
            </div>
        )
    }
}
export default ActiveFormList;