import React from 'react';
import './pageeicon.css';
import './journey-icons.css';
import StepCompletedCheckbox from './StepCompletedCheckbox';
let cn = require('classnames');

class CalendarIcon extends React.Component {

    render() {
        let stepTitle = null;
        let active = this.props.active;
        if (this.props.stepTitle) {
            stepTitle = <div className={"step-title"}>{this.props.stepTitle}</div>;
        }
        
        return (
            <div className={cn("journey-box", {"inactive": !active})} style={this.props.style} >
                 <StepCompletedCheckbox
                     style={{position: 'relative', top: '-7px', left: '-16%'}}
                     onChange={this.completed.bind(this)}
                     show={active}
                     disabled={!this.props.ready}
                 />
                <span style={{position: 'relative',zIndex: '9'}}>{this.props.order}</span>
                <div className={"cal-container"}>
                    <img 
                        src={process.env.PUBLIC_URL + '/icons/journey_map_event_booking.svg'} 
                        className={cn("journey-icon","calendar-image")}/>
                </div>
                <div className={cn("step-title-container",this.props.stepTitleClass)} >
                    {stepTitle}
                </div>
            </div>
        )
    }
    completed(e) {
        this.props.completed(this.props.order, e.target.checked)
    }

} export default CalendarIcon;