import React, { Component }from 'react';
import Help from './common/Help';

class AppealRecordPopup extends Component {

    constructor(props) {
        super(props);
        let contentMap = [
            {
                line: "Complete either the .DOCs or .PDFs below.  Click on the document name for more information",
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.4-preparing-an-appeal-record?ct=t(sidebar-link)",
                            URLName: "Appeal Record"
                        }, times: "4 x", link1: "DOC", link2: "PDF" },
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.5-obtain-and-file-a-transcript-if-necessary?ct=t(sidebar-link)",
                            URLName: "* Optional - Transcript" }, times: "4 x", link1: "DOC", link2: "PDF" }
                ]
            },
            "File the indicated number of copies to the registry.",
            "Serve one copy of each document to respondent."
        ];

        this.sections = [{
            expandable: true,
            sectionHeading: "Complete the Appeal Record and Transcript",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrase: {startWith: "You have ", endWith: " to file and serve your documents after submitting the Notice of Appeal."},
            deadline: " 60 days ",
            lineHeight: '286px',
            contentMap: contentMap
        }, {
            expandable: true,
            sectionHeading: "Were you served with a Notice of Appearance or Cross Appeal?",
            iconSrc :"/icons/icon-info.svg",
            iconClass: "info-modal-icon",
            deadline:" within 7 days ",
            deadlinePhrase: {startWith: "File and serve a Reply ", endWith: " of receiving a Respondent's Factum."},
            lineHeight: '168px',
            content: ["If you are served with a copy of the respondent's Notice of Appearance or Cross Appeal, you DO NOT have to respond " +
                    "to these documents.  These documents are for your awareness only."]
        }]
    }

    render() {

        let sections = this.props.getSections(this.sections);
        return (
            <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    Appeal Record and Transcript
                </div>
                <div className="info-modal-content">
                    <div className="info-modal-primary-heading row">
                        <div className="col-lg-offset-1 col-md-11 col-sm-11 col-lg-11 col-md-offset-1 col-sm-offset-1">
                            Next Steps: File and serve the following documents:</div>
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
export default AppealRecordPopup;