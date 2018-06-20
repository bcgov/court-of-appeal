require('../support/fake.dom');
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyApplications from '../../src/forms/my.applications';
configure({ adapter: new Adapter() });
let DefaultService = require('../../src/service/default.service');

describe('MyApplications component', ()=> {
        
    test('default service', ()=>{
        let instance = mount(<MyApplications/>).instance();
        
        expect(instance.service instanceof DefaultService).toEqual(true);  
    });    
    let cases;
    let createInstance = ()=>{
        let instance = mount(<MyApplications service={{
            getMyCases: (params, callback)=> { callback({ cases:cases }); }
        }}/>).instance();
        return instance;
    };

    describe('fetch cases', ()=>{               
        test('happens automatically', ()=> {
            let called = false;
            let service = {
                getMyCases: (params, callback)=> { called=true; callback({ cases:[] }); }
            };
            mount(<MyApplications service={service}/>).instance();

            expect(called).toEqual(true);
        });
        test('unless specified otherwise', ()=> {
            let called = false;
            let service = {
                getMyCases: (params, callback)=> { called=true; callback({ cases:[] }); }
            };
            mount(<MyApplications fetch="false" service={service}/>).instance();
            
            expect(called).toEqual(false);  
        });
        test('unchecks all cases by default', ()=>{
            cases = [{ checked:true, id:42, data:{} }];  
            let instance = createInstance();
            
            expect(instance.state.cases[0].checked).toEqual(false);                    
        });
        test('sets displayMyCasesEmptyLabel indicator when case collection is empty', ()=>{
            cases = [];
            let instance = createInstance();
            
            expect(instance.state.displayMyCasesEmptyLabel).toEqual(true);
        });
        test('unsets displayMyCasesEmptyLabel indicator when case collection is not empty', ()=>{
            cases = [
                { id:1, data:{value:'old'} },
                { id:2, data:{value:'old'} }
            ];
            let instance = createInstance();
            
            expect(instance.state.displayMyCasesEmptyLabel).toEqual(false);
        });
    });
              
    describe('max file download', ()=>{
        test('default value', ()=>{
            let instance = mount(<MyApplications/>).instance();
            
            expect(instance.maxFileDownload).toEqual(5);  
        });
        test('default value can be overriden', ()=>{
            process.env.REACT_APP_MAX_FILE_DOWNLOAD = 7;
            let instance = mount(<MyApplications/>).instance();
            
            expect(instance.maxFileDownload).toEqual(7);  
        });
    });

    describe('capture one case change in the collection of cases in state', ()=>{
        let instance;
        beforeEach(()=>{
            cases = [
                { id:15, data:{value:'old'} },
                { id:42, data:{value:'old'} }
            ];
            instance = createInstance();
        });
        test('replaces old value with new value', ()=>{            
            instance.updateCases({value:'updated'}, 15);    
            expect(instance.state.cases[0].data).toEqual({value:'updated'});
        });
        test('do not modify the other cases', ()=>{
            instance.updateCases({value:'updated'}, 15);
            expect(instance.state.cases[1].data).toEqual({value:'old'});
        });
        test('resists unknown case', ()=>{
            instance.updateCases({value:'updated'}, 666);
            expect(instance.state.cases[0].data).toEqual({value:'old'});
            expect(instance.state.cases[1].data).toEqual({value:'old'});            
        });
    });

    describe('toggleSelected', ()=>{
        let instance;
        let wrapper;
        beforeEach(()=>{
            cases = [
                { id:11, data:{} },
                { id:22, data:{} }
            ];
            wrapper = mount(<MyApplications service={{
                getMyCases: (params, callback)=> { callback({ cases:cases }); }
            }}/>);
            instance = wrapper.instance();
        });
        test('keeps track of selected flag in state', ()=>{
            wrapper.find('#select-11').prop('onChange')();
            expect(instance.state.cases[0].checked).toEqual(true);
            wrapper.find('#select-11').prop('onChange')();
            expect(instance.state.cases[0].checked).toEqual(false);
            
        });
        test('resists unknown case', ()=>{
            instance.toggleSelected(33);    
            expect(instance.state.cases[0].checked).toEqual(false);
            expect(instance.state.cases[1].checked).toEqual(false);
        });
    });
});