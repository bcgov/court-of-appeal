import React, { Component } from 'react';
import Help from "./common/Help";

class CourtOrderPopup extends Component {

    constructor(props) {
        super(props);

        let content = [
            {
                URLName: "How will I find out about my judgement?",
                URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.4-preparing-an-appeal-record?ct=t(step-index-link)",
            },
            {
                URLName: "How do I deal with costs?",
                URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.5-obtain-and-file-a-transcript-if-necessary?ct=t(step-index-link)"
            },
            {
                URLName: "How do I prepare my court order?",
                URL: "https://www.courtofappealbc.ca/appellant-guidebook/3.1-making-chambers-applications?ct=t(step-index-link)"
            }
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "For more information about the court order process, click the topics below: ",
            iconSrc: "/icons/icon-info.svg",
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
                    Court Order
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

} export default CourtOrderPopup;