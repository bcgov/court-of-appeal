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

var Service = function(window) {  
    this.apiUrl = undefined;
    this.user = undefined;
    if (typeof window !== 'undefined') {
        this.apiUrl = window.location.origin;        
        if (window.document && window.document.cookie) { this.user = window.document.cookie.substring('user='.length); }
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
        get(this.buildOptions('/api/forms?file=' + file), (err, response, body)=>{            
            if (body) { callback(JSON.parse(body)); }
            else { callback(undefined); }
        }); 
    }
};

Service.prototype.saveForm2 = function(form, callback) {    
    let request = require('request');
    var options = this.buildOptions('/api/forms');
    options.form = { data:JSON.stringify(form) };
    request.post(options, function(err, response, body) {
        callback(body);
    });
};

Service.prototype.getMyCases = function(form, callback) { 
    let get = require('request');
    get(this.buildOptions('/api/cases'), (err, response, body)=>{
        callback(JSON.parse(body));
    }); 
};

Service.prototype.buildOptions = function(url) {
    return {
        url: this.base() + url,
        headers: {
            'X-USER': this.user
        }
    };
};
module.exports = Service;
module.exports.fakeData = fakeData;