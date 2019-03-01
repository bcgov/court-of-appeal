require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import AppellantApplyForLeaveJourneyMap from "../../../src/components/journeymap/AppellantApplyForLeaveJourneyMap";

describe('AppellantApplyForLeaveJourneyMap', ()=> {

    describe('AppellantApplyForLeaveJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let clicked = '';
        let iconClicked = (action) => {
            clicked = action;
        }

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <AppellantApplyForLeaveJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    iconClicked={iconClicked.bind(this)}
                />);
        });

        test('can build AppellantApplyForLeaveJourneyMap with icons that respond to click', () => {

            let instance = journeymap.instance();
            
            instance.iconClicked('maxdisappeared');
            expect(clicked = 'maxdisappeared');
        });

    });
});