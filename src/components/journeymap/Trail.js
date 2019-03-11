import React, { Component } from 'react'
let cn = require('classnames');

class Trail extends Component {

   
    render() {
        
        return <div className={cn(this.props.className, {'completed-step-l1': this.props.completed})} style={{width: this.props.width}}/>
    }
    
}
export default Trail;