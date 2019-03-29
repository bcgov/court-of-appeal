import React, { Component }from 'react';
import {
    FILE_ONLINE_ONE_MSG, 
    FILE_STEP_THREE_MSG, 
    FILE_STEP_TWO_MSG,
    FILE_STEP_ONE_MSG_SINGULAR,
    FILE_MULTIPLES_STEP_TWO_MSG
} from "../../helpers/constants";
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class AppearancePopup extends Component {

    constructor(props) {
        super(props);
        let listContentMap = [
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
            iconType: "share",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{
                startWith: "You have ",
                deadline: " 10 days ",
                endWith: " to file and serve your Notice of Appearance."
            }],
            last: false,
            listContentMap: listContentMap,
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
            listContentMap: [
                {
                    line: FILE_STEP_ONE_MSG_SINGULAR,
                    rows: [
                        { descriptionLink: {
                                URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.5-if-the-appellant-applies-for-leave-to-appeal?ct=t(sidebar-link)",
                                URLName: "Affidavit of Service"
                            }, times: "1 copy",
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

        return (
            <InfoPopupWrapper
                title="Notice of Appearance"
                helpType="respondent"
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopupWrapper>
        );
    }

}
export default AppearancePopup;