var expect = require('chai').expect;
var sinon = require('sinon');
require('chai').use(require('sinon-chai'));
var jsdom = require("jsdom");
var { click, enter } = require('../../tests/utils');
import React from 'react';
import ReactDOM from 'react-dom';
import Find from './find.js';

describe('Find', function() {

    var document;
    var sut;
    var serviceWasCalledCorrectly;
    var callback = function(data) { };

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
        process.env.REACT_APP_API_URL = undefined;          
        sut = <Find callback={function(data) { 
            expect(data).to.deep.equal(require('../service/default.service').fakeData);
            done(); 
        }} />;
        ReactDOM.render(sut, document.getElementById('root'));        
        click('#find-button', document);
    });
});
