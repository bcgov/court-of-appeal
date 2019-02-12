import React from 'react';
import SelectableNameList from '../../../src/components/SelectableNameList.js';
import StateManager from 'react-select';
import { mount } from 'enzyme';
require('../../support/enzyme.setup');

describe('Selectable Name List', ()=> {

    let value = '';
    let handleFieldChange = (all, e) => { value = e.target.value; };
    
    test('renders a list of many names', ()=> {
        let respondents = [
            { name:'Freida'}, { name: 'Diego' }, { name: 'Pablo'}, { name: 'Paloma'}
        ]

        let selector = mount(<SelectableNameList id="respondent-list"
                                                 respondents={respondents}
                                                 handleFieldChange={handleFieldChange}/>).instance();
        let view = selector.render();

        expect(JSON.stringify(view)).toEqual(JSON.stringify(
            <StateManager
                aria-label="Select respondents"
                defaultValue={null}
                id="respondent-list"
                isClearable={true}
                isMulti={true}
                name="respondentList"
                onChange={handleFieldChange}
                options={[
                    {"value": 0, "label": "Freida"},
                    {"value": 1, "label": "Diego"},
                    {"value": 2, "label": "Pablo"},
                    {"value": 3, "label": "Paloma"}]}
            />));
    })

    test('does not render an empty list', ()=> {
        let respondents = []

        let selector = mount(<SelectableNameList id="respondent-list"
                                                 respondents={respondents}
                                                 handleFieldChange={handleFieldChange}/>).instance();
        let view = selector.render();

        expect(view).toBeNull();
    })


    test('renders a single name', ()=> {
        let respondents = [
            { name:'Freida'}
        ];

        let selector = mount(<SelectableNameList id="respondent-list"
                                                 respondents={respondents}
                                                 handleFieldChange={handleFieldChange}/>).instance();
        let view = selector.render();

        expect(view).toEqual('Freida');
    });

});
