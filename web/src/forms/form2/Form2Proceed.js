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

            <ProgressStatusBar activeStep={3} steps={["Form 2","Preview","Submit"]}/>

            <div className="row section section-gray">
                <div className="col-xs-12">
                    <div className="page-title">Submit through E-Filing</div>
                </div>
            </div>

            <div className="row section section-white">
                <div className="col-xs-12">
                    By submitting, you will be redirected to the E-Filing Hub.
                    <div style={{textAlign:'right', paddingTop:'15px'}}>
                        <button id="payment-cancelled" onClick={this.cancel} className="btn btn-primary round-borders action-button white">Cancel</button>
                        <SpinnerButton id="payment-confirmed" width="150" addClass="proceed-confirmation" onClick={this.confirm} ref={ (element)=> {this.submitButton = element }}
                            content='Submit'>
                        </SpinnerButton>
                    </div>
                </div>
            </div>

        </div>
        );
    }

    backToFill() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/fill',state: this.state })
    }
    backToPreview() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/preview',state: this.state })
    }

    cancel() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/',state: {}});
    }

    confirm() {
        this.submitButton.startSpinner();
        this.service.submit(this.state.formId, (data)=>{
            this.submitButton.stopSpinner();
            if (!data.error && data.message === "success") {
                window.location.replace(data.url);
            }
        })
    }
}
export default Form2Proceed;
