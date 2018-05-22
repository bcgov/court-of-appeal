import React, { Component } from 'react';

class TextField extends Component {

    constructor(props) {
        super(props);

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.state = {
            size: props.value  && props.value.length > 30 ? props.value.length : 30
        };
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
            className="form-field"
            maxLength={300}
            readOnly={this.props.readOnly}
            onBlur={this.props.validate}
        />);
    }

    handleFieldChange(e) {
        let size = !this.props.value || this.props.value.length < 30 ? 30 : this.props.value.length;
        this.setState({size: size});
        if (!this.props.readOnly) {
            this.props.handleFieldChange(e);
        }
    }
}
export default TextField;
