import React, { Component } from 'react';
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class BookAnAppealPopup extends Component {

    constructor(props) {
        super(props);

        let content = [
            {
                URLName: "BC Court of Appeal locations and contacts",
                URL: "http://www.courts.gov.bc.ca/court_of_appeal/court_locations_and_contacts.aspx",
            }
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "Contact your registry to reserve a date and time for your appeal. ",
            iconSrc: "/icons/icon-hearing.svg",
            iconClass: "info-modal-icon",
            lineHeight: null,
            content: content
        }]
    }

    render () {
        return  (
            <InfoPopupWrapper
                title="Book Appeal Date"
                helpType="appellant"
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopupWrapper>
        );
    }

} export default BookAnAppealPopup;