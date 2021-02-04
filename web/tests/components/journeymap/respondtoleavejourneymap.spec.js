require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import RespondToLeaveJourneyMap from "../../../src/components/journeymap/RespondToLeaveJourneyMap";

describe('RespondToLeaveJourneyMap', ()=> {

    describe('RespondToLeaveJourneyMap builds', ()=>{
        let history = { location : {state: {}}};

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <RespondToLeaveJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    isStepReady={()=>{}}
                />);
        });

        test('can build RespondToLeaveJourneyMap', () => {

            let instance = journeymap.instance();
            expect(instance).toMatchSnapshot();

        });

    });
});