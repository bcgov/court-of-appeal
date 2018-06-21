import React, { Component } from 'react';
import './infopopup.css';
import InfoPopupIcon from './InfoPopupIcon';
import Deadline from './infopopups/Deadline';

class InfoPopupSection extends Component {

    render() {

        let deadline = null;
        if (this.props.deadline) {
            deadline = <Deadline
                deadlinePhrase={this.props.deadlinePhrase}
                deadline={this.props.deadline}
            />
        }

        let verticalLine = null;
        if (this.props.lineHeight) {
            verticalLine = (
                <div className="vertical-line" style={{height: this.props.lineHeight}}/>
            );
        }

        let sectionClassName = "col col-lg-11 col-md-11 col-sm-11 info-modal-details ";
        if (!this.props.last) {
            sectionClassName += "info-modal-divider";
        }

        let listContent = this.props.getListContent(this.props.contentMap);

        return (
            <div className="info-modal-section">
                <div className="row">
                    <InfoPopupIcon
                        iconSrc={this.props.iconSrc}
                        iconClass={this.props.iconClass}
                        />
                    <div className="col col-lg-11 col-md-11 col sm-11 top-deadline">
                        <div className="row">
                            <div className="col col-lg-12 col-md-12 col-sm-12">
                                <div className="info-modal-section-heading">
                                    {this.props.sectionHeading}
                                </div>
                                {deadline}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-lg-1 col-md-1 col-sm-1">
                        {verticalLine}
                    </div>
                    <div className={sectionClassName}>
                        {listContent}
                    </div>
                </div>
            </div>
        );
    }

}
export default InfoPopupSection;
