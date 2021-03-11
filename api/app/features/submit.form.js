let SubmitForm = function() {
};

SubmitForm.prototype.useHub = function(hub) {
    this.hub = hub;
};

SubmitForm.prototype.useDatabase = function(database) {
    this.database = database;
};

SubmitForm.prototype.now = function(request, login, id, pdf, callback) {
    this.database.formData(login, id, (data)=> {
        if (data.error) { callback(data) }
        else {
            data = JSON.parse(data.data)
            data.formId = id;
            this.hub.submitForm(request, login, data, pdf, (data, transactionId, submissionId)=>{
                callback(data, transactionId, submissionId)
            });
        }
    })
};

module.exports = SubmitForm;
