import React, { Component } from 'react';
import Help from "./common/Help";

class LeaveHearingPopup extends Component {

    constructor(props) {
        super(props);

        let content = [
            {
                URLName: "Leave to Appeal hearing.",
                URL: `https://www.courtofappealbc.ca/appellant-guidebook/2.1-how-do-you-start-an-appeal?ct=t(step-index-link)`,
            }
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "For more information about the hearing process to obtain Leave to Appeal, click the link below: ",
            iconSrc: "/icons/icon-hearing.svg",
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
                    The Hearing for Leave to Appeal
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

} export default LeaveHearingPopup;