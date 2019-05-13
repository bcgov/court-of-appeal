import React, { Component } from 'react';
import ProgressStatusBar from '../components/progress/ProgressStatusBar';
import FormButtonBar from '../components/FormButtonBar';
import './Form2Proceed.css';

class Form2Proceed extends Component {

    constructor(props) {
        super(props);
        this.state = props.location ? props.location.state : {};
        this.cancel = this.cancel.bind(this)
        this.confirm = this.confirm.bind(this)
    }

    render() {
        return (
            <div id="topicTemplate" className="template container gov-container form" >

                <div id="breadcrumbContainer">
                    <ol className="breadcrumb">
                        <li>
                            <a id="home" href={this.homePath}>Home</a>
                        </li>
                        <li>
                            <a href="/form2">Notice of Appearance (Form 2)</a>
                        </li>
                        <li>
                            <a href="/preview/form2">Preview (Form 2)</a>
                        </li>
                        <li>
                            <a href="">Proceed</a>
                        </li>
                    </ol>
                </div>

                  <ProgressStatusBar
                      activeStep={4}
                      steps={["Access","Form 2","Preview","Payment"]}
                  />

                <div className="row">
                    <div id="viewFormModal" className="col col-lg-12 col-md-12 col-sm-12 preview-form">
                        <div className="preview-title  not-printable">
                            Confirm Payment Amount
                        </div>
                        <div className="form-section">
                            <table width="100%">
                                <tbody>
                                    <tr style={{fontWeight:'bold'}}>
                                        <td>Fee Type</td><td style={{textAlign:'right'}}>Fee Amount</td>
                                    </tr>
                                    <tr style={{}}>
                                        <td>CSO Fee</td><td style={{textAlign:'right'}}>$7.00</td>
                                    </tr>
                                    <tr style={{ borderTop:'1px solid black' }}>
                                        <td style={{fontWeight:'bold'}}>Total:</td><td style={{textAlign:'right'}}>$7.00</td>
                                    </tr>
                                </tbody>
                            </table>
                            This amount will be billed using the payment info of your account.
                            <div style={{textAlign:'right', paddingTop:'15px'}}>
                                <button id="payment-cancelled" onClick={this.cancel} className="btn btn-primary round-borders action-button white">Cancel</button>
                                <button id="payment-confirmed" onClick={this.confirm} className="btn btn-primary round-borders action-button">Confirmation</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    cancel() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/',state: {}});
    }

    confirm() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/',state: { formId:this.state.formId }});
    }
}
export default Form2Proceed;
