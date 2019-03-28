import React, { Component } from 'react';
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class HearingPopup extends Component {

    constructor(props) {
        super(props);

        let paragraphContentMap = [
            {
                URLName: "How do I prepare for my hearing?",
                URL: `https://www.courtofappealbc.ca/${this.props.type}-guidebook/${this.props.link1}`,
            },
            {
                URLName: "What will happen at my hearing?",
                URL: `https://www.courtofappealbc.ca/${this.props.type}-guidebook/${this.props.link2}`
            },
            {
                URLName: "What can I expect after my hearing?",
                URL: `https://www.courtofappealbc.ca/${this.props.type}-guidebook/${this.props.link3}`
            }
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "For more information about the hearing process, click the topics below: ",
           iconType: "hearing",
            iconClass: "info-modal-icon",
            paragraphContentMap: paragraphContentMap
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

} export default HearingPopup;