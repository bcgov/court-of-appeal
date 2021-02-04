let request = require('request');

let Service = function(window) {
    this.window = window;
    this.apiUrl = undefined;
    if (typeof window !== 'undefined') {
        this.apiUrl = window.location.origin;
    }
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_API_URL !== undefined) {
        this.apiUrl = process.env.REACT_APP_API_URL;
    }
};

Service.prototype.base = function() {
    let base = (this.apiUrl === undefined || this.apiUrl === null || this.apiUrl === 'null' ? '' : this.apiUrl)
                + process.env.PUBLIC_URL;

    return base
};

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
            self.notifyOfError(callback);
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
            self.notifyOfError(callback);
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
        else {
            self.notifyOfError(callback);
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
        else {
            self.notifyOfError(callback);
        }
    });
};

Service.prototype.submit = function(id, callback) {
    let self = this;
    let options = this.buildOptions(`/api/forms/${id}/submit`);
    request.post(options, function(err, response, body) {
        if (response && response.statusCode === 201) {
            callback(JSON.parse(body));
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
        else {
            self.notifyOfError(callback);
        }
    });
}

module.exports = Service;
