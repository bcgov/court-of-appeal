import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../MyDocuments.css';
import CaseList from '../components/CaseList.js';

class ActiveFormList extends Component {

    render() {
        return (
            <div id="active-forms" className="form-section" ref={ (element)=> {this.element = element }}>
                <div className="not-printable">
                    <h3 style={{ display:'inline-block' }}>Document Reminders</h3>

                </div>
                <CaseList
                    cases={this.props.cases}
                    service={this.props.service}
                    updateCases={this.props.updateCases}
                    history={this.props.history}
                />
                <div id="my-cases-empty-label" style={{ display:this.props.displayMyCasesEmptyLabel ? 'block' : 'none' }}>
                        No open cases found
                </div>
                <div>
                    <Link to={process.env.PUBLIC_URL + '/my-documents'} className="btn btn-primary round-borders">View All Documents</Link>
                </div>
            </div>
        )
    }
}
export default ActiveFormList;
