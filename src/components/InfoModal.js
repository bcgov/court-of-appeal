import React, {Component} from 'react';
import '../components/infomodal.css';

class InfoModal extends Component {

    constructor(props) {
        super(props);

        this.state = this.initialState();
        this.expandFactumDetails = this.expandFactumDetails.bind(this);
        this.collapseFactumDetails = this.collapseFactumDetails.bind(this);
        this.expandTranscriptDetails = this.expandTranscriptDetails.bind(this);
        this.collapseTranscriptDetails = this.collapseTranscriptDetails.bind(this);
        this.initialState = this.initialState.bind(this);
        this.close = this.close.bind(this);
    }

    render() {
        let content = null;

        if (this.props.show) {
            content =  <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.close}>&times;</span>
                    The Factum and Appeal Book
                </div>
                <div className="info-modal-content">
                    <div className="row">
                        <div className="col col-lg-1 col-md-1 col-sm-1 icon-container-box">
                            <div shape="circle" className="info-modal-icon-container">
                                <img src="icons/icon-clock.svg" className="info-modal-icon info-modal-clock"/>
                            </div>
                        </div>
                        <div className="col col-lg-11 col-md-11 col sm-11">
                            <div className="row">
                                <div className="col col-lg-12 col-md-12 col-sm-12">
                                    <div className="deadline">30 days</div>
                                    <div className="info-modal-section-heading">Filing and service deadline after filing the Appeal Record</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-lg-1 col-md-1 col-sm-1">
                            <div className="vertical-line" style={{height:'178px', marginTop: '-24px', marginBottom: '-18px'}}/>
                        </div>
                        <div className="col col-lg-11 col-md-11 col-sm-11 info-modal-section">
                            <ol style={{fontWeight:"bolder"}}>
                                <li>Complete either the .DOCs or .PDFs below:
                                    <ul>
                                        <li>Factum (Form 10) </li>
                                        <li> *Optional - Transcript and Extract Book (Form 13)</li>
                                        <li>Appeal Book (Form 12)</li>
                                    </ul>
                                </li>
                                <li>
                                    File the indicated number of copies to the registry.
                                </li>
                                <li>
                                    Serve one copy of each document to respondent.
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-lg-1 col-md-1 col-sm-1">
                            <div shape="circle" className="info-modal-icon-container">
                                <img src="icons/icon-share.svg" className="info-modal-icon"/>
                            </div>
                        </div>
                        <div className={this.state.factumPromptClass}>
                            <div className="row info-modal-divider">
                                <div className="col col-lg-9 col-md-9 col-sm-9 info-modal-section-heading" style={{marginBottom:'20px'}}>
                                    Were you served with a respondent's Factum?
                                </div>
                                <div className="col col-lg-3 col-md-3 factum-drawer" onClick={this.expandFactumDetails}>
                                    <i className="fa fa-plus" />
                                </div>
                            </div>
                        </div>
                        <div className={this.state.factumDeadlineClass}>
                            <div className="row info-modal-divider">
                                <div className=" col col-lg-9 col-md-9 col-sm-9" >
                                    <div className="deadline">7 days</div>
                                    <div className="info-modal-section-heading">Filing and service deadline after receiving the Factum</div>
                                </div>
                                <div className="col col-lg-3 col-md-3 col-sm-3 factum-drawer" onClick={this.collapseFactumDetails}>
                                    <i className="fa fa-minus" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.factumDetailsClass}>
                        <div className="col col-lg-1 col-md-1 col-sm-1">
                            <div className="vertical-line" style={{height:'156px', marginTop: '-45px', marginBottom: '-18px'}}/>
                        </div>
                        <div className="col col-lg-11 col-md-11 col-sm-11 info-modal-section">
                            <ol style={{fontWeight:"bolder"}}>
                                <li>
                                    IF you would like to reply, please complete either the
                                    .DOC or .PDF document below:
                                    <ul>
                                        <li> Reply (Form 11)</li>
                                    </ul>
                                </li>
                                <li>
                                    File the indicated number of copies to the registry.
                                </li>
                                <li>
                                    Serve one copy of each document to respondent.
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col col-lg-1 col-md-1">
                            <div shape="circle" className="info-modal-icon-container">
                                <img src="icons/icon-info.svg" className="info-modal-icon"/>
                            </div>
                        </div>

