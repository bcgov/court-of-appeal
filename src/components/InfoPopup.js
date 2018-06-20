import React, {Component} from 'react';
import './infopopup.css';
import InfoPopuplSection from './InfoPopupSection';
import ExpandableInfoPopupSection from './ExpandableInfoPopupSection';

class InfoPopup extends Component {

    render() {

        let sections = this.getSections();

       return (
           <div id="info-modal" className="modal" style={{display: 'block'}} >
            <div className="info-modal-title ">
                <span id="close-modal" onClick={this.props.close}>&times;</span>
                {this.props.title}
            </div>
            <div className="info-modal-content">
                {sections}
            </div>
        </div>);
    }

    getSections() {

        const sections = this.props.sections.map((sectionProps, key) =>{
            if (!sectionProps.expandable) {
                return (
                    <InfoPopuplSection
                        key={key}
                        sectionHeading={sectionProps.sectionHeading}
                        iconSrc={sectionProps.iconSrc}
                        iconClass={sectionProps.iconClass}
                        deadline={sectionProps.deadline}
                        lineHeight={sectionProps.lineHeight}
                        last={sectionProps.last}
                        contentMap={sectionProps.contentMap}
                        getListContent={this.getListContent.bind(this)}
                    />
                )
            } else {
                return (
                    <ExpandableInfoPopupSection
                        key={key}
                        sectionHeading={sectionProps.sectionHeading}
                        iconSrc={sectionProps.iconSrc}
                        iconClass={sectionProps.iconClass}
                        expandedHeading={sectionProps.expandedHeading}
                        lineHeight={sectionProps.lineHeight}
                        deadline={sectionProps.deadline}
                        helpSection={sectionProps.helpSection}
                        helpURL={sectionProps.helpURL}
                        helpURLName={sectionProps.helpURLName}
                        content={sectionProps.content ? this.props.detailedContent : null}
                        last={sectionProps.last}
                        contentMap={sectionProps.contentMap}
                        getListContent={this.getListContent.bind(this)}
                    />

                )
            }
        });
       return ( sections );
    }
//** turn this into a separate component
    getListContent(listItems) {
        if (!listItems) {
            return null;
        }

        let listContent = listItems.map((value, index) => {
            let key = index + 1;
            let listRow = value;

            if (listRow instanceof Object) {

                let heading = <div>{ key } .&nbsp;&nbsp; { listRow.line }</div>;
                let rows = listRow.rows;

                let bulletList = rows.map((row, bulletIndex) => {
                    return (
                        <div key={bulletIndex + "-" + index} className="row bullet-list-row" >
                            <div className="col col-lg-1 col-md-1 bullet-div">
                                <div  className="bullet" />
                            </div>
                            <div  className="col col-lg-8 col-md-8" >
                                { row.description }
                            </div>
                            <div className="col col-lg-1 col-md-1">
                                { row.times }
                            </div>
                            <div  className="col col-lg-1 col-md-1">
                                <div className="doc-badge"> { row.link1 } </div>
                            </div>
                            <div className="col col-lg-1 col-md-1">
                                <div className="doc-badge"> { row.link2 } </div>
                            </div>
                        </div>
                    )
                });

                return (
                    <div key={"list"+key}>
                        { heading }
                        { bulletList }
                    </div>

                );

            } else {
                return (
                    <div key={"row"+key} className={"row"}>
                        { key } .&nbsp;&nbsp; { listRow }
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

    getListContentBad(listItems) {
        if (!listItems) {
            return null;
        }

        let listContent = listItems.map((value, index) => {
            let key = index + 1;
            let listRow = value;

            if (listRow instanceof Object) {

                let heading = <div>{key} .&nbsp;&nbsp; {listRow.line}</div>;
                let row = listRow.row;

                let bulletList = (
                    <div className="row bullet-list-row">
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
                            {row.link1}
                        </div>
                        <div className="col col-lg-1 col-md-1">
                            {row.link2}
                        </div>
                    </div>
                );

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