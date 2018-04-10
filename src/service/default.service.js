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
    if (typeof window !== 'undefined') {
        this.apiUrl = window.location.origin;
    }
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_API_URL !== undefined) {
        this.apiUrl = process.env.REACT_APP_API_URL;
    }
    this.serveLocalData = false;  
};

Service.prototype.base = function() {
    return this.apiUrl === undefined ? '' : this.apiUrl;
};

Service.prototype.setServeLocalData = function(flag) {    
    this.serveLocalData = flag;
};

Service.prototype.searchForm7 = function(file, callback) {
    if (this.serveLocalData) {
        callback(fakeData);
    }
    else {        
        let get = require('request');
        get(this.base() + '/api/forms?file=' + file, (err, response, body)=>{            
            if (body) { callback(JSON.parse(body)); }
            else { callback(undefined); }
        }); 
    }
};

Service.prototype.saveForm2 = function(form, callback) {    
    let request = require('request');
    request.post(this.base() + '/api/forms', {form: { data:JSON.stringify(form) }}, function(err, response, body) {
        callback(body);
    });
};

Service.prototype.getMyCases = function(form, callback) { 
    let get = require('request');
    get(this.base() + '/api/cases', (err, response, body)=>{
        callback(JSON.parse(body));
    }); 
};

module.exports = Service;
module.exports.fakeData = fakeData;