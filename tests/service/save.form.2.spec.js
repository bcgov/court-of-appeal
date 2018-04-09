let Service = require('../../src/service/default.service');
let url = require('url');
var qs = require('querystring');

describe('Save form 2', function() {

    let api = 'http://localhost:5001';
    let server;
    let port = 5001;
    let service;

    beforeEach(function(done) {
        service = new Service();
        service.apiUrl = api;
        server = require('http').createServer((request, response)=> {            
            response.setHeader('Access-Control-Allow-Origin', '*');
            if (request.url == '/api/forms' && request.method == 'POST') {                
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

    test('sends data via post inside a data field', function(done) {                        
        service.saveForm2({ any:'field' }, function(data) {
            expect(data).toEqual('{"any":"field"}');
            done();
        });     
    });
});