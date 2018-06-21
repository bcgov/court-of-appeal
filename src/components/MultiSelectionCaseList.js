import React from 'react';
import CaseList from './CaseList.js';

class MultiSelectionCaseList extends CaseList {

    toggleSelection(item) {        
        this.props.toggleSelected(item.id);
    }
    columns(item) {
        var columns = [
            <td key={item.id+'select'}>
                <input id={'select-'+item.id} type="checkbox" value={item.id} checked={item.checked} 
                        onChange={this.toggleSelection.bind(this, item)} />
            </td>
        ];
        columns = columns.concat(super.columns(item));
        return columns;
    }
    render() {
        return (
            <div id="case-list" ref={ (element)=> {this.element = element} } onClick={this.handleClickOffForm.bind(this)}>
                <table id="my-cases" className="not-printable" >
                    <thead>
                        <tr className="header">
                            <td></td>
                            <td>Edit</td>
                            <td>File #</td>
                            <td>Parties</td>
                            <td>Status</td>
                            <td className="text-right">Recently Modified</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.cases.map((item) =>
                            this.renderLine(item) 
                        )
                    }
                    </tbody>
                </table>
                { this.modals() }                
            </div>
        );
    }
}

export default MultiSelectionCaseList;