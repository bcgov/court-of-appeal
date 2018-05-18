require('../support/fake.dom');
import React from 'react';
import Find from '../../src/forms/Find';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('valid entries', ()=> {

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
    instance.handleFieldChange(e);
    expect(value).toMatch('CA2');

    e = { target: { value: '1234' } };
    instance.handleFieldChange(e);
    expect(value).toMatch('CA1234');

    e = { target: { value: "*bah1#?234?wtf?  5" } };
    instance.handleFieldChange(e);
    expect(value).toMatch('CA12345');

});

let DefaultService = require('../../src/service/default.service');
test('default service', ()=>{
    let value = '';
    let handleFieldChange = (e) => { value = e.target.value; };
    const finder = mount(
        <Find id="number-field"
              formSevenNumber={value}
              handleFieldChange={handleFieldChange.bind(this)}/>
    );    
    let instance = finder.instance();
    
    expect(instance.service instanceof DefaultService).toEqual(true);  
});
test('sends fetched data to caller', ()=>{
    let value = '';
    let handleFieldChange = (e) => { value = e.target.value; };
    let sent = {};
    let callback = (data) => { sent=data; }
    const finder = renderer.create(
        <Find id="number-field"
              formSevenNumber={value}
              service={{ searchForm7: (file, callback)=> {callback(42); } }}
              callback={callback.bind(this)}
              handleFieldChange={handleFieldChange.bind(this)}/>,
    );    
    let instance = finder.getInstance();
    instance.search();

    expect(sent).toEqual(42);
});
test('[enter] can trigger the search', ()=>{
    let value = 'CA12345';
    let handleFieldChange = (e) => { value = e.target.value; };
    let sent = {};
    let callback = (data) => { sent=data; }
    const finder = renderer.create(
        <Find id="number-field"
              formSevenNumber={value}
              service={{ searchForm7: (file, callback)=> {callback(42); } }}
              callback={callback.bind(this)}
              handleFieldChange={handleFieldChange.bind(this)}/>,
    );    
    let instance = finder.getInstance();
    instance.handleKeyPress({charCode:13});

    expect(sent).toEqual(42);
});
test('only [enter] can trigger the search', ()=>{
    let value = 'CA12345';
    let handleFieldChange = (e) => { value = e.target.value; };
    let sent = {};
    let callback = (data) => { sent=data; }
    const finder = renderer.create(
        <Find id="number-field"
              formSevenNumber={value}
              service={{ searchForm7: (file, callback)=> {callback(42); } }}
              callback={callback.bind(this)}
              handleFieldChange={handleFieldChange.bind(this)}/>,
    );
    let instance = finder.getInstance();
    instance.handleKeyPress({charCode:65});

    expect(sent).toEqual({});
});
