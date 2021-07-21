import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DefaultService from '../service/api-service.js';
import '../styles/Header.css';
import {PUBLIC_URL} from '../config/environment';
import {getUser, isUserLoggedIn} from '../helpers/user';
import {console_debug_log} from "../helpers/utils";

class Header extends Component {

    constructor(props) {
        super(props);
        this.homePath = (PUBLIC_URL === "") ? '/' : PUBLIC_URL;
        this.service = props.service;
        this.state = {
            fetch: props.fetch !== 'false',
            login: '<?>',
            displayname: '',
        }
        this.fetch = this.fetch.bind(this);
        this.logout = this.logout.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
    }

    componentDidMount() {
        this.document = this.element.ownerDocument;
        let window = this.document.defaultView;
        if (this.service == null) {
            this.service = new DefaultService(window);
        }

        if (this.state.fetch) {
            this.fetch();
        }
        isUserLoggedIn(this.service);
    }

    logout() {
        this.service.redirectToLogout();
    }

    fetch() {
        this.service.getPersonInfo((person) => {
            if (!person.error) {
                let display = '<?>';
                if (person.name) {
                    let parts = person.name.split(',');
                    display = parts.length > 1 ? parts[1] + ' ' + parts[0] : person.name;
                }
                this.setState({
                    login: person.login ? person.login : '<?>',
                    displayname: display
                });
            }
        });
    }

    closeErrorModal() {
        this.document.getElementById('serviceErrorModal').style.display = 'none';
    }

    render() {
        const loggedIn = getUser().loggedIn;
        console_debug_log(`Header - user loggedIn: ${loggedIn}`);

        return (
            <div id="header" role="banner" ref={(element) => {
                this.element = element
            }}>
                <div id="header-main" className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div id="header-main-row" className="row">
                            <div className="col-xs-3 col-sm-3 col-md-2 col-lg-2 header-main-left">
                                <div id="logo">
                                    <a href="http://gov.bc.ca"><img src={PUBLIC_URL + '/images/gov3_bc_logo.png'}
                                                                    alt="Province of British Columbia"
                                                                    title="Province of British Columbia logo"/></a>
                                </div>
                            </div>
                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                <div className="bcgov-title">
                                    <h2>Court of Appeal</h2>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-5 col-lg-5">
                                <div className="pull-right">
                                    {loggedIn ?
                                        <div className="align-right header-top-line">
                                            <span id="greetings">Welcome, {this.state.displayname}</span>
                                            {/*<span> | </span>*/}
                                            {/*<span id="logout" onClick={this.logout}>Log Out</span>*/}
                                        </div>
                                        : <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navigationRibbon">
                        <div className="level2Navigation">
                            <div className="container">
                                <div id="row">
                                    <div className="col-xs-6 text-left">
                                        {loggedIn ?
                                            <>
                                                <Link to={PUBLIC_URL + '/'}>HOME</Link>
                                                <Link to={PUBLIC_URL + '/my-documents'}>MY DOCUMENTS</Link>
                                            </>
                                            : <></>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="serviceErrorModal" ref={(element) => {
                    this.errorModal = element
                }}>
                    <div className="service-error-modal-title">
                        <span id="service-error-close-modal" onClick={this.closeErrorModal}>&times;</span>
                        Service unavailable
                    </div>
                    <div className="service-error-modal-content">
                        <div>
                            Something unexpected happened.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
