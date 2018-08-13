import React, { Component } from 'react';
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class CompleteAppealPopup extends Component {

    constructor(props) {
        super(props);

        let content = [
            `The Court of Appeal decision is final, unless the Supreme Court of Canada
                agrees to hear your case.  For more information, please see the
                <a href="http://#" target="_blank">Online Guidebook</a>, or the
                <a href="https://www.scc-csc.ca/court-cour/role-eng.aspx#" target="_blank">Supreme Court</a>website.`
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "Your appeal is complete",

            iconSrc: "/icons/icon-info.svg",
            iconClass: "info-modal-icon",
            lineHeight: null,
            content: content
        }]
    }

    render () {
        return  (
            <InfoPopupWrapper
                title="Appeal Process Complete"
                helpType={this.props.type}
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopupWrapper>
        );
    }

} export default CompleteAppealPopup;