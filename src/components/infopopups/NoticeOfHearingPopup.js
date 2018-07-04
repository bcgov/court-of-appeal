import React, { Component } from 'react';
import Help from "./common/Help";

class NoticeOfHearingPopup extends Component {

    constructor(props) {
        super(props);

        let docList = [
                {
                    line: "Complete either the .DOCs or .PDFs below.  Click on the document names for more information.",
                    rows: [
                        { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant- guidebook/2.13-prepare-and-file-a-notice-of- hearing?ct=t(step-index-link)",
                            URLName: "Notice of Hearing"
                        }, times: "4 x", link1: "DOC", link2: "PDF" }
                    ]
                },
                "File the indicated number of copies to the registry.",
                "Serve one copy of each document to respondent."
                ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "Complete the Notice of Hearing",
            iconSrc: "/icons/icon-calendar.svg",
            iconClass: "info-modal-calendar",
            deadline: " 3 months",
            deadlinePhrase: { startWith: "You have ", endWith: " to file and serve your document after submitting the " +
                "Certificate of Readiness." },
            lineHeight: null,
            contentMap: docList
        }]
    }

    render () {
        return  (
            <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    Notice of Hearing
                </div>
                <div className="info-modal-content">
                    {this.props.getSections(this.sections)}
                    <Help
                        URL="https://www.courtofappealbc.ca/appellant-guidebook"
                        URLName="Visit: SRL Guidebook"
                    />
                </div>
            </div>
        );
    }

} export default NoticeOfHearingPopup;