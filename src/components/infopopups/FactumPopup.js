import React from 'react';
import '../infopopup.css';
import InfoPopup from "../InfoPopup";

class FactumPopup extends InfoPopup {

    constructor(props) {
        super(props);
        let contentMap = [
            {
                line: "Complete either the .DOCs or .PDFs below:",
                rows: [
                    { description: "Factum (Form 10)", times: "4 x", link1: "DOC", link2: "PDF" },
                    { description: " Optional - Transcript and Extract Book (Form 13)", times: "1 x", link1: "DOC", link2: "PDF" },
                    { description: "Appeal Book (Form 12)", times: "4 x", link1: "DOC", link2: "PDF" },
                ]
            },
            "File the indicated number of copies to the registry.",
            "Serve one copy of each document to respondent."
        ];

        let contentMap2 = [
            {
                line: "If you would like to reply, please complete either the .DOC or .PDF document below:",
                rows: [{description: "Reply (Form 11)", times: "4x", link1: "DOC", link2: "PDF"}]
            },
            "File the indicated number of copies to the registry.",
            "Serve one copy of each document to respondent."
        ];

        this.state = {
            sections: [{
                expandable: false,
                sectionHeading: "Filing and service deadline after filing the Appeal Record",
                iconSrc: "icons/icon-clock.svg",
                iconClass: "info-modal-clock",
                deadline: "30 days",
                lineHeight: '225px',
                last: false,
                contentMap: contentMap
            }, {
                expandable: true,
                sectionHeading: "Were you served with a respondent's Factum?",
                expandedHeading: "Filing and service deadline after receiving the Factum",
                iconSrc :"icons/icon-share.svg",
                iconClass: "info-modal-icon",
                deadline:"7 days",
                content: true,
                lineHeight: '172px',
                helpSection: false,
                helpURL: null,
                helpURLName: null,
                last: false,
                contentMap: contentMap2
            }, {
                expandable: true,
                sectionHeading: "Were you served with a respondent's Transcript Extract Book?",
                expandedHeading: " You may also be served a copy of the respondent’s Transcript Extract Book.  " +
                " This document is for your awareness only and you do not have to respond to it.",
                iconSrc: "icons/icon-info.svg",
                iconClass: "info-modal-icon",
                deadline: null,
                content: null,
                lineHeight: null,
                VLProps: null,
                helpSection: true,
                helpURL: "https://www.courtofappealbc.ca/respondent-guidebook",
                helpURLName: "Visit: SRL Guidebook",
                last: true,
                contentMap: null
            }]
        }
    }

    render() {
        let content = null;

        if (this.props.show) {
            content =
                <InfoPopup
                    title="The Factum and Appeal Book"
                    sections={this.state.sections}
                    close={this.props.close}
                />
        }
        return content;
    }

}
export default FactumPopup;