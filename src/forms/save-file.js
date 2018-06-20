import FileSaver from 'file-saver';

let save = function(data) {
    var blob = new Blob([data], {type: "application/zip"});
    FileSaver.saveAs(blob, 'forms.zip');
};

module.exports = save;