
let { Forms } = require('./forms');
let { Persons } = require('./persons');
let { Journey } = require('./journey');
let { EFiling } = require('./efiling');
let { Audit } = require('./audit');

let DatabaseEncryption = require('./database.encryption');

let ifError = function(please) {
    return {
        otherwise:function(then) {
            return (error, rows)=> {
                if (error) {
                    please.notify({ error: {code:503, message:error.message} });
                }
                else {
                    then(rows);
                }
            };
        }
    };
};

let Database = function() {
    this.forms = new Forms();
    this.persons = new Persons();
    this.journey = new Journey();
    this.efiling = new EFiling();
    this.audit = new Audit();
    this.encryption = new DatabaseEncryption(process.env.DATABASE_ENCRYPTION_KEY_32_BYTES);
};

// Legacy methods.
Database.prototype.createJourney = function(journey, callback) {
    this.journey.selectByUserId(journey.userid, ifError({notify:callback}).otherwise((rows)=> {
        if (!rows || rows.length === 0) {
            this.journey.create(journey, ifError({notify:callback}).otherwise((rows)=> {
                callback(rows[0].last_value);
            }));
        } else {
            journey.id = rows[0].id;
            this.journey.update(journey, ifError({notify:callback}).otherwise((rows)=> {
                callback(rows[0].last_value);
            }));
        }
    }))
};

Database.prototype.updateJourney = function(journey, callback) {
    this.journey.update(journey, ifError({notify:callback}).otherwise((rows)=> {
        callback(rows[0].last_value);
    }));
};

Database.prototype.myJourney = function(login, callback) {
    this.journey.selectByLogin(login, ifError({notify:callback}).otherwise((rows)=> {
        if (rows.length === 0) {
            callback({ error: {code:404} });
        }
        else {
            callback(rows[0]);
        }
    }));
};

Database.prototype.createForm = function(form, callback) {
    let self = this;
    this.forms.selectByFormTypeUseridAndCaseNumber(form.person_id, form.type, JSON.parse(form.data).formSevenNumber, (err, rows) => {
        if (!rows || rows.length < 1 ) {
            const encrypted_data = self.encryption.encrypt(form.data);
            form.data = encrypted_data;
            this.forms.create(form, ifError({notify:callback}).otherwise((rows)=> {
                callback(rows[0].last_value);
            }));
        } else {
            let existingForm = rows[0];
            const encrypted_data = self.encryption.encrypt(form.data);
            this.forms.update({
                    id:existingForm.id,
                    type:existingForm.type,
                    status:form.status,
                    data:(encrypted_data)
                },
                ifError({notify:callback}).otherwise((rows)=>{
                    callback(rows[0].last_value);
                })
            );
        }
    })

};

Database.prototype.updateForm = function(form, callback) {
    const encrypted_data = this.encryption.encrypt(form.data);
    this.forms.update({
            id:form.id,
            type:form.type,
            status:'Draft',
            data:encrypted_data
        },
        ifError({notify:callback}).otherwise((rows)=>{
            callback(rows[0].last_value);
        })
    );
};

Database.prototype.myCases = function(login, callback) {
    let self = this;
    this.forms.selectByLogin(login, ifError({notify:callback}).otherwise((rows)=> {
        callback(rows.map(function(row) {
            let modified = row.modified;
            modified = JSON.stringify(modified).toString();
            modified = modified.substring(1, modified.lastIndexOf('.'))+'Z';
            data = self.encryption.decrypt(JSON.parse(row.data));
            return {
                id: row.id,
                personId: row.person_id,
                type: row.type,
                status: row.status,
                modified: modified,
                packageUrl: row.package_url,
                data: JSON.parse(data)
            };
        }));
    }));
};

Database.prototype.savePerson = function(person, callback) {
    this.persons.findByLogin(person, ifError({notify:callback}).otherwise((rows)=> {
        if (rows.length ==0) {
            this.persons.create(person, ifError({notify:callback}).otherwise((rows)=>{
                callback(rows[0].last_value);
            }));
        }
        else {
            callback(rows[0].id);
        }
    }));
};

Database.prototype.archiveCases = function(userid, ids, callback) {
    this.forms.archive(userid, ids, ifError({notify:callback}).otherwise((rows)=> {
        callback(rows);
    }));
};

Database.prototype.formData = function(login, id, callback) {
    let self = this;
    this.forms.hasPermissionToForm(login, id, ifError({notify:callback}).otherwise((rows)=> {
        if (rows.length > 0) {
            this.forms.selectOne(id, ifError({notify:callback}).otherwise((rows)=> {
                if (rows.length === 0) 
                    callback({ error: {code:404} });
                else {
                    const decrypted_data = self.encryption.decrypt(JSON.parse(rows[0].data));
                    rows[0].data = decrypted_data;
                    callback(rows[0]);
                }
            }));
        }
        else 
            callback({ error: {code:404} });
    }));
};

Database.prototype.personInfo = function(login, callback) {
    this.persons.findByLogin(login, ifError({notify:callback}).otherwise((rows)=> {
        if (rows.length ==0) {
            callback({ error: {code:404} });
        }
        else {
            let person = rows[0];
            callback({
                login:person.login,
                id:person.id
            });
        }
    }));
};

// New methods. These shouldn't provide "error codes".
Database.prototype.createEFilingSubmission = async function (submissionId, transactionId, userId, formId) {
    let rows = await this.efiling.createEFilingSubmission(submissionId, transactionId, userId, formId);
    await this.efiling.updateFormLastEFilingSubmission(formId, userId, rows[0].id);
}

Database.prototype.updateEFilingSubmissionUrlAndNumber = async function (formId, personId, packageNumber, packageUrl) {
    await this.efiling.updateEFilingSubmissionUrlAndNumber(formId, personId, packageNumber, packageUrl);
    await this.efiling.updateFormToSubmitted(formId, personId);
}

Database.prototype.getEFilingInformation = async function(formId, personId) {
    let form = await this.efiling.getEFilingInformation(formId, personId);
    if (form.length > 0) {
        data = this.encryption.decrypt(JSON.parse(form[0].data));
        form[0].data = data;
    }
    return form;
}

Database.prototype.writeAuditCaseSearch = async function(personId, caseNumber, ipAddress, type) {
    await this.audit.writeAuditCaseSearch(personId, caseNumber, ipAddress, type);
}

module.exports = Database;
