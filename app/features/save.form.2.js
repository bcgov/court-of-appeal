let SaveFormTwo = function(database) {
    this.database = database;
};

SaveFormTwo.prototype.now = function(params, callback) {
    this.database.saveForm({ type:'form-2', data:params.data }, callback);
};

module.exports = SaveFormTwo;