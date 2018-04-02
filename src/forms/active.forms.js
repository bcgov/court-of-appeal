import React, { Component } from 'react';
import './active.forms.css';
import DefaultService from '../service/default.service.js';

class ActiveForms extends Component {

    constructor(props) {
        super(props);
        this.service = props.service ? props.service : new DefaultService(); 
        this.state = {
            cases: [],
            displayMyCasesEmptyLabel:true
        };
    }

    componentDidMount() {
        this.service.getMyCases({}, (data) => { 
            if (data && data.cases && data.cases.length > 0) {
                this.setState({ 
                    cases:data.cases.slice(0, 5).map(function(item) { 
                        return {
                            id:item.id,
                            parties: item.data.appelant + ' / ' + item.data.respondent,
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
                    <h3 style={{ display:'inline-block' }}>Cases Reminders</h3>
                    <div style={{ display:'inline-block', float:'right', marginTop:'15px' }}>
                        <a href="/my-applications.html" className="btn btn-primary round-borders">View All Cases</a>
                    </div>
                </div>
                <table id="my-cases">
                    <thead>
                        <tr className="header">
                            <td></td>
                            <td>File #</td>
                            <td>Parties</td>
                            <td>Status                                
                            </td>
                            <td>Deadline to File</td>
                            <td>Recently Modified</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.cases.map((item) =>
                                <tr className="case-item" key={item.id}>
                                    <td></td>
                                    <td>{item.id}</td>
                                    <td>{item.parties}</td>
                                    <td>{item.status}</td>
                                    <td></td>
                                    <td>{item.modified}</td>
                                </tr>
                            )
                        }                        
                    </tbody>
                </table>
                <div id="my-cases-empty-label" style={{ display:this.state.displayMyCasesEmptyLabel?'block':'none' }}>
                        No open cases found
                </div>
            </div>
        )
    }
}
export default ActiveForms;