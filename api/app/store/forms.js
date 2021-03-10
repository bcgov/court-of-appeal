let { execute, executePool } = require('app/lib/yop.postgresql');

let Forms = function() {
};

Forms.prototype.selectByLogin = function(login, callback) {
    var select = `
        SELECT  forms.id,
                true as is_admin,
                type,
                status,
                modified,
                data,
                forms.person_id,
                efiling_submissions.package_url
        FROM    forms
        JOIN person on forms.person_id = person.id
        LEFT JOIN efiling_submissions on efiling_submissions.id = forms.last_efiling_submission_id
        WHERE   person.login = $1 
        AND     forms.status <> 'archived'

        ORDER BY modified DESC
    `;
    executePool(select, [login], callback);
};

Forms.prototype.selectByFormTypeUseridAndCaseNumber = function(userid, type, caseNumber, callback) {
    let select = `select id, type, status, data
                    from forms
                    where person_id = $1
                        and type = $2
                        and data like '%formSevenNumber":%"${caseNumber}"%';`;
    executePool(select, [userid, type], callback);
};

Forms.prototype.create = function(options, callback) {
    executePool('insert into forms(type, status, data, person_id) values($1, $2, $3, $4);',
        [options.type, options.status, options.data, options.person_id], ()=> {
            executePool('SELECT last_value FROM forms_id_seq;', [], callback);
        });
};

Forms.prototype.update = function(form, callback) {
    executePool('update forms set type = $1, status = $2, data = $3, modified = current_timestamp where id = $4',
        [form.type, form.status, form.data, form.id], function() {
            executePool('SELECT last_value FROM forms_id_seq;', [], callback);
        });
};

Forms.prototype.archive = function(userid, ids, callback) {
    let statements = [];
    for (var i=0; i<ids.length; i++) {
        statements.push({ sql:`update forms set status='archived' where id = $1 and person_id = $2`, params:[ids[i], userid] });
    }
    executePool(statements, [], callback);
};

Forms.prototype.updateStatus = function(id, userId, status, callback) {
    executePool('update forms set status = $2, modified = current_timestamp where id = $1 and person_id = $3', [id, status, userId], callback);
};

Forms.prototype.selectOne = function(id, callback) {
    executePool('select type, status, modified, data, last_efiling_submission_id from forms where id = $1', [id], callback);
};

Forms.prototype.hasPermissionToForm = function(login, id, callback) {
    let select = `select forms.id from forms, person 
                  WHERE person.login = $1 AND 
                        forms.person_id = person.id AND 
                        forms.id = $2`;

    executePool(select, [login, id], callback)
}

module.exports = {
    Forms:Forms
};
