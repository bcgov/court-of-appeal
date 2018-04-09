let jsdom = require("jsdom");
let { click, enter } = require('../../tests/utils');
import React from 'react';
import ReactDOM from 'react-dom';
import Form2 from '../../src/forms/Form.2';
let Service = require('../../src/service/default.service');

describe('Search Form 7 in form 2', function() {

    let document;
    let sut;

    beforeEach(function() {
        document = jsdom.jsdom('<div id="root"></div>');
        sut = ReactDOM.render(<Form2 />, document.getElementById('root'));
        sut.findComponent.service.setServeLocalData(true);
    });

    it('sets appellant', function() {
        click('#find-button', document);

        expect(document.getElementById('appellant-name').innerHTML).
            toEqual(Service.fakeData.parties.appellant.name);
    });

    it('sets respondent', function() {
        click('#find-button', document);

        expect(document.getElementById('respondent-name').innerHTML).
            toEqual(Service.fakeData.parties.respondent.name);
    });

    it('resists no data', function() {
        sut.findComponent.service.setServeLocalData(false);
        sut.findComponent.service.apiUrl = 'http://not-a-running-server';
        click('#find-button', document);    
           
        expect(sut.state.appellant.name).toEqual('');
        expect(sut.state.respondent.name).toEqual('');
    });

    it('disables correspondence-email field if checkbox is not selected', function() {
        click('#find-button', document);

        expect(document.getElementById('receive-email-checkbox').checked).toEqual(false);
        expect(document.getElementById('respondent-email')).toEqual(null);
    });

    it('enables correspondence-email field if checkbox is selected', function() {
        click('#find-button', document);
        click('#receive-email-checkbox', document);

        expect(document.getElementById('receive-email-checkbox').checked).toEqual(true);
        expect(document.getElementById('respondent-email').innerHTML).toEqual('');
    });

});
