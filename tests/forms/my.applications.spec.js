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

    describe('fetch cases', ()=>{
        let cases;
        let service = {
            getMyCases: (params, callback)=> { callback({ cases:cases }); }
        };        

        test('happens automatically', (done)=> {
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
        test('unchecks all cases by default', (done)=>{
            cases = [{ checked:true, id:42, data:{} }];            
            let instance = mount(<MyApplications service={service}/>).instance();
            setTimeout(()=> {
                expect(instance.state.cases[0].checked).toEqual(false);
                done();
            }, 100); 
        });
        test('sets displayMyCasesEmptyLabel indicator when case collection is empty', (done)=>{
            cases = [];
            let instance = mount(<MyApplications service={service}/>).instance();
            setTimeout(()=> {
                expect(instance.state.displayMyCasesEmptyLabel).toEqual(true);
                done();
            }, 100);
        });
        test('unsets displayMyCasesEmptyLabel indicator when case collection is not empty', (done)=>{
            cases = [
                { checked:true, id:1, data:{value:'old'} },
                { checked:true, id:2, data:{value:'old'} }
            ];
            let instance = mount(<MyApplications service={service}/>).instance();
            setTimeout(()=> {
                expect(instance.state.displayMyCasesEmptyLabel).toEqual(false);
                done();
            }, 100);
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
            let cases = [
                { checked:true, id:1, data:{value:'old'} },
                { checked:true, id:2, data:{value:'old'} }
            ];
            let service = {
                getMyCases: (params, callback)=> { callback({ cases:cases }); }
            };
            instance = mount(<MyApplications service={service}/>).instance();
        });
        test('replaces old value with new value', (done)=>{            
            instance.updateCases({value:'updated'}, 1);    
            setTimeout(()=> {
                expect(instance.state.cases[0].data).toEqual({value:'updated'});
                done();
            }, 100); 
        });
        test('do not modify the other cases', (done)=>{
            instance.updateCases({value:'updated'}, 1);
            setTimeout(()=> {
                expect(instance.state.cases[1].data).toEqual({value:'old'});
                done();
            }, 100); 
        });
    });
});