import React, { Component } from 'react';
import './need.help.css';

class NeedHelp extends Component {

    render() {
        return (
            <div className="form-section">
                
                <table>
                    <tbody>
                        <tr>
                            <td className="info-icon">
                                <i className="fa fa-info-circle" aria-hidden="true"></i>
                            </td>
                            <td className="help-section" style={{ fontSize:'30px' }}>
                                Need help?
                            </td>
                            <td className="help-section" >
                                <ol style={{ padding:'0px', listStyleType:'none' }}>
                                    <li>Phone: 1-800-663-6102</li>
                                    <li>E-mail: Courts.cso@gov.bc.ca</li>
                                </ol>
                            </td>
                            <td className="help-section" >
                                <ol style={{ padding:'0px', listStyleType:'none' }}>
                                    <li><strong>Victoria Registry</strong></li>
                                    <li>2nd Flr, 850 Burdett Ave., Victoria, BC V8W 9J2</li>
                                </ol>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default NeedHelp;