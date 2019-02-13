import React from 'react';
import NumericField from '../../../src/components/NumericField';
import renderer from 'react-test-renderer';

test('should only allow numeric entries', ()=> {

    let value = '';
    let handleFieldChange = (e) => { value = e.target.value; };

    const numericField = renderer.create(
        <NumericField id="number-field" value={value}
        handleFieldChange={handleFieldChange.bind(this)}/>,
    );
    let tree = numericField.toJSON();
    expect(tree).toMatchSnapshot();

    let e = { target: { value: "42"}};
    tree.props.onChange(e);
    expect(value).toMatch('42');

    e = { target: { value: "bah" } };
    tree.props.onChange(e);
    expect(value).toMatch('');

    e = { target: { value: "CA1234" } };
    tree.props.onChange(e);
    expect(value).toMatch('1234');

    e = { target: { value: "*bah1#?234?wtf?" } };
    tree.props.onChange(e);
    expect(value).toMatch('1234');

});
