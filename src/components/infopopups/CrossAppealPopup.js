import React, { Component }from 'react';
import Help from './common/Help';
import {FILE_STEP_ONE_MSG_SINGULAR, FILE_STEP_THREE_MSG, FILE_STEP_TWO_MSG} from "../../helpers/constants";

class CrossAppealPopup extends Component {

    constructor(props) {
        super(props);
        let contentMap = [
            {
                line: FILE_STEP_ONE_MSG_SINGULAR,
                rows: [
                    { 
                        descriptionLink: {
                            URL: "http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/297_2001a#part4",
                            URLName: "Notice of Cross Appeal"
                        },
                        times: "1 copy",
                        docLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%208.docx",
                            URLName: "DOC"
                        },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%208.pdf",
                            URLName: "PDF"
                        }
                    },
                ]
            },
            FILE_STEP_TWO_MSG,
            FILE_STEP_THREE_MSG
        ];

        this.sections = [{
            expandable: true,
            expanded: true,
            sectionHeading: "The Notice of Appeal or the order granting leave to appeal",
            iconSrc: "/icons/icon-share.svg",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{startWith: "You have  ", deadline: " 15 days ", endWith: " to file and serve your documents, after receiving the Notice of Appeal or the order granting leave to appeal."}],
            lineHeight: '205px',
            contentMap: contentMap
        }, {
            expandable: true,
            sectionHeading: "The Appeal Record and Transcript",
            iconSrc :"/icons/icon-info.svg",
            iconClass: "info-modal-icon",
            content: ["If you are served with a copy of the Appeal Record and Transcript, you do not have to respond to these documents."]
        }]
    }

    render() {

        let sections = this.props.getSections(this.sections);
        return (
            <div id="info-modal" className="modal" style={{display: 'block'}} >
                <div className="info-modal-title ">
                    <span id="close-modal" onClick={this.props.close}>&times;</span>
                    Cross Appeal (Optional)
                </div>
                <div className="info-modal-content">
                    <div className="info-modal-primary-heading row">
                        <div className="col-lg-offset-1 col-md-11 col-sm-11 col-lg-11 col-md-offset-1 col-sm-offset-1">
                            Were you served with any of the following documents?
                        </div>
                    </div>
                    {sections}
                    <Help
                        URL="https://www.courtofappealbc.ca/respondent-guidebook"
                        URLName="Visit: SRL Guidebook"
                    />
                </div>

            </div>
        );
    }

} export default CrossAppealPopup;