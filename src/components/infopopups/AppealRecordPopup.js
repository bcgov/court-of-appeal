import React, { Component }from 'react';
import Help from './common/Help';
import {
    FILE_STEP_THREE_MSG,
    FILE_MULTIPLES_STEP_TWO_MSG,
    FILE_STEP_ONE_MSG
} from "../../helpers/constants";

class AppealRecordPopup extends Component {

    constructor(props) {
        super(props);
        let contentMap = [
            {
                line: FILE_STEP_ONE_MSG,
                rows: [
                    { descriptionLink: {
                            URL: "https://www.courtofappealbc.ca/appellant-guidebook/2.4-preparing-an-appeal-record?ct=t(sidebar-link)",
                            URLName: "Appeal Record"
                        }, times: "4 x",
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
                            URLName: "* Optional - Transcript" }, times: "4 x",
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
            FILE_STEP_THREE_MSG
        ];

        this.sections = [{
            expandable: true,
            sectionHeading: "Complete the Appeal Record and Transcript",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{
                    startWith: "You have ",
                    deadline: " 60 days ",
                    endWith: " to file and serve your documents after submitting the Notice of Appeal."
                }],
            lineHeight: '241px',
            contentMap: contentMap
        }, {
            expandable: true,
            sectionHeading: "Were you served with a Notice of Appearance or Cross Appeal?",
            iconSrc :"/icons/icon-info.svg",
            iconClass: "info-modal-icon",
            content: [`If you are served with a copy of the respondent's Notice of Appearance or Cross Appeal, you do not have to respond 
                        to these documents.`]
        }]
    }

    render() {

        let sections = this.props.getSections(this.sections);
        return (
            <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    Appeal Record and Transcript
                </div>
                <div className="info-modal-content">
                    <div className="info-modal-primary-heading row">
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
export default AppealRecordPopup;