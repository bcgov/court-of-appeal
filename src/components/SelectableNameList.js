import React from "react";
import Select from "react-select";


class SelectableNameList extends React.Component {

    render() {
        if (!this.props.respondents || this.props.respondents.length === 0) {
            return null;
        }

        if (this.props.respondents.length === 1) {
            this.props.respondents[0].selected = true
            return this.props.respondents[0].name;
        } else {

            let options = this.getOptions(this.props.respondents);
            let selectedOptions = this.getOptions(this.selectedRespondents());
            if (selectedOptions.length === 0) {
                selectedOptions = options;

                // TODO ALSO SET THE STATE FOR ALL RESPONDENTS TO BE SELECTED
                // this.props.selectAllRespondents();
            }

            const styles = {

                multiValueLabel: ((provided, state)=> {
                    return {
                        ...provided,
                        backgroundColor: 'white',
                        borderWidth: '0',
                        fontSize: 'medium',
                        margin: '3px'
                    }
                }),

                multiValue: ((provided, state)=> {
                    return {
                        ...provided,
                        backgroundColor: 'white',
                        borderWidth: '.5px',
                        borderStyle: 'solid',
                        borderRadius: '5px',
                        borderColor: '#eee',
                        fontSize: 'medium',
                        marginLeft: '5px'
                    }
                }),
                
            }
            return <Select
                aria-label={"Select respondents"}
                id={this.props.id || "name-list"}
                isClearable={true}
                isMulti={true}
                name={"form2.respondentList"}
                options={options}
                onChange={this.handleFieldChange.bind(this)}
                defaultValue={selectedOptions}
                styles={styles}
            />
        }
    }
    handleFieldChange(state, change) {
        //TODO: Handle clear action; create select all widget
        let e = null;
        if (change.action === 'select-option') {
            e = {
                target: {
                    name: change.name,
                    value: change.option.value,
                    selected: true }
                }
        }
        if (change.action === 'remove-value') {
            e = {
                target: {
                    name: change.name,
                    value: change.removedValue.value,
                    selected: false
                }
            }
        }
        this.props.handleFieldChange(e)
    }
    
    getOptions(respondents) {
        let list = respondents.map((item, index) => {
            return { value: index, label: item.name }
        });
        return list;
    }

    selectedRespondents() {
        return this.props.respondents.filter((respondent) => respondent.selected);
    }

}
export default SelectableNameList;
