import React, { Component } from 'react';
import './active.forms.css';
import DefaultService from '../service/default.service.js';
import MultiSelectionCaseList from '../components/MultiSelectionCaseList.js';
import renderCases from '../components/cases.renderer';
import './MyDocuments.css';
import SpinnerActionIcon from '../components/SpinnerActionIcon';
import findCaseById from '../helpers/find.case.by.id';

class MyDocuments extends Component {


    constructor(props) {
        super(props);
        this.service = props.service;
        this.state = {
            fetch: props.fetch !== 'false',
            cases: [],
            displayMyCasesEmptyLabel:true,
            displayErrorDialog:false,
            displayAreYouSureDialog:false
        };
        this.fetchCases = this.fetchCases.bind(this);
        this.updateCases = this.updateCases.bind(this);
        this.archive = this.archive.bind(this);
        this.create = this.create.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
        this.download = this.download.bind(this);
        this.onlySelected = this.onlySelected.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
        this.closeConfirmArchiveModal = this.closeConfirmArchiveModal.bind(this);
        this.yesArchive = this.yesArchive.bind(this);
        this.maxFileDownload = 5;
        if (process.env.REACT_APP_MAX_FILE_DOWNLOAD !== undefined && process.env.REACT_APP_MAX_FILE_DOWNLOAD !== 'undefined') {
            this.maxFileDownload = parseInt(process.env.REACT_APP_MAX_FILE_DOWNLOAD, 10);
        }
        this.save = require('./save-file');
    }

    componentDidMount() {
        this.window = this.element.ownerDocument.defaultView;
        if (this.service == null) {
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
        findCaseById({id:id, cases:this.state.cases}, (found)=>{
            found.data = data;
            this.setState({ cases:this.state.cases });
        });
    }

    toggleSelected(id) {
        findCaseById({id:id, cases:this.state.cases}, (found)=>{
            found.checked = !found.checked;
            this.setState({ cases:this.state.cases });
        });
    }

    onlySelected(list, item) {
        if (item.checked) {
            list.push(item.id);
        }
        return list;
    }

    archive() {
        let idsToArchive = this.state.cases.reduce(this.onlySelected, []);
        if (idsToArchive.length > 0) {
            this.setState({ displayAreYouSureDialog:true });
        }
    }
    closeConfirmArchiveModal() {
        this.setState({ displayAreYouSureDialog:false });
    }
    yesArchive() {
        this.closeConfirmArchiveModal();
        let idsToArchive = this.state.cases.reduce(this.onlySelected, []);
        this.archiveButton.startSpinner();
        this.service.archiveCases(idsToArchive, (data) => {
            this.archiveButton.stopSpinner();
            this.fetchCases();
        });
    }

    closeErrorModal() {
        this.setState({ displayErrorDialog:false });
    }

    download() {
        let ids = this.state.cases.reduce(this.onlySelected, []);
        if (ids.length == 0) { return }

        if (ids.length > this.maxFileDownload) {
            this.setState({ displayErrorDialog:true });
        }
        else {
            this.downloadButton.startSpinner();
            this.service.download(ids, (data) => {
                this.downloadButton.stopSpinner();
                if (!data.error) {
                    this.save(data);
                }
            });
        }
    }
    create() {
        window.location = process.env.PUBLIC_URL + '/start'
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
                                        <ul className="action-list">
                                            <SpinnerActionIcon downloading="true" id="download-button" tooltip="download" onClick={this.download} ref={ (element)=> {this.downloadButton = element }}
                                                content='oi oi-data-transfer-download'>
                                            </SpinnerActionIcon>
                                            <SpinnerActionIcon id="archive-button" tooltip="archive" onClick={this.archive} ref={ (element)=> {this.archiveButton = element }}
                                                content='oi oi-box'>
                                            </SpinnerActionIcon>
                                            <SpinnerActionIcon id="create-button" tooltip="create" onClick={this.create} ref={ (element)=> {this.createButton = element }}
                                                content='oi oi-plus'>
                                            </SpinnerActionIcon>
                                        </ul>
                                    </div>
                                </div>
                                <MultiSelectionCaseList
                                    history={this.props.history}
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
                <div id="downloadErrorModal" style={{ display:this.state.displayErrorDialog?'block':'none' }}>
                    <div className="download-error-modal-title">
                        <span id="download-error-close-modal" onClick={this.closeErrorModal}>&times;</span>
                        Download unavailable
                    </div>
                    <div className="download-error-modal-content">
                        <div>
                            You cannot download more than {this.maxFileDownload} files at once.
                        </div>
                    </div>
                </div>
                <div id="are-you-sure-modal" style={{ display:this.state.displayAreYouSureDialog?'block':'none'}}>
                    <div className="are-you-sure-modal-header">
                        <div className="are-you-sure-modal-title" >Please Confirm</div>
                        <div className="are-you-sure-close-modal" onClick={this.closeConfirmArchiveModal}>&times;</div>
                    </div>
                    <div className="are-you-sure-modal-content">
                        <div>
                            Would you like to archive these forms?
                        </div>
                        <div className="row text-center">
                            <button id="cancel-archive" className="btn btn-primary round-borders cancel-archive" onClick={this.closeConfirmArchiveModal}>Cancel</button>
                            <button id="yes-archive" className="btn btn-primary round-borders yes-archive" onClick={this.yesArchive}>Archive</button>
                        </div>
                    </div>
                </div>
            </div>



        )
    }
}

export default MyDocuments;
