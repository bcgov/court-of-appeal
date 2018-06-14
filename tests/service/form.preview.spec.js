let Service = require('../../src/service/default.service');
let url = require('url');
let qs = require('querystring');
let LocalServer = require('../support/local.server');

describe('Form preview', function() {

    let service;
    let apiServer;
    let received;

    beforeEach(function(done) {
        received = undefined;
        service = new Service();
        apiServer = new LocalServer((request, response)=> {  
            received = request.headers;  
            if (request.url == '/api/forms/42/preview' && request.method == 'GET') {                
                response.statusCode = 200;
                response.write('<html><body>any</body></html>');
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

    test('uses a rest service', (done)=> {                        
        service.previewForm(42, (data)=> {
            expect(data).toEqual('<html><body>any</body></html>');
            done();
        });     
    });
    test('sends user info when initialized', (done)=>{
        service.user = 'any';
        service.previewForm(42, (data)=> {
            expect(received['x-user']).toEqual('any');
            done();
        }); 
    });
    test('does not send user info when undefined', (done)=>{
        service.user = undefined;
        service.previewForm(42, (data)=> {
            expect(received['x-user']).toEqual(undefined);
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
                service.previewForm(42, (data)=> {
                    expect(data.error).toEqual({ code:503, message:'service unavailable' });
                    done();
                });     
            });    
        })
    });
    test('resists server is down', (done)=>{
        apiServer.stop(()=>{
            service.previewForm(42, (data)=> {
                expect(data.error).toEqual({ code:503, message:'service unavailable' });
                done();
            });    
        })
    });
});