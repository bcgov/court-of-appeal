import React from 'react';
import RespondentListSelect from '../../../src/components/RespondentListSelect.js';
import StateManager from 'react-select';
import { mount } from 'enzyme';
import SelectableNameList from "../../../src/components/SelectableNameList";
require('../../support/enzyme.setup');

describe('Respondent Name List', ()=> {

    let value = '';
    let handleFieldChange = (all, e) => { value = e.target.value; };
    
    test('renders a list of many names', ()=> {
        let respondents = [
            { name:'Freida'}, { name: 'Diego' }, { name: 'Pablo'}, { name: 'Paloma'}
        ];

        let selector = mount(<RespondentListSelect id="respondent-list"
                                                 respondents={respondents}
                                                 handleFieldChange={handleFieldChange} 
                                                   defaultInputValue={""}
                                                   defaultMenuIsOpen={false}
        />).instance();
        let view = selector.render();

        expect(JSON.stringify(view)).toEqual(JSON.stringify(
            <SelectableNameList
                ariaLabel="Select respondents"
                id="respondent-list"
                isClearable={true}
                isMulti={true}
                name="form2.respondentList"
                handleFieldChange={handleFieldChange.bind(this)}
                options={[
                    {"value": 0, "label": "Freida"},
                    {"value": 1, "label": "Diego"},
                    {"value": 2, "label": "Pablo"},
                    {"value": 3, "label": "Paloma"}]}
                defaultValue={[]}
                containerStyle={{marginTop:'-13px'}}
            />));
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
