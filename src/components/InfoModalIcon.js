import React, {Component} from 'react';
import './infomodal.css';

class InfoModalIcon extends Component {

    render() {
        return (
            <div className="col col-lg-1 col-md-1 col-sm-1 icon-container-box">
                <div shape="circle" className="info-modal-icon-container">
                    <img src={this.props.iconSrc} className={"info-modal-icon " + this.props.iconClass}/>
                </div>
            </div>
        );
    }
} export default InfoModalIcon;