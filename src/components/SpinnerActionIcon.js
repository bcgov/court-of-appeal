import React from 'react';
import SpinnerButton from './SpinnerButton';

class SpinnerActionIcon extends SpinnerButton {

    buttonOrSpinner() {
        if (this.state.downloading) {
            return (
                <a id={this.props.id} title={ this.props.tooltip }>
                    <span className="action-icon"><i className="oi oi-ellipses"></i></span>
                </a>
            )
        }
        else {
            return (
                <a id={this.props.id} onClick={this.props.onClick} title={ this.props.tooltip }>
                    <span className="action-icon"><span className={ this.props.content }></span></span>
                </a>
            )
        }
    }
}

export default SpinnerActionIcon
