require('../support/fake.dom');
import React from 'react';
import Form2 from '../../src/forms/Form.2';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });import renderer from "react-test-renderer";

test('Snapshots of form2', ()=> {

    const form2 = renderer.create(
        <Form2 id="form-2"
              service={{ createForm2: ()=> {} }}
        />,
    );
    let tree = form2.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = form2.getInstance();
    expect(instance.state.showForm2).toBe(false);

    instance.state.showForm2 = true;

    let e = { target: { name: "number.form-seven", value: "CA12345" }};
    instance.handleSearchFieldChange(e);
    expect(instance.state.formSevenNumber).toMatch('CA12345');

});
