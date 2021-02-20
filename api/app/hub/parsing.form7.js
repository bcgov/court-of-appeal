var extractCaseType = function(data) {
    return data.SearchByCaseNumberResponse ?
           data.SearchByCaseNumberResult.CaseType :
           data.ViewCasePartyResult ?
           data.ViewCasePartyResult.CaseType :
           undefined;
};

var extractParties = function(data) {
    return data.ViewCasePartyResult ?
            data.ViewCasePartyResult.Parties.Party:
           undefined;
};

var buildPartyInfo = function(party) {
    let info = {};
    if (party.FirstName) {
        info.name = name(party)
        info.firstName = party.FirstName;
        info.lastName = party.LastName;
    }
    if (party.Organization) {
        info.organization = party.Organization;
    }
    if (lawyer(party)) {
        info.solicitor = {
            name: name(lawyer(party)),
            firstName: lawyer(party).FirstName,
            lastName: lawyer(party).LastName,
            address: lawyerFirmAddress(party)
        }
    }
    return info;
};

var rawAppellants = function(parties) {
    var found = [];
    parties.forEach((party)=>{
        if (party.PartyRole == 'Appellant') { found.push(party); }
    });
    return found;
};

var rawRespondents = function(parties) {
    var found = [];
    parties.forEach((party)=>{
        if (party.PartyRole == 'Respondent') { found.push(party); }
    });
    return found;
};

var name = function(person) {
    return person.FirstName + ' ' + person.LastName;
};

var lawyer = function(party) {
    return party.LegalRepresentation ? party.LegalRepresentation.Lawyer : null;
};

var lawyerFirm = function(party) {
    return lawyer(party)[0].Firm;
};

var lawyerFirmAddress = function(party) {
    var firm = lawyerFirm(party);
    return {
        addressLine1:firm.Address1,
        addressLine2:firm.Address2,
        city:firm.City,
        postalCode:firm.PostalCode,
        province:firm.Province
    };
};

module.exports = {
    extractParties:extractParties,
    buildPartyInfo:buildPartyInfo,
    rawAppellants:rawAppellants,
    rawRespondents:rawRespondents,
    name:name,
    lawyer:lawyer,
    lawyerFirm:lawyerFirm,
    lawyerFirmAddress:lawyerFirmAddress,
    extractCaseType:extractCaseType
}
