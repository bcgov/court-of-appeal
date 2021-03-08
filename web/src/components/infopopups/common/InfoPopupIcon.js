import React, {Component} from 'react';
import './infopopup.css';
import ShareIcon from "../../iconSVG/ShareIcon";
import InfoIcon from "../../iconSVG/InfoIcon";
import HearingIcon from "../../iconSVG/HearingIcon";
import CalendarIcon from "../../iconSVG/CalendarIcon";
let cn = require('classnames');

class InfoPopupIcon extends Component {

    render() {
        return (
            <div className="col col-lg-1 col-md-1 col-sm-1 icon-container-box">
                <div shape="circle" className="info-modal-icon-container">
                    <div className={cn("info-modal-icon ", this.props.iconClass)} alt={"informative icon"}>
                        {this.getIconSVG(this.props.iconType)}
                    </div>
                </div>
            </div>
        );
    }

    getIconSVG(type) {
        switch (type) {
            default:
            case 'share': return <ShareIcon/>;
            case 'info': return <InfoIcon/>;
            case 'hearing': return <HearingIcon/>;
            case 'calendar': return <CalendarIcon/>
        }
    }

} 
export default InfoPopupIcon;
