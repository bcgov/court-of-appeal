let LocalServer = require('../support/local.server');
let get = require('request');
let http = require('http');

describe('Local Server', ()=> {

    let server;
    afterEach((done)=>{
        if (server) {server.stop(done);}
    });
    test('exposes the chosen port', (done)=> {
        server = new LocalServer((request, response)=>{
            response.write('Hello');
            response.end();
        });
        server.start(()=>{            
            get('http://localhost:'+server.port, (err, response, body)=>{
                expect(err).toEqual(null);
                expect(body).toEqual('Hello');
                done();
            })    
        });
    });    
});