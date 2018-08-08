import React, { Component } from 'react';
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class CompleteAppealPopup extends Component {

    constructor(props) {
        super(props);

        let content = [
            {
                    URL: 'https://www.scc-csc.ca/court-cour/role-eng.aspx#',
                    URLName: 'Supreme Court of Canada'
            }
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: `The Court of Appeal decision is final, but may be appealed in a higher court.  For more information,
                             see the Supreme Court of Canada website below.`,
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