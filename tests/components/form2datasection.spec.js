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
            },
            { name:'second'}
        ],
        appellants: [ { name:'alpha' }, { name:'beta' }],
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
    let document;
    beforeEach(()=>{
        document = createDocument();
    });

    test('starts with showEmailAsMandatory false', ()=>{
        expect(document.instance().state.showEmailAsMandatory).toEqual(false);
    });

    test('starts with hidden asterisk for email', ()=>{
        let asterisk = document.find('#emailasterisks').at(0);

        expect(asterisk.prop('style').display).toEqual('none');
    });

    test('show email as mandatory when notifications are chosen', ()=>{
        let field = document.find('input#sendNotifications').at(0);
        field.simulate('change', { target: { name:'document.sendNotifications', checked:true } });
        let asterisk = document.find('#emailasterisks').at(0);

        expect(asterisk.prop('style').display).toEqual('inline-block');
    });

    test('show email as mandatory when service email is chosen', ()=>{
        let field = document.find('input#useServiceEmail').at(0);
        field.simulate('change', { target: { name:'document.useServiceEmail', checked:true } });
        let asterisk = document.find('#emailasterisks').at(0);

        expect(asterisk.prop('style').display).toEqual('inline-block');
    });

    test('concatenate appellants names', ()=>{
        let field = document.find('#appellant-name').at(0);

        expect(field.text()).toEqual('alpha, beta');
    });

    test('concatenate respondantes names', ()=>{
        let field = document.find('#respondent-name').at(0);

        expect(field.text()).toEqual('first, second');
    });
    
});