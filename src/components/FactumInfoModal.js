import React from 'react';
import '../components/infomodal.css';
import InfoModal from "./InfoModal";

class FactumInfoModal extends InfoModal {

    constructor(props) {
        super(props);

        this.detailedContent =
            <div className="row ">
                <div className="col col-lg-12 col-md-12 col-sm-12 info-modal-ol" >
                    1.&nbsp;&nbsp;If you would like to reply, please complete either the
                    .DOC or .PDF document below:

                    <div className="row bullet-list-row" >
                        <div className="col col-lg-1 col-md-1 bullet-div">
                            <div className="bullet" />
                        </div>
                        <div className="col col-lg-8 col-md-8" >
                            Reply (Form 11)
                        </div>
                        <div className="col col-lg-1 col-md-1">4 x</div>
                        <div className="col col-lg-1 col-md-1">Doc</div>
                        <div className="col col-lg-1 col-md-1">PDF</div>
                    </div>

                    <div  >
                        2.&nbsp;&nbsp;File the indicated number of copies to the registry.
                    </div>
                    <div  >
                        3.&nbsp;&nbsp;Serve one copy of each document to respondent.
                    </div>
                </div>
            </div>;

        this.state = {
            sections: [{
                expandable: false,
                sectionHeading: "Filing and service deadline after filing the Appeal Record",
                iconSrc: "icons/icon-clock.svg",
                iconClass: "info-modal-clock",
                deadline: "30 days",
                lineHeight: '225px',
                last: false
            }, {
                expandable: true,
                sectionHeading: "Were you served with a respondent's Factum?",
                expandedHeading: "Filing and service deadline after receiving the Factum",
                iconSrc :"icons/icon-share.svg",
                iconClass: "info-modal-icon",
                deadline:"7 days",
                content: true,
                lineHeight: '172px',
                helpSection: false,
                helpURL: null,
                helpURLName: null,
                last: false
            }, {
                expandable: true,
                sectionHeading: "Were you served with a respondent's Transcript Extract Book?",
                expandedHeading: " You may also be served a copy of the respondent’s Transcript Extract Book.  " +
                " This document is for your awareness only and you do not have to respond to it.",
                iconSrc: "icons/icon-info.svg",
                iconClass: "info-modal-icon",
                deadline: null,
                content: null,
                lineHeight: null,
                VLProps: null,
                helpSection: true,
                helpURL: "https://www.courtofappealbc.ca/respondent-guidebook",
                helpURLName: "Visit: SRL Guidebook",
                last: true
            }]
        }
    }

    render() {
        let content = null;

        if (this.props.show) {
            content =
                <InfoModal
                    title="The Factum and Appeal Book"
                    sections={this.state.sections}
                    close={this.props.close}
                    detailedContent={this.detailedContent}
                />
        }
        return content;
    }

}
export default FactumInfoModal;