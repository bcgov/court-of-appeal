let forceCA = (value, stateOwner)=> {
    let caseNumber = value.replace(/\D/g,'')
    stateOwner.setState({
        caseNumber: 'CA'.concat(caseNumber).substring(0, 7)
    })
}

module.exports = {
    forceCA: forceCA
}
