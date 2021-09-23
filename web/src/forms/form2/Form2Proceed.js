import React, { Component } from 'react';
import ProgressStatusBar from '../../components/progress/ProgressStatusBar';
import './Form2Proceed.css';
import DefaultService from '../../service/api-service';
import SpinnerButton from '../../components/SpinnerButton';
import { PUBLIC_URL } from '../../config/environment';

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
          <div
            id="topicTemplate"
            className="template container gov-container form"
            ref={(element) => {
              this.element = element;
            }}
          >
            <ProgressStatusBar
              activeStep={3}
              steps={["Form 2", "Preview", "Submit"]}
            />

            <div className="row section section-gray">
              <div className="col-xs-12">
                <div className="page-title">Submit through E-Filing</div>
                <div className="page-subtitle">
                  By submitting, you will be redirected to the E-Filing Hub.
                </div>
                {(this.state.submissionError) && (
                  <div>
                    <br />
                    <h2 style={{ color: "red", marginBottom: '0px' }}>
                      {" "}
                      Error from E-Filing Hub: {this.state.submissionError}{" "}
                    </h2>
                    If this error persists please contact support.
                  </div>
                )}
                <div style={{ textAlign: "right", paddingTop: "15px" }}>
                  <button
                    id="payment-cancelled"
                    onClick={this.cancel}
                    className="btn btn-primary round-borders action-button white"
                  >
                    Cancel
                  </button>
                  <SpinnerButton
                    id="payment-confirmed"
                    width="150"
                    addClass="proceed-confirmation"
                    onClick={this.confirm}
                    ref={(element) => {
                      this.submitButton = element;
                    }}
                    content="Submit"
                  ></SpinnerButton>
                </div>
              </div>
            </div>
          </div>
        );
    }

    backToFill() {
        this.props.history.push({pathname: PUBLIC_URL + '/fill',state: this.state })
    }
    backToPreview() {
        this.props.history.push({pathname: PUBLIC_URL + '/preview',state: this.state })
    }

    cancel() {
        this.props.history.push({pathname: PUBLIC_URL + '/',state: {}});
    }

    confirm() {
        let self = this;
        this.submitButton.startSpinner();
        this.service.submit(this.state.formId, (data)=>{
            this.submitButton.stopSpinner();
            if (!data.error && data.message === "success") {
                window.location.replace(data.url);
            }
            else {
                self.setState({
                    submissionError: data.message
                });
            }
        })
    }
}
export default Form2Proceed;
