import React from 'react';
import PhoneField from '../../src/components/PhoneField';
import renderer from 'react-test-renderer';

test('should only allow numeric, dash, and parentheses entries', ()=> {

    let value = '';
    let fieldChanged = (e) => { value = e.target.value; };

    const phoneField = renderer.create(
        <PhoneField id="number-field" value={value}
                      onChange={fieldChanged.bind(this)}/>,
    );
    let tree = phoneField.toJSON();
    expect(tree).toMatchSnapshot();

    let e = { target: { value: "42"}};
    tree.props.onChange(e);
    expect(value).toMatch('42');

    e = { target: { value: "bah" } };
    tree.props.onChange(e);
    expect(value).toMatch('');

    e = { target: { value: "(250)8674309" } };
    tree.props.onChange(e);
    expect(value).toMatch('(250)8674309');

    e = { target: { value: "bah(867)--5309)pooh!" } };
    tree.props.onChange(e);
    expect(value).toMatch('(867)--5309)');

});
