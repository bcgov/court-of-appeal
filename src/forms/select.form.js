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

                <div id="forms-list">
                    <ul>
                        <li>Starting an appeal?</li>
                        <ul>
                            <li>
                                <i class="fas fa-plus" aria-hidden="true"></i>&nbsp;
                                <span onClick={(e) => this.toggle('appelants-right-to-appeal-forms', document)}  className="toggler">Right to Appeal</span> 
                                &nbsp;
                                <i className="fa fa-info-circle" aria-hidden="true" title="Start appeal without court's permission"></i>
                            </li>
                                <ul id="appelants-right-to-appeal-forms">
                                    <li><a id="form7" href="/forms/form.7.html" target="_self">Notice of Appeal (Form-7)</a></li>
                                    <li>Affidavit of Service <i className="far fa-file"></i> <i className="far fa-file-pdf"></i></li>
                                </ul>
                            <li>
                                <i class="fas fa-plus" aria-hidden="true"></i>&nbsp;
                                <span onClick={(e) => this.toggle('appelants-leave-to-appeal-forms', document)}  className="toggler">Leave to Appeal</span> 
                                &nbsp;
                                <i className="fa fa-info-circle" aria-hidden="true" title="with court's permission"></i>
                            </li>
                                <ul id="appelants-leave-to-appeal-forms">
                                    <li>Notice of Application for Leave to Appeal (Form-1)</li>
                                    <li>Notice of Motion for Leave to Appeal (Form-3)</li>
                                    <li>Motion Book (Form-4)</li>
                                    <li>Notice of Application to Vary an Order of a Justice (Form-15)</li>
                                    <li>Motion Book (Form-16)</li>
                                    <li>Appeal Record (Form-9)</li>
                                    <li>Factum (Form-10)</li>
                                    <li>Transcript Extract Book (Form-13)</li>
                                    <li>Appeal Book (Form-12)</li>
                                    <li>Reply (Form-11)</li>
                                    <li>Certificate of REadiness (Form-14)</li>
                                    <li>Notice of Hearing (Form-34)</li>
                                </ul>
                        </ul>
                        <li>Responding to an appeal?</li>
                        <ul>
                            <li>
                                <span onClick={(e) => this.toggle('respondents-right-to-appeal-forms', document)}  className="toggler">Right to Appeal</span> 
                                &nbsp;
                                <i className="fa fa-info-circle" aria-hidden="true" title="Start appeal without court's permission"></i>
                            </li>
                            <ul id="respondents-right-to-appeal-forms">
                                <li><a id="form2" href="/forms/form.2.html" target="_self">Notice of Appearance (Form-2)</a>&nbsp;</li>
                                <li>Notice of Cross Appeal (Form-8)</li>
                                <li>Factum (Form-10)</li>
                                <li>Transcript Extract Book (Form-13)</li>
                                <li>Appeal Book (Form-12)</li>
                                <li>Court Order</li>
                            </ul>
                            <li>
                                <span onClick={(e) => this.toggle('respondents-leave-to-appeal-forms', document)}  className="toggler">Leave to Appeal</span> 
                                &nbsp;
                                <i className="fa fa-info-circle" aria-hidden="true" title="Start appeal without court's permission"></i>
                            </li>
                            <ul id="respondents-leave-to-appeal-forms">
                                <li><a id="form2" href="/forms/form.2.html" target="_self">Notice of Appearance (Form-2)</a>&nbsp;</li>
                                <li>Reply Book (Form-5)</li>
                                <li>Reply Book (Form-17)</li>
                            </ul>
                        </ul>
                    </ul>   
                </div>                           
            </div>
        )
    }
}
export default SelectForm;