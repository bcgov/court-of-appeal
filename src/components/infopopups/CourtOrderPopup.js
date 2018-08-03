import React, { Component } from 'react';
import Help from "./common/Help";

class CourtOrderPopup extends Component {

    constructor(props) {
        super(props);

        let content = [
            {
                URLName: "How will I find out about my judgement?",
                URL: "https://www.courtofappealbc.ca/respondent-guidebook/2.5-how-to-prepare-for-the-hearing?ct=t(sidebar-link)",
            },
            {
                URLName: "Who is responsible for paying for the hearing?",
                URL: "https://www.courtofappealbc.ca/respondent-guidebook/2.6-what-happens-at-the-hearing?ct=t(sidebar-link)"
            },
            {
                URLName: "How do I prepare my court order?",
                URL: "https://www.courtofappealbc.ca/respondent-guidebook/step-3-after-hearing?ct=t(sidebar-link)"
            }
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "For more information about the court order process, click the topics below: ",
            iconSrc: "/icons/icon-info.svg",
            iconClass: "info-modal-icon",
            lineHeight: null,
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
                        URLName="Visit: Online Guidebook"
                    />
                </div>
            </div>
        );
    }

} export default CourtOrderPopup;