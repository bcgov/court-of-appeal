import React from 'react';
import './pageeicon.css';
import './journey-icons.css'
let cn = require('classnames');

class ClockEndCircle extends React.Component {

    render() {
        let stepTitle = null;
        if (this.props.stepTitle) {
            stepTitle = <div className={"end-step-title"} style={this.props.titleStyle}>{this.props.stepTitle}</div>;
        }

        return (
            <div className={"action-end-point"} onClick={this.props.action} style={this.props.style}>
                <div className={cn("journey-end-circle", this.props.className)} >
                    <img src={"/icons/icon-clock.svg"} className={"leave-hearing"}/>
                </div>
                {stepTitle}
            </div>
        )
    }

} export default ClockEndCircle;