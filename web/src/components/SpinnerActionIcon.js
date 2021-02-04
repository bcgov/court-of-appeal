import React from 'react';
import SpinnerButton from './SpinnerButton';

class SpinnerActionIcon extends SpinnerButton {

    buttonOrSpinner() {
        if (this.state.downloading) {
            return (
                <li className="spinner-action spinning" style={{'background':'none', 'paddingLeft':'5px'}} id={this.props.id} title={ this.props.tooltip }>
                    <div className="efiling-spinner-blue"></div>
                </li>
            )
        }
        else {
            return (
                <li className="spinner-action not-spinning" style={{'background':'none', 'paddingLeft':'5px'}} id={this.props.id} onClick={this.props.onClick} title={ this.props.tooltip }>
                    <div className={ this.props.content }></div>
                </li>
            )
        }
    }
}

export default SpinnerActionIcon
