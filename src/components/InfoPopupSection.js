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

        let helpSection = null;
        if (this.props.helpSection) {
            helpSection = (
                <div>
                    <div className="row ">
                        <div style={{fontWeight: "bolder", marginBottom: '20px', paddingTop: '20px'}}
                             className="col col-lg-11 col-lg-offset-1 col-md-11 col-md-offset-1 col-sm-11 col-sm-offset-1 ">
                            Need help completing a document?
                        </div>
                    </div>
                    <div className="row ">
                        <div
                            className="col col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 vertical-divider">
                            <a href={this.props.helpURL}>{this.props.helpURLName}</a>
                        </div>
                        <div className="col col-lg-4 col-md-4 col-sm-4 vertical-divider info-help-right-cols">
                            <a href="mailto:courts.cso@gov.bc.ca">Email: Courts.cso@gov.bc.ca</a>
                        </div>
                        <div className="col col-lg-4 col-md-4 col-sm-4 info-help-right-cols">
                            Call: 1-800-663-6102
                        </div>
                    </div>
                </div>

            )
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
                    {helpSection}
                </div>
            </div>
        );
    }

}
export default InfoPopupSection;
