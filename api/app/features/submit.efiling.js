let SubmitEFiling = function(hub) {
    this.hub = hub;
};

SubmitEFiling.prototype.now = function(params, callback) {
    this.hub.submitEfiling(params.file, callback);
};

module.exports = SubmitEFiling;