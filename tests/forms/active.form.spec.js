require('../support/fake.dom');
import React from 'react';
import renderer from "react-test-renderer";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ActiveFormList from '../../src/components/ActiveFormList';
let LocalServer = require('../support/local.server');

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
            expect(activeFormList.state.cases).toEqual([
                { 
                    id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', parties:'Bruce / Clark' ,
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
    
    test('display empty mention when no cases are found', ()=> {
        let emptylist = renderer.create(
            <ActiveFormList fetch="false" service={{ getMyCases: (form, callback) => { callback( { cases: [] }); } }}/>
        );
        let tree = emptylist.toJSON();
        expect(tree).toMatchSnapshot();
        let instance = emptylist.getInstance();
        instance.fetchCases();
    
        expect(instance.state.displayMyCasesEmptyLabel).toEqual(true);
    });
});