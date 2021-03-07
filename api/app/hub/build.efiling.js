const crypto = require('crypto')

var buildEFilingPackage = function(request, data, pdf) {
    let efilingPackage = {};
    efilingPackage.formId = data.formId;
    efilingPackage.fileNumber = data.formSevenNumber.replace("CA", "");
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
        party = {};
        if (appellant.organization || appellant.lastName == "") {
            party = {
                "partyType": "IND", //"ORG",
                "roleType": "APL",
                "firstName": "",
                "middleName": "",
                "lastName": appellant.firstName || "",
            };
        }
        else {
            party = {
                "partyType": "IND",
                "roleType": "APL",
                "firstName": appellant.firstName || "",
                "middleName": "",
                "lastName": appellant.lastName || ""
            };
        }
        efilingPackage.parties.push(party);
    });
    data.respondents.forEach((respondent) => {
        party = {
            "partyType": "IND", //respondent.organization ? "ORG": "IND",
            "roleType": "RES",
            "firstName": respondent.firstName || "",
            "middleName": "",
            "lastName": respondent.lastName || ""
        }
        efilingPackage.parties.push(party);
    });

    const host = `${request.headers.host}`;
    if (host.endsWith(":80"))
        host = host.replace(":80","");
    if (host.endsWith(":443"))
        host = host.replace(":443","");

    efilingPackage.successUrl = `${request.headers.protocol}://${host}${process.env.WEB_BASE_HREF}${data.formId}/submitted/success`;
    efilingPackage.errorUrl = `${request.headers.protocol}://${host}${process.env.WEB_BASE_HREF}${data.formId}/submitted/error`;
    efilingPackage.cancelUrl = `${request.headers.protocol}://${host}${process.env.WEB_BASE_HREF}${data.formId}/submitted/cancel`;

    return efilingPackage;
}


module.exports = {
    buildEFilingPackage:buildEFilingPackage,
}
