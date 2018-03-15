var expect = require('chai').expect;
var Service = require('./default.service');
var url = require('url');

describe('Default service', function() {

    var api = 'http://localhost:5001';
    var http;
    beforeEach(function(done) {
        http = require('http').createServer(function(request, response) {
            response.setHeader('Content-Type', 'application/json');
            var parsed = url.parse(request.url, true);
            if (parsed.pathname == '/form-7') {
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.write(JSON.stringify({ value:42 }));
                response.end();
            } else {
                response.statusCode = 404;
                response.end();
            }
        }).listen(5001, done);
    });
    afterEach(function(done) {
        http.close(done);
    });

    it('uses environment variable', function() {
        process.env.REACT_APP_API_URL = api;
        var service = new Service();

        expect(service.apiUrl).to.equal('http://localhost:5001');
    });

    it('delegates to external service', function(done) {        
        process.env.REACT_APP_API_URL = api;
        var service = new Service();
        service.searchForm7('any', function(data) {
            expect(data).to.deep.equal({ value:42 });
            done();
        });
    });

    it('resists external service down', function(done) {
        http.close(function() {
            process.env.REACT_APP_API_URL = api;
            var service = new Service();
            service.searchForm7('any', function(data) {
                expect(data).to.deep.equal(undefined);
                done();
            });
        });        
    });

    it('defaults to local data', function(done) {        
        process.env.REACT_APP_API_URL = undefined;
        var service = new Service();
        expect(service.apiUrl).to.equal('undefined');
        service.searchForm7('any', function(data) {
            expect(data).to.deep.equal(Service.fakeData);
            done();
        });
    });

    it('can be set to serve local data', function(done) {
        process.env.REACT_APP_API_URL = api;
        var service = new Service();
        service.serveLocalData();
        service.searchForm7('any', function(data) {
            expect(data).to.deep.equal(Service.fakeData);
            done();
        });
    });
});