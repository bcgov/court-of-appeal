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
            <div className={cn("journey-box", {"inactive": !active})} style={this.props.style} onClick={this.props.action}>
                <div className={"file-container"} >
                    <div className={"file-main top-pg"} >
                        <img src={process.env.PUBLIC_URL + "/icons/icon-gavel.svg"} className={"gavel-icon"}/>
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