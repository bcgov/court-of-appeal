import React from 'react';
import './pageeicon.css';
import './journey-icons.css'
let cn = require('classnames');

class ClockEndCircle extends React.Component {

    render() {
        let stepTitle = null;
        if (this.props.stepTitle) {
            stepTitle = <div className={cn({"end-step-title": this.props.active},{"step-title-optional":!this.props.active})} style={this.props.titleStyle}>{this.props.stepTitle}</div>;
        }

        return (
            <div className={cn("action-end-point", {"journey-box inactive": !this.props.active})} onClick={this.props.action} style={this.props.style}>
                <div className={cn("journey-end-circle", this.props.className)} >
                    <img src={process.env.PUBLIC_URL + "/icons/icon-clock.svg"} className={"leave-hearing"}/>
                </div>
                {stepTitle}
            </div>
        )
    }

} export default ClockEndCircle;