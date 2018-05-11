let Service = require('../../src/service/default.service');
let url = require('url');
var qs = require('querystring');

describe('My cases', function() {

    let api = 'http://localhost:5001';
    let server;
    let port = 5001;
    let service;
    let received;

    beforeEach(function(done) {
        received = undefined;
        service = new Service();
        service.apiUrl = api;
        server = require('http').createServer((request, response)=> {          
            received = request.headers;  
            if (request.url == '/api/cases' && request.method == 'GET') {                
                response.statusCode = 200;
                response.write(JSON.stringify({any:'field'}));
                response.end(); 
            }
            else {
                response.statusCode = 200;
                response.write('ko');
                response.end(); 
            }
        }).listen(port, done);            
    });
    afterEach(function(done) {
        if (server.listening) { server.close(done); }
        else { done(); }
    });

    test('uses a rest service', (done)=> {                        
        service.getMyCases({}, (data)=> {
            expect(data).toEqual({any:'field'});
            done();
        });     
    });
    test('sends user info when initialized', (done)=>{
        service.user = 'any';
        service.getMyCases({}, (data)=> {
            expect(received['x-user']).toEqual('any');
            done();
        }); 
    });
    test('does not send user info when undefined', (done)=>{
        service.user = undefined;
        service.getMyCases({}, (data)=> {
            expect(received['x-user']).toEqual(undefined);
            done();
        }); 
    });
});