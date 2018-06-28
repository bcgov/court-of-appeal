import React, { Component } from 'react';
import '../forms/active.forms.css';
import DefaultService from '../service/default.service.js';
import CaseList from '../components/CaseList.js';
import renderCases from './cases.renderer';
import findCaseById from '../helpers/find.case.by.id';

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

        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
        if (this.state.fetch) { this.fetchCases(); }
    }

    fetchCases() {
        this.service.getMyCases({}, (data) => {
            let cases = renderCases(data.cases.slice(0, 5));
            this.setState({
                cases:cases,
                displayMyCasesEmptyLabel: (cases.length === 0)
            });
        });
    }    

    updateCases(data, id) {
        findCaseById({id:id, cases:this.state.cases}, (found)=>{
            found.data = data; 
            this.setState({ cases:this.state.cases });
        });       
    }

    render() {
        return (
            <div id="active-forms" className="form-section" ref={ (element)=> {this.element = element }}>
                <div className="not-printable">
                    <h3 style={{ display:'inline-block' }}>Document Reminders</h3>

                </div>
                <CaseList
                    cases={this.state.cases}                   
                    service={this.service}
                    updateCases={this.updateCases}
                />
                <div id="my-cases-empty-label" style={{ display:this.state.displayMyCasesEmptyLabel?'block':'none' }}>
                        No open cases found
                </div>
                <div>
                    <a href={`${process.env.PUBLIC_URL}/my-applications.html`} className="btn btn-primary round-borders">View All Documents</a>
                </div>
            </div>
        )
    }
}
export default ActiveFormList;