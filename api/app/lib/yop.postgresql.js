// Used for migrations only. 
var pg = require('pg')
const util = require('util')

const pool = new pg.Pool()

var executeSync = async function(usePool, sql, params) {
    var statements = normalize(sql, params)
    var rows = await runAll(usePool, statements)

    return rows
}

var executePool = function(sql, params, callback) {
    if (typeof params == 'function') {
        callback = params
    }
    var callbackified = util.callbackify(executeSync)
    callbackified(true, sql, params, (err, rows)=> {
        if (err) {
            rows = []
        }
        callback(err, rows)
    })
}


var execute = function(sql, params, callback) {
    if (typeof params == 'function') {
        callback = params
    }
    var callbackified = util.callbackify(executeSync)
    callbackified(false, sql, params, (err, rows)=> {
        if (err) {
            rows = []
        }
        callback(err, rows)
    })
}

var normalize = function(sql, params) {
    var statements = sql
    if (typeof sql == 'string') {
        var statement = { sql:sql, params:[] }
        if (typeof params == 'object') {
            statement.params = params
        }
        statements = [statement]
    }
    for (var i=0; i<statements.length; i++) {
        if (typeof statements[i] == 'string') {
            statements[i] = {
                sql:statements[i],
                params:[]
            }
        }
    }
    return statements
}

var runAll = async (usePool, statements)=>{
    var rows = []
    for (var i=0; i<statements.length; i++) {
        var statement = statements[i]
        var p = new Promise((resolve, reject)=>{
            run(usePool, statement.sql, statement.params, function(rows, error) {
                if (error) { reject(error); }
                else { resolve(rows); }
            })
        })
        rows = await p
    }
    return rows
}

var run = function(usePool, sql, params, callback) {
    if (usePool) {
        pool.query(sql, params, (err, result) => {
            if (err) { callback([], err); return; }
            callback(result.rows);
        });
    }
    else {
        var client = new pg.Client()
        client.connect(function(err) {
            if (err) { callback([], err); client.end(); return; }
            client.query(sql, params, function(err, result) {
                if (err) { callback([], err); client.end(); return; }
                client.end();
                callback(result.rows);
            });
        });
    }
};

module.exports = {
    execute: execute,
    executePool: executePool,
    executeSync: executeSync
};
