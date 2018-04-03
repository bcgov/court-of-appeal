var expect = require('chai').expect;
var sinon = require('sinon');
require('chai').use(require('sinon-chai'));
var jsdom = require("jsdom");
var { click, enter } = require('../../tests/utils');
import React from 'react';
import ReactDOM from 'react-dom';
import Form2 from './Form.2.js';
var Service = require('../service/default.service');

describe('Search Form 7 in form 2', function() {

    var document;
    var sut;

    beforeEach(function() {
        process.env.REACT_APP_API_URL = null;
        document = jsdom.jsdom('<div id="root"></div>');
        sut = ReactDOM.render(<Form2 />, document.getElementById('root'));
    });

    it('sets appelant', function() {
        click('#find-button', document);

        expect(document.getElementById('appelant-name').innerHTML).
            to.equal(Service.fakeData.parties.appelant.name);
    });

    it('sets respondent', function() {
        click('#find-button', document);

        expect(document.getElementById('respondent-name').innerHTML).
            to.equal(Service.fakeData.parties.respondent.name);
    });

    it('resists no data', function(done) {
        process.env.REACT_APP_API_URL = 'http://not-a-running-server';
        document = jsdom.jsdom('<div id="root"></div>');
        sut = ReactDOM.render(<Form2 />, document.getElementById('root'));
        click('#find-button', document);

        setTimeout(function() {
            expect(document.getElementById('appelant-name').innerHTML).to.equal('');
            expect(document.getElementById('respondent-name').innerHTML).to.equal('');
            done();
        }, 100);
    });

    it('disables correspondence-email field if checkbox is not selected', function() {
        click('#find-button', document);

        expect(document.getElementById('receive-email-checkbox').checked).to.equal(false);
        expect(document.getElementById('respondent-email')).to.equal(null);
    });

    it('enables correspondence-email field if checkbox is selected', function() {
        click('#find-button', document);
        click('#receive-email-checkbox', document);
        expect(document.getElementById('receive-email-checkbox').checked).to.equal(true);
        expect(document.getElementById('respondent-email').innerHTML).to.equal('');
    });

});
