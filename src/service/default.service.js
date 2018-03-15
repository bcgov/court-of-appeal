var fakeData = fakeData = { 
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
    if (this.apiUrl === undefined || this.apiUrl === 'undefined') {
        callback(fakeData);
    } else {
        var xhr = new window.XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {                    
                    callback(JSON.parse(this.responseText));
                } else {
                    callback(undefined);
                }
            }
        };
        xhr.open('GET', this.apiUrl + '/form-7', true);
        xhr.send();
    }
};

module.exports = Service;
module.exports.fakeData = fakeData;