let ConnectPerson = function() {
};

ConnectPerson.prototype.useHub = function(hub) {
    this.hub = hub;
};

ConnectPerson.prototype.useDatabase = function(database) {
    this.database = database;
};

ConnectPerson.prototype.now = function(login, callback) {
    this.database.savePerson({ login:login }, (id)=>{
            callback(login)
    });
};

module.exports = ConnectPerson;
