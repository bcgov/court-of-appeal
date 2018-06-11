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
                                <img src="icons/icon-clock.svg" className="info-modal-icon"/>
                            </div>
                        </div>
                        <div className="col col-lg-11 col-md-11">
                            <p className="deadline">30 days</p>
                            <p>Filing and service deadline after filing the Appeal Record</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-lg-1 col-md-1">
                            <div className="vertical-line" style={{height:'150px', marginTop:'-20px'}}/>
                        </div>
                        <div className="col col-lg-11 col-md-11">
                            <ol>
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

                    <h2><strong>7 days</strong></h2>
                    <h2>Filing and service deadline after receiving the Factum</h2>


                    <ol>
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

                    <p>
                    You may also be served a copy of the respondent’s Transcript Extract Book.
                    This document is for your awareness only and you do not have to respond
                        to it.</p>


                    <p>Need help completing a document?</p>
                    Visit: SRL Guidebook    |   Email: Courts.cso@gov.bc.ca    |    Call: 1-800-663-6102

                </div>

            </div>
        }
        return content;
    }

}
export default InfoModal;