import React, { Component } from 'react';
import './find.css';
import DefaultService from '../service/default.service.js';
import NumericField from '../components/NumericField';

class Find extends Component {

    constructor(props) {
        super(props);   
        this.service = props.service; 
        this.callback = props.callback;
        this.state = {
            searching: false
        };
        this.search = this.search.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.isInvalidCaseNumber = this.isInvalidCaseNumber.bind(this);
        this.buttonOrSpinner = this.buttonOrSpinner.bind(this);
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
    }

    search() {
        this.props.startSearching();
        this.setState({ searching:true });
        this.service.searchForm7(this.props.formSevenNumber, (data) => {
            this.setState({ searching:false });
            this.callback(data);
        });
    }

    buttonOrSpinner() {
        if (this.state.searching) {
            return (
                <button id="find-button" disabled="true" className="btn btn-primary btn-green" style={{ width:'52px'}}>
                    <i className="fa fa-spinner fa-spin"></i>
                </button>
            )
        }
        else {
            return <button id="find-button" disabled={this.isInvalidCaseNumber()} onClick={this.search} className="btn btn-primary btn-green">Find</button>
        }
    }

    handleKeyPress(target) {
        if(target.charCode === 13 && !this.isInvalidCaseNumber()){
            this.search();
        }
    }

    render() {
        return (
            <div className="form-section not-printable" ref={ (element)=> {this.element = element }}>
                <h2 style={{ fontWeight:'bold' }}>Appeal Case Information</h2>
                Enter the Court of Appeal number you want to respond to:

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
                                <NumericField
                                    id="file-no"
                                    name="number.form-seven"
                                    autofocus={true}
                                    value={this.props.formSevenNumber}
                                    handleFieldChange={this.handleFieldChange}
                                    handleKeyPress={this.handleKeyPress.bind(this)}
                                />
                            </td>
                            <td>
                                { this.buttonOrSpinner() }
                            </td>
                            <td>
                                <div className="error-message">
                                {this.props.notFoundError}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    handleFieldChange(e) {
        // If the first two digits are not CA, add a CA.  otherwise only accept ^CA\d{5}\d*sea$
        e.target.value = 'CA'.concat(e.target.value.replace(/\D/g,''));
        this.props.handleFieldChange(e);
    }

    isInvalidCaseNumber() {
        return this.props.formSevenNumber.match(/^CA\d{5}\d*$/) === null;
    }
}

export default Find;
