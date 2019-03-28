import React, { Component }from 'react';
import InfoPopupWrapper from "./common/InfoPopupWrapper";
import {FILE_STEP_ONE_MSG_SINGULAR, FILE_STEP_THREE_MSG, FILE_STEP_TWO_MSG} from "../../helpers/constants";

class CrossAppealPopup extends Component {

    constructor(props) {
        super(props);
        let listContentMap = [
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
           iconType: "share",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{startWith: "You have  ", deadline: " 15 days ", endWith: " to file and serve your documents, after receiving the Notice of Appeal or the order granting leave to appeal."}],
            listContentMap: listContentMap
        }, {
            expandable: true,
            sectionHeading: "The Appeal Record and Transcript",
            iconType :"info",
            iconClass: "info-modal-icon",
            paragraphContentMap: ["If you are served with a copy of the Appeal Record and Transcript, you do not have to respond to these documents."]
        }]
    }

    render() {
        return (
            <InfoPopupWrapper
                title=" Cross Appeal (Optional)"
                helpType="respondent"
                close={this.props.close}
            >
                <div className="info-modal-primary-heading row">
                    Were you served with any of the following documents?
                </div>
                {this.props.getSections(this.sections)}
            </InfoPopupWrapper>
        );
    }

} export default CrossAppealPopup;