import React from "react";
import Select from "react-select";
import AsyncSelect from "react-select";


class SelectableNameList extends React.Component {

    render() {
        const styles = {
            
            container: ((provided, state)=> {
                return {
                    ...this.props.containerStyle
                    
                }
            }),


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
            
        };
        return <Select
            ariaLabel={this.props.ariaLabel}
            id={this.props.id}
            isClearable={this.props.isClearable}
            isMulti={this.props.isMulti}
            name={this.props.name}
            options={this.props.options}
            onChange={this.props.handleFieldChange}
            value={this.props.value}
            defaultValue={this.props.defaultValue}
            styles={styles}
            isDisabled={this.props.disabled}
        />
    }
} 
export default SelectableNameList;
