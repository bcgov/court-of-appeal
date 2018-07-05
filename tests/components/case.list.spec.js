require('../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import CaseList from '../../src/components/CaseList';

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
                        respondents: [
                            {
                                name: 'first',
                                address: {
                                    addressLine1: 'old-addressLine1',
                                    addressLine2: 'new-addressLine2',
                                    city: 'old-city',
                                    postalCode: 'V1V 1A1'
                                }
                            },
                            {
                                name: 'second',
                                address: {
                                    addressLine1: 'old-addressLine1',
                                    addressLine2: 'new-addressLine2',
                                    city: 'old-city',
                                    postalCode: 'V1V 1A1'
                                }
                            },
                            {
                                name: 'third-without-address'
                            },
                        ],
                        appellants: [],
                        phone: '111-111-1111',
                        email: 'me@here.net',
                        useServiceEmail: false,
                        sendNotifications: false,
                        selectedRespondentIndex: 0
                    } 
                },
                { id:25, data:{} }
            ];
            document = createDocument();            
        });
        test('starts with formHasUnsavedChanges flag set to false', ()=>{
            expect(document.instance().state.formHasUnsavedChanges).toEqual(false);
        });
        test('keeps track of the need to save modifications', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('input#city').at(0);
            field.simulate('change', { target: { name:'respondent.city', value:'new-city' } });
            
            expect(document.instance().state.formHasUnsavedChanges).toEqual(true);
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
        test('invalid postal code flag is captured by blur event after change', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('input#postalCode').at(0);
            field.simulate('change', { target: { name:'respondent.postalCode', value:'2B2' } });
            field.simulate('blur');

            expect(document.instance().state.postalCodeIsValid).toEqual(false);
        });
        test('phone can be changed', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('input#phone').at(0);
            field.simulate('change', { target: { name:'document.phone', value:'222-222-2222' } });
            
            expect(cases[1].data.phone).toEqual('222-222-2222');
        });
        test('invalid phone flag is captured by blur event after change', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('input#phone').at(0);
            field.simulate('change', { target: { name:'document.phone', value:'invalid value' } });
            field.simulate('blur');
            
            expect(document.instance().state.phoneIsValid).toEqual(false);
        });
        test('email can be changed', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('input#email').at(0);
            field.simulate('change', { target: { name:'document.email', value:'you@here.net' } });
            
            expect(cases[1].data.email).toEqual('you@here.net');
        });
        test('invalid email flag is captured by blur event after change', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('input#email').at(0);
            field.simulate('change', { target: { name:'document.email', value:'invalid value' } });
            field.simulate('blur');
            
            expect(document.instance().state.emailIsValid).toEqual(false);
        });
        test('userServiceEmail can be changed', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('input#useServiceEmail').at(0);
            field.simulate('change', { target: { name:'document.useServiceEmail', checked:true } });
            
            expect(cases[1].data.useServiceEmail).toEqual(true);
        });
        test('sendNotifications can be changed', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('input#sendNotifications').at(0);
            field.simulate('change', { target: { name:'document.sendNotifications', checked:true } });
            
            expect(cases[1].data.sendNotifications).toEqual(true);
        });
        test('chosen respondent can be changed', ()=>{
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('select#chosenRespondent').at(0);
            field.simulate('change', { target: { name:'respondent.name', value:1 } });
            
            expect(cases[1].data.selectedRespondentIndex).toEqual(1);
        });
        test('resists unknown address', ()=>{
            let indexOfRespondentWithoutAddress = 2;
            document.find('#edit-15').prop('onClick')();
            document.update();
            let field = document.find('select#chosenRespondent').at(0);
            field.simulate('change', { target: { name:'respondent.name', value:indexOfRespondentWithoutAddress } });
            field = document.find('input#addressLine1').at(0);
            field.simulate('change', { target: { name:'respondent.addressLine1', value:'this-address' } });

            expect(cases[1].data.respondents[indexOfRespondentWithoutAddress].address.addressLine1).toEqual('this-address');
        });
    });
});