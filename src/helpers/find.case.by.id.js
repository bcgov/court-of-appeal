let findCaseById = function(options, then) {
    let found = options.cases.find((item) => item.id === options.id );
    if (found) { 
        then(found);
    } 
};

export default findCaseById;