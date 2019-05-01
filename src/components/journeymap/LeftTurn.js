import React, { Component } from 'react';
let cn = require("classnames");
class LeftTurn extends Component {

    render() {
        return (
            <div className={"left-turn"} style={this.props.style}>
                <div style={{position:'relative'}} >
                    <div className={cn("journey-circle-left",{'circling-back': this.props.circling})} />
                    <div className={cn("journey-circle-left",{'circling-back-inside': this.props.circling})} />
                    <div className={cn("left-square")}/>
                    <div className={cn("bend-top-left-border")}/>
                    <div className={cn("bend-bottom-left-border")}/>
                    <div className={cn("bend-top-left-border",{'top-left-completed': this.props.circling})}/>
                    <div className={cn("bend-bottom-left-border",{'bottom-left-completed': this.props.circling})}/>
                </div>
            </div>
        );
    }
}
export default LeftTurn;
