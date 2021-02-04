test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
});


let sum = function(a, b, callback) {
    callback({
        right:b,
        left:a,
        result: a+b
    });
};
test('async code', (done)=> {
    sum(1, 2, (result)=> {
        expect(result).toEqual({
            left:1,
            right:2,
            result:3
        });
        done();
    });
});

const http = require('http');
let server;
beforeEach((done)=>{
    server = http.createServer(function(request, response) {
        response.write('ok');
        response.end();
    }).listen(5000, done);
});
afterEach((done)=>{
    server.close(done);
});
test('http get', (done)=>{
    let get = require('request');
    get('http://localhost:5000/any', (err, response, body)=> {
        expect(body).toEqual('ok');
        done();
    });
});