import React from 'react';
import './pageeicon.css';
import './journey-icons.css'

class ClockEndCircle extends React.Component {

    render() {
        let stepTitle = null;
        if (this.props.stepTitle) {
            stepTitle = <div className={"end-step-title"}>{this.props.stepTitle}</div>;
        }

        return (
            <div className={"action-end-point"} onClick={this.props.action}>
                <div className={"journey-end-circle"} >
                    <img src={"/icons/icon-clock.svg"} className={"leave-hearing"}/>
                </div>
                {stepTitle}
            </div>
        )
    }

} export default ClockEndCircle;