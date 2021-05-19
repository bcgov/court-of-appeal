import React from 'react';
import SelectableNameList from './SelectableNameList';

class ContactSelect extends React.Component {

    render() {
        let disabled = this.props.selectedRespondents.length < 1;
        let opacity = disabled ? '.5' : '1';

        let options = this.getOptions(this.props.selectedRespondents);
        let value = options.find(op => op.value === this.props.selectedId);
        if (options.length > 0 && value == null) {
            this.selectContact(options[0]);
        }

        return (
            <div className={"row chosenContact"} style={{opacity: opacity}}>
                <div>
                Select a contact name to auto-fill the address.&nbsp;
                </div>
                <div className={"col-lg-9 col-md-9 col-lg-offset-1 col-md-offset-1"} style={{paddingLeft: 0, paddingRight: 0}}>
                    <SelectableNameList
                        ariaLabel={"Select a respondent whose address will be the service address, or leave blank and enter a different address"}
                        id={"chosenContact"}
                        isClearable={false}
                        isMulti={false}
                        name={"form2.selectedContact"}
                        options={options}
                        value = {value}
                        handleFieldChange={this.selectContact.bind(this)}
                        containerStyle={{marginTop: '3px', marginBottom: '-5px', width: '100%', paddingRight: 0}}
                        disabled={this.props.disabled || disabled}
                    />
                </div>

            </div>

        );
    }

    getOptions(respondents) {
        let list = respondents.map((respondent) => {
            return { value: respondent.id, label: respondent.name }
        });
        return list;
    }

    selectContact(selectedOption) {      
        let e = {
            target: {
                name: "form2.selectedContact",
                value: selectedOption ? selectedOption.value : null,
                label: selectedOption ? selectedOption.label : null
             }
        };
        this.props.handleFieldChange(e)
    }

} export default ContactSelect;
