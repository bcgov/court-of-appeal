let expect = require('chai').expect;
let sinon = require('sinon');
require('chai').use(require('sinon-chai'));
let jsdom = require("jsdom");
let { click, enter } = require('../../tests/utils');
import React from 'react';
import ReactDOM from 'react-dom';
import ActiveForms from './active.forms.js';
let Service = require('../service/default.service');

describe('Active forms section', function() {

    let document;
    let sut;    
    let io;
    let received = undefined;
    let cases = [
        { id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellant:'Bruce', respondent:{name:'Clark'}} }
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

        document = jsdom.jsdom('<div id="root"></div>');
        let component = <ActiveForms fetch="false" />;
        sut = ReactDOM.render(component, document.getElementById('root'));        
        sut.service.apiUrl = 'http://localhost:5001';
        sut.fetchCases();
    });

    afterEach(function(done) {
        io.close(done);
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
            let item = document.querySelector("#my-cases .case-item:first-child");
            
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