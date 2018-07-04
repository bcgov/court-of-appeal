require('./support/fake.dom');
import React from 'react';
import Header from '../src/Header';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
let DefaultService = require('../src/service/default.service');

describe('Header', ()=>{

    test('default service', ()=>{
        let instance = mount(<Header/>).instance();
        
        expect(instance.service instanceof DefaultService).toEqual(true);  
    });
    test('displays name of connected user', ()=>{
        let document = mount(<Header service={{
            getPersonInfo: (callback)=> { callback({ login:'login', name:'Doe, John' }); }
        }}/>);
        document.update();

        expect(document.find('#header').at(0).html()).toContain('John Doe');
    });
});