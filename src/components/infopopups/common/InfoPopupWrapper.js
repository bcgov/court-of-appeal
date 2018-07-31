import React, {Component} from 'react';
import './infopopup.css';
import Help from './Help';

class InfoPopupWrapper extends Component {

    render () {
        return (
                <div id="info-modal" className="modal" style={{display: 'block'}} >
                    <div className="info-modal-title ">
                        <span id="close-modal" onClick={this.props.close}>&times;</span>
                        {this.props.title}
                    </div>
                    <div className="info-modal-content">
                        {this.props.children}
                        <Help
                            URL={this.props.helpURL}
                            URLName={this.props.helpURLName}
                        />
                    </div>

                </div>);

    }
}
export default InfoPopupWrapper;
