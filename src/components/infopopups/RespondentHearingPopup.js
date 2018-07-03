import React, { Component } from 'react';
import Help from "./common/Help";

class RespondentHearingPopup extends Component {

    constructor(props) {
        super(props);

        let content = [
            {
                URLName: "How do I prepare for my hearing?",
                URL: "https://www.courtofappealbc.ca/respondent-guidebook/2.5-how-to-prepare-for-the-hearing?ct=t(sidebar-link)",
            },
            {
                URLName: "What will happen at my hearing?",
                URL: "https://www.courtofappealbc.ca/respondent-guidebook/2.6-what-happens-at-the-hearing?ct=t(sidebar-link)"
            },
            {
                URLName: "What can I expect after my hearing?",
                URL: "https://www.courtofappealbc.ca/respondent-guidebook/step-3-after-hearing?ct=t(step-index-link)"
            }
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "For more information about the hearing process, click the topics below: ",
            iconSrc: "/icons/icon-info.svg",
            iconClass: "info-modal-icon",
            deadline: null,
            deadlinePhrase: null,
            lineHeight: null,
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

} export default RespondentHearingPopup;