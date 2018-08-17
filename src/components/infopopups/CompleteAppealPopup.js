import React, { Component } from 'react';
import InfoPopupWrapper from "./common/InfoPopupWrapper";
import InfoPopupIcon from "./common/InfoPopupIcon";
import InfoPopupSection from "./common/InfoPopupSection";

class CompleteAppealPopup extends Component {

    render () {
        let urls = {
            appellant: "step-1-deciding-to-appeal",
            respondent: "step-1-how-to-respond-to-an-appeal"
        };
        let title = this.props.completeAppealTitle ? this.props.completeAppealTitle : "Appeal Process Complete";
        let subject = this.props.type === 'respondent' ? "the appellant's" : "your";
        return  (
            <InfoPopupWrapper
                title={title}
                helpType={this.props.type}
                close={this.props.close}
            >
                <InfoPopupSection
                  sectionHeading="Your appeal process is complete"
                  iconSrc="/icons/icon-info.svg"
                  iconClass="info-modal-icon"
                  expandable={false}
                  expanded={true}
                >
                    The Court of Appeal decision is final, unless the Supreme Court of Canada
                    agrees to hear {subject} case.  For more information, please see the&nbsp;
                    <a href={`https://www.courtofappealbc.ca/${this.props.type}-guidebook/${urls[this.props.type]}`} target="_blank">Online Guidebook</a>,
                    or the&nbsp;
                    <a href="https://www.scc-csc.ca/court-cour/role-eng.aspx#" target="_blank">Supreme Court</a> website.
                </InfoPopupSection>
            </InfoPopupWrapper>
        );
    }

} export default CompleteAppealPopup;