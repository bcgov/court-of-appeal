let Service = require('../../src/service/default.service');
let url = require('url');
var qs = require('querystring');
var LocalServer = require('../support/local.server');

describe('Search form 7', function() {

    let service;
    let apiServer;
    let data = {any:'field'};
    let statusCode = 200

    beforeEach(function(done) {
        service = new Service();
        apiServer = new LocalServer((request, response)=> {  
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
        });
        apiServer.start(()=>{
            service.apiUrl = 'http://localhost:' + apiServer.port;
            done();
        }); 
    });
    afterEach(function(done) {
        apiServer.stop(done);
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