                        <div className={this.state.transcriptPromptClass}>
                            <div className="row info-modal-divider">
                                <div className="col col-lg-9 col-md-9 col-sm-9 info-modal-section-heading" >
                                    Were you served with a respondent's Transcript Extract Book?
                                </div>
                                <div className="col col-lg-3 col-md-3 col-sm-3 factum-drawer" onClick={this.expandTranscriptDetails}>
                                   <i className="fa fa-plus" />
                                </div>
                            </div>
                        </div>
                        <div className={this.state.transcriptDeadlineClass}>
                            <div className="row info-modal-divider">
                                <div className=" col col-lg-9 col-md-9 col-sm-9 info-modal-section-heading" >
                                    <div> You may also be served a copy of the respondent’s Transcript Extract Book.
                                        This document is for your awareness only and you do not have to respond
                                        to it.</div>
                                </div>
                                <div className="col col-lg-3 col-md-3 col-sm-3 factum-drawer" onClick={this.collapseTranscriptDetails}>
                                   <i className="fa fa-minus"/>
                                </div>
                            </div>
                            <div className="row ">
                                <div  style={{fontWeight:"bolder",marginBottom:'20px'}} className="col col-lg-11 col-md-11 col-sm-11 ">
                                    Need help completing a document?
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col col-lg-3 col-md-3 col-sm-3 vertical-divider">
                                    <a href=" https://www.courtofappealbc.ca/respondent-guidebook">Visit: SRL Guidebook</a>
                                </div>
                                <div className="col col-lg-4 col-md-4 col-sm-4 vertical-divider right-info-cols">
                                    <a href="mailto:courts.cso@gov.bc.ca">Email: Courts.cso@gov.bc.ca</a>
                                </div>
                                <div className="col col-lg-4 col-md-4 col-sm-4 right-info-cols">
                                    Call: 1-800-663-6102
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        }
        return content;
    }

    componentWillUnmount() {
            this.setState(this.initialState());
    }

    expandFactumDetails() {
        this.setState({
            factumPromptClass: "col col-lg-11 col-md-11 col-sm-11 content-hidden",
            factumDeadlineClass: "col col-lg-11 col-md-11 col-sm-11 content-showing",
            factumDetailsClass: "row content-showing",
        });
    }

    collapseFactumDetails(){
        this.setState({
            factumPromptClass: "col col-lg-11 col-md-11 col-sm-11 content-showing",
            factumDeadlineClass: "col col-lg-11 col-md-11 col-sm-11 content-hidden",
            factumDetailsClass: "row content-hidden",
        });
    }

    expandTranscriptDetails() {
        this.setState({
            transcriptPromptClass: "col col-lg-11 col-md-11 col-sm-11 content-hidden",
            transcriptDeadlineClass: "col col-lg-11 col-md-11 col-sm-11 content-showing",
            transcriptDetailsClass: "row content-showing",
        });
    }

    collapseTranscriptDetails() {
        this.setState({
            transcriptPromptClass: "col col-lg-11 col-md-11 col-sm-11 content-showing",
            transcriptDeadlineClass: "col col-lg-11 col-md-11 col-sm-11 content-hidden",
            transcriptDetailsClass: "row content-hidden"
        });
    }

    initialState() {
        return {
            factumPromptClass: "col col-lg-11 col-md-11 content-showing",
            factumDeadlineClass: "col col-lg-11 col-md-11 content-hidden",
            factumDetailsClass: "row content-hidden",
            transcriptPromptClass: "col col-lg-11 col-md-11 content-showing",
            transcriptDeadlineClass: "col col-lg-11 col-md-11 content-hidden",
            transcriptDetailsClass: "row content-hidden"
        };
    }

    close() {
        this.setState(this.initialState());
        this.props.close();
    }

}
export default InfoModal;