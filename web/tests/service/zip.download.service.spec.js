let Service = require('../../src/service/api-service');
let url = require('url');
let qs = require('querystring');
let LocalServer = require('../support/local.server');

describe('ZIP download service', function() {

    let service;
    let apiServer;

    beforeEach(function(done) {
        service = new Service();
        apiServer = new LocalServer((request, response)=> {  
            if (request.url == '/api/zip?id=1&id=2' && request.method == 'GET') {                
                response.write('ok');
                response.end();                
            }
            else {
                response.write('ko');
                response.end();
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

    test('sends data via get as query string', function(done) {
        service.download([1, 2], function(data) {
            expect(data.toString()).toEqual('ok');
            done();
        });     
    });
    test('resists server down', (done)=>{
        apiServer.stop(()=>{
            service.download([1, 2], function(data) {
                expect(data.error).toEqual({ code:503, message:'service unavailable' });
                done();
            });     
        });
    });
    test('resists 500', (done)=>{
        apiServer.stop(()=>{
            apiServer = new LocalServer((request, response)=> {
                response.writeHeader(500, {'content-type':'application/json'})
                response.write(JSON.stringify({message:'crashed'}));
                response.end();
            });
            apiServer.start(()=>{
                service.apiUrl = 'http://localhost:' + apiServer.port;
                service.download([1, 2], function(data) {
                    expect(data.error).toEqual({ code:503, message:'service unavailable' });
                    done();
                });     
            });    
        });
    });
    test('resists 503', (done)=>{
        apiServer.stop(()=>{
            apiServer = new LocalServer((request, response)=> {
                response.writeHeader(503, {'content-type':'application/json'})
                response.write(JSON.stringify({message:'service unavailable'}));
                response.end();
            });
            apiServer.start(()=>{
                service.apiUrl = 'http://localhost:' + apiServer.port;
                service.download([1, 2], function(data) {
                    expect(data.error).toEqual({ code:503, message:'service unavailable' });
                    done();
                });     
            });    
        });
    });
    test('resists 404', (done)=>{
        apiServer.stop(()=>{
            apiServer = new LocalServer((request, response)=> {
                response.writeHeader(404, {'content-type':'application/json'})
                response.write(JSON.stringify({message:'not found'}));
                response.end();
            });
            apiServer.start(()=>{
                service.apiUrl = 'http://localhost:' + apiServer.port;
                service.download([1, 2], function(data) {
                    expect(data.error).toEqual({ code:503, message:'service unavailable' });
                    done();
                });     
            });    
        });
    });
});