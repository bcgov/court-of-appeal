require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import JourneyMap from "../../../src/components/journeymap/JourneyMap";

describe('JourneyMap', ()=> {

    describe('JourneyMap builds', ()=>{
        let history = { location : {state: {}}};

        let journeymap;

        beforeEach(()=> {
            journeymap = mount(
                <JourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    history={history}
                    cases={[]}
                />);
        });

        test('can build JourneyMap with a modal that can open and close', () => {

            let instance = journeymap.instance();
            
            expect(instance.state.showInfoModal).toEqual(false);

            instance.openInfoModal();
            expect(instance.state.showInfoModal).toEqual(true);

            instance.closeInfoModal();
            expect(instance.state.showInfoModal).toEqual(false);

            instance.openInfoModal();
            expect(instance.state.showInfoModal).toEqual(true);

            instance.handleClickOffModal({target: {}});
            expect(instance.state.showInfoModal).toEqual(true);

            instance.handleClickOffModal({target: {id: 'info-modal'}});
            expect(instance.state.showInfoModal).toEqual(false);

        });

    });
});