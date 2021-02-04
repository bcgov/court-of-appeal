let Service = require('../../src/service/default.service');
let qs = require('querystring');
let LocalServer = require('../support/local.server');

describe('Read journey', function() {

    let service;
    let apiServer;
    let sentData;

    beforeEach(function(done) {
        service = new Service();
        apiServer = new LocalServer((request, response)=> {
            if (request.url === '/api/journey' && request.method === 'GET') {
                let body = '';
                request.on('data', (data)=> {
                    body += data;
                });
                request.on('end', ()=> {
                    response.setHeader('Content-Type', 'application/json');
                    response.statusCode = 200;
                    response.write(JSON.stringify({ journey:{ id:42, userid:15 } }));
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

    test('parses the received journey', function(done) {
        service.getMyJourney({}, function(data) {
            expect(data.journey).toEqual({ id:42, userid:15 });
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
                service.getMyJourney({}, function(data) {
                    expect(data.error).toEqual({ code:503, message:'service unavailable' });
                    done();
                });
            });
        });
    });
    test('resists server down', (done)=>{
        apiServer.stop(()=>{
            service.getMyJourney({}, function(data) {
                expect(data.error).toEqual({ code:503, message:'service unavailable' });
                done();
            });
        });
    });
    test('resists 404', (done)=>{
        apiServer.stop(()=>{
            apiServer = new LocalServer((request, response)=> {
                response.writeHeader(404, {'content-type':'application/json'})
                response.write(JSON.stringify({}));
                response.end();
            });
            apiServer.start(()=>{
                service.apiUrl = 'http://localhost:' + apiServer.port;
                service.getMyJourney({}, function(data) {
                    expect(data.error).toEqual({ code:404, message:'not found' });
                    done();
                });
            });
        });
    });
});
