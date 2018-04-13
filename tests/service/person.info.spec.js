let Service = require('../../src/service/default.service');
let url = require('url');
var qs = require('querystring');

describe('Person info', function() {

    let api = 'http://localhost:5001';
    let server;
    let port = 5001;
    let service;
    let received;

    beforeEach(function(done) {
        received = undefined;
        service = new Service();
        service.apiUrl = api;
        server = require('http').createServer((request, response)=> {          
            response.setHeader('Access-Control-Allow-Origin', '*');
            if (request.url == '/api/persons/max' && request.method == 'GET') {                
                response.statusCode = 200;
                response.write(JSON.stringify({ login:'max' }));
                response.end(); 
            }
            else {
                response.statusCode = 200;
                response.write('ko');
                response.end(); 
            }
        }).listen(port, done);            
    });
    afterEach(function() {
        server.close();
    });

    test('uses a rest service', (done)=> {   
        service.user = 'max';                     
        service.getPersonInfo((data)=> {
            expect(data).toEqual({ login:'max' });
            done();
        });     
    });
});