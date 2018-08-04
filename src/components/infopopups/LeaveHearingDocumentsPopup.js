import React, { Component }from 'react';
import {
    FILE_MULTIPLES_STEP_TWO_MSG,
    FILE_STEP_ONE_MSG,
    SERVE_EACH_RESPONDENT_MSG,
} from "../../helpers/constants";
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class LeaveHearingDocumentsPopup extends Component {

    constructor(props) {
        super(props);
        let NoticeOfMotion = [
            {
                line: FILE_STEP_ONE_MSG,
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.1-how-do-you-start-an-appeal?ct=t(step-index-link)",
                            URLName: "Notice of Motion"
                        }, times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%203.doc",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Form3.pdf",
                            URLName: "PDF"
                        }

                    },
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.1-how-do-you-start-an-appeal?ct=t(step-index-link)",
                            URLName: "Motion Book"
                        }, times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%204.doc",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%204.pdf",
                            URLName: "PDF"
                        }
                    }
                ]
            },
            FILE_MULTIPLES_STEP_TWO_MSG,
            SERVE_EACH_RESPONDENT_MSG
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "Notice of Motion and Motion Book",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{
                startWith: "You have ",
                deadline: " 30 days ",
                endWith: " to file the documents below after filing your Notice of Application for Leave to Appeal. "
            },{
                startWith: " Next, serve each respondent with a copy ",
                deadline: "at least 10 business days",
                endWith: "before the hearing. "
            }],
            last: false,
            contentMap: NoticeOfMotion
        }]
    }

    render() {
        return (
            <InfoPopupWrapper
                title="Hearing Documents"
                helpType="appellant"
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopupWrapper>
        );
    }
}
export default LeaveHearingDocumentsPopup;