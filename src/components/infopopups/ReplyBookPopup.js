import React, { Component } from 'react';
import Help from "./common/Help";

class ReplyBookPopup extends Component {

    constructor(props) {
        super(props);

        let contentMap = [
            {
                line: "Complete either the .DOCs or .PDFs below:",
                rows: [
                    { descriptionLink: {
                        URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.5-if-the-appellant-applies-for-leave-to-appeal?ct=t(sidebar-link)",
                        URLName: "Reply Book" }, times: "1 x", link1: "DOC", link2: "PDF" },
                ]
            },
            "File the indicated number of copies to the registry.",
            "Serve one copy of each document to every other party."
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "Were you served with a Notice of Motion for Leave to Appeal and a Motion Book? ",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadline: " at least 5 days ",
            deadlinePhrase: { first: "File and then serve a Reply Book ", last: " before the hearing." },
            lineHeight: null,
            last: true,
            contentMap: contentMap
        }]
    }

    render () {
        return  (
            <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    Hearing Documents: Reply Book
                </div>
                <div className="info-modal-content">
                    {this.props.getSections(this.sections)}
                    <Help
                        URL="https://www.courtofappealbc.ca/respondent-guidebook"
                        URLName="Visit: SRL Guidebook"
                    />
                </div>
            </div>
        );
    }

} export default ReplyBookPopup;