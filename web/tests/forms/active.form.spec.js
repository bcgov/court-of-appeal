require('../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import ActiveFormList from '../../src/components/ActiveFormList';
let DefaultService = require('../../src/service/default.service');

describe('Active forms section', function() {

    // tests must be moved to Dashboard component
    test('default service', ()=>{
        let instance = mount(<ActiveFormList fetch="false" cases={[]}/>).instance();

        expect(instance.props.cases).toEqual([]);
    });
    // test('transforms the data for the list', function(done) {
    //     let activeFormList = mount(
    //         <ActiveFormList fetch="false" service={{ getMyCases: (form, callback) => { callback( {cases:[
    //             { id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} }
    //         ]});} }}/>,
    //     ).instance();
    //     activeFormList.fetchCases();
    //
    //     setTimeout(()=> {
    //         let cases = activeFormList.state.cases;
    //         cases[0].modified = moment(cases[0].modified).utc().format('YYYY-MM-DD HH:mm')
    //         expect(cases).toEqual([
    //             {
    //                 id:1501, status:'draft', modified:'2018-03-27 16:15', parties:'Bruce / Clark' ,
    //                 data:{appellants:[{name:'Bruce'}], respondents:[{name:'Clark'}]}
    //             }
    //         ]);
    //         done();
    //     }, 100);
    // });
    //
    // test('limits the list to first 5', (done)=>{
    //     let activeFormList = mount(
    //         <ActiveFormList fetch="false" service={{ getMyCases: (form, callback) => { callback( {cases: [
    //             { id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} },
    //             { id:1502, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} },
    //             { id:1503, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} },
    //             { id:1504, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} },
    //             { id:1505, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} },
    //             { id:1506, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} }
    //         ]});} }}/>,
    //     ).instance();
    //     activeFormList.fetchCases();
    //     setTimeout(()=> {
    //         expect(activeFormList.state.cases.length).toEqual(5);
    //         done();
    //     }, 100);
    // });
    //
    // test ('hides the empty mention when cases are found', ()=> {
    //     let list = mount(
    //         <ActiveFormList fetch="false" service={{ getMyCases: (form, callback) => { callback( {cases: [
    //                     { id:1501, status:'draft', modified:'2018-03-27T16:15:54Z', data:{appellants: [{name:'Bruce'}], respondents:[{name:'Clark'}]} }
    //                 ]});} }}/>,
    //     ).instance();
    //     list.fetchCases();
    //
    //     expect(list.state.displayMyCasesEmptyLabel).toEqual(false);
    // });
    //
    // test('display empty mention when no cases are found', ()=> {
    //     let emptylist = mount(
    //         <ActiveFormList fetch="false" service={{ getMyCases: (form, callback) => { callback( { cases: [] }); } }}/>
    //     ).instance();
    //     emptylist.fetchCases();
    //
    //     expect(emptylist.state.displayMyCasesEmptyLabel).toEqual(true);
    // });
    //
    // let cases;
    // let createInstance = ()=>{
    //     let instance = mount(<ActiveFormList service={{
    //         getMyCases: (params, callback)=> { callback({ cases:cases }); }
    //     }}/>).instance();
    //     return instance;
    // };
    // describe('capture one case change in the collection of cases in state', ()=>{
    //     let instance;
    //     beforeEach(()=>{
    //         cases = [
    //             { id:15, data:{value:'old'} },
    //             { id:42, data:{value:'old'} }
    //         ];
    //         instance = createInstance();
    //     });
    //     test('replaces old value with new value', ()=>{
    //         instance.updateCases({value:'updated'}, 15);
    //         expect(instance.state.cases[0].data).toEqual({value:'updated'});
    //     });
    //     test('do not modify the other cases', ()=>{
    //         instance.updateCases({value:'updated'}, 15);
    //         expect(instance.state.cases[1].data).toEqual({value:'old'});
    //     });
    //     test('resists unknown case', ()=>{
    //         instance.updateCases({value:'updated'}, 666);
    //         expect(instance.state.cases[0].data).toEqual({value:'old'});
    //         expect(instance.state.cases[1].data).toEqual({value:'old'});
    //     });
    // });
});
