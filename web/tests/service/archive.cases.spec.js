let Service = require('../../src/service/api-service');
let url = require('url');
let qs = require('querystring');
let LocalServer = require('../support/local.server');

describe('My cases', function() {

    let service;
    let apiServer;

    beforeEach(function(done) {
        service = new Service();
        apiServer = new LocalServer((request, response)=> {  
            if (request.url == '/api/cases/archive' && request.method == 'POST') {                                
                let body = '';
                request.on('data', (data)=> {
                    body += data;
                });
                request.on('end', ()=> {
                    let ids = qs.parse(body).ids;
                    response.write(ids);
                    response.end();
                });              
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

    test('uses a POST rest service to send array of ids to be archived', (done)=> {                        
        service.archiveCases([1, 2, 3], (data)=> {
            expect(data).toEqual('[1,2,3]');
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
                service.archiveCases([1, 2, 3], (data)=> {
                    expect(data.error).toEqual({ code:503, message:'service unavailable' });
                    done();
                });     
            });    
        })
    });
    test('resists server is down', (done)=>{
        apiServer.stop(()=>{
            service.archiveCases([1, 2, 3], (data)=> {
                expect(data.error).toEqual({ code:503, message:'service unavailable' });
                done();
            });    
        })
    });
});