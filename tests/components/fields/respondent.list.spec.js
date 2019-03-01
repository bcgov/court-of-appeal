import React from 'react';
import RespondentListSelect from '../../../src/components/fields/RespondentListSelect.js';
import { mount } from 'enzyme';
import SelectableNameList from "../../../src/components/fields/SelectableNameList";
require('../../support/enzyme.setup');

describe('Respondent Name List', ()=> {

    let value = '';
    let handleFieldChange = (all, e) => { value = e.target.value; };
    
    test('renders a list of many names', ()=> {
        let respondents = [
            { name:'Freida'}, { name: 'Diego' }, { name: 'Pablo'}, { name: 'Paloma'}
        ];
        let options = [
            { value: 0, label:'Freida' }, { value: 1,label: 'Diego' }, { value: 2, label: 'Pablo' }, { value: 3, label: 'Paloma'}
        ];

        let selectAllOrClearRespondents = () => {}
        let handleFieldChange = () => {}

        let selector = mount(<RespondentListSelect id="respondent-list"
                                                    respondents={respondents}
                                                    handleFieldChange={handleFieldChange}
                                                    defaultInputValue={""}
                                                    defaultMenuIsOpen={false}
                                                    selectedRespondents={respondents}
        />).instance();
        let view = selector.render();

        expect(JSON.stringify(view)).toEqual(JSON.stringify(
                <div  >
                     <div className={"row "} style={{display: 'flex', flexDirection: 'row-reverse', marginBottom: '15px'}}>
                         <input id="selectAll"
                                type="checkbox"
                                onChange={selectAllOrClearRespondents.bind(this)}
                                name="respondent.selectAllRespondents"
                                checked={true}
                                action="selectAll"
                                style={{paddingLeft: '10px', marginTop: '2px'}}
                         />
                         <div style={{paddingRight: '10px'}} >
                             Select all
                         </div>
                         <input id="selectAll"
                                type="checkbox"
                                onChange={selectAllOrClearRespondents.bind(this)}
                                name="respondent.clearRespondents"
                                checked={false}
                                action="clear"
                                style={{marginRight: '30px', marginTop: '2px'}}
                         />
                         <div style={{paddingRight: '10px'}} >
                             Clear all
                         </div>
                     </div>
                    <SelectableNameList
                        ariaLabel="Select respondents"
                        id="respondent-list"
                        isClearable={true}
                        isMulti={true}
                        name="form2.respondentList"
                        handleFieldChange={handleFieldChange.bind(this)}
                        options={options}
                        defaultValue={options}
                        value={options}
                        containerStyle={{marginTop:'-13px'}}
                    />
                </div>));
    });

    test('does not render an empty list', ()=> {
        let respondents = [];

        let selector = mount(<RespondentListSelect id="respondent-list"
                                                 respondents={respondents}
                                                 handleFieldChange={handleFieldChange}/>).instance();
        let view = selector.render();

        expect(view).toBeNull();
    });


    test('renders a single name', ()=> {
        let respondents = [
            { name:'Freida'}
        ];

        let selector = mount(<RespondentListSelect id="respondent-list"
                                                 respondents={respondents}
                                                 handleFieldChange={handleFieldChange}/>).instance();
        let view = selector.render();

        expect(view).toEqual('Freida');
    });

});
