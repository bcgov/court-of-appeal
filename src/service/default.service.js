let request = require('request');

let Service = function(window) {  
    this.window = window;
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

Service.prototype.notifyThatAnErrorOccured = function(callback, options) {
    let data = { error:{ code:503, message:'service unavailable' } };
    Object.assign(data, options);
    callback(data);
    if (this.window && this.window.document) {
        let errorModal = this.window.document.getElementById('serviceErrorModal');
        if (errorModal) {
            errorModal.style.display = 'block';
        }
    }
};

Service.prototype.searchForm7 = function(file, callback) {
    let self = this;   
    request.get(this.buildOptions('/api/forms?file=' + file), (err, response, body)=>{
        if (response && response.statusCode === 200) {
            callback(JSON.parse(body));
        }
        else if (response && response.statusCode === 404) {
            callback(undefined);
        }
        else {
            self.notifyThatAnErrorOccured(callback);
        }
    });
};

Service.prototype.createForm2 = function(form, callback) {
    let options = this.buildOptions('/api/forms');
    options.form = { data:JSON.stringify(form) };
    let self = this;
    request.post(options, function(err, response, body) {
        if (response && response.statusCode === 201) {
            callback(JSON.parse(body).id);
        }
        else {
            self.notifyThatAnErrorOccured(callback);
        }
    });
};

Service.prototype.updateForm2 = function(form, id, callback) {
    let options = this.buildOptions(`/api/forms/${id}`);
    options.form = { data:JSON.stringify(form) };
    let self = this;
    request.put(options, function(err, response, body) {
        if (response && response.statusCode === 200) {
            callback(body);
        }
        else {
            self.notifyThatAnErrorOccured(callback);
        }
    });
};


Service.prototype.getMyCases = function(form, callback) { 
    let self = this;
    request.get(this.buildOptions('/api/cases'), (err, response, body)=>{
        if (response && response.statusCode === 200) {
            callback(JSON.parse(body));
        }
        else {
            self.notifyThatAnErrorOccured(callback, { cases:[] });
        }
    }); 
};

Service.prototype.savePerson = function(user, callback) {
    let options = this.buildOptions('/api/persons');
    options.form = { data:user };
    let self = this;
    request.post(options, function(err, response, body) {
        if (response && response.statusCode === 201) {
            callback(body);
        }
        else {
            self.notifyThatAnErrorOccured(callback);
        }
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
    let self = this;
    request.get(this.buildOptions('/api/persons/' + this.user), (err, response, body)=>{
        if (response && response.statusCode === 200) {
            callback(JSON.parse(body));
        }
        else if (response && response.statusCode === 404) {
            callback({ error:{ code:404, message:'not found' } });
        }
        else {
            self.notifyThatAnErrorOccured(callback);
        }
    }); 
};
Service.prototype.archiveCases = function(ids, callback) {
    let options = this.buildOptions('/api/cases/archive');
    options.form = { ids:JSON.stringify(ids) };
    let self = this;
    request.post(options, function(err, response, body) {
        if (response && response.statusCode === 200) {
            callback(body);
        }
        else {
            self.notifyThatAnErrorOccured(callback);
        }
    });
};
Service.prototype.generatePdf = function(html, callback) {
    let options = this.buildOptions('/api/pdf');
    let self = this;
    options.form = { html:html };
    options.encoding = null;
    request.post(options, function(err, response, body) {
        if (response && response.statusCode === 200) {
            callback(body);
        }
        else {
            self.notifyThatAnErrorOccured(callback);
        }
    });
};
Service.prototype.previewForm = function(id, callback) {
    let self = this;
    request.get(this.buildOptions('/api/forms/'+id+'/preview'), (err, response, body)=>{
        if (response && response.statusCode === 200) {
            callback(body);
        }
        else {
            self.notifyThatAnErrorOccured(callback);
        }
    }); 
};
Service.prototype.download = function(ids, callback) {
    let options = this.buildOptions('/api/zip?id=' + ids.join('&id='));
    options.encoding = null;
    let self = this;
    request.get(options, function(err, response, body) {
        if (response && response.statusCode === 200) {
            callback(body);
        }
        else {
            self.notifyThatAnErrorOccured(callback);
        }
    });
};
module.exports = Service;