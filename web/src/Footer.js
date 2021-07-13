import React, { Component } from 'react';
import { PUBLIC_URL, REACT_APP_COMMIT } from './config/environment';

class Footer extends Component {

    constructor(props) {
        super(props);   
        this.homePath = (PUBLIC_URL === "") ? '/' : PUBLIC_URL;
        this.state = {
            commit: REACT_APP_COMMIT!==undefined
                ?REACT_APP_COMMIT.substr(0, 7)
                :'Unknown'
        }
    }

    render() {
        return (
            <div id="footer" role="contentinfo">
                <img className="back-to-top" src={PUBLIC_URL + '/images/back-to-top.png'} alt="Back to top" title="Back to top" style={{display: 'inline'}} />
                <div id="footerWrapper">
                    <div id="footerAdminSection">
                        <div id="footerAdminLinksContainer" className="container">
                            <div id="footerAdminLinks" className="row">
                                <ul className="inline">
                                    <li>
                                        <a href={this.homePath} target="_self">Home</a>
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
