import React from "react";
import SelectableNameList from './SelectableNameList';


class RespondentListSelect extends React.Component {
    
    render() {
        if (!this.props.respondents || this.props.respondents.length === 0) {
            return null;
        }
        
        if (this.props.respondents.length === 1) {
            return this.props.respondents[0].name;
        } else {

            let options = this.getOptions(this.props.respondents);
            let selectedOptions = this.getOptions(this.props.selectedRespondents);
            
            return <SelectableNameList
                ariaLabel={"Select respondents"}
                id={"respondent-list"}
                isClearable={true}
                isMulti={true}
                name={"form2.respondentList"}
                options={options}
                handleFieldChange={this.handleFieldChange.bind(this)}
                defaultValue={selectedOptions}
                containerStyle={{marginTop:'-13px'}}
            />
        }
    }
    handleFieldChange(state, change) {
        let e = null;
        console.log("***** Handling respondent list select change", state, change)
        switch (change.action) {
            case 'select-option':
                e = {
                    target: {
                        name: change.name,
                        value: change.option.value,
                        selected: true }
                };
                break;
            case 'remove-value':
                e = {
                    target: {
                        name: change.name,
                        value: change.removedValue.value,
                        selected: false
                    }
                };
                break;
            case 'clear':
                e = {
                    target: {
                        name: change.name,
                    },
                    action: 'clear'
                };
                break;
            default:
                console.log("WARNING: Action not handled: ", change.action);
                return;
        }
        this.props.handleFieldChange(e)
    }
    
    getOptions(respondents) {
        let list = respondents.map((item, index) => {
            return { value: index, label: item.name }
        });
        return list;
    }
    
} 
export default RespondentListSelect;