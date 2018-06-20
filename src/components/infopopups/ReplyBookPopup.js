import React, { Component } from 'react';

class ReplyBookPopup extends Component {

    constructor(props) {
        super(props);

        let contentMap = [
            {
                line: "Complete either the .DOCs or .PDFs below:",
                rows: [
                    { description: "Reply Book", times: "1 x", link1: "DOC", link2: "PDF" },
                ]
            },
            "File the indicated number of copies to the registry.",
            "Serve one copy of each document to every other party."
        ];

        this.sections = [{
            expandable: false,
            sectionHeading: "Were you served with a Notice of Motion for Leave to Appeal and a Motion Book? " +
            " File a Reply Book at least 5 days before the hearing.",
            iconSrc: "icons/icon-clock.svg",
            iconClass: "info-modal-icon",
            deadline: " 5 days ",
            lineHeight: null,
            last: true,
            contentMap: contentMap,
            helpSection: true,
            helpURL: "https://www.courtofappealbc.ca/respondent-guidebook",
            helpURLName: "Visit: SRL Guidebook",
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
                </div>
            </div>
        );
    }

} export default ReplyBookPopup;