import React, { Component } from 'react';
import ProgressStatusBar from '../../components/progress/ProgressStatusBar';
import './Form2Preview.css';
import DefaultService from "../../service/default.service";
import save from '../../helpers/save-file'
import SpinnerButton from '../../components/SpinnerButton';

class Form2Preview extends Component {

    constructor(props) {
        super(props);
        this.state = props.location ? props.location.state : {};
        this.homePath = props.homePath || (process.env.PUBLIC_URL === "") ? '/' : process.env.PUBLIC_URL;
        this.service = this.props.service;

        this.backToAccess = this.backToAccess.bind(this)
        this.backToFill = this.backToFill.bind(this)
        this.proceed = this.proceed.bind(this)
        this.download = this.download.bind(this)
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
        if (this.state.formId) {
            this.service.previewForm(this.state.formId, (html)=>{
                if (!html.error) {
                    this.setState({ previewContent: html })
                }
            })
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
                </ol>
            </div>

            <ProgressStatusBar activeStep={3} steps={["Access","Form 2","Preview","Payment"]}/>

            <div className="row section section-gray">
                <div className="col-xs-12">
                    <div className="page-title">Preview Your Form</div>
                    <div className="page-subtitle">
                        Your can review your form here to ensure everything to correct before submitting.
                        If edits are required, you may still go back and make the necessary changes.
                    </div>
                </div>
            </div>
            <div className="row section section-gray section-thin right">
                <div className="col-xs-12 right">
                    <button id="back"
                            className="btn btn-primary round-borders"
                            style= {{ marginRight:'15px' }}
                            onClick={this.backToFill}>
                            <i className="glyphicon glyphicon-edit" />  Go Back and Edit
                    </button>
                    <SpinnerButton  ref= { el => this.downloadButton = el }
                                    content= 'Download PDF'
                                    width= "120"
                                    onClick= { this.download } />
                </div>
            </div>
            <div className="row section section-white">
                <div className="col-xs-12">
                    <div dangerouslySetInnerHTML={{__html: this.state.previewContent ? this.state.previewContent : "Loading..."}} />
                </div>
            </div>

            <div className="row section section-gray right">
                <div className="col-xs-12 right">
                    <button id="proceed"
                            className="btn btn-primary round-borders action-button"
                            onClick={this.proceed}>
                            Continue
                            <i className="glyphicon glyphicon-triangle-right" />
                    </button>
                </div>
            </div>

        </div>
        );
    }

    backToAccess() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/access',state: this.state })
    }
    backToFill() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/fill',state: this.state })
    }
    proceed(e) {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/proceed', state: this.state })
    }

    download() {
        let ids = [this.state.formId]
        this.downloadButton.startSpinner()
        this.service.download(ids, (data) => {
            this.downloadButton.stopSpinner()
            if (!data.error) {
                save(data);
            }
        });
    }
}
export default Form2Preview;
