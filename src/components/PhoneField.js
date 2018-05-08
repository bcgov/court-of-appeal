import React, { Component } from 'react';

class PhoneField extends Component {

    constructor(props) {
        super(props);
        this.handleFieldChange= this.handleFieldChange.bind(this);
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
            maxLength={15}
            size={30}
            placeholder={this.props.placeHolder}
            readOnly={this.props.readOnly}
        />;
    }

    /**
     * Eliminate all but valid Canadian phone characters are used eg +1(250)385-9999
     * @param e
     */
    handleFieldChange(e) {
        e.target.value = e.target.value.replace(/[^+\d-)(]/g,'');
        this.props.handleFieldChange(e);
    }

}
export default PhoneField;
