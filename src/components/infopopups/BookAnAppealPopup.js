import React, { Component } from 'react';
import Help from "./common/Help";

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
            deadline: null,
            deadlinePhrase: null,
            lineHeight: null,
            content: content
        }]
    }

    render () {
        return  (
            <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    Book Appeal Date
                </div>
                <div className="info-modal-content">
                    {this.props.getSections(this.sections)}
                    <Help
                        URL="https://www.courtofappealbc.ca/appellant-guidebook"
                        URLName="Visit: SRL Guidebook"
                    />
                </div>
            </div>
        );
    }

} export default BookAnAppealPopup;