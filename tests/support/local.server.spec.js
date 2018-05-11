var LocalServer = require('../support/local.server');
var get = require('request');
var http = require('http');

describe('Local Server', ()=> {

    var server;
    afterEach((done)=>{
        if (server) {server.stop(done);}
    });
    test('starts on port 5001', (done)=> {
        server = new LocalServer((request, response)=>{
            response.write('Hello');
            response.end();
        });
        server.start(()=>{
            expect(server.port).toEqual(5001);
            get('http://localhost:5001', (err, response, body)=>{
                expect(err).toEqual(null);
                expect(body).toEqual('Hello');
                done();
            })    
        });
    });
    var existing;
    test('unless 5001 is not free', (done)=>{
        existing = http.createServer((request, response)=>{
            response.write('Hi');
            response.end();
        }).listen(5001, ()=>{
            var server = new LocalServer((request, response)=>{
                response.write('Hello');
                response.end();
            });
            server.start(()=>{
                expect(server.port).toEqual(5002);
                get('http://localhost:5002', (err, response, body)=>{
                    expect(err).toEqual(null);
                    expect(body).toEqual('Hello');
                    done();
                });
            });
        });
    })
});