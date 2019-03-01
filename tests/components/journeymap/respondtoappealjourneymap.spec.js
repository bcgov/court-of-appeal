require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import RespondToAppealJourneyMap from "../../../src/components/journeymap/RespondToAppealJourneyMap";

describe('RespondToAppealJourneyMap', ()=> {

    describe('RespondToAppealJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let clicked = '';
        let iconClicked = (action) => {
            clicked = action;
        }

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <RespondToAppealJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    iconClicked={iconClicked.bind(this)}
                />);
        });

        test('can build RespondToAppealJourneyMap with icons that respond to click', () => {

            let instance = journeymap.instance();
            
            instance.iconClicked('crossappeal');
            expect(clicked = 'crossappeal');
        });

    });
});