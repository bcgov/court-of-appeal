let fs = require('fs');

let PreviewForm2 = function(database) {
    this.database = database;
    this.template = fs.readFileSync('./app/features/templates/form2.preview.html').toString();
};

PreviewForm2.prototype.now = function(login, id, callback) {
    this.database.formData(login, id, (data)=>{
        if (data.error) { callback(data); }
        else {
            data = JSON.parse(data.data);
            const selected = this.filterSelected(data.respondents);
            var html = this.template
                .replace('{formSevenNumber}', data.formSevenNumber)
                .replace('{appellants}', this.reduce(data.appellants))
                .replace('{appellantsLabel}', 'Appellant' + this.label(data.appellants))
                .replace('{respondents}', this.reduce(data.respondents))
                .replace('{respondentsLabel}', 'Respondent' + this.label(selected))
                .replace('{selectedRespondents}', this.reduce(selected))
                .replace('{selectedContactAddress1}', this.extract('addressLine1', data))
                .replace('{selectedContactAddress2}', this.extract('addressLine2', data))
                .replace('{selectedContactCity}', this.extract('city', data))
                .replace('{selectedContactProvince}', this.extract('province', data))
                .replace('{selectedContactPostalCode}', this.extract('postalCode', data))
                .replace('{selectedContactPhone}',  this.extract('phone', data))
                .replace('{selectedContactEmail}', data.useServiceEmail ? this.extract('email', data): '')
                .replace('{respondentOrSolicitor}', data.selfRepresented ? data.serviceInformation.name : this.extract('counselName', data))
                .replace('{respondentOrSolicitorText}', data.selfRepresented ? 'Respondent' : 'Solicitor')
                .replace('{respondents}', this.reduce(data.respondents));
            if (!data.useServiceEmail) {
                html = this.removeIfBlock('useServiceEmail', html);
            } else {
                html = this.removeIfCondition('useServiceEmail', html);                
            }
            callback(html);
        }
    })
};

PreviewForm2.prototype.reduce = function(array) {
    return array.reduce((result, item, index)=> result + (index > 0 ? ', ': '') + item.name, '');
};

PreviewForm2.prototype.filterSelected = function(array) {
    return array.filter((item)=> item.responding);
};

PreviewForm2.prototype.label = function(array) {
    return array.length > 1 ? 's': '';
};

PreviewForm2.prototype.serviceInformation = function(data) {
    return data.serviceInformation;
};

PreviewForm2.prototype.extract = function(field, data) {
    return  this.serviceInformation(data) && this.serviceInformation(data)[field] ? this.serviceInformation(data)[field] : '';
};

PreviewForm2.prototype.removeIfBlock = function(name, html) {
    let startIndex = html.indexOf('{if ' + name + '}');
    let endIndex = html.indexOf('{endif ' + name + '}');

    return html.substring(0, startIndex).trim() + html.substring(endIndex + ('{endif ' + name + '}').length);
};

PreviewForm2.prototype.removeIfCondition = function(name, html) {
    let startIndex = html.indexOf('{if ' + name + '}');    
    let tmp = html.substring(0, startIndex).trim() + html.substring(startIndex + ('{if ' + name + '}').length);
    let endIndex = tmp.indexOf('{endif ' + name + '}');

    return tmp.substring(0, endIndex).trim() + tmp.substring(endIndex + ('{endif ' + name + '}').length);
};
module.exports = PreviewForm2;