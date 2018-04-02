let expect = require('chai').expect;
let sinon = require('sinon');
require('chai').use(require('sinon-chai'));
let jsdom = require("jsdom");
let { click, enter } = require('../../tests/utils');
import React from 'react';
import ReactDOM from 'react-dom';
import Form2 from './Form.2.js';
let Service = require('../service/default.service');

describe('Search Form 7 in form 2', function() {

    let document;
    let sut;

    beforeEach(function() {
        process.env.REACT_APP_API_URL = null;
        document = jsdom.jsdom('<div id="root"></div>');
        sut = <Form2 />;
        ReactDOM.render(sut, document.getElementById('root'));
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
        sut = <Form2 />;
        ReactDOM.render(sut, document.getElementById('root'));
        click('#find-button', document);    
           
        setTimeout(function() {
            expect(document.getElementById('appelant-name').innerHTML).to.equal('');
            expect(document.getElementById('respondent-name').innerHTML).to.equal('');
            done();
        }, 100);
    });
});
