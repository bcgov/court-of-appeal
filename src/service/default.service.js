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

Service.prototype.searchForm7 = function(file, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", this.apiUrl + '/forms?file=' + file, true);
    xhr.onreadystatechange = function() {     
        if(xhr.readyState == xhr.DONE && xhr.status==200) {
            callback(xhr.responseText);
        }
    }
    xhr.send(); 
};

Service.prototype.saveForm2 = function(form, callback) {    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", this.apiUrl + '/forms', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {     
        if(xhr.readyState == xhr.DONE && xhr.status==201) {
            callback(xhr.responseText);
        }
    }
    let params = 'data=' + JSON.stringify(form);
    xhr.send(params); 
};

Service.prototype.getMyCases = function(form, callback) {    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", this.apiUrl + '/cases', true);
    xhr.onreadystatechange = function() {     
        if(xhr.readyState == xhr.DONE && xhr.status==200) {
            callback(xhr.responseText);
        }
    }
    xhr.send(); 
};

module.exports = Service;
module.exports.fakeData = fakeData;