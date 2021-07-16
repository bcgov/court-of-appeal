require('./support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import Header from '../src/pages/Header';
let DefaultService = require('../src/service/default.service');

describe('Header', ()=>{

    test('default service', ()=>{
        let instance = mount(<Header fetch="false"/>).instance();

        expect(instance.service instanceof DefaultService).toEqual(true);
    });
    test('displays name of connected user', ()=>{
        let document = mount(<Header service={{
            getPersonInfo: (callback)=> { callback({ login:'login', name:'Doe, John' }); }
        }}/>);
        document.update();

        expect(document.find('#header').at(0).html()).toContain('John Doe');
    });
    test('displays name of connected user, resisting no first name', ()=>{
        let document = mount(<Header service={{
            getPersonInfo: (callback)=> { callback({ login:'login', name:'Minnie Mouse' }); }
        }}/>);
        document.update();

        expect(document.find('#header-main-row').at(0).html()).toContain('Welcome, Minnie Mouse');
    });
});
