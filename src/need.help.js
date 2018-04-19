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
                            <td className="help-details" >
                                    Phone: 1-800-663-6102
                            </td>
                            <td className="help-details">
                                    E-mail: Courts.cso@gov.bc.ca
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default NeedHelp;