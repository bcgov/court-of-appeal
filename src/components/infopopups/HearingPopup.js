import React, { Component } from 'react';
import Help from "./Help";

class HearingPopup extends Component {

    constructor(props) {
        super(props);

        let content = [
            {
                URLName: "How to prepare for your hearing?",
                URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.4-preparing-an-appeal-record?ct=t(step-index-link)",
            },
            {
                URLName: "What will happen at your hearing?",
                URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.5-obtain-and-file-a-transcript-if-necessary?ct=t(step-index-link)"
            },
            {
                URLName: "What to expect after your hearing?",
                URL: "https://www.courtofappealbc.ca/appellant-guidebook/3.1-making-chambers-applications?ct=t(step-index-link)"
            }
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "For more information about the hearing process, click the topics below: ",
            iconSrc: "icons/icon-info.svg",
            iconClass: "info-modal-icon",
            deadline: null,
            deadlinePhrase: null,
            lineHeight: null,
            last: true,
            content: content
        }]
    }

    render () {
        return  (
            <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    Your Hearing
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

} export default HearingPopup;