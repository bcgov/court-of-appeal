import React from 'react';
import SelectableNameList from './SelectableNameList';

class ContactSelect extends React.Component {

    render() {
        if (!this.props.selectedRespondents || this.props.selectedRespondents.length === 0) {
            return null;
        }
        
        let options = this.getOptions(this.props.selectedRespondents);

        return (
            <div className={"row"}>
                Select respondent here to autofill with their address below&nbsp;
                <i className="oi oi-question-mark" aria-hidden="true" data-tip="What is the name of the party responding to the appeal whose address will be used for service?"/>
                <SelectableNameList
                    ariaLabel={"Select a respondent whose address will be the service address, or enter a different address"}
                    id={"respondent-list"}
                    isClearable={true}
                    isMulti={false}
                    name={"form2.selectedContact"}
                    options={options}
                    handleFieldChange={this.selectContact.bind(this)}
                    containerStyle={{marginTop: '3px', marginBottom: '15px'}}
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
        //TODO : handle clear action
        console.log("Selectd option", selectedOption)
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
