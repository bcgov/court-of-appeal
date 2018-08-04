import React, { Component } from 'react';
import InfoPopupWrapper from "./common/InfoPopupWrapper";

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
            lineHeight: null,
            content: content
        }]
    }

    render () {
        return  (
            <InfoPopupWrapper
                title="Court Order"
                helpType="appellant"
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopupWrapper>
        );
    }

} export default AppellantCourtOrderPopup;