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

let Service = function(window) {  
    this.apiUrl = undefined;
    this.user = undefined;
    if (typeof window !== 'undefined') {
        this.apiUrl = window.location.origin;        
        if (window.document && window.document.cookie) { 
            let index = window.document.cookie.indexOf('login=');
            this.user = window.document.cookie.substring(index + 'login='.length);
            if (this.user.indexOf(';') > 0) {
                this.user = this.user.substring(0, this.user.indexOf(';'));
            }
        }
    }
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_API_URL !== undefined) {
        this.apiUrl = process.env.REACT_APP_API_URL;
    } 
};

Service.prototype.base = function() {
    return this.apiUrl === undefined ? '' : this.apiUrl;
};

Service.prototype.searchForm7 = function(file, callback) {
    let get = require('request');
    let msg = require('../helpers/constants');
    get(this.buildOptions('/api/forms?file=' + file), (err, response, body)=>{
        if (err) {
            callback(msg.NETWORK_ERROR_MSG);
        } else if (response.statusCode === 404) {
            callback(undefined);
        } else { callback(JSON.parse(body)); }
    });
};

Service.prototype.createForm2 = function(form, callback) {
    let request = require('request');
    let options = this.buildOptions('/api/forms');
    options.form = { data:JSON.stringify(form) };
    request.post(options, function(err, response, body) {
        callback(body);
    });
};

Service.prototype.updateForm2 = function(form, id, callback) {
    let request = require('request');
    let options = this.buildOptions(`/api/forms/${id}`);
    options.form = { data:JSON.stringify(form) };
    request.put(options, function(err, response, body) {
        callback(body);
    });
};


Service.prototype.getMyCases = function(form, callback) { 
    let get = require('request');
    get(this.buildOptions('/api/cases'), (err, response, body)=>{
        callback(JSON.parse(body));
    }); 
};

Service.prototype.savePerson = function(user, callback) {
    let request = require('request');
    let options = this.buildOptions('/api/persons');
    options.form = { data:user };
    request.post(options, function(err, response, body) {
        callback(body);
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
Service.prototype.getPersonInfo = function(callback) {
    let get = require('request');
    get(this.buildOptions('/api/persons/' + this.user), (err, response, body)=>{
        if (response && response.statusCode === 200) {
            callback(JSON.parse(body));
        }
        else {
            callback(body);
        }
    }); 
};
Service.prototype.archiveCases = function(ids, callback) {
    let request = require('request');
    let options = this.buildOptions('/api/cases/archive');
    options.form = { ids:JSON.stringify(ids) };
    request.post(options, function(err, response, body) {
        callback(body);
    });
};
module.exports = Service;
module.exports.fakeData = fakeData;