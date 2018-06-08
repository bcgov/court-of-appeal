let Service = require('../../src/service/default.service');
let url = require('url');
let qs = require('querystring');
let LocalServer = require('../support/local.server');

describe('Person info', function() {

    let service;
    let apiServer;
    let received;
    let answer = {
        code:200,
        body:JSON.stringify({ login:'max' })
    };

    beforeEach(function(done) {
        received = undefined;
        service = new Service();
        apiServer = new LocalServer((request, response)=> {  
            if (request.url == '/api/persons/max' && request.method == 'GET') {                
                response.statusCode = answer.code;
                response.write(answer.body);
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
        service.user = 'max';                     
        service.getPersonInfo((data)=> {
            expect(data).toEqual({ login:'max' });
            done();
        });     
    });

    test('resists unknown login', (done)=> {
        answer = {
            code:404,
            body:'not found'
        };
        service.user = 'max';                     
        service.getPersonInfo((data)=> {
            expect(data.error).toEqual({ code:404, message:'not found' });
            done();
        });
    });

    test('resists server is down', (done)=> {
        apiServer.stop(function() {
            service.user = 'max';                     
            service.getPersonInfo((data)=> {
                expect(data.error).toEqual({ code:503, message:'service unavailable' });
                done();
            });    
        });
    });

    test('resists 503', (done)=>{
        apiServer.stop(()=>{
            apiServer = new LocalServer((request, response)=> {
                response.writeHeader(503, {'content-type':'application/json'})
                response.end();
            });
            apiServer.start(()=>{
                service.apiUrl = 'http://localhost:' + apiServer.port;
                service.user = 'max';                     
                service.getPersonInfo((data)=> {
                    expect(data.error).toEqual({ code:503, message:'service unavailable' });
                    done();
                });     
            });    
        })
    });
});