let { executePool } = require('app/lib/yop.postgresql');

let Persons = function() {
};

Persons.prototype.create = function(options, callback) {
    executePool('insert into person(login) values($1);',
        [options.login], ()=> {
            executePool('SELECT last_value FROM person_id_seq;', [], callback);
        });
};

Persons.prototype.findByLogin = function(login, callback) {
    executePool('select id, login from person where login = $1', [login], callback);
};

module.exports = {
    Persons:Persons
};
