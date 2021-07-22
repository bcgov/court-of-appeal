import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import DefaultService from '../service/api-service.js';
import '../styles/Header.css';
import {PUBLIC_URL, isDevelopmentEnviromment} from '../config/environment';
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
            displayname: ''
        }
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
        // isUserLoggedIn(this.service);
        const checkIfUserIsLoggedIn = async () => {
            await isUserLoggedIn(this.service);
        }
        checkIfUserIsLoggedIn();
    }

    logout = () => {
        this.service.redirectToLogout();
    }

    fetch = () => {
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

    closeErrorModal = () => {
        this.document.getElementById('serviceErrorModal').style.display = 'none';
    }

    render() {
        const loggedIn = getUser().loggedIn;
        console_debug_log(`Header - user loggedIn: ${loggedIn}`);
        // TODO:// something is going on goofy here, and it needs to be fixed. For
        //  some reason the landing page isn't getting rendered when the bceid login redirects us back here
        //  only this header render is called and this is silly!
        if (loggedIn && window.location.href === `${window.location.origin + PUBLIC_URL}`) {
            console_debug_log('in header - loggedIn, redirecting from landing page to dashboard');
            // TODO:// this barely works correctly!
            // return (<div ref={ (element)=> {this.element = element }}>
            //     <Redirect to={PUBLIC_URL + '/dashboard'} push={false} />
            // </div>);
        }

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
                                            {isDevelopmentEnviromment ?
                                                <><span> | </span>
                                                    <span id="logout" onClick={this.logout}>Log Out</span></>
                                                : <></>
                                            }
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
