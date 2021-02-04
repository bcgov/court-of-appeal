import RespondToLeaveRefusedFinalJourneyMap
    from "../../../src/components/journeymap/RespondToLeaveRefusedFinalJourneyMap";
require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import Journey from "../../../src/components/Journey";

describe('RespondToLeaveRefusedFinalJourneyMap', ()=> {

    describe('RespondToLeaveRefusedFinalJourneyMap builds', ()=>{
        let history = { location : {state: {}}};

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <RespondToLeaveRefusedFinalJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    isStepReady={()=>{}}
                />);
        });
        

        test('can build RespondToLeaveRefusedFinalJourneyMap', () => {

            let instance = journeymap.instance();
            expect(instance).toMatchSnapshot();
        });

    });
});