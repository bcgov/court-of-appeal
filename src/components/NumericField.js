import React, { Component } from 'react';

class NumericField extends Component {

    constructor(props) {
        super(props);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    render() {
       return <input
           id={this.props.id}
           name={this.props.name}
           autoFocus={this.props.autofocus}
           ref={this.props.ref}
           value={this.props.value || ''}
           onChange={this.handleFieldChange}
           placeholder={this.props.placeholder}
           onKeyPress={this.props.handleKeyPress}
           readOnly={this.props.readOnly}
       />;
    }

    /**
     * Remove all non-numeric characters
     * @param e - the change event
     */
    handleFieldChange(e) {
        e.target.value = e.target.value.replace(/\D/g,'');
        this.props.handleFieldChange(e);
    }
}
export default NumericField;
