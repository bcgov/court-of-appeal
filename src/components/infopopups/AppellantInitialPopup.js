import React, { Component }from 'react';
import {
    FILE_ONLINE_ONE_MSG,
    FILE_STEP_ONE_MSG_SINGULAR,
    SERVE_EACH_RESPONDENT_MSG,
    FILE_STEP_TWO_MSG
} from "../../helpers/constants";
import InfoPopupWrapper from "./common/InfoPopupWrapper";

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
                                action: props.redirectToForm7,
                                URLName: "Online form"
                            }
                    }
                ]
            },
            FILE_STEP_TWO_MSG,
            SERVE_EACH_RESPONDENT_MSG
        ];

        let AffidavitOfService = [
            {
                line: FILE_STEP_ONE_MSG_SINGULAR,
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.2-what-do-you-prepare-if-you-have-an-automatic-right-to-appeal?ct=t(step-index-link)",
                            URLName: "Affidavit of Service",
                            tooltip: 'To prove that you served the Notice of Appeal, file an affidavit of service.'
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
            sectionHeading: "Notice of Appeal",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{
                startWith: "You have ",
                deadline: " 30 days ",
                endWith: " to file and serve your document after the initial court order is declared."
            }],
            last: false,
            contentMap: NoticeOfAppeal,
            infoModalDivider: false
        },{
            expandable: false,
            expanded: true,
            sectionHeading: "Affidavit of Service",
            iconLine: false,
            deadlinePhrases: [{
                startWith: "You have ",
                deadline: " 10 days ",
                endWith: " to file and serve your Affidavit of Service, after serving the Notice of Appeal to all of the respondents."
            }],
            last: false,
            contentMap: AffidavitOfService
        }]
    }

    render() {

        return (
            <InfoPopupWrapper
                title="Initial Documents"
                helpType="appellant"
                close={this.props.close}
            >
                <div className="info-modal-primary-heading row">
                    <div className="col-lg-offset-1 col-md-11 col-sm-11 col-lg-11 col-md-offset-1 col-sm-offset-1">
                        Would you like to start your appeal?</div>
                </div>
                {this.props.getSections(this.sections)}
            </InfoPopupWrapper>
        );
    }

}
export default AppellantInitialPopup;