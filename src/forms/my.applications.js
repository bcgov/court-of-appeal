import React, { Component } from 'react';
import './active.forms.css';
import DefaultService from '../service/default.service.js';
import MultiSelectionCaseList from '../components/MultiSelectionCaseList.js';
import _ from 'lodash';
import update from 'immutability-helper';
import renderCases from '../components/cases.renderer';
import './my.applications.css';
import SpinnerActionIcon from '../components/SpinnerActionIcon';

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
        this.archive = this.archive.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
        this.download = this.download.bind(this);
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
            let cases = renderCases(data.cases);    
            cases.forEach((item)=>{item.checked=false;});
            this.setState({
                cases:cases,
                displayMyCasesEmptyLabel: (cases.length === 0)
            });
        });
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

    toggleSelected(id) {
        let cases = this.state.cases;
        _.forEach(cases, (doc) => {
            if (doc.id === id) {
                doc.checked = !doc.checked;
            }
        });
        this.setState({
            cases:cases,
            displayMyCasesEmptyLabel: (cases.length === 0)
        });
    }
    archive() {
        let reducer = (list, item)=> {
            if (item.checked) {
                list.push(item.id);
            }
            return list;
        }        
        let idsToArchive = this.state.cases.reduce(reducer, []);
        this.archiveButton.startSpinner();
        this.service.archiveCases(idsToArchive, (data) => {
            this.archiveButton.stopSpinner();
            this.fetchCases();
        });
    }
    download() {

    }

    render() {
        return (
            <div id="topicTemplate" className="template container gov-container form">
                <div className="row">
                    <div id="main-content" role="main" className="contentPageMainColumn col-sm-12">   
                        <div className="col-sm-12">
                            <div id="active-forms" className="form-section" ref={ (element)=> {this.element = element }}>                                
                                <div className="row">
                                    <div className="col-xs-6 no-padding">
                                        <h3>My Documents</h3>
                                    </div>
                                    <div className="col-xs-6 no-padding text-right">
                                        <SpinnerActionIcon id="download-button" onClick={this.download} ref={ (element)=> {this.downloadButton = element }}
                                            content='oi oi-data-transfer-download'>                        
                                        </SpinnerActionIcon>
                                        <SpinnerActionIcon id="archive-button" onClick={this.archive} ref={ (element)=> {this.archiveButton = element }}
                                            content='oi oi-box'>                        
                                        </SpinnerActionIcon>
                                        <a href="form.2.html">
                                            <span className="action-icon"><span className="oi oi-plus"></span></span>
                                        </a>
                                    </div>
                                </div>
                                <MultiSelectionCaseList
                                    cases={this.state.cases}                   
                                    service={this.service}
                                    updateCases={this.updateCases}
                                    toggleSelected={this.toggleSelected}
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
