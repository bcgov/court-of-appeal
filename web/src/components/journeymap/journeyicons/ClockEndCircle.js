import React from 'react';
import './PageeIcon.css';
import './JourneyIcons.css'
import { PUBLIC_URL } from '../../../config/environment';

let cn = require('classnames');

class ClockEndCircle extends React.Component {

    render() {
        let stepTitle = null;
        if (this.props.stepTitle) {
            stepTitle = <div className={cn("end-step-title",{"step-title-optional":!this.props.active})} style={this.props.titleStyle}>{this.props.stepTitle}</div>;
        }
        return (
            <div className={cn({"journey-box inactive": !this.props.active},"action-end-point")} onClick={this.props.action} style={this.props.style}>
                <div className={cn("journey-end-circle", this.props.className)} >
                    <img src={PUBLIC_URL + "/icons/icon-clock.svg"} className={"leave-hearing"} alt=""/>
                </div>
                {stepTitle}
            </div>
        )
    }

} export default ClockEndCircle;