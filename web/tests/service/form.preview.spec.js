let Service = require('../../src/service/api-service');
let url = require('url');
let qs = require('querystring');
let LocalServer = require('../support/local.server');

describe('Form preview', function() {

    let service;
    let apiServer;

    beforeEach(function(done) {        
        service = new Service();
        apiServer = new LocalServer((request, response)=> {  
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