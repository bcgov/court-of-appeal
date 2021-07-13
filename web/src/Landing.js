import React, {Component} from 'react';
import Journey from './components/Journey.js';
import Top5 from './forms/Top5.js';
import ActiveFormList from './components/ActiveFormList.js';
import NeedHelp from './NeedHelp.js';
import './dashboard.css';
import ReactTooltip from 'react-tooltip';
import renderCases from "./components/cases.renderer";
import findCaseById from "./helpers/find.case.by.id";
import DefaultService from "./service/default.service";
import { BCEID_LOGIN_URL, BCEID_REGISTER_URL } from './config/environment';

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.service = props.service;
        this.state = {
            fetch: props.fetch !== 'false',
            cases: [],
            displayMyCasesEmptyLabel:true,
            closeBrowserCheck: false,
            isIE11: this.isIE11()
        };
        this.fetchCases = this.fetchCases.bind(this);
        this.updateCases = this.updateCases.bind(this);
        this.closeBrowserCheck = this.closeBrowserCheck.bind(this);
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
        if (this.state.fetch) {
            this.fetchCases();
        }
    }

    isIE11() {
        const ua = window.navigator.userAgent; 
        const msie = ua.indexOf('MSIE ');
        const trident = ua.indexOf('Trident/'); 
        return (msie > 0 || trident > 0);
    }

    fetchCases() {
        this.service.getMyCases({}, (data) => {
            let cases = renderCases(data.cases.slice(0, 5));
            this.setState({
                cases:cases,
                displayMyCasesEmptyLabel: (cases.length === 0)
            });
        });
    }

    updateCases(data, id) {
        findCaseById({id:id, cases:this.state.cases}, (found)=>{
            found.data = data;
            this.setState({ cases:this.state.cases });
        });
    }

    closeBrowserCheck() {
        this.setState({ closeBrowserCheck : true });
    }

    render() {
        return (
            <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>
                { this.state.isIE11 && !this.state.closeBrowserCheck && 
                    <div id="info-modal" className={"info-modal"} style={{display: 'block'}} >
                        <div className="info-modal-title" style={{backgroundColor: 'red'}}>
                        IE 11 detected - Modern browser required
                            <span className="close-info-modal" onClick={this.closeBrowserCheck}>&times;</span>
                        </div>
                        <div className="info-modal-content">
                            A modern browser such as Google Chrome, Mozilla Firefox or Microsoft Edge is required for this site.
                        </div>
                    </div>
                }
                <div className="row">
                    <div role="main" className="col col-sm-12">
                        <div className="not-printable">
                            <h1 style={{ display:'inline-block', fontSize: '33px', color: '#313132' }}>Court of Appeal</h1>
                        </div>
                        <div id="landing-page-dialog" ref={ (element)=> {this.element = element }} className="form-section">
                            <div className="row">
                                <div className="col-md-6 form-section">
                                    <h2>New Users </h2>
                                    <a className="btn btn-primary btn-same-width" href={BCEID_REGISTER_URL}>Register for a BCeID
                                    </a>
                                </div>
                                <div className="col-md-6 form-section">
                                  <h2>Returning Users</h2>
                                  <a className="btn btn-primary btn-same-width" href={BCEID_LOGIN_URL}>Login with existing BCeID
                                  </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;

