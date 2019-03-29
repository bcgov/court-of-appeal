import React, { Component } from 'react';
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class CourtOrderPopup extends Component {

    constructor(props) {
        super(props);

        let paragraphContentMap = [
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
           iconType: "info",
            iconClass: "info-modal-icon",
            paragraphContentMap: paragraphContentMap
        }]
    }

    render () {
        return  (
            <InfoPopupWrapper
                title="Court Order"
                helpType="respondent"
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopupWrapper>
        );
    }

} export default CourtOrderPopup;