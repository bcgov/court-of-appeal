import React, { Component } from 'react';

class NumericField extends Component {

    constructor(props) {
        super(props);
        this.fieldChanged = this.fieldChanged.bind(this);
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
           placeholder={this.props.placeholder}
           onKeyPress={this.props.handleKeyPress}
       />;
    }

    /**
     * Remove all non-numeric characters
     * @param e - the change event
     */
    fieldChanged(e) {
        e.target.value = e.target.value.replace(/\D/g,'');
        this.props.fieldChanged(e);
    }
}
export default NumericField;
