import React from 'react';
import './pageeicon.css';
import './journey-icons.css';
let cn = require('classnames');

class GavelIcon extends React.Component {

    render() {
        let stepTitle = null;
        if (this.props.stepTitle) {
            stepTitle = <div className={"step-title"}>{this.props.stepTitle}</div>;
        }
        
        return (
            <div className={"journey-box"} onClick={this.props.action} style={this.props.style}>
                <div className={"cal-container"} >
                    <img src={process.env.PUBLIC_URL + "/icons/icon-dark-calendar.svg"}/>
                </div>
                <div className={cn("step-title-container",this.props.stepTitleClass)} >
                    {stepTitle}
                </div>
            </div>
        )
    }

} export default GavelIcon;