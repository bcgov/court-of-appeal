import React, { Component } from 'react';
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class RespondToLeaveToAppealHearingPopup extends Component {

    constructor(props) {
        super(props);

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "The appeal will be heard by a single judge sitting in Chambers who will grant or refuse to leave to appeal.",
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

} export default RespondToLeaveToAppealHearingPopup;