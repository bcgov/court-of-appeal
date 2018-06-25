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
                                addressLine1: 'old-addressLine1',
                                addressLine2: 'new-addressLine2',
                                city: 'old-city',
                                postalCode: 'old-postalCode'
                            }
                        }],
                        appellants: [],
                        selectedRespondentIndex: 0
                    } 
                },
                { id:25, data:{} }
            ];
            document = createDocument();            
        });
        test('can be seen', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            expect(document.find('#editFormModal').prop('style').display).toEqual('block');

            expect(document.find('#country').at(0).prop('value')).toEqual('Canada');
            expect(document.find('#city').at(0).prop('value')).toEqual('old-city');

            document.find('#editFormModal button#back').prop('onClick')();
            document.update();
            expect(document.find('#editFormModal').prop('style').display).toEqual('none');
        });
        test('city can be changed', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('input#city').at(0);
            field.simulate('change', { target: { name:'respondent.city', value:'new-city' } });

            expect(cases[1].data.respondents[0].address.city).toEqual('new-city');
        });
        test('addressLine1 can be changed', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('input#addressLine1').at(0);
            field.simulate('change', { target: { name:'respondent.addressLine1', value:'new-addressLine1' } });

            expect(cases[1].data.respondents[0].address.addressLine1).toEqual('new-addressLine1');
        });
        test('addressLine2 can be changed', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('input#addressLine2').at(0);
            field.simulate('change', { target: { name:'respondent.addressLine2', value:'new-addressLine2' } });

            expect(cases[1].data.respondents[0].address.addressLine2).toEqual('new-addressLine2');
        });
        test('postalCode can be changed', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('input#postalCode').at(0);
            field.simulate('change', { target: { name:'respondent.postalCode', value:'new-postalCode' } });

            expect(cases[1].data.respondents[0].address.postalCode).toEqual('NEWPOSTALCODE');
        });
    });
});