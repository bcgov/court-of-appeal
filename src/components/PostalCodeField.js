import React, { Component } from 'react';

class PostalCodeField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            className: 'form-field',
            title: ''
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.validate = this.validate.bind(this);
        this.clearClass = this.clearClass.bind(this);
    }

    render() {
        return (<input
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
        />);
    }

    handleFieldChange(e) {
        if (!this.props.readOnly) {
            let value = e.target.value;
            value = value.toUpperCase().replace(/[^\dA-Z ]/g,"").replace(/[ ]+/g," ");
            e.target.value =  value;
            this.props.handleFieldChange(e);
        }
    }

    /**
     * If, when the field loses focus, it's not empty or a proper postal code, give the field an error color, and give
     * an error title message so they can see what's up when they hover.
     */
    validate() {
        if (this.props.value.match(/^[a-zA-Z]\d[a-zA-Z] \d[A-Z]\d$/) != null || !this.props.value) {
            this.setState({className: "form-field", title: ""}, this.props.validate(true));
        } else {
            this.setState({className: "form-field invalid-field", title: "ERROR: Invalid Postal Code"}, this.props.validate(false));
        }
    }

    clearClass() {
        this.setState({className: "form-field", title: ""});
    }


}
export default PostalCodeField;
