require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import RespondToLeaveGrantedJourneyMap from "../../../src/components/journeymap/RespondToLeaveGrantedJourneyMap";

describe('RespondToLeaveGrantedJourneyMap', ()=> {

    describe('RespondToLeaveGrantedJourneyMap builds', ()=>{
        let history = { location : {state: {}}};

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <RespondToLeaveGrantedJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    isStepReady={()=>{}}
                />);
        });

        test('can build RespondToLeaveGrantedJourneyMap', () => {

            let instance = journeymap.instance();
            expect(instance).toMatchSnapshot();

        });

    });
});