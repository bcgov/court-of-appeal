require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import AppellantApplyForLeaveJourneyMap from "../../../src/components/journeymap/AppellantApplyForLeaveJourneyMap";

describe('AppellantApplyForLeaveJourneyMap', ()=> {

    describe('AppellantApplyForLeaveJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let isStepReady = () => {}

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <AppellantApplyForLeaveJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    isStepReady={isStepReady.bind(this)}
                />);
        });

        test('can build AppellantApplyForLeaveJourneyMap', () => {

            let instance = journeymap.instance();
            expect(instance).toMatchSnapshot();
        });

    });
});
