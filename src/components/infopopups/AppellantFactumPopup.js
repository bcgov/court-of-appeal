import React, { Component }from 'react';
import '../infopopup.css';
import Help from './Help';

class AppellantFactumPopup extends Component {

    constructor(props) {
        super(props);
        let contentMap = [
            {
                line: "Complete either the .DOCs or .PDFs below:",
                rows: [
                    { description: "Factum (Form 10)", times: "4 x", link1: "DOC", link2: "PDF" },
                    { description: "*Optional - Transcript and Extract Book (Form 13)", times: "1 x", link1: "DOC", link2: "PDF" },
                    { description: "Appeal Book (Form 12)", times: "4 x", link1: "DOC", link2: "PDF" },
                ]
            },
            "File the indicated number of copies to the registry.",
            "Serve one copy of each document to respondent."
        ];

        let contentMap2 = [
            {
                line: "IF you would like to reply, please complete either the .DOC or .PDF document below:",
                rows: [{description: "Reply (Form 11)", times: "4x", link1: "DOC", link2: "PDF"}]
            },
            "File the indicated number of copies to the registry.",
            "Serve one copy of each document to respondent."
        ];

        this.sections = [{
            expandable: true,
            sectionHeading: "Have you filed an Appeal Record ?",
            iconSrc: "icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrase: {first: "File a Factum and Appeal Book ", last: " of filing an Appeal Record."},
            deadline: " within 30 days ",
            lineHeight: '243px',
            last: false,
            expanded: true,
            contentMap: contentMap
        }, {
            expandable: true,
            sectionHeading: "Were you served with a respondent's Factum?",
            iconSrc :"icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadline:" within 7 days ",
            deadlinePhrase: {first: "File and serve a Reply ", last: " of receiving a Respondent's Factum."},
            content: true,
            lineHeight: '187px',
            last: false,
            contentMap: contentMap2
        }, {
            expandable: true,
            sectionHeading: "Were you served with a respondent's Transcript Extract Book?",
            expandedHeading: " You may also be served a copy of the respondent’s Transcript Extract Book.  " +
            " This document is for your awareness only and you do not have to respond to it.",
            iconSrc: "icons/icon-info.svg",
            iconClass: "info-modal-icon",
            deadline: null,
            content: " You may also be served a copy of the respondent’s Transcript Extract Book.  " +
            " This document is for your awareness only and you do not have to respond to it.",
            lineHeight: null,
            VLProps: null,
            last: true,
            contentMap: null
        }]
    }

    render() {

        let sections = this.props.getSections(this.sections);
        return (
            <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    The Factum and Appeal Book
                </div>
                <div className="info-modal-content">
                    {sections}
                    <Help
                        URL="https://www.courtofappealbc.ca/appellant-guidebook"
                        URLName="Visit: SRL Guidebook"
                    />
                </div>

            </div>
        );
    }

}
export default AppellantFactumPopup;