require('../support/fake.dom');
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyApplications from '../../src/forms/my.applications';

configure({ adapter: new Adapter() });

describe('My Documents page', ()=> {
    
    test('starts with fetching the cases', (done)=> {
        let called = false;
        let service = {
            getMyCases: (params, callback)=> { called=true; callback({ cases:[] }); }
        };
        mount(<MyApplications service={service}/>).instance();

        setTimeout(()=> {
            expect(called).toEqual(true);
            done();
        }, 100);        
    });
    test('unless specified otherwise', (done)=> {
        let called = false;
        mount(<MyApplications fetch="false"/>).instance();

        setTimeout(()=> {
            expect(called).toEqual(false);
            done();
        }, 100);        
    });
    let DefaultService = require('../../src/service/default.service');
    test('default service', ()=>{
        let instance = mount(<MyApplications/>).instance();
        
        expect(instance.service instanceof DefaultService).toEqual(true);  
    });

    describe('max file download', ()=>{

        test('default value', ()=>{
            let instance = mount(<MyApplications/>).instance();
            
            expect(instance.maxFileDownload).toEqual(5);  
        });
        test('can be overriden', ()=>{
            process.env.REACT_APP_MAX_FILE_DOWNLOAD = 7;
            let instance = mount(<MyApplications/>).instance();
            
            expect(instance.maxFileDownload).toEqual(7);  
        });
    });
});