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
            <div className={cn("journey-box", {"inactive": !active})}
                 style={{...this.props.style, marginTop: this.props.style.marginTop || '21px', zIndex: '13'}} >
                 <StepCompletedCheckbox
                     style={{position: 'relative', marginTop: '0', left: '-25%'}}
                     onChange={this.completed.bind(this)}
                     show={active}
                     disabled={!this.props.ready}
                     checked={this.props.status === 'completed'}
                 />
                <span style={style}>{this.props.order}</span>
                <div className={"file-container"} onClick={this.props.action}>
                    <div className={cn({"journey-icon": active}, "file-main",{"inactive": !active})} >
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 85.7 114.3" xmlSpace="preserve">

                                <path d="M85.7-0.1H0v5.2V109v5.2h85.7V-0.1z M80.5,109H5.2V5.1h49.3l26,26V109z"/>
                                <rect x="5.2" y="5.1" style={{fill:'#FFFFFF'}} width="75.3" height="103.9"/>

                                <polygon style={{fill:'#FFFFFF'}} points="80.5,31.2 54.5,31.2 54.5,5.2 5.2,5.2 5.2,109.1 80.5,109.1 	"/>
                                <polygon style={{fill:'#FFFFFF'}} points="59.7,8.8 59.7,26 76.9,26 	"/>
                                <polygon style={{fill:'#FFFFFF'}} points="59.7,8.8 59.7,26 76.9,26 	"/>

                                <path style={{fill:'#616265'}} d="M27.7,46.8l16.9-16.9c1.1-1.1,1.1-2.9,0-4s-2.9-1.1-4,0L23.7,42.8c-1.1,1.1-1.1,2.9,0,4
                                    C24.8,47.9,26.6,47.9,27.7,46.8z"/>
                                <path style={{fill:'#616265'}} d="M70.4,51.8c-1.1-1.1-2.9-1.1-4,0L49.5,68.7c-1.1,1.1-1.1,2.9,0,4s2.9,1.1,4,0l16.9-16.9
                                    C71.5,54.7,71.5,52.9,70.4,51.8z"/>
                                <path style={{fill:'#616265'}} d="M63.4,50.8l-7-7l1-1c1.1-1.1,1.1-2.9,0-4l-1-1c-1.1-1.1-2.9-1.1-4,0l-1,1l-6-6l-14.8,15l6,6L13.8,76.6
                                    c-1.1,1.1-1.1,2.9,0,4l1,1c1.1,1.1,2.9,1.1,4,0l22.8-22.8l7,7L63.4,50.8z"/>
                                <path style={{fill:'#616265'}} d="M68.4,86.9H67v-1.4c0-1.5-1.3-2.8-2.8-2.8H34.7c-1.5,0-2.8,1.3-2.8,2.8v1.4h-1.4c-1.5,0-2.8,0.9-2.8,2.1
                                    s1.3,2.1,2.8,2.1h4.2h29.5h4.2c1.5,0,2.8-0.9,2.8-2.1S69.9,86.9,68.4,86.9z"/>

                        </svg>

                    </div>
                </div>
                <div className={"step-title-container"} style={{top:'73px'}} onClick={this.props.action}>
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