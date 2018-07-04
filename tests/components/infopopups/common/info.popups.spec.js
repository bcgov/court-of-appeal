require('../../../support/fake.dom');
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InfoPopup from '../../../../src/components/infopopups/common/InfoPopup';
import AppellantFactumPopup from '../../../../src/components/infopopups/AppellantFactumPopup';
import ReplyBookPopup from '../../../../src/components/infopopups/ReplyBookPopup';
import RespondentHearingPopup from '../../../../src/components/infopopups/RespondentHearingPopup';
import CourtOrderPopup from '../../../../src/components/infopopups/CourtOrderPopup';
import RespondentFactumPopup from '../../../../src/components/infopopups/RespondentFactumPopup';
import CrossAppealPopup from '../../../../src/components/infopopups/CrossAppealPopup';
import AppearancePopup from '../../../../src/components/infopopups/AppearancePopup';
import AppealRecordPopup from '../../../../src/components/infopopups/AppealRecordPopup';
import AppellantInitialPopup from '../../../../src/components/infopopups/AppellantInitialPopup';
import NoticeOfHearingPopup from '../../../../src/components/infopopups/NoticeOfHearingPopup';
import AppellantCourtOrderPopup from '../../../../src/components/infopopups/AppellantCourtOrderPopup';
configure({ adapter: new Adapter() });

describe('InfoPopup', ()=> {    

    describe('factory', ()=>{

        test('returns null when hidden', ()=>{
            let popup = mount(<InfoPopup />);
            let view = popup.instance().render();

            expect(view).toEqual(null);
        });

        let close = ()=>{};

        test('can build AppellantFactumPopup', ()=>{            
            let popup = mount(<InfoPopup show="true" type="factum" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<AppellantFactumPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build ReplyBookPopup', ()=>{            
            let popup = mount(<InfoPopup show="true" type="replybook" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<ReplyBookPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build RespondentHearingPopup', ()=>{            
            let popup = mount(<InfoPopup show="true" type="respondenthearing" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<RespondentHearingPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build CourtOrderPopup', ()=>{            
            let popup = mount(<InfoPopup show="true" type="courtorder" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<CourtOrderPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build RespondentFactumPopup', ()=>{            
            let popup = mount(<InfoPopup show="true" type="respondentfactum" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<RespondentFactumPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build CrossAppealPopup', ()=>{            
            let popup = mount(<InfoPopup show="true" type="crossappeal" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<CrossAppealPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build AppearancePopup', ()=>{            
            let popup = mount(<InfoPopup show="true" type="leave-application-appearance" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<AppearancePopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build AppearancePopup with notice', ()=>{            
            let popup = mount(<InfoPopup show="true" type="appearance" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<AppearancePopup close={close} getSections={popup.getSections} noticeType="Notice of Appeal" />);
        });
        
        test('can build AppealRecordPopup', ()=>{            
            let popup = mount(<InfoPopup show="true" type="appealrecord" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<AppealRecordPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build AppellantInitialPopup', ()=>{            
            let popup = mount(<InfoPopup show="true" type="appellantinitial" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<AppellantInitialPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build NoticeOfHearingPopup', ()=>{            
            let popup = mount(<InfoPopup show="true" type="noticeofhearing" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<NoticeOfHearingPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build AppellantCourtOrderPopup', ()=>{            
            let popup = mount(<InfoPopup show="true" type="appellantcourtorder" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<AppellantCourtOrderPopup close={close} getSections={popup.getSections}/>);
        });
    });
});