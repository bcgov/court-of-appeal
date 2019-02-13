let updateDocument = function(document, event) {
    const field = event.target.name.split(".")[1];
    if (['addressLine1', 'addressLine2', 'city', 'postalCode'].includes(field)){
        let respondents = document.respondents.slice();
        let index = document.selectedContactIndex;
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
        document.selectedContactIndex = event.target.value;
    }
    if (field === 'respondentList') {
        document.respondents[event.target.value].selected = event.target.selected;
    }

    return document;
};

export { updateDocument };
