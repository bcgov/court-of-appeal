import React, {Component} from 'react';
import './infopopup.css';
import InfoPopupSection from './InfoPopupSection';
import AppellantFactumPopup from "./AppellantFactumPopup";
import ReplyBookPopup from "./ReplyBookPopup";
import HearingPopup from "./HearingPopup";

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
                case 'hearing' :
                    return <HearingPopup
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
               paragraph = <a href={value.URL}>{value.URLName}</a>;
            }

            return (
                <p key={index}>
                    {paragraph}
                </p>
            ) ;

        });

        return (
           <div className="row">
               <div className="col col-sm-11 col-md-11 col-lg-11" style={{padding:0}}>
                { content }
               </div>
           </div>
        );
    }
    
    //** turn this into a separate component
    getListContent (listItems) {
        if (!listItems) {
            return null;
        }

        let listContent = listItems.map((value, index) => {
            let key = index + 1;
            let listRow = value;

            if (listRow instanceof Object) {

                let heading = <div>{key} .&nbsp;&nbsp; {listRow.line}</div>;
                let rows = listRow.rows;

                let bulletList = rows.map((row, bulletIndex) => {
                    return (
                        <div key={bulletIndex + "-" + index} className="row bullet-list-row">
                            <div className="col col-lg-1 col-md-1 bullet-div">
                                <div className="bullet"/>
                            </div>
                            <div className="col col-lg-8 col-md-8">
                                {row.description}
                            </div>
                            <div className="col col-lg-1 col-md-1">
                                {row.times}
                            </div>
                            <div className="col col-lg-1 col-md-1">
                                <div className="doc-badge"> {row.link1} </div>
                            </div>
                            <div className="col col-lg-1 col-md-1">
                                <div className="doc-badge"> {row.link2} </div>
                            </div>
                        </div>
                    )
                });

                return (
                    <div key={"list" + key}>
                        {heading}
                        {bulletList}
                    </div>

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
