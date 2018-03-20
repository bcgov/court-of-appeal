import React, { Component } from 'react';
import './need.help.css';

class NeedHelp extends Component {

    render() {
        return (
            <div className="form-section">
                
                <table>
                    <tbody>
                        <tr>
                            <td style={{ verticalAlign:'top', fontSize:'50px', color: '#38598a' }}>
                                <i className="fa fa-info-circle" aria-hidden="true"></i>
                            </td>
                            <td style={{ verticalAlign:'top', fontSize:'30px' }}>
                                Need help?
                            </td>
                            <td style={{ verticalAlign:'top' }}>
                                <ol style={{ padding:'0px', listStyleType:'none' }}>
                                    <li>Phone: 1-800-663-6102</li>
                                    <li>E-mail: Courts.cso@gov.bc.ca</li>
                                </ol>
                            </td>
                            <td style={{ verticalAlign:'top' }}>
                                Stop by:
                            </td>
                            <td style={{ verticalAlign:'top' }}>
                                <ol style={{ padding:'0px', listStyleType:'none' }}>
                                    <li><strong>Victoria Registry</strong></li>
                                    <li>2nd Flr, 850 Burdett Ave.</li>
                                    <li>Victoria, BC V8W 9J2</li>
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