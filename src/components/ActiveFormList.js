import React, { Component } from 'react';
import '../forms/active.forms.css';
import DefaultService from '../service/default.service.js';
import CaseList from '../components/CaseList.js';

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
                            parties: item.data.appellant + ' / ' + item.data.respondent.name,
                            status: item.status,
                            modified: item.modified
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
                    save={this.props.save}
                />
                <div id="my-cases-empty-label" style={{ display:this.state.displayMyCasesEmptyLabel?'block':'none' }}>
                        No open cases found
                </div>
            </div>
        )
    }
}
export default ActiveFormList;