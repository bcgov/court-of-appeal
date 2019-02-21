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
            return <Select
                aria-label={"Select respondents"}
                defaultValue={null}
                id={this.props.id || "name-list"}
                isClearable={true}
                isMulti={true}
                name={"form2.respondentList"}
                options={this.respondentOptions()}
                onChange={this.handleFieldChange.bind(this)}
            />
        }
    }
    handleFieldChange(state, change) {
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

    respondentOptions() {
        let list = this.props.respondents.map((item, index) => {
            return { value: index, label: item.name }
        });
        return list;
    }

    selectedRespondents() {
        let selected = this.props.respondents.filter((respondent) => respondent.selected);
        console.log(selected);
        return selected;
    }

}
export default SelectableNameList;
