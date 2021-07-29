import React, { Component } from 'react';
import NotificationCenter from './NotificationCenter.js';

class Notifications extends Component {
  render() {
    return (
        <div id="topicTemplate" className="template container gov-container form">
            <div className="row">
                <div id="main-content" role="main" className="contentPageMainColumn col-sm-12">   
                    <div className="col-sm-12">
                        <NotificationCenter />
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Notifications;
