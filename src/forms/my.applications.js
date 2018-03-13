import React, { Component } from 'react';
import './select.form.css';

class MyApplications extends Component {
  render() {
    return (
        <div id="topicTemplate" className="template container gov-container form">
            <div className="row">
                <div id="main-content" role="main" className="contentPageMainColumn col-sm-12">   
                    <div className="col-sm-12">

                        <div id="active-forms" className="form-section">
                            <h3>My Applications</h3>
                            <div>
                                File #:<input type="text"/>
                                Status:
                                <select>
                                    <option>*** ALL</option>
                                    <option>Draft</option>
                                    <option>Submitted / Pending</option>
                                    <option>Accept</option>
                                    <option>Reject</option>
                                    <option>Upcoming deadline</option>
                                    <option>About expire</option>
                                </select>  
                                <button className="btn btn-primary">Search</button> 
                            </div>
                            <table>
                                <thead>
                                    <tr className="header">
                                        <td>File #</td>
                                        <td>Parties</td>
                                        <td>Status</td>
                                        <td>Deadline to file / serve <i className="fa fa-sort" aria-hidden="true"></i></td>
                                        <td>Last Modified <i className="fa fa-sort" aria-hidden="true"></i></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>3456769 (Form-2)</td>
                                        <td>Moreno / Julia</td>
                                        <td>Draft</td>
                                        <td>2018-03-20</td>
                                        <td>2018-03-12</td>
                                    </tr>
                                    <tr>
                                        <td>2098709 (Form-7)</td>
                                        <td>Moreno / Julia</td>
                                        <td>Accepted</td>
                                        <td>2018-03-05</td>
                                        <td>2018-03-01</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    );
  }
}

export default MyApplications;
