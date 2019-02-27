import React from 'react';
import './pageeicon.css';
import './journey-icons.css'

class GavelIcon extends React.Component {

    render() {
        let stepTitle = null;
        if (this.props.stepTitle) {
            stepTitle = <div className={"step-title"}>{this.props.stepTitle}</div>;
        }
        
        return (
            <div className={"journey-box"} style={this.props.style} onClick={this.props.action}>
                <div className={"file-container"} >
                    <div className={"file-main top-pg"} >
                        <img src={"/icons/icon-gavel.svg"} className={"gavel-icon"}/>
                    </div>
                </div>
                <div className={"step-title-container"} >
                    {stepTitle}
                </div>
            </div>
        )
    }

} export default GavelIcon;