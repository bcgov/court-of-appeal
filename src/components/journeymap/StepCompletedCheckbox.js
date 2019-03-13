import React, { Component } from 'react'

class StepCompletedCheckbox extends Component {
    
    render() {
        if (this.props.show) {
            return <input type="checkbox"
                          style={this.props.style}
                          className={"checkbox-glow checkbox-toggle"}
                          onChange={this.props.onChange}/>
        }
        return null;
    }
    
} export default StepCompletedCheckbox;