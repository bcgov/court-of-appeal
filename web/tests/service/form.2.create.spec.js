let Service = require('../../src/service/api-service');
let url = require('url');
let qs = require('querystring');
let LocalServer = require('../support/local.server');

describe('Create form 2', function() {

    let service;
    let apiServer;
    let sentData;

    beforeEach(function(done) {
        service = new Service();
        apiServer = new LocalServer((request, response)=> {  
            if (request.url == '/api/forms' && request.method == 'POST') {                
                let body = '';
                request.on('data', (data)=> {
                    body += data;
                });
                request.on('end', ()=> {
                    response.setHeader('Content-Type', 'application/json');
                    response.statusCode = 201;
                    sentData = qs.parse(body).data;
                    response.write(JSON.stringify({id:42}));
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
        service.createForm2({ any:'field' }, function() {
            expect(sentData).toEqual('{"any":"field"}');
            done();
        });     
    });
    test('parses the received id', function(done) {                        
        service.createForm2({ any:'field' }, function(id) {
            expect(id).toEqual(42);
            done();
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
                service.createForm2({ any:'field' }, function(data) {
                    expect(data.error).toEqual({ code:503, message:'service unavailable' });
                    done();
                });     
            });    
        });
    });
    test('resists server down', (done)=>{
        apiServer.stop(()=>{
            service.createForm2({ any:'field' }, function(data) {
                expect(data.error).toEqual({ code:503, message:'service unavailable' });
                done();
            });     
        });
    });
});