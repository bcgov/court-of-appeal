import React from 'react';
import './PageeIcon.css';
import './JourneyIcons.css'
let cn = require('classnames');

class EndCircle extends React.Component {

    render() {
        let stepTitle = null;
        if (this.props.stepTitle) {
            stepTitle = <div className={"end-step-title"} style={this.props.titleStyle}>{this.props.stepTitle}</div>;
        }

        return (
            <div className={cn("action-end-point", "journey-end-circle","any-icon",{"completed-step": this.props.completed})} onClick={this.props.action} style={this.props.style}>
                    <div className={"oi oi-check journey-final-check"}/>
                    <div className={cn("end-step-title", "end-step-title-l2")}>
                    {stepTitle}
                    </div>
                </div>
        )
    }

} export default EndCircle;