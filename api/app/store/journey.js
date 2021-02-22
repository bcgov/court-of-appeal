let { execute, executePool } = require('app/lib/yop.postgresql');

let Journey = function() {
};

Journey.prototype.create = function(options, callback) {
    executePool('insert into journey(userid, type, state, ca_number, steps) values($1, $2, $3, $4, $5);',
        [options.userid, options.type, options.state, options.ca_number, options.steps], ()=> {
            executePool('SELECT last_value FROM journey_id_seq;', [], callback);
        });
};

Journey.prototype.update = function(options, callback) {
    executePool('update journey set type = $2, state = $3, ca_number = $4, steps = $5 where id = $1;',
        [options.id, options.type, options.state, options.ca_number, options.steps], ()=> {
            executePool('SELECT last_value FROM journey_id_seq;', [], callback);
    });
};

Journey.prototype.selectOne = function(id, callback) {
    executePool('select * from journey where id=$1', [id], callback);
};

Journey.prototype.selectAll = function(callback) {
    executePool('select * from journey', callback);
};

Journey.prototype.selectByLogin = function(login, callback) {
    const select = `
        SELECT  journey.id,
                type,
                state,
                userid,
                ca_number,
                steps
        FROM journey, person
        WHERE person.login = $1
        AND journey.userid = person.id
    `;
    executePool(select, [login], callback);
};

Journey.prototype.selectByUserId = function(userid, callback) {
    const select = `
        SELECT  journey.id,
                type,
                state,
                userid,
                ca_number,
                steps
        FROM journey
        WHERE userid = $1
    `;
    executePool(select, [userid], callback);
};


module.exports = {
    Journey:Journey
};
