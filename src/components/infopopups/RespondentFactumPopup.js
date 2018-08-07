import React, { Component }from 'react';
import {
    FILE_STEP_ONE_MSG, FILE_MULTIPLES_STEP_TWO_MSG, FILE_STEP_THREE_MSG
} from "../../helpers/constants";
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class RespondentFactumPopup extends Component {

    constructor(props) {
        super(props);
        let contentMap = [
            {
                line: FILE_STEP_ONE_MSG,
                rows: [
                    { descriptionLink: {
                        URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.9-write-your-argument?ct=t(step-index-link)",
                        URLName: "Factum"
                        }, times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/CA12345_factum_respondent_Final.dotx",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/CA12345_factum_appellant_respondent_Final.pdf",
                            URLName: "PDF"
                        }
                    },
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.10-the-appellant-may-serve-a-transcript-extract-book?ct=t(step-index-link)",
                            URLName: "Optional - Transcript Extract Boook",
                            tooltip: 'If a witness spoke at your original trial/ hearing, and you mentioned this oral testimony in your Factum, you will need to complete a Transcript Extract Book.',
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
                    },
                    { descriptionLink : {
                            URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.8-the-appellant-serves-an-appeal-book?ct=t(step-index-link)",
                            URLName: "Optional - Appeal Book",
                            tooltip: 'If you would like to provide information that is not included in the Appellant’s Appeal Book, please complete your own Appeal Book.'
                        }, 
                        times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2012.docx",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2012.pdf",
                            URLName: "PDF"
                        }
                    },
                ]
            },
            FILE_MULTIPLES_STEP_TWO_MSG,
            FILE_STEP_THREE_MSG
        ];

        this.sections = [{
            expandable: true,
            expanded: true,
            sectionHeading: "The Factum and Appeal Book",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{startWith: "You have  ", deadline: " 30 days ", endWith: " to file and serve your documents."}],
            lineHeight: '270px',
            contentMap: contentMap
        }, {
            expandable: true,
            sectionHeading: "The Transcript Extract Book",
            iconSrc :"/icons/icon-info.svg",
            iconClass: "info-modal-icon",
            lineHeight: '62px',
            content: ["If you are served with the appellant's Transcript Extract Book, you do not have to respond to this document."]
        }, {
            expandable: true,
            sectionHeading: "The Certificate of Readiness",
            iconSrc :"/icons/icon-info.svg",
            iconClass: "info-modal-icon",
            lineHeight: '271px',
            content: ["You should have received the appellant's Certificate of Readiness, immediately after receiving the Factum. If you have not received the Certificate of Readiness, contact the appellant or the registry to see if one has been filed.  If a Certificate of Readiness has not been filed and you would like the appeal to proceed, you are responsible for completing the Certificate of Readiness and submitting it immediately after your Factum."],
            contentMap: [
                {
                    line: FILE_STEP_ONE_MSG,
                    rows: [
                        { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.12-if-the-appellant-does-not-prepare-a-certificate-of-readiness?ct=t(sidebar-link)",
                            URLName: "The Certificate of Readiness"
                            }, times: "4 copies",
                            docLink: {
                                URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2014.docx",
                                URLName: "DOC"
                            },
                            pdfLink: {
                                URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Form14.pdf",
                                URLName: "PDF"
                            }
                        }
                    ]
                },
                FILE_MULTIPLES_STEP_TWO_MSG,
                FILE_STEP_THREE_MSG
            ]
        }, {
            expandable: true,
            sectionHeading: "A Reply to your Factum",
            iconSrc :"/icons/icon-info.svg",
            iconClass: "info-modal-icon",
            lineHeight: '62px',
            content: ["If you are served with the appellant's Reply to your Factum, you do not have to respond to this document."]
        }, {
            expandable: true,
            sectionHeading: "A Notice of Hearing",
            iconSrc :"/icons/icon-calendar.svg",
            iconClass: "info-modal-icon",
            content: ["You should be served a Notice of Hearing from the appellant, which will tell you the date and length of your hearing." +
            "  However, if you were the one who submitted the Certificate of Readiness, please click the link for more information.",
                {
                    URL: "https://www.courtofappealbc.ca/respondent-guidebook/2.3-schedule-the-appeal-for-hearing?ct=t(step-index-link)",
                    URLName: "Schedule the appeal for hearing"}]
        }]
    }

    render() {
        return (
            <InfoPopupWrapper
                helpType="respondent"
                title="The Factum and Appeal Book"
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopupWrapper>
        );
    }

}
export default RespondentFactumPopup;