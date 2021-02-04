let FileSaver = require('file-saver');
let save = require('../../src/helpers/save-file');

describe('Save file', ()=>{

    let type = 'undefined';
    let filename = 'undefined';
    let dataInBlob = 'undefined';

    global.Blob = (data, options)=>{
        dataInBlob = data;
        type = options.type;
    };
    FileSaver.saveAs = (blob, name)=>{
        filename = name;
    };

    beforeEach(()=>{
        save({ value:42 });
    });

    test('has the expected name', ()=>{
        expect(filename).toEqual('forms.zip');
    });

    test('saves file with type zip', ()=>{
        expect(type).toEqual('application/zip');
    });

    test('creates the expected blob', ()=>{
        expect(dataInBlob).toEqual([{"value": 42}]);
    });
});
