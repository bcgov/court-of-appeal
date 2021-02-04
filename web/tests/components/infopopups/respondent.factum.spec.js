require('../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import InfoPopupFactory from '../../../src/components/infopopups/common/InfoPopupFactory';
import RespondentFactumPopup from '../../../src/components/infopopups/RespondentFactumPopup';

describe('RespondentFactumPopup', ()=> {

    let close = ()=>{};

    test('can be built', ()=>{
        let popup = mount(<InfoPopupFactory show="true" type="respondentfactum" close={close}/>).instance();
        let view = popup.render();

        expect(view).toEqual(<RespondentFactumPopup close={close} getSections={popup.getSections}/>);
    });

    test('does not include tooltip for Factum', ()=>{
        let popup = mount(<InfoPopupFactory show="true" type="respondentfactum" close={close}/>);
        let bullet = popup.find('#bullet-0-1').at(0);

        expect(bullet.html()).not.toContain('question-mark');
    });

    test('includes tooltip for optional transcript extract book', ()=>{
        let popup = mount(<InfoPopupFactory show="true" type="respondentfactum" close={close}/>);
        let bullet = popup.find('#bullet-1-1').at(0);

        expect(bullet.html()).toContain('question-mark');
        expect(bullet.html()).toContain('If a witness spoke');
    });
});
