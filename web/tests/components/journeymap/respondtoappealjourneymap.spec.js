require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import RespondToAppealJourneyMap from "../../../src/components/journeymap/RespondToAppealJourneyMap";

describe('RespondToAppealJourneyMap', ()=> {

    describe('RespondToAppealJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let clicked = '';

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <RespondToAppealJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    isStepReady={()=>{}}
                />);
        });

        test('can build RespondToAppealJourneyMap', () => {
            let instance = journeymap.instance();
            expect(instance).toMatchSnapshot();
        });

    });
});