import React from 'react';
import './pageeicon.css';
let cn = require('classnames');

class PageIcon extends React.Component {

    render() {
        let stepTitle, stepTitleOptional = null;
        let active = !!this.props.active;
        
        if (this.props.stepTitleOptional) {
            stepTitleOptional = <span className={"step-title-optional"}>{this.props.stepTitleOptional}</span>;
        }
        if (this.props.stepTitle) {
            stepTitle = (
                <div>
                    <span className={cn({"step-title": active }, {"step-title-optional" : !active})}>
                        {this.props.stepTitle}
                    </span>
                    <br/>
                    {stepTitleOptional}
                </div>
            );
        }
        
        let secondPage = null;
        if (this.props.twoPages) {
            secondPage = (
                <div>
                    <div className={"file-main bottom-pg second-page"} />
                    <div className={"file-corner-l bottom-pg-corner-l second-page"} />
                    <div className={"file-corner-s bottom-pg-corner-s second-page"} />
                    <div className={"file-corner-cover bottom-pg-corner-cover second-page"} />
                </div>
            )
        }
        return (
            <div className={cn("journey-box", {"inactive": !active})} style={this.props.style} onClick={this.props.action}>
                <div className={"file-container"} >
                    <div className={"file-main top-pg"} />
                    <div className={"file-corner-l top-pg-corner-l"} />
                    <div className={"file-corner-s top-pg-corner-s"} />
                    <div className={"file-corner-cover top-pg-corner-cover"} />
                    {secondPage}
                </div>
                <div className={cn("step-title-container", this.props.stepTitleClass)}>
                    {stepTitle}
                </div>
            </div>
        )
    }

} export default PageIcon;