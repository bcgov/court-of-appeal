var request = require('request');
var fakeData = require('./fake.data');

var Service = function() {
    this.apiUrl = process.env.REACT_APP_API_URL;
};

Service.prototype.serveLocalData = function() {
    this.apiUrl = undefined;
    process.env.REACT_APP_API_URL = undefined;
};

Service.prototype.searchForm7 = function(file, callback) {
    if (this.apiUrl === undefined || this.apiUrl === 'undefined') {
        callback(fakeData);
    } else {
        request(this.apiUrl + '/form-7', function(err, response, body) {
            if (err) {                
                callback(undefined);
            } else {
                callback(JSON.parse(body));
            }
        });
    }
};

module.exports = Service;
module.exports.fakeData = fakeData;