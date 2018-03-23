var fakeData = { 
    parties: {
        appelant: {
            name: 'Bruce Wayne',
            address: 'The Wayne Castle'
        },
        respondent: {
            name: 'Clark Kent',
            address: 'This guy does not need any'
        }
    }
};

var Service = function() {
    this.apiUrl = process.env.REACT_APP_API_URL;       
};

Service.prototype.serveLocalData = function() {
    this.apiUrl = undefined;
};

Service.prototype.searchForm7 = function(file, callback) {
    if (!this.apiUrl || this.apiUrl === 'undefined' || this.apiUrl === 'null') {
        callback(fakeData);
    } else {
        var socket = require('socket.io-client')(this.apiUrl);
        socket.on('connect_error', function(error) {
            callback(undefined);
        });
        socket.emit('form-7-search', { file:file }, function(data) {
            callback(data);
        });
    }
};

Service.prototype.saveForm2 = function(form, callback) {    
    var socket = require('socket.io-client')(this.apiUrl);
    socket.on('connect_error', function(error) {
        callback(undefined);
    });
    socket.emit('form-2-save', { data:form }, function(data) {
        callback(data);
    });
};

Service.prototype.getMyCases = function(form, callback) {    
    var socket = require('socket.io-client')(this.apiUrl);
    socket.on('connect_error', function(error) {
        callback(undefined);
    });
    socket.emit('my-cases', { data:{} }, function(data) {
        callback(data);
    });
};

module.exports = Service;
module.exports.fakeData = fakeData;