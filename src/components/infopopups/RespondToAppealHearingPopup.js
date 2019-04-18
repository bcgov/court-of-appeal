import React, { Component } from 'react';
import InfoPopup from "./common/InfoPopup";

class RespondToAppealHearingPopup extends Component {

    constructor(props) {
        super(props);

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "A division of three judges will review the decision of the single judge who heard the appeal.",
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

} export default RespondToAppealHearingPopup;