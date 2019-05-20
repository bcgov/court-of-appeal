let standardize = function(entities) {
    if (entities === undefined) { return undefined; }

    return entities.map((entity, index) => {
        let entityMap = {};
        if (entity.name) {
            entityMap['name'] = entity.name;
        } else if (entity.organization) {
            entityMap['name'] = entity.organization;
        } else if (entity.solicitor) {
            entityMap['name'] = entity.solicitor.name;
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

        entityMap['id'] = index
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
