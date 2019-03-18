require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import RespondToLeaveJourneyMap from "../../../src/components/journeymap/RespondToLeaveJourneyMap";

describe('RespondToLeaveJourneyMap', ()=> {

    describe('RespondToLeaveJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let clicked = '';
        let iconClicked = (action) => {
            clicked = action;
        }

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <RespondToLeaveJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    iconClicked={iconClicked.bind(this)}
                    isStepReady={()=>{}}
                />);
        });

        test('can build RespondToLeaveJourneyMap with icons that respond to click', () => {

            let instance = journeymap.instance();
            
            instance.iconClicked('appearance');
            expect(clicked = 'appearance');

        });

    });
});