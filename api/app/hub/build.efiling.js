const crypto = require('crypto')

var buildEFilingPackage = function(request, data, pdf) {
    let efilingPackage = {};
    efilingPackage.formId = data.formId;
    efilingPackage.fileNumber = data.formSevenNumber.replace("CA", "");
    efilingPackage.locationCode = "COA";
    efilingPackage.parties = [];
    efilingPackage.organizationParties = [];
    efilingPackage.documents = [
        {
            "name": "form2.pdf",
            "type": "NAA", 
            "data": data,
            "md5": crypto.createHash('md5').update(pdf).digest("hex")
        }
    ];
    data.appellants.forEach((appellant) => {
        party = {};
        if (appellant.organization || appellant.lastName == "") {
            party = {
                "roleType": "APL",
                "name": appellant.firstName || "",
            };
            efilingPackage.organizationParties.push(party);
        }
        else {
            party = {
                "partyType": "IND",
                "roleType": "APL",
                "firstName": appellant.firstName || "",
                "middleName": "",
                "lastName": appellant.lastName || ""
            };
            efilingPackage.parties.push(party);
        }
    });
    data.respondents.forEach((respondent) => {
        party = {};
        if (respondent.organization || respondent.lastName == "") {
            party = {
                "roleType": "RES",
                "name": respondent.firstName || "",
            };
            efilingPackage.organizationParties.push(party);
        }
        else {
            party = {
                "partyType": "IND",
                "roleType": "RES",
                "firstName": respondent.firstName || "",
                "middleName": "",
                "lastName": respondent.lastName || ""
            };
            efilingPackage.parties.push(party);
        }
    });

    const host = `${request.headers.host}`;
    efilingPackage.successUrl = `${request.protocol}://${host}${process.env.WEB_BASE_HREF}api/forms/${data.formId}/success`;
    efilingPackage.errorUrl = `${request.protocol}://${host}${process.env.WEB_BASE_HREF}submitted/error`;
    efilingPackage.cancelUrl = `${request.protocol}://${host}${process.env.WEB_BASE_HREF}submitted/cancel`;

    return efilingPackage;
}


module.exports = {
    buildEFilingPackage:buildEFilingPackage,
}
