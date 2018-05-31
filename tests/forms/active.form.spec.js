require('../support/fake.dom');
import React from 'react';
import renderer from "react-test-renderer";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ActiveFormList from '../../src/components/ActiveFormList';
let LocalServer = require('../support/local.server');
import moment from 'moment';

configure({ adapter: new Adapter() });

describe('Active forms section', function() {
    
    test('transforms the data for the list', function(done) {
        let activeFormList = mount(
            <ActiveFormList fetch="false" service={{ getMyCases: (form, callback) => { callback( {cases:[
                { id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} }
            ]});} }}/>,
        ).instance();
        activeFormList.fetchCases();

        setTimeout(()=> {
            let cases = activeFormList.state.cases;
            cases[0].modified = moment(cases[0].modified).utc().format('YYYY-MM-DD HH:mm')
            expect(cases).toEqual([
                { 
                    id:1501, status:'draft', modified:'2018-03-27 16:15', parties:'Bruce / Clark' ,
                    data:{appellants:[{name:'Bruce'}], respondents:[{name:'Clark'}]}
                }
            ]);
            done();
        }, 100);        
    });

    test('limits the list to first 5', (done)=>{
        let activeFormList = mount(
            <ActiveFormList fetch="false" service={{ getMyCases: (form, callback) => { callback( {cases: [
                { id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} },
                { id:1502, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} },
                { id:1503, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} },
                { id:1504, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} },
                { id:1505, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} },
                { id:1506, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} }
            ]});} }}/>,
        ).instance();
        activeFormList.fetchCases();
        setTimeout(()=> {
            expect(activeFormList.state.cases.length).toEqual(5);
            done();
        }, 100);   
    });

    test ('hides the empty mention when cases are found', ()=> {
        let list = mount(
            <ActiveFormList fetch="false" service={{ getMyCases: (form, callback) => { callback( {cases: [
                        { id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} }
                    ]});} }}/>,
        ).instance();
        list.fetchCases();
        
        expect(list.state.displayMyCasesEmptyLabel).toEqual(false);
    });
    
    test('display empty mention when no cases are found', ()=> {
        let emptylist = mount(
            <ActiveFormList fetch="false" service={{ getMyCases: (form, callback) => { callback( { cases: [] }); } }}/>
        ).instance();
        emptylist.fetchCases();
    
        expect(emptylist.state.displayMyCasesEmptyLabel).toEqual(true);
    });
});