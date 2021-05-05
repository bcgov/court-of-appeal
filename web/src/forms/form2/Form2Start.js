import React, { Component, Fragment } from 'react';
import ProgressStatusBar from '../../components/progress/ProgressStatusBar';
import '../Form.css';
import './Form2.css';
import './Form2Start.css';
import DefaultService from "../../service/default.service";
import SpinnerButton from '../../components/SpinnerButton';
import { forceCA } from './force.ca'

class Form2Start extends Component {

    constructor(props) {
        super(props);
        this.service = props.service;
        this.state = {
            notFoundError: '',
            caseNumber: 'CA',
            respondentSelection: 'Individual',
            respondentFirstName: '',
            respondentLastName: '',
            respondentOrganization: ''
        }
        this.search = this.search.bind(this)
        if (props.location.search)
            this.state.caseNumber = new URLSearchParams(this.props.location.search).get("case");
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
        if (this.state.caseNumber.length > 2)
            this.search();
        this.caseNumberField.focus()
    }

    render() {
        return (
        <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>

            <ProgressStatusBar activeStep={1} steps={["Form 2","Preview","Submit"]}/>

            <div className="row section section-gray">
                <div className="col-xs-12">
                    <div className="page-title">Notice of Appearance</div>
                    <div className="page-subtitle">Form 2</div>
                </div>
            </div>

            <div className="row section section-white">
                <div className="col-xs-12">
                    <div className="section-title">
                        Lower Court Case Information
                    </div>
                    <div>
                        Find the Supreme Court case appeal you are responding to by entering the following case information:
                    </div>
                    <table id="startTable">
                        <tbody>
                            <tr>
                                <td>Level of Court</td>
                                <td><input disabled value="Court of Appeal" /></td>
                            </tr>
                            <tr>
                                <td>Court of Appeal File no.</td>
                                <td>
                                    <input  ref= { el => this.caseNumberField = el }
                                            autoFocus
                                            id= "file-no"
                                            value= { this.state.caseNumber }
                                            onChange= { e => forceCA(e.target.value, this)}
                                            onKeyPress= { e => e.charCode === 13 ? this.search():null } />
                                </td>
                            </tr>
                            <tr>
                                <td><h5>Respondent</h5></td>
                                <td>
                                    <div onClick={e => this.onValueChange("Individual", this)}>
                                        <input type="radio" onChange={() => {}} checked={this.state.respondentSelection === "Individual"}/>
                                        <label className="noselect" style={{marginLeft: '5px', marginRight: '10px'}} >
                                            Individual
                                        </label>
                                    </div>
                                    <div onClick={e => this.onValueChange("Organization", this)}>
                                        <input type="radio" onChange={() => {}} value="Organization" checked={this.state.respondentSelection === "Organization"}/>
                                        <label className="noselect" style={{marginLeft: '5px'}}>
                                            Organization
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            { this.state.respondentSelection === 'Individual' &&
                             <Fragment>
                                <tr>
                                    <td>First Name</td>
                                    <td>
                                        <input  
                                                    id= "respondent-first-name"
                                                    value= { this.state.respondentFirstName }
                                                    onChange= { e => this.setState({ respondentFirstName: e.target.value }) }
                                                    onKeyPress= { e => e.charCode === 13 ? this.search():null } />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>
                                        <input 
                                                    autoFocus
                                                    id= "respondent-last-name"
                                                    value= { this.state.respondentLastName }
                                                    onChange= { e => this.setState({ respondentLastName: e.target.value })}
                                                    onKeyPress= { e => e.charCode === 13 ? this.search():null } />
                                    </td>
                                    <td>
                                        <SpinnerButton  ref= { el => this.findButton = el }
                                                        content= 'Find'
                                                        id= "find-button"
                                                        width= "52"
                                                        disabled= { this.state.caseNumber.length < 7 || this.state.respondentLastName.length === 0 || this.state.respondentFirstName.length === 0 }
                                                        onClick= { this.search } />
                                    </td>
                                </tr> 
                            </Fragment> 
                            }
                            { this.state.respondentSelection !== 'Individual' &&
                                <Fragment>
                                <tr>
                                    <td>Organization</td>
                                    <td>
                                        <input  ref= { el => this.caseNumberField = el }
                                                    autoFocus
                                                    id= "respondent-organization"
                                                    value= { this.state.respondentOrganization }
                                                    onChange= { e => this.setState({ respondentOrganization: e.target.value }) }
                                                    onKeyPress= { e => e.charCode === 13 ? this.search():null } />
                                    </td>
                                    <td>
                                        <SpinnerButton  ref= { el => this.findButton = el }
                                                        content= 'Find'
                                                        id= "find-button"
                                                        width= "52"
                                                        disabled= { this.state.caseNumber.length < 7 && this.state.respondentOrganization.length === 0 }
                                                        onClick= { this.search } />
                                    </td>
                                </tr>
                                </Fragment>
                            }
                        </tbody>
                    </table>
                    <div className="error-message">{this.state.notFoundError}</div>
                </div>
            </div>

        </div>
        );
    }

    onValueChange(value, stateOwner) {
        stateOwner.setState({
            respondentSelection: value
        });
        if (value === 'Individual')
        stateOwner.setState({
            respondentOrganization: ''
        });
        if (value === 'Organization')
        stateOwner.setState({
            respondentFirstName: '',
            respondentLastName: ''
        });
      }

    search() {
        let caseNumber = this.state.caseNumber
        let respondentFirstName = this.state.respondentFirstName
        let respondentLastName = this.state.respondentLastName
        let respondentOrganization = this.state.respondentOrganization
        let searchBy = this.state.respondentSelection
        if (caseNumber.length < 7) { return }

        this.findButton.startSpinner()
        this.service.searchForm7(caseNumber, respondentLastName.toLowerCase(), respondentFirstName.toLowerCase(), respondentOrganization.toLowerCase(), searchBy, (data) => {
            this.findButton.stopSpinner();
            if (data && !data.error) 
                this.props.history.push({pathname: process.env.PUBLIC_URL + '/fill',state: { caseNumber:caseNumber, parties:data.parties }});
            else 
                this.setState({ notFoundError: 'No such Court of Appeal document found' });
        });
    }
}
export default Form2Start;
