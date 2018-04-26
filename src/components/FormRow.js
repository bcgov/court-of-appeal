import React, { Component } from 'react';
import NumericField from './NumericField';
import PhoneField from './PhoneField';

class FormRow extends Component {

    getField(type) {

        let value = null;
        let fieldProps = {
            id: this.props.id,
            name: this.props.name,
            onChange: this.props.onChange,
            value: this.props.value || '',
            ref: this.props.inputRef,
            placeholder: this.props.placeholder
        };

        switch (type) {

            case  'number' :
                value = <NumericField
                    {... fieldProps}
                />;
                break;
            case 'phone' :
                value = <PhoneField
                    {...fieldProps}
                />;
                break;
            default :
                value = <input
                    {...fieldProps}/>;
        }
        return value;
    }

    render() {
        let content = null;
        if (this.props.show) {

            let field = this.props.field || this.getField(this.props.type);

            let icon = this.props.iconText ? <i className="fa fa-question-circle" aria-hidden="true" title={this.props.iconText}></i> : null;
            let redstar = this.props.mandatory ? <span style={{color: 'red'}}>*</span> : null;

            content = (
                <tr>
                    <td>
                        <div>{redstar}
                            {this.props.labelText}
                            {icon} :
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
