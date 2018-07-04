import React, { Component } from 'react';
import Help from "./common/Help";

class AppellantCourtOrderPopup extends Component {

    constructor(props) {
        super(props);

        let content = [
            {
                URLName: "How will I find out about my judgement?",
                URL: "https://www.courtofappealbc.ca/appellant-guidebook/4.1-getting-judgement?ct=t(sidebar-link)",
            },
            {
                URLName: "Who is responsible for preparing the Court Order?",
                URL: "https://www.courtofappealbc.ca/appellant-guidebook/4.3-court-orders?ct=t(sidebar-link)"
            },
            {
                URLName: "Who is responsible for paying for the hearing?",
                URL: "https://www.courtofappealbc.ca/appellant-guidebook/4.2-costs?ct=t(sidebar-link)"
            },
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
                        URL="https://www.courtofappealbc.ca/appellant-guidebook"
                        URLName="Visit: SRL Guidebook"
                    />
                </div>
            </div>
        );
    }

} export default AppellantCourtOrderPopup;