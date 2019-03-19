require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import AppellantRightToAppealJourneyMap from "../../../src/components/journeymap/AppellantRightToAppealJourneyMap";

describe('', ()=> {

    describe('AppellantRightToAppealJourneyMap builds', ()=>{
        let history = { location : {state: {}}};
        let journeymap;
        
        beforeEach(()=> {
            journeymap = mount(
                <AppellantRightToAppealJourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    isStepReady={()=> {}}
                />);
        });

        test('can build AppellantRightToAppealJourneyMap', () => {

            let instance = journeymap.instance();
            expect(instance).toMatchSnapshot();
            
        });

    });
});