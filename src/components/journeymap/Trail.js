import React, { Component } from 'react'
let cn = require('classnames');

class Trail extends Component {

   
    render() {
        return (
            <div style={{width: this.props.width,...this.props.style}}>
                <div className={cn(this.props.className,
                    {'completed-step-l1': this.props.completed},
                    {'completed-line-l1': this.props.lineCompleted}
                )}/>
            </div>
        );
    }
    
}
export default Trail;