let standardize = function(entities) {
    if (entities === undefined) { return undefined; }

    return entities.map((entity, index) => {
        let entityMap = {};
        if (entity.name) {
            entityMap['name'] = entity.name;
            entityMap['firstName'] = entity.firstName;
            entityMap['lastName'] = entity.lastName;
        } else if (entity.organization) {
            entityMap['name'] = entity.organization;
            entityMap['firstName'] = entity.organization;
            entityMap['organization'] = entity.organization;
        } else if (entity.solicitor) {
            entityMap['name'] = entity.solicitor.name;
            entityMap['firstName'] = entity.solicitor.firstName;
            entityMap['lastName'] = entity.solicitor.lastName;
        }

        if (entity.solicitor && entity.solicitor.address) {
            entityMap['address'] = entity.solicitor.address;
        } else if (entity.organization && entity.organization.address) {
            entityMap['address'] = entity.organization.address;
        } else if (entity.address) {
            entityMap['address'] = entity.address;
        } else {
            entityMap['address'] = {}
        }
        entityMap['partyId'] = entity.partyId;
        entityMap['id'] = index;
        entityMap['responding'] = entity.responding;
        return entityMap;
    });
}

let standardizeParties = function(parties) {
    return {
        appellants: standardize(parties.appellants),
        respondents: standardize(parties.respondents)
    }
}

module.exports = {
    standardizeParties: standardizeParties
}
