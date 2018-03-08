import React, { Component } from 'react';
import './Form.css';
import './Form.7.css';

class Form7 extends Component {
  render() {
    return (
      <div id="topicTemplate" class="template container gov-container form">
      <div className="row">

        <div id="main-content" role="main" className="contentPageMainColumn col-sm-12">

            <div id="steps">
                <ol>
                    <li><span className="step-circle in-progress">1</span><span className="step-title in-progress">Access</span></li>
                    <li><span className="step-circle future">2</span><span className="step-title future">Form 7</span></li>
                    <li><span className="step-circle future">3</span><span className="step-title future">Preview</span></li>
                    <li><span className="step-circle future">4</span><span className="step-title future">Payment</span></li>
                </ol>
            </div>

            <div className="form-title">
                <h1>Notice of Appeal Access</h1>
            </div>

            <div className="form-section">
                The following users will have access to the package in CSO containing the Notice of Appeal once it has been submitted.
                <table id="access-list">
                    <tr>
                        <th>User</th>
                        <th className="centered">Read Only</th>
                        <th className="centered">Update</th>
                        <th className="centered">Remove</th>
                        <tr></tr>
                    </tr>
                    <tr>
                        <td>yourself</td>
                        <td className="centered"></td>
                        <td className="centered"><i className="fas fa-check"></i></td>
                        <td className="centered"></td>
                    </tr>
                    <tr>
                        <td>Kathryn Thomson (account admin)</td>
                        <td className="centered"></td>
                        <td className="centered"><i className="fas fa-check"></i></td>
                        <td className="centered"></td>
                    </tr>
                    <tr>
                        <td>Patricia White (account admin)</td>
                        <td className="centered"></td>
                        <td className="centered"><i className="fas fa-check"></i></td>
                        <td className="centered"></td>
                    </tr>
                </table>
                <button id="add-user" className="btn btn-primary">Add User</button>
            </div>

            <button id="start" className="btn btn-primary btn-green pull-right">Fill Notice of appeal form</button>
                
        </div>


    </div>
    </div>
    );
  }
}

export default Form7;
