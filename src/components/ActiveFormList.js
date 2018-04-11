import React, { Component } from 'react';
import '../forms/active.forms.css';
import DefaultService from '../service/default.service.js';
import CaseList from '../components/CaseList.js';

class ActiveFormList extends Component {

    constructor(props) {
        super(props);
        this.service = props.service ? props.service : new DefaultService(); 
        this.state = {
            fetch: props.fetch !== 'false',
            cases: [],
            displayMyCasesEmptyLabel:true
        };
        this.fetchCases = this.fetchCases.bind(this);
    }

    componentDidMount() {
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
            <div id="active-forms" className="form-section">
                <div>
                    <h3 style={{ display:'inline-block' }}>Case Reminders</h3>
                    <div style={{ display:'inline-block', float:'right', marginTop:'15px' }}>
                        <a href="/my-applications.html" className="btn btn-primary round-borders">View All Cases</a>
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