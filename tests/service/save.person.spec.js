let Service = require('../../src/service/default.service');
let url = require('url');
var qs = require('querystring');

describe('Save person', function() {

    let api = 'http://localhost:5001';
    let server;
    let port = 5001;
    let service;

    beforeEach(function(done) {
        service = new Service();
        service.apiUrl = api;
        server = require('http').createServer((request, response)=> {            
            if (request.url == '/api/persons' && request.method == 'POST') {                
                let body = '';
                request.on('data', (data)=> {
                    body += data;
                });
                request.on('end', ()=> {
                    response.setHeader('Content-Type', 'application/json');
                    response.statusCode = 201;
                    var data = qs.parse(body).data;
                    response.write(data);
                    response.end();
                }); 
            }
        }).listen(port, done);            
    });
    afterEach(function(done) {
        if (server.listening) { server.close(done); }
        else { done(); }
    });

    test('sends data via post inside a data field', function(done) {                        
        service.savePerson('bob', function(data) {
            expect(data).toEqual('bob');
            done();
        });     
    });

    test('resists server is down', function(done) {   
        server.close(function() {
            service.savePerson('bob', function(data) {
                expect(data).toEqual(undefined);
                done();
            });     
        });                     
    });
});