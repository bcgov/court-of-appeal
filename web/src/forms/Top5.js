import React, { Component } from 'react';
import DefaultService from '../service/default.service.js';

class Top5 extends Component {

    constructor(props){
        super(props);
        this.service = props.service;
        this.redirectToForm7 = this.redirectToForm7.bind(this);
    }

    componentDidMount() {
        this.document = this.element.ownerDocument;
        let window = this.document.defaultView;
        if (this.service == null) { this.service = new DefaultService(window); }
    }

    redirectToForm7(){
        this.service.getPersonInfo((person)=> {
            this.document.cookie = 'csoext-sm-guid='+person.login+'; Domain=gov.bc.ca; Path=/cso';
            this.document.defaultView.location = 'https://dev.justice.gov.bc.ca/cso/ext/coa/form7/#/qualify?_k=f90vwa';
        });
    }

    render() {
        return (
            <div className="form-section not-printable" ref={ (element)=> {this.element = element }}>
                <h3>Most Used Forms</h3>
                <ol>
                    <li><a id="form7" onClick={this.redirectToForm7} style={{cursor:'pointer'}} >Notice of Appeal (Form 7)</a></li>
                    <li><a id="form2" href={`${process.env.PUBLIC_URL}/start`} target="_self">Notice of Appearance (Form 2)</a>&nbsp;</li>
                    <li>Certificate of Readiness</li>
                    <li>Affidavit</li>
                    <li>Notice of Hearing Appeal</li>
                </ol>
            </div>
        )
    }
}
export default Top5;
