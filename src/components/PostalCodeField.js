import React, { Component } from 'react';
import {INVALID_POSTAL_CODE_MSG} from '../helpers/constants';

class PostalCodeField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            className: "form-field",
            title: '',
            errorMessage: ''
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.validate = this.validate.bind(this);
        this.clearClass = this.clearClass.bind(this);
    }

    render() {
        return (
            <div>
                <input
                value={this.props.value || ''}
                onChange={this.handleFieldChange}
                maxLength={7}
                size={30}
                title={this.state.title}
                className={this.state.className}
                onBlur={this.validate}
                onFocus={this.clearClass}
                placeholder="Valid Canadian postal code"
                readOnly={this.props.readOnly}
                name={this.props.name}
                 />
                <div className="error-message">{this.state.errorMessage}</div>
            </div>
        );
    }

    componentDidMount() {
        if (this.props.value) {
            let isValid = this.validate();
            if (isValid && this.props.value) {
                this.setState({className: "form-field preloaded"});
            }
        }
    }

    handleFieldChange(e) {
        if (!this.props.readOnly) {
            let value = e.target.value;
            value = value.toUpperCase().replace(/[^\dA-Z ]/g,"").replace(/[ ]+/g," ");
            if(value.length === 3 && value.length > this.props.value.length) {
                value = value + (" ");
            }
            e.target.value =  value;
            this.props.handleFieldChange(e);
        }
    }

    /**
     * If, when the field loses focus, it's not empty or a proper postal code, give the field an error color, and give
     * an error title message so they can see what's up when they hover.
     */
    validate() {
        if (!this.props.value || this.props.value.match(/^[a-zA-Z]\d[a-zA-Z] \d[A-Z]\d$/) != null) {
            this.setState({className: "form-field", title: ""}, this.props.validate(true, 'postalCode'));
            return true;
        } else {
            this.setState({
                className: "form-field invalid-field",
                title: INVALID_POSTAL_CODE_MSG,
                errorMessage: INVALID_POSTAL_CODE_MSG
            }, this.props.validate(false, 'postalCode'));
            return false;
        }
    }

    clearClass() {
        this.setState({className: "form-field", title: "", errorMessage: ""});
    }
}
export default PostalCodeField;
