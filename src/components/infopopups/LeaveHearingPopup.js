import React, { Component } from 'react';
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class LeaveHearingPopup extends Component {

    constructor(props) {
        super(props);

        let content = [
            {
                URLName: "What will happen at my hearing?",
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
            <InfoPopupWrapper
                title="The Hearing for Leave to Appeal"
                helpType="appellant"
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopupWrapper>
        );
    }

} export default LeaveHearingPopup;