import React from "react";
import Select from "react-select";


class SelectableNameList extends React.Component {
    
    render() {
        if (!this.props.respondents || this.props.respondents.length === 0) {
            return null;
        }
        
        if (this.props.respondents.length === 1) {
            return this.props.respondents[0].name;
        } else {
            return <Select
                aria-label={"Select respondents"}
                defaultValue={null}
                id={this.props.id || "name-list"}
                isClearable={true}
                isMulti={true}
                name={"respondentList"}
                options={this.respondentOptions()}
                onChange={this.handleFieldChange}
            />
        }
    }
    handleFieldChange(all, e) {
        console.log("v2:", e)
        
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