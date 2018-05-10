let Service = require('../../src/service/default.service');
let url = require('url');
var qs = require('querystring');

describe('Search form 7', function() {

    let api = 'http://localhost:5001';
    let server;
    let port = 5001;
    let service;
    let data = {any:'field'};
    let statusCode = 200

    beforeEach(function(done) {
        service = new Service();
        service.apiUrl = api;
        server = require('http').createServer((request, response)=> {            
            if (request.url == '/api/forms?file=42' && request.method == 'GET') {                
                response.statusCode = statusCode;
                response.write(JSON.stringify(data));
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

    test('uses a rest service', function(done) {                        
        service.searchForm7(42, function(data) {            
            expect(data).toEqual({any:'field'});
            done();
        });     
    });

    test('resists 404', function(done) {  
        statusCode = 404;
        data = {message:'not-found'};
        service.searchForm7(42, function(data) {            
            expect(data).toEqual(undefined);
            done();
        });     
    });
});