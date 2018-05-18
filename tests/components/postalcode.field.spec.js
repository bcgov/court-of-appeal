require('../support/fake.dom');
import React from 'react';
import PostalCodeField from '../../src/components/PostalCodeField';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should only allow valid Canadian postal code characters', ()=> {

    let value = '';
    let handleFieldChange = (e) => { value = e.target.value; };

    const postalCode = renderer.create(
        <PostalCodeField id="number-field" value={value}
                    handleFieldChange={handleFieldChange.bind(this)}/>,
    );
    let tree = postalCode.toJSON();
    expect(tree).toMatchSnapshot();

    let e = { target: { value: "42"}};

    let pc = postalCode.getInstance();

    pc.handleFieldChange(e);
    expect(value).toMatch('42');

    e = { target: { value: "bah" } };
    pc.handleFieldChange(e);
    expect(value).toMatch('BAH');

    e = { target: { value: "heyBabaReeBear 123" } };
    pc.handleFieldChange(e);
    expect(value).toMatch('HEYBABA');

    e = { target: { value: "V0N 1J22" } };
    pc.handleFieldChange(e);
    expect(value).toMatch('V0N 1J2');

    e = { target: { value: "V0N   2" } };
    pc.handleFieldChange(e);
    expect(value).toMatch('V0N 2');

});
