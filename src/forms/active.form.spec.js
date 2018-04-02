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
    var received = undefined;
    var cases = [
        { id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appelant:'Bruce', respondent:'Clark'} }
    ];

    beforeEach(function() {
        io = require('socket.io').listen(5001);
        io.on('connection', (socket) => { 
            socket.on('my-cases', (params, callback) => {
                received = params;
                callback({
                    cases: cases
                });
            });
        });

        process.env.REACT_APP_API_URL = 'http://localhost:5001';
        document = jsdom.jsdom('<div id="root"></div>');
        sut = ReactDOM.render(<ActiveForms />, document.getElementById('root'));        
    });

    afterEach(function() {
        io.close();
    });
    
    it('gets my cases without parameters', function(done) {
        setTimeout(()=> {
            expect(received).to.deep.equal({data:{  }});
            done();
        }, 100);        
    });
    
    it('transforms the data for the list', function(done) {
        setTimeout(()=> {
            expect(sut.state.cases).to.deep.equal([
                { id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', parties:'Bruce / Clark' }
            ]);
            done();
        }, 100);        
    });

    it('injects the data in the list', function(done) {        
        setTimeout(()=> {
            var item = document.querySelector("#my-cases .case-item:first-child");
            
            expect(item.innerHTML).to.contain(1501);
            expect(item.innerHTML).to.contain('Bruce / Clark'); 
            expect(item.innerHTML).to.contain('draft');
            expect(item.innerHTML).to.contain('2018-03-27T16:15:54Z');
            done();
        }, 100); 
    });

    it('hides the empty-list message', function(done) {
        setTimeout(()=> {
            expect(sut.state.displayMyCasesEmptyLabel).to.equal(false);
            expect(document.getElementById('my-cases-empty-label').style.display).to.equal('none');
            done();
        }, 100);  
    });

    it('shows the empty-list message when cases list is empty', function(done) {
        cases = [];

        setTimeout(()=> {
            expect(sut.state.displayMyCasesEmptyLabel).to.equal(true);
            expect(document.getElementById('my-cases-empty-label').style.display).to.equal('block');
            done();
        }, 100);  
    });
});