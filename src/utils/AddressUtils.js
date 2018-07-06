
import {GENERAL_ERROR_MSG, INVALID_ADDRESS_MSG} from "../helpers/constants";

let validateForm2 = (document, fields ) => {

        let selectedRespondent = document.respondents[document.selectedRespondentIndex || 0];

        let validStreetAddress = selectedRespondent.address &&
            selectedRespondent.address.addressLine1 &&
            selectedRespondent.address.addressLine1.length > 5 &&
            selectedRespondent.address.city &&
            selectedRespondent.address.city.length > 4;
        let validForm = validStreetAddress &&
            (!document.phone || fields.phoneIsValid) &&
            (!selectedRespondent.address.postalCode || fields.postalCodeIsValid) &&
            // either 1. no email checkbox is checked or 2. at least one is checked, and there's a valid email:
            ((!document.useServiceEmail && !document.sendNotifications) ||
                ((document.useServiceEmail || document.sendNotifications)
                    && (document.email && fields.emailIsValid)));

        return [!!validForm, !!validStreetAddress];

};

let errorMessage = (valid, validStreetAddress)=>{
    if (!validStreetAddress) {
        return INVALID_ADDRESS_MSG;
    } else if (!valid) {
        return GENERAL_ERROR_MSG;
    } else {
        return '';
    } 
}

export { validateForm2, errorMessage };
