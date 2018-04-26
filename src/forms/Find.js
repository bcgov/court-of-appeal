import React, { Component } from 'react';
import './find.css';
import DefaultService from '../service/default.service.js';
import NumericField from '../components/NumericField';

class Find extends Component {

    constructor(props) {
        super(props);   
        this.service = props.service; 
        this.callback = props.callback;

        this.search = this.search.bind(this);
        this.caseFieldChanged = this.caseFieldChanged.bind(this);
    }

    componentDidMount() {
        let window = this.element.ownerDocument.defaultView;
        if (this.service == null) { this.service = new DefaultService(window); }        
    }

    search() {
        this.service.searchForm7(this.props.formSevenNumber, (data) => {
            this.callback(data);
        });
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
                                />
                            </td>
                            <td>
                                <button id="find-button" onClick={this.search} className="btn btn-primary btn-green">Find</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    caseFieldChanged(e) {
        // If the first two digits are not CA, add a CA.  otherwise only accept ^CA\d+$
        e.target.value = 'CA'.concat(e.target.value.replace(/\D/g,''));
        this.props.fieldChanged(e);
    }
}

export default Find;
