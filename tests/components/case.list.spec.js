require('../support/fake.dom');
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CaseList from '../../src/components/CaseList';
configure({ adapter: new Adapter() });

describe('CaseList', ()=> {

    let cases = [];
    let createDocument = ()=>{
        let document = mount(<CaseList 
            cases={cases}
            service={{
                updateForm2: (data, id, callback)=> { callback({}); },
                previewForm: (id, callback)=> { callback({}); }
            }}
        />);
        return document;
    };

    test('starts with edit dialog closed', ()=>{
        let document = createDocument();

        expect(document.find('#editFormModal').prop('style').display).toEqual('none');
    });

    describe('form detail', ()=>{
        let document;
        beforeEach(()=>{
            cases = [
                { id: 5, data:{} },
                { 
                    id:15, 
                    data:{
                        respondents: [{
                            address: {
                                city: 'this-city'
                            }
                        }],
                        appellants: [],
                    } 
                },
                { id:25, data:{} }
            ];
            document = createDocument();            
        });
        test('is available', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            expect(document.find('#editFormModal').prop('style').display).toEqual('block');

            expect(document.find('#country').at(0).prop('value')).toEqual('Canada');
            expect(document.find('#city').at(0).prop('value')).toEqual('this-city');

            document.find('#editFormModal button#back').prop('onClick')();
            document.update();
            expect(document.find('#editFormModal').prop('style').display).toEqual('none');
        });
    });
});