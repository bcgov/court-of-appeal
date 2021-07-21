let Service = require('../../src/service/api-service');
let url = require('url');
let qs = require('querystring');
let LocalServer = require('../support/local.server');

describe('Pdf generation service', function() {

    let service;
    let apiServer;

    beforeEach(function(done) {
        service = new Service();
        apiServer = new LocalServer((request, response)=> {  
            if (request.url == '/api/pdf' && request.method == 'POST') {                
                let body = '';
                request.on('data', (data)=> {
                    body += data;
                });
                request.on('end', ()=> {
                    response.setHeader('Content-Type', 'application/pdf');
                    response.statusCode = 200;
                    let html = qs.parse(body).html;
                    response.write(html);
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

    test('sends data via post inside a html field and returns binary', function(done) {
        service.generatePdf('any-html', function(data) {
            expect(data.toString()).toEqual('any-html');
            done();
        });     
    });
    test('resists 500', (done)=>{
        apiServer.stop(()=>{
            apiServer = new LocalServer((request, response)=> {
                response.writeHeader(500, {'content-type':'application/pdf'})
                response.write(JSON.stringify({message:'crashed'}));
                response.end();
            });
            apiServer.start(()=>{
                service.apiUrl = 'http://localhost:' + apiServer.port;
                service.generatePdf('any-html', function(data) {
                    expect(data.error).toEqual({ code:503, message:'service unavailable' });
                    done();
                });     
            });    
        });
    });
    test('resists server down', (done)=>{
        apiServer.stop(()=>{
            service.generatePdf('any-html', function(data) {
                expect(data.error).toEqual({ code:503, message:'service unavailable' });
                done();
            });     
        });
    });
});