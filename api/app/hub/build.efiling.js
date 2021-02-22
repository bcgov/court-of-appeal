const crypto = require('crypto')

var buildEFilingPackage = function(data, pdf) {
    let efilingPackage = {};
    efilingPackage.locationCode = "COA";
    efilingPackage.parties = [];
    efilingPackage.documents = [
        {
            "name": "form2.pdf",
            "type": "NOA", //EFS ???
            "data": data,
            "md5": crypto.createHash('md5').update(pdf).digest("hex")
        }
    ];
    data.appellants.forEach((appellant) => {
        party = {
            "partyType": appellant.organization ? "ORG": "IND",
            "roleType": "APL",
            "firstName": appellant.firstName || "",
            "middleName": "",
            "lastName": appellant.lastName || ""
        }
        efilingPackage.parties.push(party);
    });
    data.respondents.forEach((respondent) => {
        party = {
            "partyType": respondent.organization ? "ORG": "IND",
            "roleType": "RES",
            "firstName": respondent.firstName || "",
            "middleName": "",
            "lastName": respondent.lastName || ""
        }
        efilingPackage.parties.push(party);
    });

    efilingPackage.successUrl = "https://www.google.ca";
    efilingPackage.errorUrl = "https://www.google.ca";
    efilingPackage.cancelUrl = "https://www.google.ca";

    return efilingPackage;
}


module.exports = {
    buildEFilingPackage:buildEFilingPackage,
}
