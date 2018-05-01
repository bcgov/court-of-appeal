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
            searchDisabled: true
        };

        this.search = this.search.bind(this);
        this.caseFieldChanged = this.caseFieldChanged.bind(this);
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
    }

    search() {
        this.service.searchForm7(this.props.formSevenNumber, (data) => {
            this.callback(data);
        });
    }

    handleKeyPress(target) {
        if(target.charCode === 13){
            this.search();
        }
    }

    render() {
        return (
            <div className="form-section" ref={ (element)=> {this.element = element }}>
                <h2 style={{ fontWeight:'bold' }}>Appeal Case Information</h2>
                Enter the Court of Appeal number you want to respond to:

                <table>
                    <tbody>
                        <tr>
                            <td>LEVEL OF COURT</td>
                            <td>COURT OF APPEAL FILE NO.</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><input disabled value="Court of Appeal" /></td>
                            <td>
                                <NumericField
                                    id="file-no"
                                    name="number.form-seven"
                                    autofocus={true}
                                    value={this.props.formSevenNumber}
                                    fieldChanged={this.caseFieldChanged}
                                    handleKeyPress={this.handleKeyPress.bind(this)}
                                />
                            </td>
                            <td>
                                <button id="find-button" disabled={this.state.searchDisabled} onClick={this.search} className="btn btn-primary btn-green">Find</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    caseFieldChanged(e) {
        // If the first two digits are not CA, add a CA.  otherwise only accept ^CA\d{5}\d*sea$
        e.target.value = 'CA'.concat(e.target.value.replace(/\D/g,''));
        if (e.target.value.match(/^CA\d{5}\d*$/) !== null) {
            this.setState({ searchDisabled: false });
        } else {
            this.setState({ searchDisabled: true });
        }
        this.props.fieldChanged(e);
    }
}

export default Find;
