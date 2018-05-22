require('../support/fake.dom');
import React from 'react';
import renderer from "react-test-renderer";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ActiveFormList from '../../src/components/ActiveFormList';
let LocalServer = require('../support/local.server');

configure({ adapter: new Adapter() });

describe('Active forms section', function() {

    let apiServer;

    let activeFormList;
    let cases = [
        { id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} }
    ];

    beforeEach(function(done) {
        apiServer = new LocalServer((request, response)=> {  
            if (request.url == '/api/cases' && request.method == 'GET') {                
                response.write( JSON.stringify({ cases:cases })); 
                response.end();
            }
            else {
                response.statusCode = 200;
                response.write('ko');
                response.end(); 
            }
        });
        apiServer.start(done);
         activeFormList = mount(
            <ActiveFormList fetch="false" service={{ getMyCases: (form, callback) => { callback( {cases: [
                        { id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} }
                    ]});} }}/>,
        ).instance();
    });

    afterEach(function(done) {
        apiServer.stop(done);
    });
    
    test('transforms the data for the list', function(done) {
        activeFormList.fetchCases();
        setTimeout(()=> {
            expect(activeFormList.state.cases).toEqual([
                { 
                    id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', parties:'Bruce / Clark' ,
                    data:{appellants:[{name:'Bruce'}], respondents:[{name:'Clark'}]}
                }
            ]);
            done();
        }, 100);        
    });

});

test ('renders full list of documents ', ()=> {
    let list = renderer.create(
        <ActiveFormList fetch="false" service={{ getMyCases: (form, callback) => { callback( {cases: [
                    { id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} }
                ]});} }}/>,
    );
    let tree = list.toJSON();
    expect(tree).toMatchSnapshot();
    let instance = list.getInstance();
    instance.fetchCases();
    expect(instance.state.displayMyCasesEmptyLabel).toEqual(false);


});

test( 'renders empty list of documents ', ()=> {

    let emptylist = renderer.create(
        <ActiveFormList fetch="false" service={{ getMyCases: (form, callback) => { callback( { cases: [] }); } }}/>
    );
    let tree = emptylist.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = emptylist.getInstance();
    instance.fetchCases();
    expect(instance.state.displayMyCasesEmptyLabel).toEqual(true);
});