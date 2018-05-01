import React from 'react';
import Find from '../../src/forms/Find';
import renderer from 'react-test-renderer';

test('should enable button for only valid entries', ()=> {

    let value = '';
    let fieldChanged = (e) => { value = e.target.value; };

    const finder = renderer.create(
        <Find id="number-field"
              formSevenNumber={value}
              service={{ searchForm7: ()=> {} }}
              fieldChanged={fieldChanged.bind(this)}/>,
    );
    let tree = finder.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = finder.getInstance();
    expect(instance.state.searchDisabled).toBe(true);

    let e = { target: { value: "CA12345"}};
    instance.caseFieldChanged(e);
    expect(value).toMatch('CA12345');
    expect(instance.state.searchDisabled).toBe(false);

    e = { target: { value: "CAT IN HAT2" } };
    instance.caseFieldChanged(e)
    expect(value).toMatch('CA2');
    expect(instance.state.searchDisabled).toBe(true);

    e = { target: { value: '1234' } };
    instance.caseFieldChanged(e);
    expect(value).toMatch('CA1234');
    expect(instance.state.searchDisabled).toBe(true);

    e = { target: { value: "*bah1#?234?wtf?  5" } };
    instance.caseFieldChanged(e);
    expect(value).toMatch('CA12345');
    expect(instance.state.searchDisabled).toBe(false);

});
