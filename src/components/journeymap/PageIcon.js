import React from 'react';
import './pageeicon.css';
import StepCompletedCheckbox from './StepCompletedCheckbox'
let cn = require('classnames');

class PageIcon extends React.Component {
    
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
                return this.newImage();
            case'draft':
                return this.draftImage();
            case 'approved' :
                return this.approvedImage();
            case 'completed':
                return this.approvedImage();
            case 'twoPages':
                return this.twoPages();
            default:
                return null;
        }
    }
    
    newImage() {
        return (
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 85.7 114.3" xmlSpace="preserve">
                <g id="Layer_10">
                    <polygon style={{fill:'#FFFFFF'}} points="80.5,31.2 54.5,31.2 54.5,5.2 5.2,5.2 5.2,109.1 80.5,109.1 	"/>
                    <polygon style={{fill:'#FFFFFF'}} points="59.7,8.8 59.7,26 76.9,26 	"/>
                    <polygon style={{fill:'#FFFFFF'}} points="59.7,8.8 59.7,26 76.9,26 	"/>
                </g>
                <g>
                    <g>
                        <g>
                            <path d="M84.1,26L60,1.8L58.2,0H0v5.2v103.9v5.2h85.7V27.5L84.1,26z M80.5,109.1H5.2V5.2h49.3v26h26V109.1z M76.9,26H59.7V8.8
                                L76.9,26z"/>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M85.2,27.5L57.7,0H-0.5v5.2v103.9v5.2h85.7V27.5z M59.3,8.8L76.4,26H59.3V8.8z M80,109.1H4.7V5.2H54v26h26V109.1z"/>
                        </g>
                    </g>
                    <rect x="693.9" y="389.2" style={{fill:'none'}} width="74.4" height="32.7"/>
                </g>
            </svg>
        );
    }
    
    draftImage() {
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px"
                 y="0px"
                 viewBox="0 0 85.7 114.3" xmlSpace="preserve">
                <g id="Layer_10">
                    <polygon style={{fill: '#FFFFFF'}}
                             points="80.5,31.2 54.5,31.2 54.5,5.2 5.2,5.2 5.2,109.1 80.5,109.1 	"/>
                    <polygon style={{fill: '#FFFFFF'}} points="59.7,8.8 59.7,26 76.9,26 	"/>
                    <polygon style={{fill: '#FFFFFF'}} points="59.7,8.8 59.7,26 76.9,26 	"/>
                </g>
                <g id="Layer_6">
                    <g>
                        <path style={{fill: '#00A651'}} d="M24.8,68.1c0-9.8,7.9-17.8,17.7-17.8v-7.7c-14,0.1-25.4,11.5-25.4,25.6s11.4,25.5,25.4,25.6v-7.7
                            C32.7,85.8,24.8,77.9,24.8,68.1z"/>
                        <path style={{fill: '#D0D0D0'}} d="M42.6,42.5c0,0-0.1,0-0.1,0v7.7c0,0,0.1,0,0.1,0c9.8,0,17.9,8,17.9,17.9s-8,17.9-17.9,17.9c0,0-0.1,0-0.1,0
                            v7.7c0,0,0.1,0,0.1,0c14.1,0,25.6-11.5,25.6-25.6S56.7,42.5,42.6,42.5z"/>
                    </g>
                </g>
                <g id="Layer_1">
                    <g>
                        <g>
                            <path d="M84.1,26L60,1.8L58.2,0H0v5.2v103.9v5.2h85.7V27.5L84.1,26z M80.5,109.1H5.2V5.2h49.3v26h26V109.1z M76.9,26H59.7V8.8
                                L76.9,26z"/>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                d="M85.2,27.5L57.7,0H-0.5v5.2v103.9v5.2h85.7V27.5z M59.3,8.8L76.4,26H59.3V8.8z M80,109.1H4.7V5.2h49.3v26h26V109.1z"/>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
    
    approvedImage() {
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px"
                 y="0px"
                 viewBox="0 0 85.7 114.3" xmlSpace="preserve">
                <g id="Layer_10">
                    <polygon style={{fill: '#FFFFFF'}}
                             points="80.5,31.2 54.5,31.2 54.5,5.2 5.2,5.2 5.2,109.1 80.5,109.1 	"/>
                    <polygon style={{fill: '#FFFFFF'}} points="59.7,8.8 59.7,26 76.9,26 	"/>
                    <polygon style={{fill: '#FFFFFF'}} points="59.7,8.8 59.7,26 76.9,26 	"/>
                </g>
                <g id="Layer_9">
                    <polygon style={{fill: '#00A651'}} points="85.2,114.3 -0.5,114.3 -0.5,0 51.1,0 85.2,30.9 	"/>
                    <path style={{fill: '#FFFFFF'}} d="M56.5,49.5l-3.9,4.1L36.8,69.4L32.2,65l-4.1-4.1l-8,8l4.1,4.1l8.5,8.5l3.9,4.1l4.1-4.1l19.9-19.9l4.1-4.1
                        L56.5,49.5z"/>
                </g>
                <g id="Layer_1">
                    <g>
                        <g>
                            <path d="M84.1,26L60,1.8L58.2,0H0v5.2v103.9v5.2h85.7V27.5L84.1,26z M80.5,109.1H5.2V5.2h49.3v26h26V109.1z M76.9,26H59.7V8.8
                                L76.9,26z"/>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                d="M85.2,27.5L57.7,0H-0.5v5.2v103.9v5.2h85.7V27.5z M59.3,8.8L76.4,26H59.3V8.8z M80,109.1H4.7V5.2h49.3v26h26V109.1z"/>
                        </g>
                    </g>
                    <rect x={693.9} y={389.2} style={{fill: 'none'}} width={74.4} height={32.7}/>
                    <text transform="matrix(1 0 0 1 706.0028 409.9059)"
                          style={{fontFamily: 'MyriadWebPro-Bold', fontSize: '29.0227px'}}>N/A</text>
                </g>
            </svg>
        );
    }

    twoPages() {
        return (
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                 x="0px" y="0px"
                         viewBox="0 0 96.6 124.3" xmlSpace="preserve">
                <g>
                    <g>
                        <g>
                            <path d="M95,26L70.9,1.8L69.1,0H10.9v5.2v103.9v5.2h85.7V27.5L95,26z M91.4,109.1H16.1V5.2h49.3v26h26V109.1z M87.8,26H70.6V8.8
                                L87.8,26z"/>
                            <polygon style={{fill: '#FFFFFF'}}
                                     points="91.4,31.2 65.4,31.2 65.4,5.2 16.1,5.2 16.1,109.1 91.4,109.1 			"/>
                        </g>
                        <polygon style={{fill: '#FFFFFF'}} points="70.6,8.8 70.6,26 87.8,26 		"/>
                    </g>
                    <g>
                        <g>
                            <path d="M84.1,36L60,11.8L58.2,10H0v5.2v103.9v5.2h85.7V37.5L84.1,36z M80.5,119.1H5.2V15.2h49.3v26h26V119.1z M76.9,36H59.7
                                V18.8L76.9,36z"/>
                            <polygon style={{fill: '#FFFFFF'}}
                                     points="80.5,41.2 54.5,41.2 54.5,15.2 5.2,15.2 5.2,119.1 80.5,119.1 			"/>
                        </g>
                        <polygon style={{fill: '#FFFFFF'}} points="59.7,18.8 59.7,36 76.9,36 		"/>
                    </g>
                </g>
         </svg>
        );
    }
    



} export default PageIcon;