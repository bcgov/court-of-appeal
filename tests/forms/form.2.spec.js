require('../support/fake.dom');
import React from 'react';
import Form2 from '../../src/forms/Form.2';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('keeps entered file number', ()=> {

    const form2 = mount(
        <Form2 id="form-2"
              service={{ createForm2: ()=> {} }}
        />,
    ).instance();

    expect(form2.state.showForm2).toBe(false);

    form2.state.showForm2 = true;
    let e = { target: { name: "number.form-seven", value: "CA12345" }};    
    form2.handleSearchFieldChange(e);

    expect(form2.state.formSevenNumber).toMatch('CA12345');
});
