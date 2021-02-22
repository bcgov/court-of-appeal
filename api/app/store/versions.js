let { execute, executePool } = require('app/lib/yop.postgresql');

let Versions = function() {
};

Versions.prototype.selectAll = function(callback) {
    executePool('select id from versions', [], callback);
};

module.exports = {
    Versions:Versions
};
