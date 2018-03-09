import React, { Component } from 'react';
import SelectForm from './forms/select.form.js';

class Dashboard extends Component {
  render() {
    return (
        <div id="topicTemplate" className="template container gov-container">
            <div className="row">
                <div id="main-content" role="main" className="contentPageMainColumn col-sm-12">                
                    <SelectForm />
                </div>
            </div>
        </div>
    );
  }
}

export default Dashboard;
