import React, { Component } from 'react';
import ProgressStatusBar from '../components/progress/ProgressStatusBar';
import './Form2Fill.css';
import DefaultService from "../service/default.service";

class Form2Fill extends Component {

    constructor(props) {
        super(props);
        this.homePath = (process.env.PUBLIC_URL === '') ? '/' : process.env.PUBLIC_URL
        this.service = props.service;
        this.state = props.location && props.location.state ? props.location.state : {};
        console.log(this.state);
        this.backToAccess = this.backToAccess.bind(this)
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
                        <li>
                            <a href='#' onClick={this.backToAccess}>Access</a>
                        </li>
                    </ol>
                </div>

                  <ProgressStatusBar
                      activeStep={2}
                      steps={["Access","Form 2","Preview","Payment"]}
                  />

                <div className="row">
                    <div id="viewFormModal" className="col col-lg-12 col-md-12 col-sm-12 preview-form">
                        <div className="preview-title  not-printable">
                            NOTICE OF APPEARANCE
                        </div>
                        <div className="form-section">
                            When Do You Use the Notice of Appearance (Form2)?

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    backToAccess() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/access',state: { caseNumber:this.state.caseNumber, parties:this.state.parties }});
    }
}
export default Form2Fill;
