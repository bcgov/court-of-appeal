require('../support/fake.dom');
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyApplications from '../../src/forms/my.applications';
configure({ adapter: new Adapter() });
let DefaultService = require('../../src/service/default.service');

describe('MyApplications document', ()=> {
        
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
        let document;
        beforeEach(()=>{
            cases = [
                { id:11, data:{} },
                { id:22, data:{} }
            ];
            document = mount(<MyApplications service={{
                getMyCases: (params, callback)=> { callback({ cases:cases }); }
            }}/>);
            instance = document.instance();
        });
        test('keeps track of selected flag in state', ()=>{
            document.find('#select-11').prop('onChange')();
            expect(instance.state.cases[0].checked).toEqual(true);
            document.find('#select-11').prop('onChange')();
            expect(instance.state.cases[0].checked).toEqual(false);
            
        });
        test('resists unknown case', ()=>{
            instance.toggleSelected(33);    
            expect(instance.state.cases[0].checked).toEqual(false);
            expect(instance.state.cases[1].checked).toEqual(false);
        });
    });

    describe('archive', ()=>{
        let received;
        let document;
        let instance;
        beforeEach(()=>{
            cases = [
                { id: 5, data:{} },
                { id:15, data:{} },
                { id:25, data:{} }
            ];
            document = mount(<MyApplications service={{
                getMyCases: (params, callback)=> { callback({ cases:cases }); },
                archiveCases: (ids, callback)=> { received=ids, callback(); }
            }}/>);
            received = undefined;
            instance = document.instance();
        });
        test('asks for confirmation', ()=>{            
            document.find('#select-15').prop('onChange')();
            document.find('#select-25').prop('onChange')();   
            document.find('#archive-button').at(0).prop('onClick')();
            document.update();

            expect(document.find('#are-you-sure-modal').prop('style').display).toEqual('block');
        });
        test('sends the selected ids', ()=>{            
            document.find('#select-15').prop('onChange')();
            document.find('#select-25').prop('onChange')();   
            document.find('#archive-button').at(0).prop('onClick')();
            document.find('#yes-archive').at(0).prop('onClick')();
            document.update();

            expect(document.find('#are-you-sure-modal').prop('style').display).toEqual('none');
            expect(received).toEqual([15, 25]);
        });
        test('does nothing when no form is selected', ()=>{
            document.find('#archive-button').at(0).prop('onClick')();
            
            expect(document.find('#are-you-sure-modal').prop('style').display).toEqual('none');
            expect(received).toEqual(undefined);
        });
    });

    describe('download', ()=>{
        let idsSent;
        let document;
        let instance;
        let savedData;
        let answer = {value:42};
        beforeEach(()=>{
            cases = [
                { id: 5, data:{} },
                { id:15, data:{} },
                { id:25, data:{} }
            ]; 
            document = mount(<MyApplications service={{
                getMyCases: (params, callback)=> { callback({ cases:cases }); },
                download: (ids, callback)=> { idsSent=ids, callback(answer); }
            }}/>);
            instance = document.instance();
            instance.save = function(data) {
                savedData = data;
            }
            idsSent = undefined;
            savedData = undefined;
        });
        test('sends the selected ids', ()=>{            
            document.find('#select-15').prop('onChange')();
            document.find('#select-25').prop('onChange')();   
            document.find('#download-button').at(0).prop('onClick')();

            expect(idsSent).toEqual([15, 25]);
        });
        test('saves the received data', ()=>{            
            document.find('#select-15').prop('onChange')();
            document.find('#select-25').prop('onChange')();   
            document.find('#download-button').at(0).prop('onClick')();

            expect(savedData).toEqual({value:42});
        });
        test('unless error is received', ()=>{
            answer = { error:'any' };
            document.find('#select-15').prop('onChange')();
            document.find('#select-25').prop('onChange')();   
            document.find('#download-button').at(0).prop('onClick')();

            expect(savedData).toEqual(undefined);
        });
        test('do not even download if too much files selected', ()=>{
            instance.maxFileDownload = 1;
            document.find('#select-15').prop('onChange')();
            document.find('#select-25').prop('onChange')();   
            document.find('#download-button').at(0).prop('onClick')();

            expect(idsSent).toEqual(undefined);
            expect(instance.state.displayErrorDialog).toEqual(true);
            document.find('#download-error-close-modal').at(0).prop('onClick')();
            expect(instance.state.displayErrorDialog).toEqual(false);
        });
    });
});