import React, { Component }from 'react';
import {
    SERVE_EACH_RESPONDENT_MSG,
    FILE_MULTIPLES_STEP_TWO_MSG,
    FILE_STEP_ONE_MSG,
    FILE_STEP_ONE_MSG_SINGULAR
} from "../../helpers/constants";
import InfoPopup from "./common/InfoPopup";

class AppellantFactumPopup extends Component {

    constructor(props) {
        super(props);
        let factumDocList = [
            {
                line: FILE_STEP_ONE_MSG,
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.7-write-your-factum?ct=t(step-index-link)",
                            URLName: "Factum"
                        }, times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/CA12345_factum_appellant_Final.dotx",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/CA12345_factum_appellant_respondent_Final.pdf",
                            URLName: "PDF"
                        }
                    },
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.9-preparing-the-transcript-extract-book?ct=t(step-index-link)",
                            URLName: "Optional - Transcript Extract Book",
                            tooltip: `<p>If a witness spoke at your original trial, and you </p>
                                      <p>mentioned this oral testimony in your Factum, you </p>
                                      <p>will need to complete a Transcript Extract Book.</p>`
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
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.6-put-together-your-appeal-book?ct=t(step-index-link)",
                            URLName: "Appeal Book"
                        }, times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2012.docx",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2012.pdf",
                            URLName: "PDF"
                        }
                    },
                    { descriptionLink : {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.11-prepare-and-file-a-certificate-of-readiness?ct=t(sidebar-link)",
                            URLName: "Certificate of Readiness"
                        }, times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2014.docx",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2014.pdf",
                            URLName: "PDF"
                        }
                    },
                ]
            },
            FILE_MULTIPLES_STEP_TWO_MSG,
            SERVE_EACH_RESPONDENT_MSG
        ];

        let respondentFactumDocList = [
            {
                line: FILE_STEP_ONE_MSG_SINGULAR,
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.8-replies?ct=t(sidebar-link)",
                            URLName: "Reply"
                        }, times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2011.docx",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2011.pdf",
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
            sectionHeading: "Complete the Factum, Appeal Book and Certificate of Readiness",
            iconType: 'share',
            iconClass: "info-modal-icon",
            deadlinePhrases: [{
                startWith: "You have ",
                deadline: "  30 days ",
                endWith: " to file and serve your documents after filing your Appeal Record."
            }],
            expanded: true,
            listContentMap: factumDocList
        }, {
            expandable: true,
            sectionHeading: "Were you served with a respondent's Factum?",
            iconType :"share",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{startWith: "You have ", deadline:" 7 days ", endWith: " to file and serve your documents."}],
            listContentMap: respondentFactumDocList
        }, {
            expandable: true,
            sectionHeading: "Were you served with a respondent's Transcript Extract Book or Appeal Book?",
            iconType: "info",
            iconClass: "info-modal-icon",
            deadline: null,
            VLProps: null,
            paragraphContentMap: ["If you are served with a copy of the respondent's Transcript Extract Book or Appeal Book, you do not have to respond."]
        }]
    }

    render() {

        let sections = this.props.getSections(this.sections);
        return (
            <InfoPopup
                title="The Factum, Appeal Book and Certificate of Readiness"
                helpType="appellant"
                close={this.props.close}
            >
                {sections}
            </InfoPopup>
        );
    }

}
export default AppellantFactumPopup;