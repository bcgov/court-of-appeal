require('../support/fake.dom');
import React from 'react';
import Form2 from '../../src/forms/Form.2';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
let DefaultService = require('../../src/service/default.service');
configure({ adapter: new Adapter() });

describe('Form2', ()=>{

    let document;

    describe('starting state', ()=>{
        
        beforeEach(()=>{
            document = mount(<Form2 service={{}} />);
        });
        test('form is actually hidden', ()=>{
            expect(document.find('#form-data-section').prop('style').display).toEqual('none');
        });
        test('starts with formHasUnsavedChanges flag set to false', ()=>{
            expect(document.instance().state.formHasUnsavedChanges).toEqual(false);
        });
        test('default service', ()=>{
            document = mount(<Form2/>);
            
            expect(document.instance().service instanceof DefaultService).toEqual(true);  
        });
    });

    describe('After search', ()=>{
        
        let data = {
            parties: {
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
                    { name: 'second' },
                    { organization: 'third' },
                    { solicitor: { name:'fourth', address:'solicitor-address' } },
                ],
                appellants: []
            }
        };
        beforeEach(()=>{
            document = mount(<Form2 
                service={{ searchForm7: (number, callback)=> { callback(data); } }}
            />);
            document.find('#find-button').at(0).prop('onClick')();
            document.update();
        });
        test('the form becomes visible', ()=>{            
            expect(document.find('#form-data-section').prop('style').display).toEqual('block');
            expect(document.find('#country').at(0).prop('value')).toEqual('Canada');
            expect(document.find('#city').at(0).prop('value')).toEqual('old-city');
        });
        test('incoming data are completed with empty address when missing', ()=>{
            expect(document.instance().state.document.respondents[1].address).toEqual({});
        });
        test('data is taken from organization when missing', ()=>{
            expect(document.instance().state.document.respondents[2].name).toEqual('third');
        });
        test('data is taken from sollicitor when missing', ()=>{
            expect(document.instance().state.document.respondents[3].name).toEqual('fourth');
            expect(document.instance().state.document.respondents[3].address).toEqual('solicitor-address');
        });
        test('resists empty parties', ()=>{
            document = mount(<Form2 
                service={{ searchForm7: (number, callback)=> { 
                    callback({parties:{ appellants:[], respondents:[] }}); } }}
            />);
            document.find('#find-button').at(0).prop('onClick')();
            document.update();
        });
        test('resists missing parties', ()=>{
            document = mount(<Form2 
                service={{ searchForm7: (number, callback)=> { 
                    callback({parties:{  }}); } }}
            />);
            document.find('#find-button').at(0).prop('onClick')();
            document.update();

            expect(document.instance().state.notFoundError).toEqual('Something went wrong with the document requested');
        });
        test('resists no data', ()=> {
            document = mount(<Form2 
                service={{ searchForm7: (number, callback)=> { 
                    callback(null); } }}
            />);
            document.find('#find-button').at(0).prop('onClick')();
            document.update();

            expect(document.instance().state.notFoundError).toEqual('No such Court of Appeal document found');
        });
    });
    
    describe('Creation', ()=>{

        let data = {
            parties: {
                respondents: [
                    {
                        name: 'first',
                        address: {
                            addressLine1: 'old-addressLine1',
                            addressLine2: 'old-addressLine2',
                            city: 'old-city',
                            postalCode: 'V1V 1A1'
                        }
                    },
                    { name: 'second' }
                ],
                appellants: []
            }
        };
        let sent;
        let sentId;
        beforeEach(()=>{
            document = mount(<Form2 
                service={{ 
                    searchForm7: (number, callback)=> { callback(data); } ,
                    createForm2: (form, callback)=> { sent = form; callback(42); },
                    updateForm2: (form, id, callback)=> { sent = form; sentId = id; callback(); }
                }}
            />);
            document.find('#find-button').at(0).prop('onClick')();
            document.update();
            document.find('button#draft').at(0).prop('onClick')();
        });
        test('sends form values', ()=> {
            expect(sent.respondents[0].name).toEqual('first');
        });
        test('stores id of newly created form', ()=>{
            expect(document.instance().state.id).toEqual(42);  
        });
        test('resets the form-needs-save flag', ()=>{
            expect(document.instance().state.formHasUnsavedChanges).toEqual(false);  
        });

        describe('Update', ()=>{
            
            beforeEach(()=>{
                document.find('select#chosenRespondent').at(0).simulate('change', { target: { name:'respondent.name', value:1 } });

                document.find('input#city').at(0).simulate('change', { target: { name:'respondent.city', value:'new-city' } });
                document.find('input#addressLine1').at(0).simulate('change', { target: { name:'respondent.addressLine1', value:'new-addressLine1' } });
                document.find('input#addressLine2').at(0).simulate('change', { target: { name:'respondent.addressLine2', value:'new-addressLine2' } });
                document.find('input#postalCode').at(0).simulate('change', { target: { name:'respondent.postalCode', value:'V2V 2B2' } });
                document.find('input#phone').at(0).simulate('change', { target: { name:'document.phone', value:'111-222-3333' } });
                document.find('input#email').at(0).simulate('change', { target: { name:'document.email', value:'value@new.org' } });
                document.find('input#useServiceEmail').at(0).simulate('change', { target: { name:'document.useServiceEmail', checked:true } });
                document.find('input#sendNotifications').at(0).simulate('change', { target: { name:'document.sendNotifications', checked:true } });

                document.find('button#draft').at(0).prop('onClick')();
            });
            test('resets the form-needs-save flag', ()=>{
                expect(document.instance().state.formHasUnsavedChanges).toEqual(false);  
            });
            test('sends form id', ()=> {
                expect(sentId).toEqual(42);
            });
            test('sends updated selectedRespondentIndex', ()=>{
                expect(sent.selectedRespondentIndex).toEqual(1);
            });
            test('sends updated city', ()=>{
                expect(sent.respondents[1].address.city).toEqual('new-city');
            });
            test('sends updated addressLine1', ()=>{
                expect(sent.respondents[1].address.addressLine1).toEqual('new-addressLine1');
            });
            test('sends updated addressLine2', ()=>{
                expect(sent.respondents[1].address.addressLine2).toEqual('new-addressLine2');
            });
            test('sends updated postal code', ()=>{
                expect(sent.respondents[1].address.postalCode).toEqual('V2V 2B2');
            });
            test('sends updated phone', ()=>{
                expect(sent.phone).toEqual('111-222-3333');
            });
            test('sends updated email', ()=>{
                expect(sent.email).toEqual('value@new.org');
            });
            test('sends updated useServiceEmail', ()=>{
                expect(sent.useServiceEmail).toEqual(true);
            });
            test('sends updated sendNotifications', ()=>{
                expect(sent.sendNotifications).toEqual(true);
            });

            describe('blur event', ()=>{

                test('is used to mark phone as invalid', ()=>{
                    let field = document.find('input#phone').at(0);
                    field.simulate('change', { target: { name:'document.phone', value:'invalid value' } });
                    field.simulate('blur');

                    expect(document.instance().state.phoneIsValid).toEqual(false);
                    expect(document.instance().state.previewShouldBeDisabled).toEqual(true);
                    expect(document.instance().state.submitShouldBeDisabled).toEqual(true);
                });
                test('is used to mark phone as valid', ()=>{
                    let field = document.find('input#phone').at(0);
                    field.simulate('change', { target: { name:'document.phone', value:'111-222-3333' } });
                    field.simulate('blur');

                    expect(document.instance().state.phoneIsValid).toEqual(true);
                    expect(document.instance().state.previewShouldBeDisabled).toEqual(false);
                    expect(document.instance().state.submitShouldBeDisabled).toEqual(false);
                });
                test('is used to mark email as invalid', ()=>{
                    let field = document.find('input#email').at(0);
                    field.simulate('change', { target: { name:'document.email', value:'invalid value' } });
                    field.simulate('blur');

                    expect(document.instance().state.emailIsValid).toEqual(false);
                    expect(document.instance().state.previewShouldBeDisabled).toEqual(true);
                    expect(document.instance().state.submitShouldBeDisabled).toEqual(true);
                });
                test('is used to mark email as valid', ()=>{
                    let field = document.find('input#email').at(0);
                    field.simulate('change', { target: { name:'document.email', value:'me@here.net' } });
                    field.simulate('blur');

                    expect(document.instance().state.emailIsValid).toEqual(true);
                    expect(document.instance().state.previewShouldBeDisabled).toEqual(false);
                    expect(document.instance().state.submitShouldBeDisabled).toEqual(false);
                });
                test('is used to mark postalCode as invalid', ()=>{
                    let field = document.find('input#postalCode').at(0);
                    field.simulate('change', { target: { name:'document.postalCode', value:'invalid value' } });
                    field.simulate('blur');

                    expect(document.instance().state.postalCodeIsValid).toEqual(false);
                    expect(document.instance().state.previewShouldBeDisabled).toEqual(true);
                    expect(document.instance().state.submitShouldBeDisabled).toEqual(true);
                });
                test('is used to mark postalCode as valid', ()=>{
                    let field = document.find('input#postalCode').at(0);
                    field.simulate('change', { target: { name:'document.postalCode', value:'V1V 1B1' } });
                    field.simulate('blur');

                    expect(document.instance().state.postalCodeIsValid).toEqual(true);
                    expect(document.instance().state.previewShouldBeDisabled).toEqual(false);
                    expect(document.instance().state.submitShouldBeDisabled).toEqual(false);
                });
                test('explore', ()=>{
                    let field = document.find('input#addressLine1').at(0);
                    field.simulate('change', { target: { name:'respondent.addressLine1', value:'new-adresseLine1' } });
                    field.simulate('blur');

                    expect(document.instance().state.previewShouldBeDisabled).toEqual(false);
                    expect(document.instance().state.submitShouldBeDisabled).toEqual(false);
                })
            });
        });
    });

    describe('Data Loss warning Dialog', ()=>{
        let data = {
            parties: {
                respondents: [
                    {
                        name: 'first',
                        address: {
                            addressLine1: 'old-addressLine1',
                            addressLine2: 'old-addressLine2',
                            city: 'old-city',
                            postalCode: 'V1V 1A1'
                        }
                    }
                ],
                appellants: []
            }
        };
        beforeEach(()=>{
            document = mount(<Form2 
                service={{ 
                    searchForm7: (number, callback)=> { callback(data); } ,
                    createForm2: (form, callback)=> { callback(42); },
                    updateForm2: (form, id, callback)=> { callback(); }
                }}
            />);
            document.find('#find-button').at(0).prop('onClick')();
            document.update();            
        });
        test('starts hidden', ()=>{
            expect(document.find('#dataLossWarning').prop('style').display).toEqual('none');            
        });
        test('is displayed when data is dirty', ()=>{
            document.find('input#phone').at(0).simulate('change', { target: { name:'document.phone', value:'111-222-3333' } });
            document.find('button#back').at(0).prop('onClick')();
            document.update();

            expect(document.find('#dataLossWarning').prop('style').display).toEqual('block');
        });
        test('can be closed', ()=>{
            document.find('input#phone').at(0).simulate('change', { target: { name:'document.phone', value:'111-222-3333' } });
            document.find('button#back').at(0).prop('onClick')();
            document.update();
            document.find('#dataLossWarning #close-modal').at(0).prop('onClick')();
            document.update();

            expect(document.find('#dataLossWarning').prop('style').display).toEqual('none');
        });
    });

    describe('Preview Dialog', ()=>{
        let data = {
            parties: {
                respondents: [
                    {
                        name: 'first',
                        address: {
                            addressLine1: 'old-addressLine1',
                            addressLine2: 'old-addressLine2',
                            city: 'old-city',
                            postalCode: 'V1V 1A1'
                        }
                    }
                ],
                appellants: []
            }
        };
        beforeEach(()=>{
            document = mount(<Form2 
                service={{ 
                    searchForm7: (number, callback)=> { callback(data); } ,
                    createForm2: (form, callback)=> { callback(42); },
                    previewForm: (id, callback)=> { callback('<div>this-preview</div>'); }
                }}
            />);
            document.find('#find-button').at(0).prop('onClick')();
            document.update();            
        });
        test('starts hidden', ()=>{
            expect(document.find('#viewFormModal').prop('style').display).toEqual('none');
        });
        test('can be displayed', ()=>{
            document.find('button#preview').at(0).prop('onClick')();
            document.update();

            expect(document.find('#viewFormModal').prop('style').display).toEqual('block');
            expect(document.find('#viewFormModal').html()).toContain('this-preview');
        });
        test('can be closed', ()=>{
            document.find('button#preview').at(0).prop('onClick')();
            document.update();
            document.find('#viewFormModal button#back').at(0).prop('onClick')();
            document.update();

            expect(document.find('#viewFormModal').prop('style').display).toEqual('none');
        });
    });
});