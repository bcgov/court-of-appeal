import React, { Component } from 'react';

class TextField extends Component {

    constructor(props) {
        super(props);

        let className = "form-field";
        if (this.props.readOnly) {
            className = "read-only";
        } else if (this.props.value) {
            className = "form-field preloaded";
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.state = {
            size: props.value  && props.value.length > 30 ? props.value.length : 30,
            className: className
        };
    }

    render() {
        let fieldProps = {
            autoFocus: !!this.props.autofocus || false
        };
        if (this.props.readOnly) {
            fieldProps['tabIndex'] = -1;
        }

        return (<input
            id={this.props.id}
            name={this.props.name}
            ref={this.props.ref}
            value={this.props.value || ''}
            onChange={this.handleFieldChange}
            placeholder={this.props.placeholder}
            size={this.state.size}
            className={this.state.className}
            maxLength={300}
            readOnly={this.props.readOnly}
            onBlur={this.props.validate}
            {...fieldProps}
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
