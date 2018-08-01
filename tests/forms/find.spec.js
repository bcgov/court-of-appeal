require('../support/enzyme.setup');
import React from 'react';
import Find from '../../src/forms/Find';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

test('valid entries', ()=> {

    let value = '', started = false;
    let handleFieldChange = (e) => { value = e.target.value; };
    let startSearch = () => { started = true };

    const finder = renderer.create(
        <Find id="number-field"
              formSevenNumber={value}
              service={{ searchForm7: ()=> {} }}
              handleFieldChange={handleFieldChange.bind(this)}
              startSearching={startSearch.bind(this)}
        />,
    );
    let tree = finder.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = finder.getInstance();

    let e = { target: { value: "CA12345"}};
    instance.handleFieldChange(e);
    expect(value).toMatch('CA12345');

    e = { target: { value: "CAT IN HAT2" } };
    instance.handleFieldChange(e);
    expect(value).toMatch('CA2');

    e = { target: { value: '1234' } };
    instance.handleFieldChange(e);
    expect(value).toMatch('CA1234');

    e = { target: { value: "*bah1#?234?wtf?  5" } };
    instance.handleFieldChange(e);
    expect(value).toMatch('CA12345');

});

test('cannot search with invalid entries', ()=> {

    let value = '', started = false;
    let handleFieldChange = (e) => { value = e.target.value; };
    let startSearch = () => { started = true };

    const finder = renderer.create(
        <Find id="number-field"
              formSevenNumber={value}
              service={{ searchForm7: ()=> {} }}
              handleFieldChange={handleFieldChange.bind(this)}
              startSearching={startSearch.bind(this)}
        />,
    );
    let tree = finder.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = finder.getInstance();

    let e = { target: { value: "CA12345"}};
    instance.handleFieldChange(e);
    expect(value).toMatch('CA12345');
    expect(instance.state.searchDisabled).toEqual(false);

    e = { target: { value: "CA1" } };
    instance.handleFieldChange(e);
    expect(value).toMatch('CA1');
    expect(instance.state.searchDisabled).toEqual(true);

});


let DefaultService = require('../../src/service/default.service');
test('default service', ()=>{
    let value = '', started = false;
    let handleFieldChange = (e) => { value = e.target.value; };
    let startSearch = () => { started = true };
    const finder = mount(
        <Find id="number-field"
              formSevenNumber={value}
              handleFieldChange={handleFieldChange.bind(this)}
              startSearching={startSearch.bind(this)}
        />
    );    
    let instance = finder.instance();
    
    expect(instance.service instanceof DefaultService).toEqual(true);  
});
test('sends fetched data to caller', ()=>{
    let value = '', started = false;
    let handleFieldChange = (e) => { value = e.target.value; };
    let startSearch = () => { started = true }
    let sent = {};
    let callback = (data) => { sent=data; }
    const finder = renderer.create(
        <Find id="number-field"
              formSevenNumber={value}
              service={{ searchForm7: (file, callback)=> {callback(42); } }}
              callback={callback.bind(this)}
              handleFieldChange={handleFieldChange.bind(this)}
              startSearching={startSearch.bind(this)}
        />,
    );    
    let instance = finder.getInstance();
    instance.search();

    expect(sent).toEqual(42);
});
test('[enter] can trigger the search', ()=>{
    let value = 'CA12345', started = false;
    let handleFieldChange = (e) => { value = e.target.value; };
    let startSearch = () => { started = true };
    let sent = {};
    let callback = (data) => { sent=data; }
    const finder = renderer.create(
        <Find id="number-field"
              formSevenNumber={value}
              service={{ searchForm7: (file, callback)=> {callback(42); } }}
              callback={callback.bind(this)}
              handleFieldChange={handleFieldChange.bind(this)}
              startSearching={startSearch.bind(this)}
        />,
    );    
    let instance = finder.getInstance();
    instance.handleKeyPress({charCode:13});

    expect(sent).toEqual(42);
});
test('only [enter] can trigger the search', ()=>{
    let value = 'CA12345', started = false;
    let handleFieldChange = (e) => { value = e.target.value; };
    let startSearch = () => { started = true }
    let sent = {};
    let callback = (data) => { sent=data; };
    const finder = renderer.create(
        <Find id="number-field"
              formSevenNumber={value}
              service={{ searchForm7: (file, callback)=> {callback(42); } }}
              callback={callback.bind(this)}
              handleFieldChange={handleFieldChange.bind(this)}
              startSearching={startSearch.bind(this)}
        />,
    );
    let instance = finder.getInstance();
    instance.handleKeyPress({charCode:65});

    expect(sent).toEqual({});
});
