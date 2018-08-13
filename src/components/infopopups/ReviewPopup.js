import React, { Component } from 'react';
import {
    FILE_MULTIPLES_STEP_TWO_MSG,
    FILE_STEP_ONE_MSG,
    FILE_STEP_THREE_MSG
} from "../../helpers/constants";
import InfoPopupWrapper from "./common/InfoPopupWrapper";

class ReviewPopup extends Component {

    constructor(props) {
        super(props);

        let noticeOfApplicationMap = [
            {
                line: FILE_STEP_ONE_MSG,
                rows: [
                    { descriptionLink: {
                        URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.3-after-obtaining-or-being-refused-leave-to-appeal?ct=t(step-index-link)",
                        URLName: "Notice of Application to Vary" }, times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2015.doc",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2015.pdf",
                            URLName: "PDF"
                        }
                    },{ descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.5-if-the-appellant-applies-for-leave-to-appeal?ct=t(sidebar-link)",
                            URLName: "Optional: Affidavit",
                            tooltip: `<p>If you would like to include additional information</p>
                                      <p>to support your case, complete this Affidavit.</p>`
                        }, 
                        times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Affidavit.docx",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Affidavit.pdf",
                            URLName: "PDF"
                        }
                    },
                ]
            },
            FILE_MULTIPLES_STEP_TWO_MSG,
            FILE_STEP_THREE_MSG
        ];

        let motionBookMap = [
            {
                line: FILE_STEP_ONE_MSG,
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.3-after-obtaining-or-being-refused-leave-to-appeal?ct=t(step-index-link)",
                            URLName: "Motion Book" }, times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2016.doc",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2016.pdf",
                            URLName: "PDF"
                        }
                    }
                ]
            },
            FILE_MULTIPLES_STEP_TWO_MSG,
            FILE_STEP_THREE_MSG
        ];

        this.sections = [{
            expandable: true,
            expanded: true,
            sectionHeading: "Complete a Notice of Application to Vary an Order of Justice",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            lineHeight: "263px",
            deadlinePhrases: [{
                startWith: "You have  ",
                deadline: " 7 days ",
                endWith: ` to file and serve the document below after the Leave to Appeal was refused. 
                    If necessary, file and serve optional documents at the same time. `
            }],
            listContentMap: noticeOfApplicationMap
        },{
            expandable: true,
            expanded: false,
            sectionHeading: "Complete a Motion Book",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{
                startWith: "You have ",
                deadline: " 14 days ",
                endWith: ` to file and serve the document below after filing and serving the Notice of 
                 Application to Vary an Order of a Justice.` }],
            lineHeight: null,
            listContentMap: motionBookMap
        }]
    }

    render () {
        return  (
            <InfoPopupWrapper
                helpType="appellant"
                title="Application for Review"
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopupWrapper>
        );
    }

} export default ReviewPopup;