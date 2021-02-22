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
                forms.person_id
        FROM    forms, person
        WHERE   person.login = $1
        AND     forms.person_id = person.id
        AND     forms.status <> 'archived'

        ORDER BY modified DESC
    `;
    executePool(select, [login], callback);
};

Forms.prototype.selectOne = function(id, callback) {
    executePool('select type, status, modified, data from forms where id = $1', [id], callback);
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

Forms.prototype.archive = function(ids, callback) {
    let statements = [];
    for (var i=0; i<ids.length; i++) {
        statements.push({ sql:`update forms set status='archived' where id = $1`, params:[ids[i]] });
    }
    executePool(statements, [], callback);
};

Forms.prototype.updateStatus = function(id, status, callback) {
    executePool('update forms set status = $2, modified = current_timestamp where id = $1', [id, status], callback);
};

module.exports = {
    Forms:Forms
};
