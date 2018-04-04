let fakeData = { 
    parties: {
        appellant: {
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
    this.apiUrl = undefined;
    this.serveLocalData = false;  
};

Service.prototype.setServeLocalData = function(flag) {    
    this.serveLocalData = flag;
};

Service.prototype.connect = function() {    
    return require('socket.io-client')(this.apiUrl);
};

Service.prototype.searchForm7 = function(file, callback) {
    if (this.serveLocalData) {
        callback(fakeData);
    } else {
        let socket = this.connect();
        socket.on('connect_error', function(error) {
            callback(undefined);
            socket.close();
        });
        socket.emit('form-7-search', { file:file }, function(data) {
            callback(data);
            socket.close();
        });
    }
};

Service.prototype.saveForm2 = function(form, callback) {    
    let socket = this.connect();
    socket.on('connect_error', function(error) {
        callback(undefined);
        socket.close();
    });
    socket.emit('form-2-save', { data:form }, function(data) {
        callback(data);
        socket.close();
    });
};

Service.prototype.getMyCases = function(form, callback) {    
    let socket = this.connect();
    socket.on('connect_error', function(error) {
        callback(undefined);
        socket.close();
    });
    socket.emit('my-cases', { data:{} }, function(data) {        
        callback(data);
        socket.close();
    });
};

module.exports = Service;
module.exports.fakeData = fakeData;