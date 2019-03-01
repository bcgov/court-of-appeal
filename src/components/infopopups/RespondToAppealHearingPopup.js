import React, { Component } from 'react';
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class RespondToAppealHearingPopup extends Component {

    constructor(props) {
        super(props);

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "A division of three judges will review the decision of the single judge who heard the appeal.",
            iconSrc: "/icons/icon-hearing.svg",
            iconClass: "info-modal-icon"
        }]
    }

    render () {
        return  (
            <InfoPopupWrapper
                title="The Hearing"
                helpType={this.props.type}
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopupWrapper>
        );
    }

} export default RespondToAppealHearingPopup;