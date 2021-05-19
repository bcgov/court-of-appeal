let request = require('request');

let Service = function(window) {
    
    this.window = window;
    this.apiUrl = undefined;
    if (typeof window !== 'undefined') {
        this.apiUrl = window.location.origin;
    }
};

Service.prototype.base = function() {
    let base = window.location.origin + process.env.PUBLIC_URL;
    return base
};

Service.prototype.isJson = function (target) {
    try {
        JSON.parse(target);
    } catch (e) {
        return false;
    }
    return true;
}

Service.prototype.printEFilingJson = function (form) {
    let formCopy = form;
    delete formCopy.appellants;
    console.log(JSON.stringify(formCopy, null, 2));
}

Service.prototype.notifyOfError = function(callback, options) {
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

Service.prototype.redirectToLogin = function() {
    window.location.replace(`${this.base()}/api/login?redirectUrl=${window.location}`);
}

Service.prototype.redirectToLogout = function() {
    window.location.replace(`${this.base()}/api/logoff?redirect_url=${window.location}`);
}

Service.prototype.searchForm7 = function(file, lastName, firstName, organizationName, searchBy, callback) {
    let self = this;
    let options = this.buildOptions(`/api/searchForm7`);
    options.form = { file: file, lastName: lastName, firstName: firstName, organizationName: organizationName, searchBy: searchBy };
    request.post(options, (err, response, body)=>{
        if (response && response.statusCode === 200) {
            callback(JSON.parse(body));
        }
        else if (response && response.statusCode === 404) {
            callback(undefined);
        }
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
        }
    });
};

Service.prototype.createForm2 = function(form, callback) {
    let options = this.buildOptions('/api/forms');
    options.form = { data:JSON.stringify(form) };
    let self = this;
    self.printEFilingJson(form);
    request.post(options, function(err, response, body) {
        if (response && response.statusCode === 201) {
            callback(JSON.parse(body).id);
        }
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
        }
    });
};

Service.prototype.updateForm2 = function(form, id, callback) {
    let options = this.buildOptions(`/api/forms/${id}`);
    options.form = { data:JSON.stringify(form) };
    let self = this;
    self.printEFilingJson(form);
    request.put(options, function(err, response, body) {
        if (response && response.statusCode === 200) {
            callback(body);
        }
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
        }
    });
};


Service.prototype.getMyCases = function(form, callback) {
    let self = this;
    request.get(this.buildOptions('/api/cases'), (err, response, body)=>{
        if (response && response.statusCode === 200) {
            callback(JSON.parse(body));
        }
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback, { cases:[] });
        }
    });
};

Service.prototype.getMyJourney = function(form, callback) {
    let self = this;
    request.get(this.buildOptions('/api/journey'), (err, response, body)=>{
        if (response && response.statusCode === 200) {
            callback(JSON.parse(body));
        }
        else if (response && response.statusCode === 404) {
            callback({ error:{ code:404, message:'not found' } });
        }
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
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
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
        }
    });
};

Service.prototype.buildOptions = function(url) {
    return {
        url: this.base() + url,
        'content-type': 'application/json'
    };
};

Service.prototype.getPersonInfo = function(callback) {
    let self = this;
    request.get(this.buildOptions('/api/persons/connected'), (err, response, body)=>{
        if (response && response.statusCode === 200) {
            callback(JSON.parse(body));
        }
        else if (response && response.statusCode === 404) {
            callback({ error:{ code:404, message:'not found' } });
        }
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
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
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
        }
    });
};

Service.prototype.previewForm = function(id, callback) {
    let self = this;
    request.get(this.buildOptions('/api/forms/'+id+'/preview'), (err, response, body)=>{
        if (response && response.statusCode === 200) {
            callback(body);
        }
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
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
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
        }
    });
};

Service.prototype.createJourney = function(journey, callback) {
    let options = this.buildOptions('/api/journey');
    options.form = journey;
    let self = this;
    request.post(options, function(err, response, body) {
        if (response && response.statusCode === 201) {
            callback(JSON.parse(body).id);
        }
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
        }
    });
};

Service.prototype.updateJourney = function(journey, id, callback) {
    let options = this.buildOptions(`/api/journey/${id}`);
    options.form = journey;
    let self = this;
    request.put(options, function(err, response, body) {
        if (response && response.statusCode === 201) {
            callback(JSON.parse(body).id);
        }
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
        }
    });
};

Service.prototype.createStep = function(step, callback) {
    let options = this.buildOptions('/api/step');
    options.form = step;
    let self = this;
    request.post(options, function(err, response, body) {
        if (response && response.statusCode === 201) {
            callback(JSON.parse(body).id);
        }
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
        }
    });
};

Service.prototype.submit = function(id, callback) {
    let self = this;
    let options = this.buildOptions(`/api/forms/${id}/submit`);
    request.post(options, function(err, response, body) {
        if (response && self.isJson(body)) {
            callback(JSON.parse(body));
        }
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
        }
    });
};

Service.prototype.getAccountUsers = function(callback) {
    let self = this;
    let options = this.buildOptions(`/api/accountusers`);
    request.get(options, function(err, response, body) {
        if (response && response.statusCode === 200) {
            callback(JSON.parse(body));
        }
        else if (response && response.statusCode === 404) {
            callback({ error: { code:404 }});
        }
        else if (response && response.statusCode === 403) {
            self.redirectToLogin();
        }
        else {
            self.notifyOfError(callback);
        }
    });
};


module.exports = Service;
