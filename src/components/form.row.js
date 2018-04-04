import React, { Component } from 'react';

class FormRow extends Component {

// TODO: update the input to update the state when it changes.  Not sure if reference passing in props will work
  render() {
      let content = null;
      if (this.props.show) {
        let field = this.props.field || (<input id={this.props.id} name={this.props.name} ref={this.props.inputRef} />);
        let icon = this.props.iconText ? <i className="fa fa-question-circle" aria-hidden="true" title={this.props.iconText}></i> : null;
        let redstar = this.props.mandatory ? <span style={{ color:'red' }}>*</span> : null;

        content = (
          <tr>
            <td>
              <div>{redstar}
              {this.props.labelText}
              {icon}
              </div>
            </td>
            <td>
              {field}
            </td>
          </tr>
        );
      }
      return content;
  }
};

FormRow.defaultProps = {
  id: "",
  field: null,
  mandatory: false,
  show: true
};

export default FormRow;
