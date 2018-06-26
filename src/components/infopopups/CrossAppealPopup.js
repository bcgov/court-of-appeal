import React, { Component }from 'react';
import './infopopup.css';
import Help from './Help';

class CrossAppealPopup extends Component {

    constructor(props) {
        super(props);
        let contentMap = [
            {
                line: "Complete either the .DOCs or .PDFs below:",
                rows: [
                    { description: "Notice of Cross Appeal", times: "1 x", link1: "DOC", link2: "PDF" },
                ]
            },
            "File the indicated number of copies to the registry.",
            "Serve one copy of each document to appellant."
        ];

        this.sections = [{
            expandable: true,
            sectionHeading: "The Notice of Appeal or the order granting leave to appeal",
            iconSrc: "icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrase: {first: "You have  ", last: " to file and serve your documents, after receiving the last document."},
            deadline: " 15 days ",
            lineHeight: '252px',
            last: false,
            contentMap: contentMap
        }, {
            expandable: true,
            sectionHeading: "The Appeal Record and Transcript",
            iconSrc :"icons/icon-info.svg",
            iconClass: "info-modal-icon",
            lineHeight: '60px',
            last: false,
            content: ["If you are served with a copy of the Appeal Record and Transcript, you DO NOT have to respond to this document.  This" +
            " document is for your awareness only."]
        }]
    }

    render() {

        let sections = this.props.getSections(this.sections);
        return (
            <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    Cross Appeal (If Applicable)
                </div>
                <div className="info-modal-content">
                    <div className="info-modal-primary-heading ">Were you served with any of the following documents?</div>
                    {sections}
                    <Help
                        URL="https://www.courtofappealbc.ca/appellant-guidebook"
                        URLName="Visit: SRL Guidebook"
                    />
                </div>

            </div>
        );
    }

} export default CrossAppealPopup;