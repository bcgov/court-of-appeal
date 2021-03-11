import axios from 'axios';
import React, { Component } from 'react';
import ProgressStatusBar from '../../components/progress/ProgressStatusBar';
import './Form2Submitted.css';

class Form2Submitted extends Component {

    constructor(props) {
        super(props);

        const params = new URLSearchParams(props.location.search);
        this.state = {};
        this.state.id = props.match.params.id;
        this.state.success = props.location.pathname.includes("success");
        this.state.cancelled = props.location.pathname.includes("cancel");
        this.state.error = props.location.pathname.includes("error");
        this.state.errorMessage = params.get("message") ;
        this.state.activeStep = this.state.success ? 4 : 3;
        this.service = props.service;
        this.done = this.done.bind(this)
    }

    componentDidMount() {
        if (this.state.success)
            this.fetchSubmittedInfo(this.state.id);
    }

    render() {
        return (
        <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>

            <ProgressStatusBar activeStep={this.state.activeStep} steps={["Form 2","Preview","Submit"]} />

            <div className="row section section-gray">
                <div className="col-xs-12">
                    <div className="page-title">{this.state.success ? 'Form Submitted' : ''}{this.state.cancelled ? 'E-Filing Cancelled' : ''}{this.state.error ? 'E-Filing Error' : ''}</div>
                </div>
            </div>
            {this.state.cancelled &&
                <div className="row section section-white">
                    <div className="col-xs-12">
                        E-Filing has been cancelled.
                        <br/>
                        <div style={{textAlign:'right', paddingTop:'15px'}}>
                            <button id="done" onClick={this.done} className="btn btn-primary round-borders action-button">Done</button>
                        </div>
                    </div>
                </div>
            }
            {this.state.error &&
                <div className="row section section-white">
                    <div className="col-xs-12">
                        There has been an error while attempting to E-File your Notice of Appeal:
                        <br/> 
                        <br/>
                        <span style={{color:'red'}}>{this.state.errorMessage}</span>                        
                        <br/>
                        <br/>
                        Please try again. If this error persists contact support.
                        <div style={{textAlign:'right', paddingTop:'15px'}}>
                            <button id="done" onClick={this.done} className="btn btn-primary round-borders action-button">Done</button>
                        </div>
                    </div>
                </div>
            }
            {this.state.success &&
                <div className="row section section-white">
                    <div className="col-xs-12">
                        Your Notice of Appearance has been submitted and accepted.

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
                                <tr>
                                    <th>E-Filing Url:</th>
                                    <td><a href={ this.state.packageUrl }>{ this.state.packageUrl }</a></td>
                                </tr>
                            </tbody>
                        </table>

                        <br/>
                        <div style={{textAlign:'right', paddingTop:'15px'}}>
                            <button id="done" onClick={this.done} className="btn btn-primary round-borders action-button">Done</button>
                        </div>
                    </div>
                </div>
            }
        </div>
        );
    }

    async fetchSubmittedInfo() {
        try {
            let response = await axios.get(`/api/forms/${this.state.id}/submit`);
            let data = response.data;
            this.setState({caseNumber: data.caseNumber, packageNumber: data.packageNumber, packageUrl: data.packageUrl})
        }
        catch (err){
            console.error(err);
        }
    }
    done() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/',state: {}});
    }
}
export default Form2Submitted;
