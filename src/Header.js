import React, { Component } from 'react';
import DefaultService from './service/default.service.js';
import './header.css';

class Header extends Component {

    constructor(props) {
        super(props);   
        this.service = props.service; 
        this.state = {
            login: '<?>'
        }

        this.fetch = this.fetch.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        let window = this.element.ownerDocument.defaultView;
        if (this.service == null) { this.service = new DefaultService(window); }        

        this.fetch();
    }

    fetch() {
        this.service.getPersonInfo((person)=> {
            this.setState({
                login: person.login? person.login: '<?>'
            });
        });
    }

    logout() {
        let document = this.element.ownerDocument;
        let window = document.defaultView;
        document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location = '/';
    }

  render() {
    return (
        <div id="header" role="banner" ref={ (element)=> {this.element = element }}>
            <div id="header-main" className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div id="header-main-row" className="row">
                        <div className="col-xs-3 col-sm-3 col-md-2 col-lg-2 header-main-left">
                            <div id="logo">
                                <a href="http://gov.bc.ca"><img src="/images/gov3_bc_logo.png" alt="Province of British Columbia" title="Province of British Columbia logo" /></a>
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
                                    <span >Welcome, { this.state.login }</span>
                                    <span> | </span>
                                    <span id="logout" onClick={ this.logout }>Logout</span>
                                </div>
                                <div className="align-right header-bottom-line">
                                    <div className="icons">
                                        <i className="fa fa-home" aria-hidden="true"></i>                                        
                                        <a href="/notifications.html">
                                            <i className="fa fa-bell" aria-hidden="true"></i>
                                            <span className="notify">3</span>
                                        </a>
                                        <i className="fas fa-info-circle" aria-hidden="true"></i>
                                        <i className="fa fa-cog" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>                  
                    </div>
                </div>
                <div className="navigationRibbon">
                    <div className="level2Navigation">
                        <div className="container">
                            <div id="header-menu-row">
                                <a href="/">HOME</a>
                                <a href="/my-applications.html">MY DOCUMENTS</a>
                                <a href="/">ALL DOCUMENTS</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Header;
