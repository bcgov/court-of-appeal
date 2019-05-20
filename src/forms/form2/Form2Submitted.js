import React, { Component } from 'react';
import ProgressStatusBar from '../../components/progress/ProgressStatusBar';

class Form2Submitted extends Component {

    constructor(props) {
        super(props);
        this.state = props.location ? props.location.state : {};
        this.done = this.done.bind(this)
    }

    render() {
        return (
        <div id="topicTemplate" className="template container gov-container form" >

            <ProgressStatusBar activeStep={5} steps={["Access","Form 2","Preview","Payment"]} />

            <div className="row section section-gray">
                <div className="col-xs-12">
                    <div className="page-title">Form Submitted</div>
                </div>
            </div>

            <div className="row section section-white">
                <div className="col-xs-12">
                    Your Notice of Appearance has been submitted and accepted.
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
