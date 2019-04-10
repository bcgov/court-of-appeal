import React, { Component } from "react";
import cn from "classnames";

class ProgressItem extends Component {

    render() {
        let current = this.props.step === this.props.activeStep;
        let completed = this.props.step < this.props.activeStep;

        let wrapperClass = cn("status-item", {"active": current});
        let iconClass = cn("status-icon",
            {"text-success active": current },
            { "oi oi-check text-success filled": completed});
        let labelClass = cn("status-label", {"text-success": completed}, {"active": current});

        return (
            <div className={wrapperClass}>
                <div className={iconClass}>{completed ? null : this.props.step}</div>
                <div className={labelClass}>{this.props.label}</div>
            </div>
        );
    }
}
export default ProgressItem;