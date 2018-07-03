import React, { Component }from 'react';
import Help from './common/Help';

class AppearancePopup extends Component {

    constructor(props) {
        super(props);
        let contentMap = [
            {
                line: "Complete the form below.  Click on the document name for more information.",
                rows: [
                    { onlineForm: true, descriptionLink: {URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.5-if-the-appellant-applies-for-leave-to-appeal?ct=t(sidebar-link)", URLName: "Notice of Appearance"}, documentLink: {URL: process.env.PUBLIC_URL + "/form.2.html", URLName: "Online form" } }
                ]
            },
            "File the indicated number of copies to the registry.",
            "Serve one copy of each document to respondent."
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "Were you served with a Notice of Appeal?",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrase: {first: "You have ", last: " to file and serve your documents."},
            deadline: " 10 days ",
            lineHeight: '202px',
            last: false,
            contentMap: contentMap
        }]
    }

    render() {

        let sections = this.props.getSections(this.sections);
        return (
            <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    Notice of Appearance
                </div>
                <div className="info-modal-content">
                    {sections}
                    <Help
                        URL="https://www.courtofappealbc.ca/appellant-guidebook"
                        URLName="Visit: SRL Guidebook"
                    />
                </div>

            </div>
        );
    }

}
export default AppearancePopup;