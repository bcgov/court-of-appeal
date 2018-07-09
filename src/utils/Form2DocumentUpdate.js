let updateDocument = function(document, event) {
    const field = event.target.name.split(".")[1];
    if (['addressLine1', 'addressLine2', 'city', 'postalCode'].includes(field)){
        let respondents = document.respondents.slice();
        let index = document.selectedRespondentIndex;
        let address = respondents[index].address || {};
        address[field] = event.target.value;
        respondents[index].address = address; 
        document.respondents = respondents;
    }
    if (['useServiceEmail', 'sendNotifications'].includes(field)) {
        document[field] = event.target.checked;
    }
    if (['email', 'phone'].includes(field)) {
        document[field] = event.target.value;
    }
    if ('name' === field) {
        document.selectedRespondentIndex = event.target.value;
    }

    return document;
};

export { updateDocument };