import React, { Component }from 'react';
import './infopopup.css';
import Help from './Help';

class RespondentFactumPopup extends Component {

    constructor(props) {
        super(props);
        let contentMap = [
            {
                line: "Complete either the .DOCs or .PDFs below:",
                rows: [
                    { descriptionLink: {
                        URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.9-write-your-argument?ct=t(step-index-link)",
                        URLName: "Factum"
                        }, times: "1 x", link1: "DOC", link2: "PDF" },
                    { descriptionLink: {
                        URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.10-the-appellant-may-serve-a-transcript-extract-book?ct=t(step-index-link)",
                        URLName: "* Optional - Transcript and Extract Book" }, times: "1 x", link1: "DOC", link2: "PDF" },
                    { descriptionLink : {
                        URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.8-the-appellant-serves-an-appeal-book?ct=t(step-index-link)",
                        URLName: "* Optional - Appeal Book"
                        }, times: "1 x", link1: "DOC", link2: "PDF" },
                ]
            },
            "File the indicated number of copies to the registry.",
            "Serve one copy of each document to appellant."
        ];

        this.sections = [{
            expandable: true,
            sectionHeading: "The Factum and Appeal Book",
            iconSrc: "icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrase: {first: "You have  ", last: " to file and serve your documents."},
            deadline: " 30 days ",
            lineHeight: '275px',
            last: false,
            contentMap: contentMap
        }, {
            expandable: true,
            sectionHeading: "The Transcript Extract Book",
            iconSrc :"icons/icon-info.svg",
            iconClass: "info-modal-icon",
            lineHeight: '60px',
            last: false,
            content: ["If you are served with the appellant's Transcript Extract Book, you DO NOT have to respond to this document.  This" +
            " document is for your awareness only."]
        }, {
            expandable: true,
            sectionHeading: "Certificate of Readiness",
            iconSrc :"icons/icon-info.svg",
            iconClass: "info-modal-icon",
            lineHeight: '60px',
            last: false,
            content: ["If you are served with the appellant's Certificate of Readiness, you DO NOT have to respond to this document.  This" +
            " document is for your awareness only."]
        }, {
            expandable: true,
            sectionHeading: "A Reply to your Factum",
            iconSrc :"icons/icon-info.svg",
            iconClass: "info-modal-icon",
            lineHeight: '60px',
            last: false,
            content: ["If you are served with the appellant's Reply to Your Factum, you DO NOT have to respond to this document.  This" +
            " document is for your awareness only."]
        }, {
            expandable: true,
            sectionHeading: "A Notice of Hearing",
            iconSrc :"icons/icon-clock.svg",
            iconClass: "info-modal-clock",
            lineHeight: '121px',
            last: false,
            content: ["You should be served a Notice of Hearing from the appellant, which will tell you the date and length of your hearing." +
            "  However, if you were the one who submitted the Certificate of readiness, please click the link for more information",
                {URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.12-schedule-the-appeal-for-hearing?ct=t(step-index-link)", URLName: "Schedule the appeal for hearing"}]
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
                    <div className="info-modal-primary-heading row">
                        <div className="col-lg-offset-1 col-md-11 col-sm-11 col-lg-11 col-md-offset-1 col-sm-offset-1"> Were you served with any of the following documents?</div>
                    </div>
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
export default RespondentFactumPopup;