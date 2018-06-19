import React, { Component } from 'react';
import './infopopup.css';
import InfoPopupIcon from './InfoPopupIcon';

class InfoPopupSection extends Component {

    render() {

        let deadline = null;
        if (this.props.deadline) {
            deadline = <div className="deadline">{this.props.deadline}</div>;
        }

        let verticalLine = null;
        if (this.props.lineHeight) {
            verticalLine = (
                <div className="col col-lg-1 col-md-1 col-sm-1">
                    <div className="vertical-line" style={{height: this.props.lineHeight}}/>
                </div>
            );
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
                                {deadline}
                                <div className="info-modal-section-heading">{this.props.sectionHeading}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {verticalLine}
                    <div className="col col-lg-11 col-md-11 col-sm-11 info-modal-details info-modal-divider">
                        {listContent}
                    </div>
                </div>
            </div>
        );
    }

}
export default InfoPopupSection;
