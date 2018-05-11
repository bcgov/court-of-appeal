let Service = require('../../src/service/default.service');
let url = require('url');
let qs = require('querystring');
let LocalServer = require('../support/local.server');

describe('Create form 2', function() {

    let service;
    let apiServer;

    beforeEach(function(done) {
        service = new Service();
        apiServer = new LocalServer((request, response)=> {  
            if (request.url == '/api/forms/42' && request.method == 'PUT') {                
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

    test('sends data via put inside a data field', function(done) {                        
        service.updateForm2({ any:'field' }, 42, function(data) {
            expect(data).toEqual('{"any":"field"}');
            done();
        });     
    });
});