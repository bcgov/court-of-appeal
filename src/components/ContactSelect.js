import React from 'react';
import SelectableNameList from './SelectableNameList';

class ContactSelect extends React.Component {

    render() {
        if (!this.props.selectedRespondents || this.props.selectedRespondents.length === 0) {
            return null;
        }
        
        let options = this.getOptions(this.props.selectedRespondents);

        return (
            <div className={"row chosenContact"}>
                Select a contact name to autofill with their address below; or leave blank and fill in the addresss&nbsp;
                <SelectableNameList
                    ariaLabel={"Select a respondent whose address will be the service address, or leave blank and enter a different address"}
                    id={"chosenContact"}
                    isClearable={true}
                    isMulti={false}
                    name={"form2.selectedContact"}
                    options={options}
                    handleFieldChange={this.selectContact.bind(this)}
                    containerStyle={{marginTop: '3px', marginBottom: '-5px'}}
                />
                
            </div>
            
        );
    }

    getOptions(respondents) {
        let list = respondents.map((item, index) => {
            return { value: index, label: item.name }
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
