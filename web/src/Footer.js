import React, { Component } from 'react';

class Footer extends Component {

    constructor(props) {
        super(props);   
        this.homePath = (process.env.PUBLIC_URL === "") ? '/' : process.env.PUBLIC_URL;
        this.state = {
            commit: process.env.REACT_APP_COMMIT!==undefined
                ?process.env.REACT_APP_COMMIT.substr(0, 7)
                :'Unknown'
        }
    }

    render() {
        return (
            <div id="footer" role="contentinfo">
                <img className="back-to-top" src={process.env.PUBLIC_URL + '/images/back-to-top.png'} alt="Back to top" title="Back to top" style={{display: 'inline'}} />
                <div id="footerWrapper">
                    <div id="footerAdminSection">
                        <div id="footerAdminLinksContainer" className="container">
                            <div id="footerAdminLinks" className="row">
                                <ul className="inline">
                                    <li>
                                        <a href={this.homePath} target="_self">Home</a>
                                    </li>
                                    <li>
                                        <a href={this.homePath} target="_self">About this site</a>
                                    </li>
                                    <li>
                                        <a href="http://gov.bc.ca/disclaimer/" target="_self">Disclaimer</a>
                                    </li>
                                    <li>
                                        <a href="http://gov.bc.ca/privacy/" target="_self">Privacy</a>
                                    </li>
                                    <li>
                                        <a href="http://gov.bc.ca/webaccessibility/" target="_self">Accessibility</a>
                                    </li>
                                    <li>
                                        <a href="http://gov.bc.ca/copyright" target="_self">Copyright</a>
                                    </li>
                                    <li>
                                        <a href={this.homePath + 'contact'} target="_self">Contact Us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
