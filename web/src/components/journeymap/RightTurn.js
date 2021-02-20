import React, { Component } from 'react';
let cn = require("classnames");
class RightTurn extends Component {

    render() {
        return (
            <div className={"right-turn"} style={this.props.style}>
                <div style={{position:'relative'}} >
                    <div className={cn("journey-circle-right",{'circling': this.props.circling})} />
                    <div className={cn("journey-circle-right",{'circling-inside': this.props.circling})} />
                    <div className={cn("square")}/>
                    <div className={cn("bend-top-border")}/>
                    <div className={cn("bend-bottom-border")}/>
                    <div className={cn("bend-top-border",{'top-completed': this.props.circling})}/>
                    <div className={cn("bend-bottom-border",{'bottom-completed': this.props.circling})}/>
                </div>
            </div>
        );
    }
}
export default RightTurn;
