let jsdom = require("jsdom");
import React from 'react';
import ReactDOM from 'react-dom';
import ActiveFormList from '../../src/components/ActiveFormList';
let Service = require('../../src/service/default.service');

describe('Active forms section', function() {

    let api = 'http://localhost:5001';
    let server;
    let port = 5001;

    let document;
    let sut;        
    let received = undefined;
    let cases = [
        { id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellant:{name:'Bruce'}, respondent:{name:'Clark'}} }
    ];

    beforeEach(function(done) {
        server = require('http').createServer((request, response)=> {     
            if (request.url == '/api/cases' && request.method == 'GET') {                
                response.write( JSON.stringify({ cases:cases })); 
                response.end();
            }
            else {
                response.statusCode = 200;
                response.write('ko');
                response.end(); 
            }
        }).listen(port, done);

        document = jsdom.jsdom('<div id="react_app"></div>');
        let component = <ActiveFormList fetch="false" />;
        sut = ReactDOM.render(component, document.getElementById('react_app'));
        sut.service.apiUrl = 'http://localhost:5001';
        sut.fetchCases();
    });

    afterEach(function() {
        server.close();
    });
    
    test('transforms the data for the list', function(done) {
        setTimeout(()=> {            
            expect(sut.state.cases).toEqual([
                { 
                    id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', parties:'Bruce / Clark' ,
                    data:{appellant:{name:'Bruce'}, respondent:{name:'Clark'}}
                }
            ]);
            done();
        }, 100);        
    });

    test('injects the data in the list', function(done) {        
        setTimeout(()=> {
            let item = document.querySelector("#my-cases .case-item:first-child");
            
            expect(item.innerHTML).toContain(1501);
            expect(item.innerHTML).toContain('Bruce / Clark'); 
            expect(item.innerHTML).toContain('draft');
            expect(item.innerHTML).toContain('2018-03-27T16:15:54Z');
            done();
        }, 100); 
    });

    test('hides the empty-list message', function(done) {
        setTimeout(()=> {
            expect(sut.state.displayMyCasesEmptyLabel).toEqual(false);
            expect(document.getElementById('my-cases-empty-label').style.display).toEqual('none');
            done();
        }, 100);  
    });

    test('shows the empty-list message when cases list is empty', function(done) {
        cases = [];

        setTimeout(()=> {
            expect(sut.state.displayMyCasesEmptyLabel).toEqual(true);
            expect(document.getElementById('my-cases-empty-label').style.display).toEqual('block');
            done();
        }, 100);  
    });


});