require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import AppellantLeaveRefusedJourneyMap from "../../../src/components/journeymap/AppellantLeaveRefusedJourneyMap";

describe('', ()=> {

    describe('AppellantLeaveRefusedJourneyMap builds', ()=>{
        let history = { location : {state: {}}};

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <AppellantLeaveRefusedJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    isStepReady={() => {}}
                />);
        });

        test('can build AppellantLeaveRefusedJourneyMap ', () => {

            let instance = journeymap.instance();
            expect(instance).toMatchSnapshot();
        });

    });
});