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
            });
        });

        process.env.REACT_APP_API_URL = 'http://localhost:5001';
        document = jsdom.jsdom('<div id="root"></div>');
        sut = <Form2 />;
        ReactDOM.render(sut, document.getElementById('root'));        
    });

    afterEach(function() {
        io.close();
    });
    
    it('sends data to server', function(done) {
        click('#save', document);    
           
        setTimeout(()=> {
            expect(received).to.deep.equal({data:{ formSevenNumber:42, appelant:'Bruce', respondent:'Clark' }});
            done();
        }, 100);        
    });
});
