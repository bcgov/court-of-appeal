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
            "type": "APP",
            "data": data,
            "md5": crypto.createHash('md5').update(pdf).digest("hex")
        }
    ];
    data.appellants = {};
    const host = `${request.headers.host}`;
    efilingPackage.successUrl = `${request.protocol}://${host}${process.env.WEB_BASE_HREF}api/forms/${data.formId}/success`;
    efilingPackage.errorUrl = `${request.protocol}://${host}${process.env.WEB_BASE_HREF}submitted/error`;
    efilingPackage.cancelUrl = `${request.protocol}://${host}${process.env.WEB_BASE_HREF}submitted/cancel`;

    return efilingPackage;
}


module.exports = {
    buildEFilingPackage:buildEFilingPackage,
}
