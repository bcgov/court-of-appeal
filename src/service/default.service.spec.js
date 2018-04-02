let expect = require('chai').expect;
let Service = require('./default.service');
let url = require('url');

describe('Default service', function() {

    let api = 'http://localhost:5001';
    let serverSocket;

    beforeEach(function() {
        serverSocket = require('socket.io').listen(5001);
        serverSocket.on('connection', function(socket) {
            socket.on('form-7-search', function(data, callback) {
                callback({ message:'data for file ' + data.file });
            });
        });        
    });
    afterEach(function(done) {
        serverSocket.close(done);
    });

    it('uses environment variable', function() {
        process.env.REACT_APP_API_URL = api;
        let service = new Service();

        expect(service.apiUrl).to.equal(api);
    });

    it('leverage socket.io-client', function(done) {        
        let socket = require('socket.io-client')(api);
        socket.emit('form-7-search', { file:42 }, function(data) {
            expect(data).to.deep.equal({ message:'data for file 42' });
            done();
        });
    });

    it('requests form-7 data', function(done) {
        process.env.REACT_APP_API_URL = api;
        let service = new Service();
        service.searchForm7('any', function(data) {
            expect(data).to.deep.equal({ message:'data for file any' });
            done();
        });
    });

    it('resists server down', function(done) {
        serverSocket.close();
        process.env.REACT_APP_API_URL = api;
        let service = new Service();
        service.searchForm7('any', function(data) {
            expect(data).to.deep.equal(undefined);
            done();
        });
    });

    it('can be set to serve local data', function(done) {
        process.env.REACT_APP_API_URL = api;
        let service = new Service();
        service.serveLocalData();
        service.searchForm7('any', function(data) {
            expect(data).to.deep.equal(Service.fakeData);
            done();
        });
    });
});