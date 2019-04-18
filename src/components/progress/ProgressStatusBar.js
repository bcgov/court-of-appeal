import React, { Component } from "react";
import ProgressItem from './ProgressItem';
import './ProgressStatus.css';

class ProgressStatusBar extends Component {

    progressItems() {
        return this.props.steps.map((stepName, index ) => {
            return <ProgressItem key={index} step={index + 1} label={stepName} activeStep={this.props.activeStep} />
        });
    }

    render() {
        return (
            <div className="progress-status-bar">
                {this.progressItems()}
            </div>
        );
    }
}

export default ProgressStatusBar;

