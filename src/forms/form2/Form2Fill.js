import React, { Component } from 'react';
import ProgressStatusBar from '../../components/progress/ProgressStatusBar';
import '../Form.css';
import './Form2Fill.css';
import DefaultService from "../../service/default.service";

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
                    <div className="page-title-section">
                            <div className="page-title">Notice of Appearance</div>
                        <div className="page-subtitle">Form 2 (RULES 5 (A), 13(A) AND 17(A))</div>
                    </div>
                        <div className="form-section">
                            <div className="section-title">
                                When Do You Use the Notice of Appearance (Form2)?
                            </div>
                            <p>
                                If you have been served a Notice of Appeal (Form 7), and you want to respond,
                                fill out the Notice of Appearance (Form 2). If you do not respond,
                                you will not be includedin future court proceedings related to this case,
                                and will not have access to the case documents filed.
                            </p>
                            <p>
                                You have 10 days to serve a filed copy of the Notice of Appearance to the appelant,
                                after receiving a Notice of Appeal.
                            </p>
                        </div>
                        <div className="form-section">
                            <div className="section-title">
                                Style of Proceeding (Parties) in Case
                            </div>
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
