import React, { Component } from 'react';
import Help from "./common/Help";
import { FILE_STEP_ONE_MSG_SINGULAR, SERVE_EACH_RESPONDENT_MSG, FILE_STEP_TWO_MSG } from "../../helpers/constants";

class NoticeOfHearingPopup extends Component {

    constructor(props) {
        super(props);

        let docList = [
                {
                    line: FILE_STEP_ONE_MSG_SINGULAR,
                    rows: [
                        { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.13-prepare-and-file-a-notice-of-hearing?ct=t(step-index-link)",
                            URLName: "Notice of Hearing"
                        }, times: "4 copies",
                            docLink: {
                                URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2034.doc",
                                URLName: "DOC"
                            },
                            pdfLink: {
                                URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%2034.pdf",
                                URLName: "PDF"
                            }
                        }
                    ]
                },
                FILE_STEP_TWO_MSG,
                SERVE_EACH_RESPONDENT_MSG
                ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "Complete the Notice of Hearing",
            iconSrc: "/icons/icon-calendar.svg",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{
                startWith: "You have ",
                deadline: " 2 months",
                endWith: " to file and serve your document after submitting the Certificate of Readiness." }],
            lineHeight: null,
            contentMap: docList
        }]
    }

    render () {
        return  (
            <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    Notice of Hearing
                </div>
                <div className="info-modal-content">
                    {this.props.getSections(this.sections)}
                    <Help
                        URL="https://www.courtofappealbc.ca/appellant-guidebook"
                        URLName="Visit: Online Guidebook"
                    />
                </div>
            </div>
        );
    }

} export default NoticeOfHearingPopup;