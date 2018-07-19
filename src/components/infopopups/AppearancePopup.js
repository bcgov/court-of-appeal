import React, { Component }from 'react';
import Help from './common/Help';
import {
    FILE_ONLINE_ONE_MSG, 
    FILE_STEP_THREE_MSG, 
    FILE_STEP_TWO_MSG,
    FILE_STEP_ONE_MSG_SINGULAR,
    FILE_MULTIPLES_STEP_TWO_MSG
} from "../../helpers/constants";

class AppearancePopup extends Component {

    constructor(props) {
        super(props);
        let contentMap = [
            {
                line: FILE_ONLINE_ONE_MSG,
                rows: [
                    {
                        onlineForm: true,
                        descriptionLink:
                            {
                                URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.5-if-the-appellant-applies-for-leave-to-appeal?ct=t(sidebar-link)",
                                URLName: "Notice of Appearance"
                            },
                        documentLink:
                            {
                                URL: process.env.PUBLIC_URL + "/form.2.html",
                                URLName: "Online form"
                            }
                    }
                ]
            },
            FILE_STEP_TWO_MSG,
            FILE_STEP_THREE_MSG
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: `Were you served with a ${this.props.noticeType}?`,
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{
                startWith: "You have ",
                deadline: " 10 days ",
                endWith: " to file and serve your response."
            }],
            last: false,
            contentMap: contentMap,
            infoModalDivider: false
        },
        {
            expandable: false,
            expanded: true,
            iconLine: false,
            deadlinePhrases: [{
                startWith: "You have ",
                deadline: " 10 days ",
                endWith: " to file and serve your Affidavit of Service, after you served the Notice of Appearance."
            }],
            last: false,
            contentMap: [
                {
                    line: FILE_STEP_ONE_MSG_SINGULAR,
                    rows: [
                        { descriptionLink: {
                                URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.5-if-the-appellant-applies-for-leave-to-appeal?ct=t(sidebar-link)",
                                URLName: "Affidavit of Service"
                            }, times: "1 x",
                            docLink: {
                                URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Affidavit.docx",
                                URLName: "DOC"
                            },
                            pdfLink: {
                                URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Affidavit.pdf",
                                URLName: "PDF"
                            }
                        }
                    ]
                },
                FILE_MULTIPLES_STEP_TWO_MSG,
                FILE_STEP_THREE_MSG
             ]
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