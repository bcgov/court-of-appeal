import React, { Component }from 'react';
import Help from './common/Help';

class AppellantFactumPopup extends Component {

    constructor(props) {
        super(props);
        let factumDocList = [
            {
                line: "Complete either the .DOCs or .PDFs below.  Click on the document names for more information.",
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.7-write-your-factum?ct=t(step-index-link)",
                            URLName: "Factum"
                        }, times: "4 x", link1: "DOC", link2: "PDF" },
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.9-preparing-the-transcript-extract-book?ct=t(step-index-link)",
                            URLName: "* Optional - Transcript Extract Book" }, times: "4 x", link1: "DOC", link2: "PDF" },
                    { descriptionLink : {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.6-put-together-your-appeal-book?ct=t(step-index-link)",
                            URLName: "Appeal Book"
                        }, times: "4 x", link1: "DOC", link2: "PDF" },
                    { descriptionLink : {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.11-prepare-and-file-a-certificate-of-readiness?ct=t(sidebar-link)",
                            URLName: "Certificate of Readiness"
                        }, times: "4 x", link1: "DOC", link2: "PDF" },
                ]
            },
            "File the indicated number of copies to the registry.",
            "Serve one copy of each document to respondent."
        ];

        let respondentFactumDocList = [
            {
                line: "Complete either the .DOCs or .PDFs below.  Click on the document names for more information.",
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant- guidebook/2.8-replies?ct=t(sidebar-link)",
                            URLName: "Reply"
                        }, times: "4 x", link1: "DOC", link2: "PDF"
                    }
                ]
            }
         ];



        this.sections = [{
            expandable: true,
            sectionHeading: "Complete the Factum, Appeal Book, and Certificate of Readiness",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrase: {startWith: "You have ", endWith: " to file and serve your documents after filing your Appeal Record."},
            deadline: "  30 days ",
            lineHeight: '356px',
            expanded: true,
            contentMap: factumDocList
        }, {
            expandable: true,
            sectionHeading: "Were you served with a respondent's Factum?",
            iconSrc :"/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadline:" 7 days ",
            deadlinePhrase: {startWith: "You have ", endWith: " to file and serve your document."},
            lineHeight: '183px',
            contentMap: respondentFactumDocList
        }, {
            expandable: true,
            sectionHeading: "Were you served with a respondent's Transcript Extract Book or Appeal Book?",
            iconSrc: "/icons/icon-info.svg",
            iconClass: "info-modal-icon",
            deadline: null,
            lineHeight: null,
            VLProps: null,
            content: ["If you are served with a copy of the respondent's Transcript Extract Book or Appeal Book, you do not have to respond.  " +
                "These documents are for your awareness only."]
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