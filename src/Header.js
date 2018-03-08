import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
        <div id="header" role="banner">
            <div id="header-main" class="navbar navbar-default navbar-fixed-top">
                <div class="container">
                    <div id="header-main-row" class="row">
                        <div class="col-xs-3 col-sm-3 col-md-2 col-lg-2 header-main-left">
                            <div id="logo">
                                <a href="http://gov.bc.ca"><img src="/images/gov3_bc_logo.png" alt="Province of British Columbia" title="Province of British Columbia logo" /></a>
                            </div>
                        </div>
                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                            <div class="bcgov-title">
                                <h1>E-Filing</h1>
                            </div>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-7 col-lg-7">
                                <a id="logout" class="pull-right" href="/logout" style={{color:'white',whiteSpace:'nowrap',marginTop:'30px'}}>Log out</a>
                        </div>                  
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Header;
