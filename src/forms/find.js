import React, { Component } from 'react';
import './find.css';
import DefaultService from '../service/default.service.js';

class Find extends Component {

    constructor(props) {
        super(props);   
        this.service = props.service ? props.service : new DefaultService(); 
        this.callback = props.callback;   

        this.search = this.search.bind(this);
    }

    search() {
        this.service.searchForm7(this.textInput.value, (data) => {            
            this.callback(data);
        });
    }

    render() {
        return (
            <div className="form-section">
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
                            <td><input id="file-no" name="file-no" autoFocus ref={(input) => { this.textInput = input; }} /></td>
                            <td>
                                <button id="find-button" onClick={this.search} className="btn btn-primary btn-green">Find</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Find;
