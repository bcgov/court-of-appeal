require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import RespondToLeaveGrantedJourneyMap from "../../../src/components/journeymap/RespondToLeaveGrantedJourneyMap";

describe('RespondToLeaveGrantedJourneyMap', ()=> {

    describe('RespondToLeaveGrantedJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let clicked = '';
        let iconClicked = (action) => {
            clicked = action;
        }

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <RespondToLeaveGrantedJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    iconClicked={iconClicked.bind(this)}
                />);
        });

        test('can build RespondToLeaveGrantedJourneyMap with icons that respond to click', () => {

            let instance = journeymap.instance();
            
            instance.iconClicked('crossappeal');
            expect(clicked = 'crossappeal');

        });

    });
});