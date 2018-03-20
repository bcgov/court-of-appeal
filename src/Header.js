import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
        <div id="header" role="banner">
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
                                    <span >Welcome, Julie</span>
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
                                <a href="/my-applications.html">MY CASES</a>
                                <a href="/">ALL FORMS</a>
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
