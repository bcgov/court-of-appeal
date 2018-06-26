require('../support/fake.dom');
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Form2DataSection from '../../src/components/Form2DataSection';
configure({ adapter: new Adapter() });

describe('Form2DataSection', ()=> {

    let data = {
        respondents: [
            {
                name: 'first',
                address: {
                    addressLine1: 'old-addressLine1',
                    addressLine2: 'new-addressLine2',
                    city: 'old-city',
                    postalCode: 'V1V 1A1'
                }
            }
        ],
        appellants: [],
        phone: '111-111-1111',
        email: 'me@here.net',
        useServiceEmail: false,
        sendNotifications: false,
        selectedRespondentIndex: 0
    } 
    let createDocument = ()=>{
        let document = mount(<Form2DataSection 
            data={data}
            show={true}
            validate={()=>{}}
            handleFieldChange={()=>{}}
        />);
        return document;
    };

    test('starts with showEmailAsMandatory false', ()=>{
        let document = createDocument();

        expect(document.instance().state.showEmailAsMandatory).toEqual(false);
    });

    test('starts with hidden asterisk for email', ()=>{
        let document = createDocument();        
        let asterisk = document.find('#emailasterisks').at(0);

        expect(asterisk.prop('style').display).toEqual('none');
    });

    test('show email as mandatory when notifications are chosen', ()=>{
        let document = createDocument();
        let field = document.find('input#sendNotifications').at(0);
        field.simulate('change', { target: { name:'document.sendNotifications', checked:true } });
        let asterisk = document.find('#emailasterisks').at(0);

        expect(asterisk.prop('style').display).toEqual('inline-block');
    });

    test('show email as mandatory when service email is chosen', ()=>{
        let document = createDocument();
        let field = document.find('input#useServiceEmail').at(0);
        field.simulate('change', { target: { name:'document.useServiceEmail', checked:true } });
        let asterisk = document.find('#emailasterisks').at(0);

        expect(asterisk.prop('style').display).toEqual('inline-block');
    });
    
});