require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import AppellantLeaveGrantedJourneyMap from "../../../src/components/journeymap/AppellantLeaveGrantedJourneyMap";

describe('', ()=> {

    describe('AppellantLeaveGrantedJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <AppellantLeaveGrantedJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    isStepReady={() => {}}
                />);
        });

        test('can build AppellantLeaveGrantedJourneyMap', () => {

            let instance = journeymap.instance();
            expect(instance).toMatchSnapshot();
        });

    });
});