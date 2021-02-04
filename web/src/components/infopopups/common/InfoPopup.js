import React, {Component} from 'react';
import './infopopup.css';
import Help from './Help';
import ReactTooltip from 'react-tooltip';

class InfoPopup extends Component {

    constructor(props) {
        super(props);
        this.urls = {
            appellant: "https://www.courtofappealbc.ca/appellant-guidebook/step-1-deciding-to-appeal",
            respondent: "https://www.courtofappealbc.ca/respondent-guidebook/step-1-how-to-respond-to-an-appeal"
        }
    }

    render () {
        return (
            <div id="info-modal" className={"info-modal"} style={{display: 'block'}} >
                <div className="info-modal-title ">
                    {this.props.title}
                    <span className="close-info-modal" onClick={this.props.close}>&times;</span>
                </div>
                <div className="info-modal-content">
                    {this.props.children}
                    <Help
                        URL={this.urls[this.props.helpType]}
                        URLName="Visit: Online Guidebook"
                    />
                    <ReactTooltip
                        multiline={true}
                        html={true}
                        effect="solid"
                        delayHide={1000}
                        className="right-to-appeal-tooltip"
                        wrapper="div"
                        type="light"
                    />
                </div>
            </div>
        );

    }
}
export default InfoPopup;
