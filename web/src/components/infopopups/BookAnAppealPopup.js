import React, { Component } from 'react';
import InfoPopup from "./common/InfoPopup";

class BookAnAppealPopup extends Component {

    constructor(props) {
        super(props);

        let paragraphContentMap = [
            {
                URLName: "BC Court of Appeal locations and contacts",
                URL: "http://www.courts.gov.bc.ca/court_of_appeal/court_locations_and_contacts.aspx",
            }
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "Contact your registry to reserve a date and time for your appeal. ",
            iconType: "hearing",
            iconClass: "info-modal-icon",
            paragraphContentMap: paragraphContentMap
        }]
    }

    render () {
        return  (
            <InfoPopup
                title="Book Appeal Date"
                helpType="appellant"
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopup>
        );
    }

} export default BookAnAppealPopup;