import React, { Component }from 'react';
import Help from './common/Help';

class AppellantFactumPopup extends Component {

    constructor(props) {
        super(props);
        let contentMap = [
            {
                line: "Complete either the .DOCs or .PDFs below:",
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.7-write-your-factum?ct=t(step-index-link)",
                            URLName: "Factum"
                        }, times: "4 x", link1: "DOC", link2: "PDF" },
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.9-preparing-the-transcript-extract-book?ct=t(step-index-link)",
                            URLName: "* Optional - Transcript and Extract Book" }, times: "1 x", link1: "DOC", link2: "PDF" },
                    { descriptionLink : {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.6-put-together-your-appeal-book?ct=t(step-index-link)",
                            URLName: "* Optional - Appeal Book"
                        }, times: "4 x", link1: "DOC", link2: "PDF" },
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
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrase: {startWith: "File a Factum and Appeal Book ", endWith: " of filing an Appeal Record."},
            deadline: " within 30 days ",
            lineHeight: '252px',
            expanded: true,
            contentMap: contentMap
        }, {
            expandable: true,
            sectionHeading: "Were you served with a respondent's Factum?",
            iconSrc :"/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadline:" within 7 days ",
            deadlinePhrase: {startWith: "File and serve a Reply ", endWith: " of receiving a Respondent's Factum."},
            lineHeight: '221px',
            contentMap: contentMap2
        }, {
            expandable: true,
            sectionHeading: "Were you served with a respondent's Transcript Extract Book?",
            iconSrc: "/icons/icon-info.svg",
            iconClass: "info-modal-icon",
            deadline: null,
            lineHeight: null,
            VLProps: null,
            content: [" You may also be served a copy of the respondent’s Transcript Extract Book.  " +
            " This document is for your awareness only and you do not have to respond to it."]
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