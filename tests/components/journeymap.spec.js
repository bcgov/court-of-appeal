require('../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import JourneyMap from "../../src/components/JourneyMap";

describe('JourneyMap', ()=> {

    describe('JourneyMap builds', ()=>{

        test('returns null when there are no props', () => {
            let journeymap = mount(<JourneyMap title="map title" subtitle="subtitle"/>);
            let view = journeymap.instance().render();

            expect(view).toEqual(null);
        });

        let journeymap;
        let mapSrc = "/images/journeymap/journey-map_respondent-leave-to-appeal.png";
        let mapProps = [{coords: "75,10,180,200", function: "appearance", alt: "info about filing a notice of appearance"}];

        beforeEach(()=> {
            journeymap = mount(
                <JourneyMap
                    title={"max wasn't here"}
                    subTitle={"where's max?"}
                    mapSrc={mapSrc}
                    mapProps={mapProps}
                />);
        });

        test('can build JourneyMap with a modal that can open and close', () => {

            let instance = journeymap.instance();

            expect(journeymap.find('#journey-map-image').prop('src')).toEqual(mapSrc);

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