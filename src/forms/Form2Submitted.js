import React, { Component } from 'react';
import ProgressStatusBar from '../components/progress/ProgressStatusBar';
import FormButtonBar from '../components/FormButtonBar';

class Form2Submitted extends Component {

    constructor(props) {
        super(props);
        this.state = props.location ? props.location.state : {};
        this.done = this.done.bind(this)
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
                            <a href="/preview">Preview</a>
                        </li>
                        <li>
                            <a href="/process">Proceed</a>
                        </li>
                        <li>
                            <a href="">Done</a>
                        </li>
                    </ol>
                </div>

                  <ProgressStatusBar
                      activeStep={5}
                      steps={["Access","Form 2","Preview","Payment"]}
                  />

                <div className="row">
                    <div id="viewFormModal" className="col col-lg-12 col-md-12 col-sm-12 preview-form">
                        <div className="preview-title  not-printable">
                            Form Submitted
                        </div>
                        <div className="form-section">
                            Your Notice of Appearance has been submitted and accepted.
                            <div style={{textAlign:'right', paddingTop:'15px'}}>
                                <button id="done" onClick={this.done} className="btn btn-primary round-borders action-button">Done</button>
                            </div>
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
