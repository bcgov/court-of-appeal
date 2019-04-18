import React, { Component } from 'react';
import {
    FILE_MULTIPLES_STEP_TWO_MSG,
    FILE_STEP_ONE_MSG_SINGULAR,
    FILE_STEP_THREE_MSG
} from "../../helpers/constants";
import InfoPopup from "./common/InfoPopup";

class ReplyBookPopup extends Component {

    constructor(props) {
        super(props);

        let listContentMap = [
            {
                line: FILE_STEP_ONE_MSG_SINGULAR,
                rows: [
                    { descriptionLink: {
                        URL: "https://www.courtofappealbc.ca/respondent-guidebook/1.5-if-the-appellant-applies-for-leave-to-appeal?ct=t(sidebar-link)",
                        URLName: "Reply Book" }, times: "4 copies",
                        docLink:
                            {
                                URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%205.doc",
                                URLName: "DOC"
                            },
                        pdfLink: {
                            URL: "http://www.courts.gov.bc.ca/Court_of_Appeal/practice_and_procedure/Forms/Form%205.pdf",
                            URLName: "PDF"
                        }
                    },
                ]
            },
            FILE_MULTIPLES_STEP_TWO_MSG,
            FILE_STEP_THREE_MSG
        ];

        this.sections = [{
            expandable: false,
            expanded: true,
            sectionHeading: "Were you served with a Notice of Motion for Leave to Appeal and a Motion Book? ",
           iconType: "share",
            iconClass: "info-modal-icon",
            deadlinePhrases: [{
                startWith: "File and then serve a Reply Book ",
                deadline: " at least 5 days ",
                endWith: " before the hearing."
            }],
            listContentMap: listContentMap
        }]
    }

    render () {
        return  (
            <InfoPopup
                helpType="respondent"
                title="Hearing Documents: Reply Book"
                close={this.props.close}
            >
                {this.props.getSections(this.sections)}
            </InfoPopup>
        );
    }

} export default ReplyBookPopup;