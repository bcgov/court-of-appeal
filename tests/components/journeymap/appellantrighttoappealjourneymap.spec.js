require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import AppellantRightToAppealJourneyMap from "../../../src/components/journeymap/AppellantRightToAppealJourneyMap";

describe('', ()=> {

    describe('AppellantRightToAppealJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let clicked = '';
        let iconClicked = (action) => {
            clicked = action;
        }

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <AppellantRightToAppealJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    iconClicked={iconClicked.bind(this)}
                />);
        });

        test('can build AppellantRightToAppealJourneyMap with icons that respond to click', () => {

            let instance = journeymap.instance();
            
            instance.iconClicked('elvislives');
            expect(clicked = 'elvislives');
        });

    });
});