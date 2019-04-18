import React, { Component } from 'react';
import ProgressStatusBar from '../components/progress/ProgressStatusBar';
import FormButtonBar from '../components/FormButtonBar';
import './Form2Preview.css';

class Form2Preview extends Component {

    constructor(props) {
        super(props);
        this.state = props.location ? props.location.state : {};
        this.homePath = props.homePath || (process.env.PUBLIC_URL === "") ? '/' : process.env.PUBLIC_URL;
        this.form2Path = props.form2Path || this.homePath + '/form2';
        this.service = this.props.service;
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
                            <a href="">Preview (Form 2)</a>
                        </li>
                    </ol>
                </div>

                  <ProgressStatusBar
                      activeStep={3}
                      steps={["Access","Form 2","Preview","Payment"]}
                  />

                <div className="row">
                    <div id="viewFormModal" className="col col-lg-12 col-md-12 col-sm-12 preview-form">
                        <div className="preview-title  not-printable">
                            Preview Form 2
                        </div>
                        <div className="form-section">
                            <div dangerouslySetInnerHTML={{__html: this.state ? this.state.previewContent : "No form available for preview"}} />
                            <FormButtonBar
                                back={this.goBack.bind(this)}
                                printable="yes"
                                backMessage="Back to editing"
                                disableSubmit={this.state? this.state.submitShouldBeDisabled : ()=>{}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    goBack() {
        this.props.history.goBack();
    }
}
export default Form2Preview;