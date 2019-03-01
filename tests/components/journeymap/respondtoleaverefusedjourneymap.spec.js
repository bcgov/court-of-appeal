require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import RespondToLeaveRefusedJourneyMap from "../../../src/components/journeymap/RespondToLeaveRefusedJourneyMap";

describe('RespondToLeaveRefusedJourneyMap', ()=> {

    describe('RespondToLeaveRefusedJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let clicked = '';
        let clickFunction = (action) => {
            clicked = action;
        }

        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <RespondToLeaveRefusedJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    iconClicked={clickFunction.bind(this)}
                />);
        });

        test('can build RespondToLeaveRefusedJourneyMap with icons that respond to click', () => {

            let instance = journeymap.instance();

            instance.iconClicked('potato');
            expect(clicked).toEqual('potato');

        });

    });
});