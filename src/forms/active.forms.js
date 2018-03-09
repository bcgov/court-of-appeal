import React, { Component } from 'react';
import './active.forms.css';

class ActiveForms extends Component {

    render() {
        return (
            <div id="active-forms">
                <h3>Active E-Filing Applications</h3>
                <table>
                    <tr className="header">
                        <td>Form</td>
                        <td>File #</td>
                        <td>Status</td>
                        <td>Deadline to file/server</td>
                    </tr>
                    <tr>
                        <td>Form 7</td>
                        <td>2098709</td>
                        <td>Accepted</td>
                        <td>2018-01-31</td>
                    </tr>
                    <tr>
                        <td>Form 2</td>
                        <td>3456769</td>
                        <td>Draft</td>
                        <td>2018-04-30</td>
                    </tr>
                </table>
                <div className="align-right">
                    <button className="btn btn-primary">All Forms</button>
                </div>
            </div>
        )
    }
}
export default ActiveForms;