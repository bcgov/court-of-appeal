import React, {Component} from 'react';
import '../components/infomodal.css';
import InfoModalSection from './InfoModalSection';
import ExpandableSection from './ExpandableSection';

class InfoModal extends Component {

    render() {

        let expandedContent = (
            <ol style={{fontWeight:"bolder"}}>
                <li>
                    IF you would like to reply, please complete either the
                    .DOC or .PDF document below:
                    <ul>
                        <li> Reply (Form 11)</li>
                    </ul>
                </li>
                <li>
                    File the indicated number of copies to the registry.
                </li>
                <li>
                    Serve one copy of each document to respondent.
                </li>
            </ol>
        );

       return (
           <div id="info-modal" className="modal" style={{display: 'block'}} >
            <div className="info-modal-title ">
                <span id="close-modal" onClick={this.props.close}>&times;</span>
                {this.props.title}
            </div>
            <div className="info-modal-content">
               <InfoModalSection
                   sectionHeading="Filing and service deadline after filing the Appeal Record"
                   iconSrc="icons/icon-clock.svg"
                   iconClass="info-modal-clock"
               />
                <ExpandableSection
                    iconSrc="icons/icon-share.svg"
                    iconClass="info-modal-icon"
                    initialHeading="Were you served with a respondent's Factum?"
                    expandedHeading="Filing and service deadline after receiving the Factum"
                    content={expandedContent}
                    verticalLine={true}
                    VLProps={{height:'156px', marginTop: '-45px', marginBottom: '-18px'}}
                    helpSection={false}
                    deadLine="7 days"
                    />
                <ExpandableSection
                    iconSrc="icons/icon-info.svg"
                    iconClass="info-modal-icon"
                    initialHeading="Were you served with a respondent's Transcript Extract Book?"
                    expandedHeading={" You may also be served a copy of the respondent’s Transcript Extract Book.\n" +
                    "                                This document is for your awareness only and you do not have to respond\n" +
                    "                                to it."}
                    content={null}
                    verticalLine={false}
                    helpSection={true}
                    />
            </div>
        </div>);
    }

}
export default InfoModal;