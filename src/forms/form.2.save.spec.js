var expect = require('chai').expect;
var sinon = require('sinon');
require('chai').use(require('sinon-chai'));
var jsdom = require("jsdom");
var { click, enter } = require('../../tests/utils');
import React from 'react';
import ReactDOM from 'react-dom';
import Form2 from './Form.2.js';
var Service = require('../service/default.service');

describe('Form 2 save', function() {

    var document;
    var sut;    
    var io;
    var received = {};

    beforeEach(function() {
        io = require('socket.io').listen(5001);
        io.on('connection', (socket) => { 
            socket.on('form-2-save', (params, callback) => {
                received = params;
                callback('ok');                
            });
        });

        process.env.REACT_APP_API_URL = 'http://localhost:5001';
        document = jsdom.jsdom('<div id="root"></div>');
        sut = ReactDOM.render(<Form2 />, document.getElementById('root'));       
    });

    afterEach(function() {
        io.close();
    });
    
    it('sends data to server', function(done) {
        enter('777', '#file-no', document);
        sut.setState({ appelant:{ name:'bob'}, respondent:{ name:'toto' } });
        click('#save', document);    
           
        setTimeout(()=> {
            expect(received.data.formSevenNumber).to.equal('777'); 
            expect(received.data.appelant).to.equal('bob'); 
            expect(received.data.respondent).to.equal('toto'); 
            done();
        }, 300);        
    });
});
