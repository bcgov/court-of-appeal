import React, { Component } from 'react';
import ProgressStatusBar from '../../components/progress/ProgressStatusBar';
import './Form2Submitted.css';

class Form2Submitted extends Component {

    constructor(props) {
        super(props);
        this.state = props.location ? props.location.state : {};

        this.done = this.done.bind(this)
    }

    render() {
        return (
        <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>

            <ProgressStatusBar activeStep={5} steps={["Form 2","Preview","E-Filing"]} />

            <div className="row section section-gray">
                <div className="col-xs-12">
                    <div className="page-title">Form Submitted</div>
                </div>
            </div>

            <div className="row section section-white">
                <div className="col-xs-12">
                    Your Notice of Appearance has been submitted and accepted.
                    Processing of the submission will be completed in 3-5 minutes.

                    <table className="receipt-summary-table">
                        <tbody>
                            <tr>
                                <th>Package Number:</th>
                                <td id="package-number">{ this.state.packageNumber }</td>
                            </tr>
                            <tr>
                                <th>Your File #:</th>
                                <td>{ this.state.caseNumber }</td>
                            </tr>
                            <tr>
                                <th>Submitted To:</th>
                                <td>B.C. Court of Appeal</td>
                            </tr>
                        </tbody>
                    </table>

                    <br/>
                    <div className="section-title">
                        Receipt
                    </div>
                    <table className="receipt-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Document</th>
                                <th className="right">Upload Status</th>
                                <th className="right">Statutory Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Notice of Appearance - Court of Appeal</td>
                                <td className="right">Complete</td>
                                <td className="right">$0.00</td>
                            </tr>
                            <tr>
                                <td colSpan="4" style={{ borderBottom:'1px solid black' }}></td>
                            </tr>
                            <tr>
                                <td colSpan="4"></td>
                            </tr>
                            <tr>
                                <th colSpan="3" className="right">Subtotal:</th>
                                <td className="right">$0.00</td>
                            </tr>
                            <tr>
                                <th colSpan="3" className="right">CSO Fee:</th>
                                <td className="right">$7.00</td>
                            </tr>
                            <tr>
                                <th colSpan="3" className="right">Total:</th>
                                <td className="right">$7.00</td>
                            </tr>
                        </tbody>
                    </table>


                    <div style={{textAlign:'right', paddingTop:'15px'}}>
                        <button id="done" onClick={this.done} className="btn btn-primary round-borders action-button">Done</button>
                    </div>
                </div>
            </div>

        </div>
        );
    }

    done() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/',state: {}});
    }
}
export default Form2Submitted;
