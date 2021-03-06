var expect = require('chai').expect;
var Server = require('../../app/server/server');
var Database = require('../../app/store/database');
var Migrator = require('../../app/migrations/migrator');
var Truncator = require('../support/truncator');
var { execute } = require('../../app/libs/yop.postgresql');
var { request, localhost5000json } = require('../support/request');

describe('Journey create', function() {

    var server;
    var database;
    var creation = localhost5000json({
        method: 'POST',
        path: '/api/journey',
        body: {
            type: 'maxjourney',
            state: 'started',
            ca_number: 'CA123',
            steps: JSON.stringify([{type: 'best', state: 'max'}])
        }
    });

    beforeEach(function(done) {
        server = new Server();
        database = new Database();
        server.useDatabase(database);
        var migrator = new Migrator();
        migrator.migrateNow(function() {
            var truncator = new Truncator();
            truncator.truncateTablesNow(function() {
                server.start(5000, 'localhost', done);
            });
        });
    });

    afterEach(function(done) {
        server.stop(done);
    });

    it('is a rest service', function(done) {
        var background = [
            'alter sequence person_id_seq restart',
            'alter sequence journey_id_seq restart',
            { sql: 'insert into person(login) values ($1)', params:['max'] }
        ];
        execute(background, (error, rows)=> {
            request(creation, (err, response, body)=> {
                expect(response.statusCode).to.equal(201);
                expect(body).to.deep.equal(JSON.stringify({id:1}));
                expect(response.headers.location).to.equal('/journey/1');
                const location = response.headers.location;
                const id = parseInt(location.substring(location.lastIndexOf('/')+1));

                const sql = `
                    SELECT  journey.id,
                            journey.type,
                            journey.state,
                            journey.ca_number,
                            journey.steps,
                            person.login as login
                    FROM journey, person
                    WHERE journey.id=$1
                    AND journey.userid=person.id
                `;
                execute(sql, [id], function(err, rows) {
                    expect(rows.length).to.equal(1);
                    const {type, state, ca_number, steps, login } = rows[0];
                    expect(type).to.equal('maxjourney');
                    expect(state).to.equal('started');
                    expect(ca_number).to.equal('CA123');
                    expect(steps).to.equal(JSON.stringify([{type: 'best', state: 'max'}]))
                    expect(login).to.equal('max');
                    done();
                });
            });
        });
    });
});
