import React, { Component } from 'react';

class PhoneField extends Component {

    constructor(props) {
        super(props);
        this.fieldChanged= this.fieldChanged.bind(this);
    }

    render() {
        let autofocus = this.props.autofocus ? true : false;
        return <input
            id={this.props.id}
            name={this.props.name}
            autoFocus={autofocus}
            ref={this.props.ref}
            value={this.props.value || ''}
            onChange={this.fieldChanged}
            maxLength="15"
            placeholder={this.props.placeholder}
        />;
    }

    /**
     * Eliminate all but valid Canadian phone characters are used eg +1(250)385-9999
     * @param e
     */
    fieldChanged(e) {
        e.target.value = e.target.value.replace(/[^+\d-)(]/g,'');
        this.props.onChange(e);
    }

}
export default PhoneField;
