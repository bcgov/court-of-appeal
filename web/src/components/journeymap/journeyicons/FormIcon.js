import React from 'react';
import './pageeicon.css';
import StepCompletedCheckbox from './StepCompletedCheckbox';
import TwoPageIcon from '../../iconSVG/TwoPageIcon';
import SinglePageIcon from '../../iconSVG/SinglePageIcon';
import DraftPageIcon from '../../iconSVG/DraftPageIcon';
import ApprovedFormIcon from '../../iconSVG/ApprovedFormIcon';

let cn = require('classnames');

class FormIcon extends React.Component {
    
    render() {
        
        let stepTitle, stepTitleOptional = null;
        let active = !!this.props.active;
        let imageToUse = this.props.twoPages ? this.imageByState('twoPages') : this.imageByState(this.props.status);
        let checkboxStyle = {position: 'relative', marginTop: 0, left: '-25%'}
        
        let top = this.props.twoPages ? '11px' : '5px';
        
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
        
        return (
            <div className={cn("journey-box", {"inactive": !active})} style={this.props.style} >
                <StepCompletedCheckbox
                    style={checkboxStyle}
                    onChange={this.completed.bind(this)}
                    show={active}
                    disabled={!this.props.ready}
                    checked={this.props.status === 'completed'}
                />
                <span style={{position: 'relative', top: top, left: '-10%', zIndex: '9'}}>{this.props.order}</span>
                <div className={cn({"journey-icon": active},"file-main", {"inactive": !active})} onClick={this.props.action}>
                    {imageToUse}
                    <div className={"file-corner-r"} style={this.props.twoPages? {top: '-15px'}:{}}/>
                </div>
                <div className={cn("step-title-container", this.props.stepTitleClass)} onClick={this.props.action}>
                    {stepTitle}
                </div>
            </div>
        )
    }
    
    completed(e) {
        this.props.completed(this.props.order, e.target.checked)
    }

    imageByState(status) {
    
        switch (status) {
            case 'new' :
                return <SinglePageIcon/>;
            case'draft':
                return <DraftPageIcon/>;
            case 'approved' :
                return <ApprovedFormIcon/>;
            case 'completed':
                return <ApprovedFormIcon/>;
            case 'twoPages':
                return <TwoPageIcon/>;
            default:
                return null;
        }
    }

} export default FormIcon;