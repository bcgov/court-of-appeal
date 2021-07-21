import React, {Component} from 'react';
import Journey from '../components/Journey.js';
import Top5 from '../forms/Top5.js';
import ActiveFormList from '../components/ActiveFormList.js';
import NeedHelp from './NeedHelp.js';
import '../styles/Dashboard.css';
import ReactTooltip from 'react-tooltip';
import renderCases from "../components/CasesRenderer";
import findCaseById from "../helpers/find-case-by-id";
import DefaultService from "../service/api-service";

class Dashboard extends Component {

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
                        <ActiveFormList
                            fetch={this.state.fetch}
                            updateCases={this.updateCases}
                            fetchCases={this.fetchCases}
                            service={this.service}
                            cases={this.state.cases}
                            displayMyCasesEmptyLabel={this.state.displayMyCasesEmptyLabel}
                            history={this.props.history}
                        />
                    </div>
                </div>
                <div className="row">
                    <div role="main" className="center-main col col-lg-8" >
                        <Journey
                            cases={this.state.cases}
                            service={this.service}
                        />
                    </div>
                    <div role="main" className="right-nav-main col col-lg-4"  >
                        <div className="row">
                            <div className="col col-lg-12">
                                <Top5/>
                            </div>
                        </div>
                        <div className="row">
                            <div role="main" className="col col-lg-12">
                                <NeedHelp/>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactTooltip
                    multiline={true}
                    html={true}
                    effect="solid"
                    delayHide={1000}
                    className="right-to-appeal-tooltip"
                    wrapper="div"
                />
            </div>
        );
    }
}

export default Dashboard;
