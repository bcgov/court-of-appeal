require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import InfoPopup from '../../../src/components/infopopups/common/InfoPopup';
import DecisionPopup from "../../../src/components/infopopups/DecisionPopup";

describe('DecisionPopup', ()=> {

    let close = ()=>{};
    let granted = false;
    let leaveGranted = ()=>{
        granted = true;
    };
        
    test('can be built', ()=>{            
        let popup = mount(
            <InfoPopup
                show="true"
                type="decision"
                close={close}
                leaveGranted={leaveGranted}
            />).instance();
        let view = popup.render();

        expect(view).toEqual(
            <DecisionPopup
                close={close}
                getSections={popup.getSections}
                leaveGranted={leaveGranted}
                question="Was your leave to appeal granted or refused?"
                title="Decision on Leave to Appeal"
            />);

        expect(granted).toEqual(false);
        popup.props.leaveGranted();
        expect(granted).toEqual(true);
    });


});