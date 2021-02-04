import React, { Component } from 'react';
import InfoPopup from "./common/InfoPopup";

class RespondToLeaveToAppealHearingPopup extends Component {

    constructor(props) {
        super(props);

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "The appeal will be heard by a single judge sitting in Chambers who will grant or refuse to leave to appeal.",
           iconType: "hearing",
            iconClass: "info-modal-icon"
        }]
    }

    render () {
        return  (
            <InfoPopup
                title="The Hearing"
                helpType={this.props.type}
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopup>
        );
    }

} export default RespondToLeaveToAppealHearingPopup;