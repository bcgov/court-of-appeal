let expect = require('chai').expect;
let sinon = require('sinon');
require('chai').use(require('sinon-chai'));
let jsdom = require("jsdom");
let { click, enter } = require('../../tests/utils');
import React from 'react';
import ReactDOM from 'react-dom';
import Form2 from './Form.2.js';
let Service = require('../service/default.service');

describe('Form 2 save', function() {

    let document;
    let sut;    
    let io;
    let received = {};

    beforeEach(function() {
        io = require('socket.io').listen(5001);
        io.on('connection', (socket) => { 
            socket.on('form-2-save', (params, callback) => {
                received = params;
                callback('ok');                              
            });
        });

        document = jsdom.jsdom('<div id="root"></div>');
        sut = ReactDOM.render(<Form2 />, document.getElementById('root'));       
        sut.service.apiUrl = 'http://localhost:5001';
    });

    afterEach(function(done) {
        io.close(done);
    });
    
    it('sends data to server', function(done) {
        enter('777', '#file-no', document);
        sut.setState({ appellant:{ name:'bob'}, respondent:{ name:'toto' } });
        click('#save', document);    
           
        setTimeout(()=> {
            expect(received.data.formSevenNumber).to.equal('777'); 
            expect(received.data.appellant).to.equal('bob');
            expect(received.data.respondent).to.equal('toto'); 
            done();
        }, 300);        
    });

    it('display confirmation message', function(done) {
        enter('777', '#file-no', document);
        sut.setState({ appellant:{ name:'bob'}, respondent:{ name:'toto' } });
        click('#save', document); 

        setTimeout(()=> {
            expect(sut.state.displaySaveSuccess).to.equal(true);
            done();
        }, 300); 
    });

    it('display error message when server times out', function(done) {
        io.close();
        enter('777', '#file-no', document);
        sut.setState({ appellant:{ name:'bob'}, respondent:{ name:'toto' } });
        click('#save', document); 

        setTimeout(()=> {
            expect(sut.state.displaySaveError).to.equal(true);
            done();
        }, 300); 
    });
});
