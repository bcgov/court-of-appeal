import React, {Component} from 'react';

class InfoModal extends Component {

    render() {
        let content = null;
        if (this.props.show) {
            content =  <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="modal-title  not-printable">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    The Factum and Appeal Book
                </div>
                <div className="modal-content info-modal">
                    <div className="row info-modal">
                        <div className="col col-lg-1 col-md-1">
                            <div shape="circle" className="info-modal-icon-container">
                                <img src="icons/icon-clock.svg" className="info-modal-icon info-modal-clock"/>
                            </div>
                        </div>
                        <div className="col col-lg-11 col-md-11">
                            <div className="deadline">30 days</div>
                            <div style={{marginBottom:'20px'}}>Filing and service deadline after filing the Appeal Record</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-lg-1 col-md-1">
                            <div className="vertical-line" style={{height:'186px', marginTop: '-20px'}}/>
                        </div>
                        <div className="col col-lg-11 col-md-11">
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
                            <hr />
                        </div>

                    </div>

                    <div className="row info-modal">
                        <div className="col col-lg-1 col-md-1">
                            <div shape="circle" className="info-modal-icon-container">
                                <img src="icons/icon-share.svg" className="info-modal-icon"/>
                            </div>
                        </div>
                        <div className="col col-lg-11 col-md-11">
                            <div className="deadline">7 days</div>
                            <div style={{marginBottom:'20px'}}>Filing and service deadline after receiving the Factum</div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-lg-1 col-md-1">
                            <div className="vertical-line" style={{height:'140px', marginTop: '-20px'}}/>
                        </div>
                        <div className="col col-lg-11 col-md-11">
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
                            <hr/>
                        </div>

                    </div>

                    <div className="row info-modal">
                        <div className="col col-lg-1 col-md-1">
                            <div shape="circle" className="info-modal-icon-container">
                                <img src="icons/icon-info.svg" className="info-modal-icon"/>
                            </div>
                        </div>
                        <div className="col col-lg-11 col-md-11">
                            <p> You may also be served a copy of the respondent’s Transcript Extract Book.
                                This document is for your awareness only and you do not have to respond
                                to it.</p>
                        </div>
                    </div>
                    <div className="row info-modal">
                        <div  style={{fontWeight:"bolder",marginBottom:'20px'}} className="col col-lg-11 col-md-11 col-sm-11 col-lg-offset-1 col-md-offset-1 col-sm-offset-1">
                           Need help completing a document?
                        </div>
                    </div>
                    <div className="row info-modal">
                        <div className="col col-lg-3 col-md-3 col-lg-offset-1 divider">
                            <a href=" https://www.courtofappealbc.ca/respondent-guidebook">Visit: SRL Guidebook</a>
                        </div>
                        <div className="col col-lg-4 col-md-4 divider right-info-cols">
                            <a href="mailto:courts.cso@gov.bc.ca">Email: Courts.cso@gov.bc.ca</a>
                        </div>
                        <div className="col col-lg-4 col-md-4 right-info-cols">
                            Call: 1-800-663-6102
                        </div>
                    </div>


                </div>

            </div>
        }
        return content;
    }

}
export default InfoModal;