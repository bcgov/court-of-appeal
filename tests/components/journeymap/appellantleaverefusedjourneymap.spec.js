require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import AppellantLeaveRefusedJourneyMap from "../../../src/components/journeymap/AppellantLeaveRefusedJourneyMap";

describe('', ()=> {

    describe('AppellantLeaveRefusedJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let clicked = '';
        let iconClicked = (action) => {
            clicked = action;
        }

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <AppellantLeaveRefusedJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    iconClicked={iconClicked.bind(this)}
                />);
        });

        test('can build AppellantLeaveRefusedJourneyMap with icons that respond to click', () => {

            let instance = journeymap.instance();
            
            instance.iconClicked('maxhasleftthebuilding');
            expect(clicked = 'maxhasleftthebuilding');
        });

    });
});