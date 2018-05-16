import React, { Component } from 'react';

class EmailField extends Component {

    constructor(props) {
        super(props);

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.validate = this.validate.bind(this);
        this.state = {
            size: props.value  && props.value.length > 30 ? props.value.length : 30,
            className: 'form-field'
        };
        this.regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    }

    componentDidMount() {
        if (this.props.value) {
            this.validate();
        }
    }

    render() {
        let autofocus = this.props.autofocus ? true : false;

        return (<input
            id={this.props.id}
            name={this.props.name}
            autoFocus={autofocus}
            ref={this.props.ref}
            value={this.props.value || ''}
            onChange={this.handleFieldChange}
            placeholder={this.props.placeholder}
            size={this.state.size}
            className={this.state.className}
            maxLength={254}
            readOnly={this.props.readOnly}
            onBlur={this.validate}
        />);
    }

    handleFieldChange(e) {
        let size = this.props.value.length > 30 ? this.props.value.length  : 30;
        this.setState({size: size});
        if (!this.props.readOnly) {
            this.props.handleFieldChange(e);
        }
    }

    validate() {
        if (!this.props.value || this.isValidEmailAddress())
        {
            this.setState({className: "form-field", title: ""}, this.props.validate(true));
        } else {
            this.setState({className: "form-field invalid-field", title: "ERROR: Invalid Phone Number"}, this.props.validate(false));
        }
    }

    isValidEmailAddress() {
        return this.props.value.match(this.regex) != null;
    }


}
export default EmailField;

