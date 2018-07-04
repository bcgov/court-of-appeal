import React, {Component} from 'react';
import './infopopup.css';
import InfoPopupSection from './InfoPopupSection';
import AppellantFactumPopup from "../AppellantFactumPopup";
import ReplyBookPopup from "../ReplyBookPopup";
import RespondentHearingPopup from "../RespondentHearingPopup";
import CourtOrderPopup from "../CourtOrderPopup";
import RespondentFactumPopup from "../RespondentFactumPopup";
import CrossAppealPopup from "../CrossAppealPopup";
import AppearancePopup from "../AppearancePopup";
import BulletedList from "../../list/BulletedList";
import App from "../../../App";
import AppealRecordPopup from "../AppealRecordPopup";

class InfoPopup extends Component {

    render () {
        if (this.props.show) {
            switch (this.props.type) {
                case 'factum' :
                    return <AppellantFactumPopup
                        close={this.props.close}
                        getSections={this.getSections.bind(this)}
                    />;
                case 'replybook' :
                    return <ReplyBookPopup
                        close={this.props.close}
                        getSections={this.getSections.bind(this)}
                    />;
                case 'respondenthearing' :
                    return <RespondentHearingPopup
                        close={this.props.close}
                        getSections={this.getSections.bind(this)}
                        />;
                case 'courtorder' :
                    return <CourtOrderPopup
                        close={this.props.close}
                        getSections={this.getSections.bind(this)}
                    />;
                case 'respondentfactum' :
                    return <RespondentFactumPopup
                        close={this.props.close}
                        getSections={this.getSections.bind(this)}
                    />;
                case 'crossappeal' :
                    return <CrossAppealPopup
                        close={this.props.close}
                        getSections={this.getSections.bind(this)}
                    />;
                case 'leave-application-appearance' :
                    return <AppearancePopup
                        close={this.props.close}
                        getSections={this.getSections.bind(this)}
                        noticeType="Notice of Application for Leave to Appeal"
                    />;
                case 'appearance' :
                    return <AppearancePopup
                        close={this.props.close}
                        getSections={this.getSections.bind(this)}
                        noticeType="Notice of Appeal"
                    />;
                case 'appealrecord' :
                    return <AppealRecordPopup
                        close={this.props.close}
                        getSections={this.getSections.bind(this)}
                    />;
                default :
                    return null;
            }
        } else {
            return null;
        }
    }

     getSections (sectionList) {

        const sections = sectionList.map((sectionProps, key) => {
            return (
                <InfoPopupSection
                    key={ key }
                    { ...sectionProps }
                    getListContent={ this.getListContent.bind(this) }
                    getContent={ this.getParagraphContent.bind(this) }
                />
            )

        });
        return (sections);
    }

    getParagraphContent (contentOrMap) {

        if (!contentOrMap) {
            return null;
        }

        let content = contentOrMap.map((value, index) => {
            let paragraph = value;
            if (value.URL) {
               paragraph = <a href={value.URL} target="_blank">{value.URLName}</a>;
            }

            return (
                <div key={index}>
                    {paragraph}
                </div>
            ) ;

        });

        return (
           <div className="row info-paragraph">
               <div className="col" >
                { content }
               </div>
           </div>
        );
    }

    /**
     * getListContent turns a map into a numbered list, potentially containing nested bulleted lists. It assumes that any objects within
     * the map define a bulleted list.
     *
     * @param listItems - map of list rows consisting of either strings (for a numbered row) or objects (defining a bulleted list)
     * @returns {*}
     */
    getListContent (listItems) {
        if (!listItems) {
            return null;
        }

        let listContent = listItems.map((value, index) => {
            let listRow = value;
            let key = index + 1;

            if (listRow instanceof Object) {
               return (
                   <BulletedList
                       index={key}
                       key={key}
                       heading={listRow.line}
                       rows={listRow.rows}
                    />
               );

            } else {
                return (
                    <div key={"row" + key} className={"row"}>
                        {key} .&nbsp;&nbsp; {listRow}
                    </div>
                );
            }
        });

        return (
            <div className="row ">
                <div className="col col-lg-12 col-md-12 col-sm-12 info-modal-ol">
                    {listContent}
                </div>
            </div>
        );
    }
}
export default InfoPopup;
