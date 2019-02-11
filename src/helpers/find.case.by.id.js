let findCaseById = function(options, then) {
    let found = undefined
    for (let i=0; i<options.cases.length; i++) {
        let candidate = options.cases[i]
        if (candidate.id == options.id) {
            found = candidate
            break
        }
    }
    if (found) { 
        then(found);
    }
};

export default findCaseById;
