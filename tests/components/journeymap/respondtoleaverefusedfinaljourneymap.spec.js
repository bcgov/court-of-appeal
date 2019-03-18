import RespondToLeaveRefusedFinalJourneyMap
    from "../../../src/components/journeymap/RespondToLeaveRefusedFinalJourneyMap";
require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';

describe('RespondToLeaveRefusedFinalJourneyMap', ()=> {

    describe('RespondToLeaveRefusedFinalJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let clicked = '';
        let iconClicked = (action) => {
            clicked = action;
        }

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <RespondToLeaveRefusedFinalJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    iconClicked={iconClicked.bind(this)}
                    isStepReady={()=>{}}
                />);
        });

        test('can build RespondToLeaveRefusedFinalJourneyMap but does not icons that respond to click', () => {

            let instance = journeymap.instance();
            
            instance.iconClicked('crossappeal');
            expect(clicked = '');
        });

    });
});