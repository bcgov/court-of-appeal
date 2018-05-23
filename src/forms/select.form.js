import React, { Component } from 'react';
import './select.form.css';

class SelectForm extends Component {

    toggle(id, document) {
        let element = document.getElementById(id);
        if (element) {
            if (element.style.display === 'block') {
                element.style.display = 'none';
            } else {
                element.style.display = 'block';
            }
        }
    }

    render() {
        return (
            <div className="form-section">
                <h3>Start E-Filing</h3>

                <div id="steps" className="small-steps">
                    <ol>
                        <li className="small-steps"><span className="step-circle future small-steps">1</span><span className="step-title future small-steps">Complete form</span></li>
                        <li className="small-steps"><span className="step-circle future small-steps">2</span><span className="step-title future small-steps">Preview</span></li>
                        <li className="small-steps"><span className="step-circle future small-steps">3</span><span className="step-title future small-steps">Submit</span></li>
                        <li className="small-steps"><span className="step-circle future small-steps">4</span><span className="step-title future small-steps">Pay</span></li>
                    </ol>
                </div>

                <div>
                    <table style={{ width:'100%' }}>
                        <tbody>
                            <tr>
                                <td style={{ width:'50%', textAlign:'center'}}>
                                    <a href="/" className="btn btn-primary round-borders start-an-appeal">
                                        Start an Appeal &nbsp;
                                        <i className="fa fa-play"/>
                                    </a>
                                </td>
                                <td style={{ width:'50%', textAlign:'center'}}>
                                    <a href="form.2.html" className="btn btn-primary round-borders respond-to-appeal">
                                        Respond to Appeal &nbsp;
                                        <i className="fa fa-play"/>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                        
            </div>
        )
    }
}
export default SelectForm;