require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import RespondToLeaveRefusedJourneyMap from "../../../src/components/journeymap/RespondToLeaveRefusedJourneyMap";

describe('RespondToLeaveRefusedJourneyMap', ()=> {

    describe('RespondToLeaveRefusedJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let clicked = '';
        

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <RespondToLeaveRefusedJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    isStepReady={()=>{}}
                />);
        });

        test('can build RespondToLeaveRefusedJourneyMapk', () => {

            let instance = journeymap.instance();
            expect(instance).toMatchSnapshot();

        });

    });
});