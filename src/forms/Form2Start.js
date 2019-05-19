import React, { Component } from 'react';
import ProgressStatusBar from '../components/progress/ProgressStatusBar';
import './Form2Start.css';
import DefaultService from "../service/default.service";
import SpinnerButton from '../components/SpinnerButton';
import { forceCA } from './force.ca'

class Form2Start extends Component {

    constructor(props) {
        super(props);
        this.service = props.service;
        this.state = props.location && props.location.state ? props.location.state : { };
        this.state = {
            notFoundError: '',
            caseNumber: 'CA'
        }
        this.search = this.search.bind(this)
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
        this.caseNumberField.focus()
    }

    render() {
        return (
            <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>

                <div id="breadcrumbContainer">
                    <ol className="breadcrumb">
                        <li>
                            <a id="home" href={process.env.PUBLIC_URL}>Home</a>
                        </li>
                    </ol>
                </div>

                  <ProgressStatusBar
                      activeStep={1}
                      steps={["Access","Form 2","Preview","Payment"]}
                  />

                <div className="row">
                    <div id="viewFormModal" className="col col-lg-12 col-md-12 col-sm-12 preview-form">
                        <div className="preview-title  not-printable">
                            Notice of Appearance
                        </div>
                        <div className="form-section">
                            <div>
                                Lower Court Case Information
                            </div>
                            <div>
                                Find the Suprem Court case appeal you are responding to by entering the following case information:
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>LEVEL OF COURT</td>
                                        <td>COURT OF APPEAL FILE NO.</td>
                                        <td> </td>
                                    </tr>
                                    <tr>
                                        <td><input disabled value="Court of Appeal" /></td>
                                        <td>
                                            <input  ref= { el => this.caseNumberField = el }
                                                    autoFocus
                                                    value= { this.state.caseNumber }
                                                    onChange= { e => forceCA(e.target.value, this)}
                                                    onKeyPress= { e => e.charCode == 13 ? this.search():null } />
                                        </td>
                                        <td>
                                            <SpinnerButton  ref= { el => this.findButton = el }
                                                            content= 'Find'
                                                            width= "52"
                                                            disabled= { this.state.caseNumber.length < 7 }
                                                            onClick= { this.search } />
                                        </td>
                                        <td>
                                            <div className="error-message">{this.state.notFoundError}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    search() {
        let caseNumber = this.state.caseNumber
        if (caseNumber.length < 7) { return }

        this.findButton.startSpinner()
        this.service.searchForm7(caseNumber, (data) => {
            this.findButton.stopSpinner();

            if (data && !data.error) {
                this.props.history.push({pathname: process.env.PUBLIC_URL + '/access',state: { caseNumber:caseNumber, parties:data.parties }});
            }
            else {
                this.setState({ notFoundError: 'No such Court of Appeal document found' });
            }
        });
    }
}
export default Form2Start;
