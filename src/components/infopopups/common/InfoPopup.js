import React, {Component} from 'react';
import './infopopup.css';
import InfoPopupSection from './InfoPopupSection';
import AppellantFactumPopup from "../AppellantFactumPopup";
import ReplyBookPopup from "../ReplyBookPopup";
import CourtOrderPopup from "../CourtOrderPopup";
import RespondentFactumPopup from "../RespondentFactumPopup";
import CrossAppealPopup from "../CrossAppealPopup";
import AppearancePopup from "../AppearancePopup";
import BulletedList from "../../list/BulletedList";
import AppealRecordPopup from "../AppealRecordPopup";
import AppellantInitialPopup from "../AppellantInitialPopup";
import NoticeOfHearingPopup from "../NoticeOfHearingPopup";
import HearingPopup from "../HearingPopup";
import AppellantCourtOrderPopup from "../AppellantCourtOrderPopup";
import BookAnAppealPopup from "../BookAnAppealPopup";

class InfoPopup extends Component {

    constructor(props) {
        super(props);
        this.getSections = this.getSections.bind(this);
    }

    render () {
        if (this.props.show) {
            let props = {
                close : this.props.close,
                getSections: this.getSections
            };
            let respondentHearingLinks = {
                link1: "2.5-how-to-prepare-for-the-hearing?ct=t(sidebar-link)",
                link2: "2.6-what-happens-at-the-hearing?ct=t(sidebar-link)",
                link3: "step-3-after-hearing?ct=t(step-index-link)"
            };
            let appellantHearingLinks = {
                link1: "3.3-how-to-prepare-for-the-hearing?ct=t(step-index-link)",
                link2: "3.4-what-happens-at-the-hearing?ct=t(sidebar-link)",
                link3: "3.1-making-chambers-applications?ct=t(step-index-link)"
            };
            let options = {
                'factum': <AppellantFactumPopup {...props} />,
                'replybook': <ReplyBookPopup {...props} />,
                'respondenthearing': <HearingPopup {...props} type="respondent" {...respondentHearingLinks} />,
                'courtorder': <CourtOrderPopup {...props} />,
                'respondentfactum': <RespondentFactumPopup {...props} />,
                'crossappeal': <CrossAppealPopup {...props} />,
                'leave-application-appearance':  <AppearancePopup {...props} />,
                'appearance': <AppearancePopup {...props}  noticeType="Notice of Appeal" />,
                'appealrecord': <AppealRecordPopup {...props} />,
                'appellantinitial': <AppellantInitialPopup {...props} />,
                'noticeofhearing': <NoticeOfHearingPopup {...props} />,
                'appellantcourtorder': <AppellantCourtOrderPopup {...props} />,
                'appellanthearing': <HearingPopup {...props} type="appellant" {...appellantHearingLinks} />,
                'bookappeal': <BookAnAppealPopup {...props} />
            };
            return options[this.props.type];
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
