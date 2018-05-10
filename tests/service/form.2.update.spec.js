let Service = require('../../src/service/default.service');
let url = require('url');
var qs = require('querystring');

describe('Create form 2', function() {

    let api = 'http://localhost:5001';
    let server;
    let port = 5001;
    let service;

    beforeEach(function(done) {
        service = new Service();
        service.apiUrl = api;
        server = require('http').createServer((request, response)=> {            
            if (request.url == '/api/forms/42' && request.method == 'PUT') {                
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
    afterEach(function() {
        server.close();
    });

    test('sends data via put inside a data field', function(done) {                        
        service.updateForm2({ any:'field' }, 42, function(data) {
            expect(data).toEqual('{"any":"field"}');
            done();
        });     
    });
});