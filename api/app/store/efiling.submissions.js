let { executePool } = require('app/lib/yop.postgresql');

let EFilingSubmissions = function() {
};

EFilingSubmissions.prototype.createSubmission = function(options, callback) {
    /*(executePool('insert into efiling_submissions(type, status, data, person_id) values($1, $2, $3, $4);',
    [options.type, options.status, options.data, options.person_id], ()=> {
        executePool('SELECT last_value FROM forms_id_seq;', [], callback);
    })*/
};

EFilingSubmissions.prototype.updatePackageUrl = function(id, packageNumber, packageUrl, callback) {
    //executePool('update efiling_submissions set package_number = $2, package_url = $3, modified = current_timestamp where id = $1', [id, packageNumber, packageUrl], callback);
};

module.exports = {
    EFilingSubmissions:EFilingSubmissions
};
