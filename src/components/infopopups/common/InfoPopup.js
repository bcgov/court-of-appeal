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
import AppealRecordPopup from "../AppealRecordPopup";
import AppellantInitialPopup from "../AppellantInitialPopup";
import NoticeOfHearingPopup from "../NoticeOfHearingPopup";
import AppellantCourtOrderPopup from "../AppellantCourtOrderPopup";

class InfoPopup extends Component {

    render () {
        if (this.props.show) {
            let props = {
                close : this.props.close,
                getSections: this.getSections.bind(this)
            };
            switch (this.props.type) {
                case 'factum' :
                    return <AppellantFactumPopup {...props} />;
                case 'replybook' :
                    return <ReplyBookPopup {...props} />;
                case 'respondenthearing' :
                    return <RespondentHearingPopup {...props} />;
                case 'courtorder' :
                    return <CourtOrderPopup {...props} />;
                case 'respondentfactum' :
                    return <RespondentFactumPopup {...props} />;
                case 'crossappeal' :
                    return <CrossAppealPopup {...props} />;
                case 'leave-application-appearance' :
                    return <AppearancePopup {...props} />;
                case 'appearance' :
                    return <AppearancePopup {...props}  noticeType="Notice of Appeal" />;
                case 'appealrecord' :
                    return <AppealRecordPopup {...props} />;
                case 'appellantinitial' :
                    return <AppellantInitialPopup {...props} />;
                case 'noticeofhearing' :
                    return <NoticeOfHearingPopup {...props} />;
                case 'appellantcourtorder' :
                    return <AppellantCourtOrderPopup {...props} />;
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
