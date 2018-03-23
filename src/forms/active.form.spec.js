var expect = require('chai').expect;
var sinon = require('sinon');
require('chai').use(require('sinon-chai'));
var jsdom = require("jsdom");
var { click, enter } = require('../../tests/utils');
import React from 'react';
import ReactDOM from 'react-dom';
import ActiveForms from './active.forms.js';
var Service = require('../service/default.service');

describe('Active forms section', function() {

    var document;
    var sut;    
    var io;
    var received = {};

    beforeEach(function() {
        io = require('socket.io').listen(5001);
        io.on('connection', (socket) => { 
            socket.on('my-cases', (params, callback) => {
                received = params;
                callback({
                    cases: [
                        { id:1501, status:'draft', appelant:'Bruce', respondent:'Clark' }
                    ]
                });
            });
        });

        process.env.REACT_APP_API_URL = 'http://localhost:5001';
        document = jsdom.jsdom('<div id="root"></div>');
        sut = <ActiveForms />;
        ReactDOM.render(sut, document.getElementById('root'));        
    });

    afterEach(function() {
        io.close();
    });
    
    it('gets my cases', function(done) {
        setTimeout(()=> {
            expect(received).to.deep.equal({data:{  }});
            done();
        }, 100);        
    });

    it('displays the cases in the table', function(done) {
        setTimeout(()=> {
            var row = document.querySelector("#my-cases");
            expect(row.innerHTML).to.contain(1501);
            expect(row.innerHTML).to.contain('Bruce / Clark');
            expect(row.innerHTML).to.contain('draft');
            done();
        }, 100); 
    })
});
