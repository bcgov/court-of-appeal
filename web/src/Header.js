import React, { Component } from 'react';
import DefaultService from './service/default.service.js';
import './header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.homePath = (process.env.PUBLIC_URL === "") ? '/' : process.env.PUBLIC_URL;
        this.service = props.service;
        this.state = {
            fetch: props.fetch !== 'false',
            login: '<?>',
            displayname: '<?>'
        }

        this.fetch = this.fetch.bind(this);
        this.logout = this.logout.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
    }

    componentDidMount() {
        this.document = this.element.ownerDocument;
        let window = this.document.defaultView;
        if (this.service == null) { this.service = new DefaultService(window); }

        if (this.state.fetch) { this.fetch(); }
    }

    fetch() {
        this.service.getPersonInfo((person)=> {
            if (!person.error) {
                let display = '<?>';
                if (person.name) {
                    let parts = person.name.split(',');
                    display = parts.length>1? parts[1] + ' ' + parts[0] : person.name;
                }
                this.setState({
                    login: person.login? person.login: '<?>',
                    displayname: display
                });
            }
        });
    }

    logout() {
        this.service.redirectToLogout()
    }

    closeErrorModal() {
        this.document.getElementById('serviceErrorModal').style.display = 'none';
    }

  render() {
    return (
        <div id="header" role="banner" ref={ (element)=> {this.element = element }}>
            <div id="header-main" className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div id="header-main-row" className="row">
                        <div className="col-xs-3 col-sm-3 col-md-2 col-lg-2 header-main-left">
                            <div id="logo">
                                <a href="http://gov.bc.ca"><img src={process.env.PUBLIC_URL + '/images/gov3_bc_logo.png'} alt="Province of British Columbia" title="Province of British Columbia logo" /></a>
                            </div>
                        </div>
                        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                            <div className="bcgov-title">
                                <h2>Court of Appeal</h2>
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-5 col-lg-5">
                            <div className="pull-right">
                                <div className="align-right header-top-line">
                                    <span id="greetings" >Welcome, { this.state.displayname }</span>
                                    <span> | </span>
                                    <span id="logout" onClick={ this.logout }>Log Out</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navigationRibbon">
                    <div className="level2Navigation">
                        <div className="container">
                            <div id="row">
                                <div className="col-xs-6 text-left">
                                    <a href={this.homePath}>HOME</a>
                                    <a href={process.env.PUBLIC_URL + '/my-documents.html'}>MY DOCUMENTS</a>
                                    <a href={process.env.PUBLIC_URL + '/'}>ALL DOCUMENTS</a>
                                </div>
                                <div className="col-xs-6 text-right icons">
                                    <a href={process.env.PUBLIC_URL}>
                                        <span className="oi oi-cog" title="profile" aria-hidden="true"></span>
                                    </a>
                                    <a href={process.env.PUBLIC_URL}>
                                        <span className="oi oi-info" title="help" aria-hidden="true"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="serviceErrorModal" ref={ (element)=> {this.errorModal = element }}>
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
