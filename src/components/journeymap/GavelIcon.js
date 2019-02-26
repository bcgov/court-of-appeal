import React from 'react';
import './pageeicon.css';
import './journey-icons.css'

class GavelIcon extends React.Component {

    render() {
        let stepTitle = null;
        if (this.props.stepTitle) {
            stepTitle = <div>{this.props.stepTitle}</div>;
        }
        
        return (
            <div className={this.props.className}>
                <div className={"file-container"} onClick={this.props.action}>
                    <div className={"file-main top-pg"} >
                        <img src={"/icons/icon-gavel.svg"} className={"gavel-icon"}/>
                    </div>
                </div>
                <div className={"step-title"} >
                    {stepTitle}
                </div>
            </div>
        )
    }

} export default GavelIcon;