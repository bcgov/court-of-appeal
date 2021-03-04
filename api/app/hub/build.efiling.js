const crypto = require('crypto')

var buildEFilingPackage = function(request, data, pdf) {
    let efilingPackage = {};
    efilingPackage.locationCode = "COA";
    efilingPackage.parties = [];
    efilingPackage.documents = [
        {
            "name": "form2.pdf",
            "type": "NAA", 
            "data": data,
            "md5": crypto.createHash('md5').update(pdf).digest("hex")
        }
    ];
    data.appellants.forEach((appellant) => {
        party = {
            "partyType": "IND", //appellant.organization ? "ORG": "IND",
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

    efilingPackage.successUrl = `${request.headers.protocol}://${request.headers.host.replace(":443", "").replace(":80","")}/efiling/success`;
    efilingPackage.errorUrl = `${request.headers.protocol}://${request.headers.host.replace(":443", "").replace(":80","")}/efiling/error`;
    efilingPackage.cancelUrl = `${request.headers.protocol}://${request.headers.host.replace(":443", "").replace(":80","")}/efiling/cancel`;

    return efilingPackage;
}


module.exports = {
    buildEFilingPackage:buildEFilingPackage,
}
