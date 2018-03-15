import React, { Component } from 'react';
import './select.form.css';

class SelectForm extends Component {

    toggle(id, document) {
        var element = document.getElementById(id);
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
                        <li className="small-steps"><span className="step-circle in-progress small-steps">1</span><span className="step-title in-progress small-steps">Select form</span></li>
                        <li className="small-steps"><span className="step-circle future small-steps">2</span><span className="step-title future small-steps">Complete form</span></li>
                        <li className="small-steps"><span className="step-circle future small-steps">3</span><span className="step-title future small-steps">Pay</span></li>
                        <li className="small-steps"><span className="step-circle future small-steps">4</span><span className="step-title future small-steps">Submit</span></li>
                        <li className="small-steps"><span className="step-circle future small-steps">5</span><span className="step-title future small-steps">Notfications</span></li>
                    </ol>
                </div>

                <div>
                    <table style={{ width:'100%' }}>
                        <tbody>
                            <tr>
                                <td style={{ width:'50%', textAlign:'center'}}>
                                    <a href="/" className="btn btn-primary" style={{ backgroundColor:'green'}}>Start an Appeal</a>
                                </td>
                                <td style={{ width:'50%', textAlign:'center'}}>
                                    <a href="/" className="btn btn-primary" style={{ backgroundColor:'yellow', color:'black'}}>Respond to Appeal</a>
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