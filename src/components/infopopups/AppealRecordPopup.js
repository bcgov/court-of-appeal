import React, { Component }from 'react';
import {
    SERVE_EACH_RESPONDENT_MSG,
    FILE_MULTIPLES_STEP_TWO_MSG,
    FILE_STEP_ONE_MSG
} from "../../helpers/constants";
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class AppealRecordPopup extends Component {

    constructor(props) {
        super(props);
        let listContentMap = [
            {
                line: FILE_STEP_ONE_MSG,
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.4-preparing-an-appeal-record?ct=t(sidebar-link)",
                            URLName: "Appeal Record"
                        }, times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%209.docx",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%209.pdf",
                            URLName: "PDF"
                        }
                    },
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.5-obtain-and-file-a-transcript-if-necessary?ct=t(sidebar-link)",
                            URLName: "Optional - Transcript",
                            tooltip: `<p>If a witness spoke at your original trial, and you mentioned  </p>
                                      <p>this oral testimony in your Factum, you will need to complete </p>
                                      <p>a Transcript Extract Book.</p>`,
                        }, 
                        times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form13.docx",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2013.pdf",
                            URLName: "PDF"
                        }
                    }
                ]
            },
            FILE_MULTIPLES_STEP_TWO_MSG,
            SERVE_EACH_RESPONDENT_MSG
        ];

        this.sections = [{
            expandable: true,
            expanded: true,
            sectionHeading: "Complete the Appeal Record and Transcript",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{
                    startWith: "You have ",
                    deadline: " 60 days ",
                    endWith: " to file and serve your documents after submitting the Notice of Appeal."
                }],
            lineHeight: '266px',
            listContentMap: listContentMap
        }, {
            expandable: true,
            sectionHeading: "Were you served with a Notice of Appearance or Cross Appeal?",
            iconSrc :"/icons/icon-info.svg",
            iconClass: "info-modal-icon",
            paragraphContentMap: [`If you are served with a copy of the respondent's Notice of Appearance or Cross Appeal, you do not have to respond 
                        to these documents.`]
        }]
    }

    render() {
        let sections = this.props.getSections(this.sections);
        return (
            <InfoPopupWrapper
                title={"Appeal Record and Transcript"}
                helpType="appellant"
                close={this.props.close}
            >
                <div className="info-modal-primary-heading row">
                </div>
                {sections}
            </InfoPopupWrapper>
        );
    }

}
export default AppealRecordPopup;