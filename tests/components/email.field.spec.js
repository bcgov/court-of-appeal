import React from 'react';
import EmailField from '../../src/components/EmailField';
import renderer from 'react-test-renderer';

test('should only allow numeric, dash, and parentheses entries', ()=> {

    let value = '';
    let handleFieldChange = (e) => { value = e.target.value; };

    const phoneField = renderer.create(
        <EmailField id="number-field" value={value}
                    handleFieldChange={handleFieldChange.bind(this)}/>,
    );
    let tree = phoneField.toJSON();
    expect(tree).toMatchSnapshot();

    let e = { target: { value: "42"}};
    tree.props.onChange(e);
    expect(value).toMatch('42');

    e = { target: { value: "bah" } };
    tree.props.onChange(e);
    expect(value).toMatch('');

    e = { target: { value: "(Johnny)JOHNsmiath@john.com" } };
    tree.props.onChange(e);
    expect(value).toMatch('(Johnny)JOHNsmiath@john.com');

    e = { target: { value: "\"\\\"slashy@pinki.ca" } };
    tree.props.onChange(e);
    expect(value).toMatch('slashy@pinki.ca');

    e = { target: { value: "   " } };
    tree.props.onChange(e);
    expect(value).toMatch('');
});
