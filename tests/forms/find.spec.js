import React from 'react';
import Find from '../../src/forms/Find';
import renderer from 'react-test-renderer';

test('should enable button for only valid entries', ()=> {

    let value = '';
    let handleFieldChange = (e) => { value = e.target.value; };

    const finder = renderer.create(
        <Find id="number-field"
              formSevenNumber={value}
              service={{ searchForm7: ()=> {} }}
              handleFieldChange={handleFieldChange.bind(this)}/>,
    );
    let tree = finder.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = finder.getInstance();

    let e = { target: { value: "CA12345"}};
    instance.handleFieldChange(e);
    expect(value).toMatch('CA12345');

    e = { target: { value: "CAT IN HAT2" } };
    instance.handleFieldChange(e)
    expect(value).toMatch('CA2');

    e = { target: { value: '1234' } };
    instance.handleFieldChange(e);
    expect(value).toMatch('CA1234');

    e = { target: { value: "*bah1#?234?wtf?  5" } };
    instance.handleFieldChange(e);
    expect(value).toMatch('CA12345');

});
