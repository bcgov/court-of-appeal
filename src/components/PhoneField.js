import React, { Component } from 'react';

class PhoneField extends Component {

    constructor(props) {
        super(props);
        this.handleFieldChange= this.handleFieldChange.bind(this);
        this.validate = this.validate.bind(this);
        this.isValidPhoneNumber = this.isValidPhoneNumber.bind(this);
        this.state = {
            className: "form-field",
            isValid: false,
            title: ''
        };
    }

    render() {
        let autofocus = this.props.autofocus ? true : false;
        return <input
            id={this.props.id}
            name={this.props.name}
            autoFocus={autofocus}
            ref={this.props.ref}
            value={this.props.value || ''}
            onChange={this.handleFieldChange}
            maxLength={17}
            size={30}
            placeholder={this.props.placeHolder}
            readOnly={this.props.readOnly}
            onBlur={this.validate}
            className={this.state.className}
            title={this.state.title}
        />;
    }

    componentDidMount() {
        if (this.props.value) {
            this.validate();
        }
    }

    /**
     * Eliminate all but valid Canadian phone characters are used eg +1(250)385-9999
     * @param e
     */
    handleFieldChange(e) {
        e.target.value = e.target.value.replace(/[^+\d-)( ]/g,'');
        this.props.handleFieldChange(e);
    }

    validate() {
        debugger;
        if (!this.props.value || this.isValidPhoneNumber())
        {
            this.setState({className: "form-field", title: ""}, this.props.validate(true));
        } else {
            this.setState({className: "form-field invalid-field", title: "ERROR: Invalid Phone Number"}, this.props.validate(false));
        }
    }

    isValidPhoneNumber() {
        return this.props.value.match(/^(\+1)?[ ]?\(\d{3}\)[ ]?\d{3}[- ]?\d{4}$/) != null ||
        this.props.value.match(/^(\+1)?[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}$/) != null ||
        this.props.value.match(/^(\+1)?\d{3}-\d{3}-\d{4}$/) != null;
    }


}
export default PhoneField;
