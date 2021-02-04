let Service = require('../../src/service/default.service');
let url = require('url');
let qs = require('querystring');
let LocalServer = require('../support/local.server');

describe('Save person', function() {

    let service;
    let apiServer;

    beforeEach(function(done) {
        service = new Service();
        apiServer = new LocalServer((request, response)=> {  
            if (request.url == '/api/persons' && request.method == 'POST') {                
                let body = '';
                request.on('data', (data)=> {
                    body += data;
                });
                request.on('end', ()=> {
                    response.setHeader('Content-Type', 'application/json');
                    response.statusCode = 201;
                    let data = qs.parse(body).data;
                    response.write(data);
                    response.end();
                }); 
            }
        });
        apiServer.start(()=>{
            service.apiUrl = 'http://localhost:' + apiServer.port;
            done();
        });        
    });
    afterEach(function(done) {
        apiServer.stop(done);
    });

    test('sends data via post inside a data field', function(done) {                        
        service.savePerson('bob', function(data) {
            expect(data).toEqual('bob');
            done();
        });     
    });

    test('resists server is down', function(done) {   
        apiServer.stop(function() {
            service.savePerson('bob', function(data) {
                expect(data.error).toEqual({ code:503, message:'service unavailable' });
                done();
            });     
        });                     
    });

    test('resists 503', (done)=>{
        apiServer.stop(()=>{
            apiServer = new LocalServer((request, response)=> {
                response.writeHeader(503, {'content-type':'application/json'})
                response.write(JSON.stringify({message:'not working sorry'}));
                response.end();
            });
            apiServer.start(()=>{
                service.apiUrl = 'http://localhost:' + apiServer.port;
                service.savePerson('bob', function(data) {
                    expect(data.error).toEqual({ code:503, message:'service unavailable' });
                    done();
                });     
            });    
        });
    });
});