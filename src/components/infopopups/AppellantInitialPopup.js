import React, { Component }from 'react';
import Help from './common/Help';
import {FILE_ONLINE_ONE_MSG, FILE_STEP_ONE_MSG_SINGULAR, FILE_STEP_THREE_MSG, FILE_STEP_TWO_MSG} from "../../helpers/constants";

class AppellantInitialPopup extends Component {

    constructor(props) {
        super(props);
        let NoticeOfAppeal = [
            {
                line: FILE_ONLINE_ONE_MSG,
                rows: [
                    {
                        onlineForm: true,
                        descriptionLink:
                            {
                                URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.2-what-do-you-prepare-if-you-have-an-automatic-right-to-appeal?ct=t(step-index-link)",
                                URLName: "Notice of Appeal"
                            },
                        documentLink:
                            {
                                URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%207.docx",
                                URLName: "Online form"
                            }
                    }
                ]
            },
            FILE_STEP_TWO_MSG,
            FILE_STEP_THREE_MSG
        ];

        let ProofOfService = [
            {
                line: FILE_STEP_ONE_MSG_SINGULAR,
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.2-what-do-you-prepare-if-you-have-an-automatic-right-to-appeal?ct=t(step-index-link)",
                            URLName: "Proof of Service"
                        }, times: "1 x",
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
            FILE_STEP_THREE_MSG
        ];

        this.sections = [{
            expandable: true,
            expanded: false,
            sectionHeading: "Notice of Appeal",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{
                startWith: "You have ",
                deadline: " 30 days ",
                endWith: " to file and serve your document after the initial court order is declared."
            }],
            lineHeight: '201px',
            last: false,
            contentMap: NoticeOfAppeal
        },{
            expandable: true,
            expanded: false,
            sectionHeading: "Proof of Service",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{
                startWith: "You have ",
                deadline: " 10 days ",
                endWith: " to file and serve your Proof of Service, after serving the Notice of Appeal to all of the respondents."
            }],
            last: false,
            contentMap: ProofOfService
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
                    <div className="info-modal-primary-heading row">
                        <div className="col-lg-offset-1 col-md-11 col-sm-11 col-lg-11 col-md-offset-1 col-sm-offset-1">
                            Would you like to start your appeal?</div>
                    </div>
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
export default AppellantInitialPopup;