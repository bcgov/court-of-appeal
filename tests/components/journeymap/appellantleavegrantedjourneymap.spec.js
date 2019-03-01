require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import AppellantLeaveGrantedJourneyMap from "../../../src/components/journeymap/AppellantLeaveGrantedJourneyMap";

describe('', ()=> {

    describe('AppellantLeaveGrantedJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let clicked = '';
        let iconClicked = (action) => {
            clicked = action;
        }

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <AppellantLeaveGrantedJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    iconClicked={iconClicked.bind(this)}
                />);
        });

        test('can build AppellantLeaveGrantedJourneyMap with icons that respond to click', () => {

            let instance = journeymap.instance();
            
            instance.iconClicked('maxishere');
            expect(clicked = 'maxishere');
        });

    });
});