let Service = require('../../src/service/default.service');
let url = require('url');
let qs = require('querystring');

describe('Gateway to API', function() {

    let service;
    let env;

    beforeEach(()=> {
        env = process.env.NODE_ENV;
        service = new Service();
    });
    afterEach(()=>{
        process.env.NODE_ENV = env;
    });

    describe('apiUrl', function() {

        test('defaults to undefined', ()=>{
            expect(service.apiUrl).toEqual(undefined); 
            expect(service.base()).toEqual(''); 
        });

        test('takes the origin', function() {
            service = new Service({ location: { origin:'here' }});

            expect(service.apiUrl).toEqual('here');
            expect(service.base()).toEqual('here');
        });

        test('unless process.env.REACT_APP_API_URL is set', function() {
            process.env.NODE_ENV='development';
            process.env.REACT_APP_API_URL = 'api'
            service = new Service({ location: { origin:'here' }});

            expect(service.apiUrl).toEqual('api');
            expect(service.base()).toEqual('api');
        });

        test('or NODE_ENV is not deve', function() {
            process.env.NODE_ENV='any';
            process.env.REACT_APP_API_URL = 'api'
            service = new Service({ location: { origin:'here' }});

            expect(service.apiUrl).toEqual('here');
            expect(service.base()).toEqual('here');
        });
    });
});