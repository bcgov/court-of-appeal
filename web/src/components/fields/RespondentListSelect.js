import React from "react";
import SelectableNameList from './SelectableNameList';


class RespondentListSelect extends React.Component {
    
    render() {
        if (!this.props.respondents || this.props.respondents.length === 0) {
            return null;
        }
        
        if (this.props.respondents.length === 1) {
            if (!this.props.respondents[0].name){
                throw new Error('No name for respondent.');
            }
            return this.props.respondents[0].name;
        } else {
            let options = this.getOptions(this.props.respondents);
            let selectedOptions = this.getOptions(this.props.selectedRespondents || []);
            
            return (
                <div  >
                     <div className={"row"} style={{display: 'flex', flexDirection: 'row-reverse', marginBottom: '15px'}}>
                         <input id="selectAll"
                                type="checkbox"
                                onChange={this.selectAllOrClearRespondents.bind(this)}
                                name="respondent.selectAllRespondents"
                                checked={this.props.respondents.length === this.props.selectedRespondents.length}
                                action="selectAll"
                                style={{paddingLeft: '10px', marginTop: '2px'}}
                         />
                         <div style={{paddingRight: '10px'}} >
                             Select all
                         </div>
                         <input id="clearAll"
                                type="checkbox"
                                onChange={this.selectAllOrClearRespondents.bind(this)}
                                name="respondent.clearRespondents"
                                checked={this.props.selectedRespondents.length < 1}
                                action="clear"
                                style={{marginRight: '30px', marginTop: '2px'}}
                         />
                         <div style={{paddingRight: '10px'}} >
                             Clear all
                         </div>
                     </div>
                    <SelectableNameList
                        ariaLabel={"Select respondents"}
                        id={"respondent-list"}
                        isClearable={true}
                        isMulti={true}
                        name={"form2.respondentList"}
                        options={options}
                        handleFieldChange={this.handleFieldChange.bind(this)}
                        defaultValue={selectedOptions}
                        value={selectedOptions}
                        containerStyle={{marginTop:'-13px'}}
                    />
                </div>
            );
             
        }
    }
    handleFieldChange(state, change) {
        let e = null;
        switch (change.action) {
            case 'select-option':
                e = {
                    target: {
                        name: change.name,
                        value: change.option.value,
                        responding: true }
                };
                break;
            case 'remove-value':
                e = {
                    target: {
                        name: change.name,
                        value: change.removedValue.value,
                        responding: false
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
                console.warn("WARNING: Action not handled: ", change.action);
                return;
        }
        this.props.handleFieldChange(e)
    }
    
    getOptions(respondents) {
        let list = respondents.map((respondent, index) => {
            return { value: respondent.id || index, label: respondent.name }
        });
        return list;
    }

    selectAllOrClearRespondents(e) {
        let action = e.target.getAttribute('action')
        if (e.target.value === 'on') {
            this.props.handleFieldChange({target: {name: 'form2.respondentList'}, action});
        }
    }
    
} 
export default RespondentListSelect;