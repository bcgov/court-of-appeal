import React, { Component } from 'react';
import Help from "./common/Help";
import {
    FILE_MULTIPLES_STEP_TWO_MSG,
    FILE_STEP_ONE_MSG,
    FILE_STEP_THREE_MSG
} from "../../helpers/constants";

class ApplicationForReviewPopup extends Component {

    constructor(props) {
        super(props);

        let noticeOfApplicationMap = [
            {
                line: FILE_STEP_ONE_MSG,
                rows: [
                    { descriptionLink: {
                        URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.3-after-obtaining-or-being-refused-leave-to-appeal?ct=t(step-index-link)",
                        URLName: "Notice of Application to Vary" }, times: "4 x",
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
                            URLName: "* Optional: Affidavit" }, times: "4 x",
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
                            URLName: "Motion Book" }, times: "4 x",
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
            deadline: " 7 days ",
            deadlinePhrase: { startWith: "You have  ", endWith: " to file and serve the document below after the Leave to Appeal was refused. If necessary, file and serve optional documents at the same time." },
            contentMap: noticeOfApplicationMap
        },{
            expandable: true,
            expanded: false,
            sectionHeading: "Complete a Motion Book",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadline: " 14 days ",
            deadlinePhrase: { startWith: "You have ", endWith: " to file and serve the document below after filing and serving the Notice of Application to Vary an Order of a Justice." },
            lineHeight: null,
            contentMap: motionBookMap
        }]
    }

    render () {
        return  (
            <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    Application for Review
                </div>
                <div className="info-modal-content">
                    {this.props.getSections(this.sections)}
                    <Help
                        URL="https://www.courtofappealbc.ca/respondent-guidebook"
                        URLName="Visit: SRL Guidebook"
                    />
                </div>
            </div>
        );
    }

} export default ApplicationForReviewPopup;