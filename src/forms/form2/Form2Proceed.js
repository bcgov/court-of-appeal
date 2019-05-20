import React, { Component } from 'react';
import ProgressStatusBar from '../../components/progress/ProgressStatusBar';
import './Form2Proceed.css';
import DefaultService from "../../service/default.service";
import SpinnerButton from '../../components/SpinnerButton';

class Form2Proceed extends Component {

    constructor(props) {
        super(props);
        this.service = props.service;
        this.state = props.location ? props.location.state : {};
        this.cancel = this.cancel.bind(this)
        this.confirm = this.confirm.bind(this)
        this.backToAccess = this.backToAccess.bind(this)
        this.backToFill = this.backToFill.bind(this)
        this.backToPreview = this.backToPreview.bind(this)
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
    }

    render() {
        return (
        <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>

            <div id="breadcrumbContainer">
                <ol className="breadcrumb">
                    <li><a id="home" href={this.homePath}>Home</a></li>
                    <li><a href={this.homePath + 'start'}>Start</a></li>
                    <li><a href='#' onClick={this.backToAccess}>Access</a></li>
                    <li><a href='#' onClick={this.backToFill}>Fill</a></li>
                    <li><a href='#' onClick={this.backToPreview}>Preview</a></li>
                </ol>
            </div>

            <ProgressStatusBar activeStep={4} steps={["Access","Form 2","Preview","Payment"]}/>

            <div className="row section section-gray">
                <div className="col-xs-12">
                    <div className="page-title">Confirm Payment Amount</div>
                </div>
            </div>

            <div className="row section section-white">
                <div className="col-xs-12">
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
                        <SpinnerButton id="payment-confirmed" width="150" addClass="proceed-confirmation" onClick={this.confirm} ref={ (element)=> {this.submitButton = element }}
                            content='Confirmation'>
                        </SpinnerButton>
                    </div>
                </div>
            </div>

        </div>
        );
    }

    backToAccess() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/access',state: {
            formId: this.state.formId,
            caseNumber:this.state.caseNumber,
            parties:this.state.parties,
            selectedContactIndex: this.state.selectedContactIndex,
            useServiceEmail: this.state.useServiceEmail,
            sendNotifications: this.state.sendNotifications
        }});
    }
    backToFill() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/fill',state: {
            formId: this.state.formId,
            caseNumber:this.state.caseNumber,
            parties:this.state.parties,
            selectedContactIndex: this.state.selectedContactIndex,
            useServiceEmail: this.state.useServiceEmail,
            sendNotifications: this.state.sendNotifications
        }})
    }
    backToPreview() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/preview',state: {
            formId: this.state.formId,
            caseNumber:this.state.caseNumber,
            parties:this.state.parties,
            selectedContactIndex: this.state.selectedContactIndex,
            useServiceEmail: this.state.useServiceEmail,
            sendNotifications: this.state.sendNotifications
        }})
    }

    cancel() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/',state: {}});
    }

    confirm() {
        this.submitButton.startSpinner();
        this.service.submit(this.state.formId, (data)=>{
            this.submitButton.stopSpinner();
            if (!data.error) {
                this.props.history.push({pathname: process.env.PUBLIC_URL + '/submitted',state: { formId:this.state.formId }});
            }
        })
    }
}
export default Form2Proceed;
