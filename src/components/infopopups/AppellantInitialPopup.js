import React, { Component }from 'react';
import Help from './common/Help';
import {FILE_ONLINE_ONE_MSG, FILE_STEP_THREE_MSG, FILE_STEP_TWO_MSG} from "../../helpers/constants";

class AppellantInitialPopup extends Component {

    constructor(props) {
        super(props);
        let NoticeOfAppeal = [
            {
                line: FILE_ONLINE_ONE_MSG,
                rows: [
                    {
                        onlineForm: true,
                        descriptionLink:
                            {
                                URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.2-what-do-you-prepare-if-you-have-an-automatic-right-to-appeal?ct=t(step-index-link)",
                                URLName: "Notice of Appeal"
                            },
                        documentLink:
                            {
                                URL: "#",
                                URLName: "Online form"
                            }
                    }
                ]
            },
            FILE_STEP_TWO_MSG,
            FILE_STEP_THREE_MSG
        ];

        let ProofOfService = [
            {
                line: "Complete the documents below.  Click on the document name for more information.",
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.2-what-do-you-prepare-if-you-have-an-automatic-right-to-appeal?ct=t(step-index-link)",
                            URLName: "Proof of Service"
                        }, times: "1 x", link1: "DOC", link2: "PDF"
                    }
                 ]
            },
            FILE_STEP_TWO_MSG,
            FILE_STEP_THREE_MSG
        ];

        this.sections = [{
            expandable: true,
            expanded: false,
            sectionHeading: "Notice of Appeal",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrase: {startWith: "You have ", endWith: " to file and serve your document after the initial court order is declared."},
            deadline: " 30 days ",
            lineHeight: '201px',
            last: false,
            contentMap: NoticeOfAppeal
        },{
            expandable: true,
            expanded: false,
            sectionHeading: "Proof of Service",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrase: {startWith: "You have ", endWith: " to file and serve your proof of service after serving all the respondents."},
            deadline: " 10 days ",
            last: false,
            contentMap: ProofOfService
        }]
    }

    render() {

        let sections = this.props.getSections(this.sections);
        return (
            <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    Initial Documents
                </div>
                <div className="info-modal-content">
                    <div className="info-modal-primary-heading row">
                        <div className="col-lg-offset-1 col-md-11 col-sm-11 col-lg-11 col-md-offset-1 col-sm-offset-1">
                            Would you like to start your appeal?</div>
                    </div>
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
export default AppellantInitialPopup;