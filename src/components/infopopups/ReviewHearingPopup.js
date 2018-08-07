import React, { Component } from 'react';
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class ReviewHearingPopup extends Component {

    constructor(props) {
        super(props);

        let content = [
            {
                URLName: "What can I do after being refused leave to appeal?",
                URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.3-after-obtaining-or-being-refused-leave-to-appeal",
            },
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "For more information about the Hearing to Vary an Order of Justice, click the topic below: ",
            iconSrc: "/icons/icon-hearing.svg",
            iconClass: "info-modal-icon",
            lineHeight: null,
            content: content
        }]
    }

    render () {
        return  (
            <InfoPopupWrapper
                helpType="appellant"
                title="The Hearing to Vary an Order of Justice"
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopupWrapper>
        );
    }

} export default ReviewHearingPopup;