import React, { Component } from 'react';
import Help from "./common/Help";

class HearingPopup extends Component {

    constructor(props) {
        super(props);

        let content = [
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
                    Your Hearing
                </div>
                <div className="info-modal-content">
                    {this.props.getSections(this.sections)}
                    <Help
                        URL={`https://www.courtofappealbc.ca/${this.props.type}-guidebook`}
                        URLName="Visit: Online Guidebook"
                    />
                </div>
            </div>
        );
    }

} export default HearingPopup;