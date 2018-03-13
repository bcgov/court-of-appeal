import React, { Component } from 'react';
import './active.forms.css';

class ActiveForms extends Component {

    render() {
        return (
            <div id="active-forms" className="dashboard-section">
                <h3>My Top-5 pending Applications</h3>
                <table>
                    <thead>
                        <tr className="header">
                            <td>File #</td>
                            <td>Parties</td>
                            <td>Status                                
                            </td>
                            <td>Deadline to file / serve</td>
                            <td>Last Modified</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3456769 (Form-2)</td>
                            <td>Moreno / Julia</td>
                            <td>Draft</td>
                            <td style={{ backgroundColor:'rgb(252, 186, 25)' }}>2018-03-20</td>
                            <td>2018-03-12</td>
                        </tr>
                        <tr>
                            <td>2098709 (Form-7)</td>
                            <td>Moreno / Julia</td>
                            <td>Accepted</td>
                            <td style={{ backgroundColor:'lightgreen' }}>2018-03-05</td>
                            <td>2018-03-01</td>
                        </tr>
                    </tbody>
                </table>
                <div className="align-right">
                    <a href="/my-applications.html">more...</a>
                </div>
            </div>
        )
    }
}
export default ActiveForms;