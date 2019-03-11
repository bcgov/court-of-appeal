import React from 'react';
import './pageeicon.css';
import './journey-icons.css';
import PropTypes from 'prop-types';
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
        
        return (
            <div className={cn("journey-box", {"inactive": !active})} style={this.props.style} >
                <input type="checkbox" style={{position: 'relative', top: '11%', left: '-25%'}} className={"checkbox-glow"} value={this.props.completed}/>
                <span style={{position: 'relative', top: '5px', left: '-5%', zIndex: '9'}}>{this.props.order}</span>
                <div className={"file-container"} onClick={this.props.action}>
                    <div className={"file-main"} >
                        <img src={process.env.PUBLIC_URL + "/icons/journey_map_event_hearing.svg"} className={"journey-icon"}/>
                    </div>
                </div>
                <div className={"step-title-container"} >
                    {stepTitle}
                </div>
            </div>
        )
    }

} export default GavelIcon;
GavelIcon.propTypes = {
    active: PropTypes.bool
}