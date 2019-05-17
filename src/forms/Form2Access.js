import React, { Component } from 'react';
import ProgressStatusBar from '../components/progress/ProgressStatusBar';
import './Form2Access.css';
import DefaultService from "../service/default.service";

class Form2Access extends Component {

    constructor(props) {
        super(props);
        this.homePath = (process.env.PUBLIC_URL === '') ? '/' : process.env.PUBLIC_URL
        this.service = props.service;
        this.state = props.location && props.location.state ? props.location.state : { caseNumber: '12345 (fake)'};
        console.log(this.state);
        this.next = this.next.bind(this)
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
                        <li>
                            <a id="home" href={this.homePath}>Home</a>
                        </li>
                        <li>
                            <a href={this.homePath + 'start'}>Start</a>
                        </li>
                    </ol>
                </div>

                  <ProgressStatusBar
                      activeStep={1}
                      steps={["Access","Form 2","Preview","Payment"]}
                  />

                <div className="row">
                    <div id="viewFormModal" className="col col-lg-12 col-md-12 col-sm-12 preview-form">
                        <div className="preview-title  not-printable">
                            Notice of Appearance Access
                        </div>
                        <div className="form-section">
                            <div className="access-case-number-reminder">
                                Court of Appeal Case #{ this.state.caseNumber }
                            </div>
                            The following users will have access to the package containing this Notice of Appearance once it is submitted.
                            <div style={{textAlign:'right', paddingTop:'15px'}}>
                                <button id="continue-to-form" onClick={this.next} className="btn btn-primary round-borders action-button">Fill Notice of Appeal form</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    next() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/',state: {}});
    }
}
export default Form2Access;
