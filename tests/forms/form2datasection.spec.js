require('../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import Form2DataSection from '../../src/components/Form2DataSection';

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
        selectedContactIndex: 0
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
        data.useServiceEmail = false;
        data.sendNotifications = false;
        document = createDocument();
    });

    test('starts with hidden asterisk for email', ()=>{
        let asterisk = document.find('#emailasterisks').at(0);

        expect(asterisk.prop('style').display).toEqual('none');
    });

    test('unless useServiceEmail is provided as true', ()=>{
        data.useServiceEmail = true;
        document = createDocument();
        let asterisk = document.find('#emailasterisks').at(0);

        expect(asterisk.prop('style').display).toEqual('inline-block');
    });

    test('unless sendNotifications is provided as true', ()=>{
        data.sendNotifications = true;
        document = createDocument();
        let asterisk = document.find('#emailasterisks').at(0);

        expect(asterisk.prop('style').display).toEqual('inline-block');
    });

    test('concatenate appellants names', ()=>{
        let field = document.find('#appellant-name').at(0);

        expect(field.text()).toEqual('alpha, beta');
    });

    test('Offers respondent selection', ()=>{
        let field = document.find('#respondent-select').at(0);
        
        expect(field.text()).toEqual('Select...');
    });

    test('selects first respondent when there is a single respondent', ()=>{
        data = {
            respondents: [ { name:'unique'} ],
            appellants: [ { name:'alpha' }, { name:'beta' }],
            phone: '111-111-1111',
            email: 'me@here.net',
            useServiceEmail: false,
            sendNotifications: false,
            selectedContactIndex: 0
        }
        document = createDocument();

        expect(data.respondents[0].selected).toEqual(true)
    });

});
