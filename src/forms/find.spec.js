let expect = require('chai').expect;
let sinon = require('sinon');
require('chai').use(require('sinon-chai'));
let jsdom = require("jsdom");
let { click, enter } = require('../../tests/utils');
import React from 'react';
import ReactDOM from 'react-dom';
import Find from './find.js';

describe('Find', function() {

    let document;
    let sut;
    let serviceWasCalledCorrectly;
    let callback = function(data) { };

    beforeEach(function() {
        document = jsdom.jsdom('<div id="root"></div>');
        serviceWasCalledCorrectly = false;
        sut = <Find service={{ searchForm7:function(file, callback){
                        serviceWasCalledCorrectly = (file == '42');
                        callback({ any:'value' });
                    } }} 
                    callback={function(data) { callback(data); }} />;
        ReactDOM.render(sut, document.getElementById('root'));
    });
    it('renders without crashing', function() {        
        expect(document.getElementById('find-button').innerHTML).to.equal('Find');
    });
    it('triggers fetch on click', function() {
        enter('42', '#file-no', document);
        click('#find-button', document);
        
        expect(serviceWasCalledCorrectly).to.equal(true);
    });
    it('calls back when found', function(done) {
        callback = function(data) {
            expect(data).to.deep.equal({ any:'value' });
            done();
        };
        click('#find-button', document);
    });
    it('can work with default service', function(done) {
        document = jsdom.jsdom('<div id="root"></div>');
        let component = <Find callback={function(data) { 
            expect(data).to.deep.equal(require('../service/default.service').fakeData);
            done(); 
        }} />;
        sut = ReactDOM.render(component, document.getElementById('root'));        
        sut.service.setServeLocalData(true);
        click('#find-button', document);
    });
});
