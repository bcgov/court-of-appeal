import React from 'react';
import './pageeicon.css';
import './journey-icons.css'
let cn = require('classnames');

class GavelEndCircle extends React.Component {

    render() {
        let stepTitle = null;
        if (this.props.stepTitle) {
            stepTitle = <div className={"end-step-title"} style={this.props.titleStyle}>{this.props.stepTitle}</div>;
        }

        return (
            <div className={"action-end-point"} onClick={this.props.action} style={this.props.style}>
                <div className={cn("journey-end-circle", this.props.className)} >
                    <img src={process.env.PUBLIC_URL + "/icons/icon-hearing.svg"} className={"appellant-leave-hearing"}/>
                </div>
                {stepTitle}
            </div>
        )
    }

} export default GavelEndCircle;