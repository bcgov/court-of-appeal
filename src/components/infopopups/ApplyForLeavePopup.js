import React, { Component }from 'react';
import ReactTooltip from "react-tooltip";
import Help from './common/Help';
import {
    FILE_MULTIPLES_STEP_TWO_MSG,
    FILE_STEP_ONE_MSG_SINGULAR,
    SERVE_EACH_RESPONDENT_MSG,
    FILE_STEP_TWO_MSG
} from "../../helpers/constants";

class ApplyForLeavePopup extends Component {

    constructor(props) {
        super(props);
        let NoticeOfApplicationForLeave = [
            {
                line: FILE_STEP_ONE_MSG_SINGULAR,
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.1-how-do-you-start-an-appeal?ct=t(step-index-link)",
                            URLName: "Notice of Application for Leave to Appeal"
                        }, times: "4 copies",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%201.docx",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/fillable_forms/civil_rules_forms/Form1.pdf",
                            URLName: "PDF"
                        }

                    }
                ]
            },
            FILE_MULTIPLES_STEP_TWO_MSG,
            SERVE_EACH_RESPONDENT_MSG
        ];

        let AffidavitOfService = [
            {
                line: FILE_STEP_ONE_MSG_SINGULAR,
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.2-what-do-you-prepare-if-you-have-an-automatic-right-to-appeal?ct=t(step-index-link)",
                            URLName: "Affidavit of Service",
                            tooltip: 'To prove that you served the Notice of Application for Leave to Appeal, file an affidavit of service.'
                        }, 
                        times: "1 copy",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Affidavit%20of%20Service.docx",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Affidavit%20of%20Service.pdf",
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
            sectionHeading: "Notice of Application for Leave to Appeal",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{startWith: "File the document below ", deadline: " within 30 days ", endWith: " of the decision you want to appeal."}],
            last: false,
            contentMap: NoticeOfApplicationForLeave,
            infoModalDivider: false
        },{
            expandable: false,
            expanded: true,
            sectionHeading: "Affidavit of Service",
            iconLine: false,
            deadlinePhrases: [{startWith: "File Affidavit of Service ", deadline: " within 10 days ", endWith: " of serving all respondents."}],
            last: false,
            contentMap: AffidavitOfService
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
                    {sections}
                    <Help
                        URL="https://www.courtofappealbc.ca/appellant-guidebook"
                        URLName="Visit: SRL Guidebook"
                    />
                </div>
                <ReactTooltip/>
            </div>
        );
    }

}
export default ApplyForLeavePopup;