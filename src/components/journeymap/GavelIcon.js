import React from 'react';
import './pageeicon.css';
import './journey-icons.css';
import PropTypes from 'prop-types';
import StepCompletedCheckbox from './StepCompletedCheckbox';
let cn = require('classnames');


class GavelIcon extends React.Component {

    render() {
        let stepTitle = null;
        let active = this.props.active;
        if (this.props.stepTitle) {
            stepTitle = <div className={cn({"step-title": active}, {"step-title-optional": !active})}>{this.props.stepTitle}</div>;
        }
        if (this.props.stepTitleOptional) {
            stepTitle = <div className={"step-title-optional"}>{this.props.stepTitleOptional}</div>;
        }
        
        let style = {position: 'relative', top: '5px', left: active ? '-11%' : '7%', zIndex: '9'}
        
        return (
            <div className={cn("journey-box", {"inactive": !active})} style={{...this.props.style, marginTop:'3px'}} >
                 <StepCompletedCheckbox
                     style={{position: 'relative', marginTop: '0', left: '-25%'}}
                     onChange={this.completed.bind(this)}
                     show={active}
                     disabled={!this.props.ready}
                 />
                <span style={style}>{this.props.order}</span>
                <div className={"file-container"} onClick={this.props.action}>
                    <div className={"file-main"} >
                        <img src={process.env.PUBLIC_URL + "/icons/journey_map_event_hearing.svg"}
                             className={cn({"journey-icon": active}, {"inactive": !active})} 
                             onClick={this.props.action}
                             alt={"Gavel Icon for " + stepTitle}
                        />
                    </div>
                </div>
                <div className={"step-title-container"} style={{top:'73px'}} >
                    {stepTitle}
                </div>
            </div>
        )
    }
    
    completed(e) {
        this.props.completed(this.props.order, e.target.checked)
    }

} export default GavelIcon;
GavelIcon.propTypes = {
    active: PropTypes.bool
}