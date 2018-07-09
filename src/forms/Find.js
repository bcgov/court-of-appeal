import React, { Component } from 'react';
import DefaultService from '../service/default.service.js';
import NumericField from '../components/NumericField';
import SpinnerButton from '../components/SpinnerButton';

class Find extends Component {

    constructor(props) {
        super(props);   
        this.service = props.service; 
        this.callback = props.callback;
        this.search = this.search.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.isInvalidCaseNumber = this.isInvalidCaseNumber.bind(this);
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
    }

    search() {
        this.props.startSearching();
        this.printButton.startSpinner();
        this.service.searchForm7(this.props.formSevenNumber, (data) => {
            this.printButton.stopSpinner();
            this.callback(data);
        });
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
                            <SpinnerButton id="find-button" width="52" onClick={this.search} ref={ (element)=> {this.printButton = element }}
                                content='Find'>                        
                            </SpinnerButton>
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
