import ApplyForLeavePopup from "../../../../src/components/infopopups/ApplyForLeavePopup";

require('../../../support/enzyme.setup');
import React from 'react';
import { mount } from 'enzyme';
import InfoPopupFactory from '../../../../src/components/infopopups/common/InfoPopupFactory';
import AppellantFactumPopup from '../../../../src/components/infopopups/AppellantFactumPopup';
import ReplyBookPopup from '../../../../src/components/infopopups/ReplyBookPopup';
import HearingPopup from '../../../../src/components/infopopups/HearingPopup';
import CourtOrderPopup from '../../../../src/components/infopopups/CourtOrderPopup';
import RespondentFactumPopup from '../../../../src/components/infopopups/RespondentFactumPopup';
import CrossAppealPopup from '../../../../src/components/infopopups/CrossAppealPopup';
import AppearancePopup from '../../../../src/components/infopopups/AppearancePopup';
import AppealRecordPopup from '../../../../src/components/infopopups/AppealRecordPopup';
import AppellantInitialPopup from '../../../../src/components/infopopups/AppellantInitialPopup';
import NoticeOfHearingPopup from '../../../../src/components/infopopups/NoticeOfHearingPopup';
import AppellantCourtOrderPopup from '../../../../src/components/infopopups/AppellantCourtOrderPopup';
import BookAnAppealPopup from '../../../../src/components/infopopups/BookAnAppealPopup';
import ReviewPopup from "../../../../src/components/infopopups/ReviewPopup";
import ReviewHearingPopup from "../../../../src/components/infopopups/ReviewHearingPopup";
import LeaveHearingDocumentsPopup from "../../../../src/components/infopopups/LeaveHearingDocumentsPopup";
import LeaveHearingPopup from "../../../../src/components/infopopups/LeaveHearingPopup";
import DecisionPopup from "../../../../src/components/infopopups/DecisionPopup";
import CompleteAppealPopup from "../../../../src/components/infopopups/CompleteAppealPopup";
import RespondToAppealHearingPopup from "../../../../src/components/infopopups/RespondToAppealHearingPopup";
import RespondToLeaveToAppealHearingPopup from "../../../../src/components/infopopups/RespondToLeaveToAppealHearingPopup"

describe('InfoPopupFactory', ()=> {

    describe('factory', ()=>{

        test('returns null when hidden', ()=>{
            let popup = mount(<InfoPopupFactory />);
            let view = popup.instance().render();

            expect(view).toEqual(null);
        });

        let close = ()=>{};
        let leaveGranted = ()=>{};
        let leaveRefused = ()=>{};
        let respondToLeaveGranted = ()=>{};
        let respondToLeaveRefused = ()=>{};

        test('can build AppellantFactumPopup', ()=>{            
            let popup = mount(<InfoPopupFactory show="true" type="factum" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<AppellantFactumPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build ReplyBookPopup', ()=>{            
            let popup = mount(<InfoPopupFactory show="true" type="replybook" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<ReplyBookPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build HearingPopup for respondent', ()=>{
            let popup = mount(<InfoPopupFactory show="true" type="respondenthearing" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<HearingPopup
                close={close}
                getSections={popup.getSections}
                link1="2.5-how-to-prepare-for-the-hearing?ct=t(sidebar-link)"
                link2="2.6-what-happens-at-the-hearing?ct=t(sidebar-link)"
                link3="step-3-after-hearing?ct=t(step-index-link)"
                type="respondent"
            />);
        });

        test('can build HearingPopup for appellant', ()=>{
            let popup = mount(<InfoPopupFactory show="true" type="appellanthearing" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(
                <HearingPopup
                    close={close}
                    getSections={popup.getSections}
                    link1="3.3-how-to-prepare-for-the-hearing?ct=t(step-index-link)"
                    link2="3.4-what-happens-at-the-hearing?ct=t(sidebar-link)"
                    link3="3.1-making-chambers-applications?ct=t(step-index-link)"
                    type="appellant"
                />);
        });
        
        test('can build CourtOrderPopup', ()=>{            
            let popup = mount(<InfoPopupFactory show="true" type="courtorder" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<CourtOrderPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build RespondentFactumPopup', ()=>{            
            let popup = mount(<InfoPopupFactory show="true" type="respondentfactum" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<RespondentFactumPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build CrossAppealPopup', ()=>{            
            let popup = mount(<InfoPopupFactory show="true" type="crossappeal" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<CrossAppealPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build AppearancePopup', ()=>{            
            let popup = mount(<InfoPopupFactory show="true" type="leave-application-appearance" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<AppearancePopup close={close} getSections={popup.getSections} noticeType="Notice of Application for Leave to Appeal" />);
        });
        
        test('can build AppearancePopup with notice', ()=>{            
            let popup = mount(<InfoPopupFactory show="true" type="appearance" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<AppearancePopup close={close} getSections={popup.getSections} noticeType="Notice of Appeal" />);
        });
        
        test('can build AppealRecordPopup', ()=>{            
            let popup = mount(<InfoPopupFactory show="true" type="appealrecord" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<AppealRecordPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build AppellantInitialPopup', ()=>{            
            let popup = mount(<InfoPopupFactory show="true" type="appellantinitial" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<AppellantInitialPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build NoticeOfHearingPopup', ()=>{            
            let popup = mount(<InfoPopupFactory show="true" type="noticeofhearing" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<NoticeOfHearingPopup close={close} getSections={popup.getSections}/>);
        });
        
        test('can build AppellantCourtOrderPopup', ()=>{            
            let popup = mount(<InfoPopupFactory show="true" type="appellantcourtorder" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<AppellantCourtOrderPopup close={close} getSections={popup.getSections}/>);
        });

        test('can build BookAnAppealPopup', ()=>{
            let popup = mount(<InfoPopupFactory show="true" type="bookappeal" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<BookAnAppealPopup close={close} getSections={popup.getSections}/>);
        });

        test('can build ReviewPopup', ()=>{
            let popup = mount(<InfoPopupFactory show="true" type="review" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<ReviewPopup close={close} getSections={popup.getSections}/>);
        });

        test('can build ReviewHearingPopup', ()=>{
            let popup = mount(<InfoPopupFactory show="true" type="reviewhearing" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<ReviewHearingPopup close={close} getSections={popup.getSections}/>);
        });

        test('can build ApplyForLeavePopup', ()=>{
            let popup = mount(<InfoPopupFactory show="true" type="applyforleave" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<ApplyForLeavePopup close={close} getSections={popup.getSections}/>);
        });

        test('can build LeaveHearingDocumentsPopup', ()=>{
            let popup = mount(<InfoPopupFactory show="true" type="leavehearingdocs" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<LeaveHearingDocumentsPopup close={close} getSections={popup.getSections}/>);
        });

        test('can build LeaveHearingPopup', ()=>{
            let popup = mount(<InfoPopupFactory show="true" type="leavehearing" close={close}/>).instance();
            let view = popup.render();

            expect(view).toEqual(<LeaveHearingPopup close={close} getSections={popup.getSections}/>);
        });

        test('can build respondent DecisionPopup', ()=>{
            let popup = mount( <InfoPopupFactory
                show="true"
                type="respondentdecision"
                close={close}
                respondToLeaveGranted={respondToLeaveGranted()}
                respondToLeaveRefused={respondToLeaveRefused()}
            />).instance();
            let view = popup.render();

            expect(view).toEqual(
                <DecisionPopup
                    close={close}
                    getSections={popup.getSections}
                    respondToLeaveGranted={respondToLeaveGranted()}
                    respondToLeaveRefused={respondToLeaveRefused()}
                    type={"respondent"}
                    question="Was the appellant's leave to appeal granted or refused?"
                    title="Decision on Leave to Appeal"
            />);
        });

        test('can build appellant DecisionPopup', ()=>{
            let popup = mount(
                <InfoPopupFactory
                    show="true"
                    type="decision"
                    close={close}
                    leaveGranted={leaveGranted()}
                    leaveRefused={leaveRefused()}
                />).instance();
            let view = popup.render();

            expect(view).toEqual(
                <DecisionPopup
                    close={close}
                    getSections={popup.getSections}
                    leaveGranted={leaveGranted()}
                    leaveRefused={leaveRefused()}
                    question="Was your leave to appeal granted or refused?"
                    title="Decision on Leave to Appeal"
                />);
        });

        test('can build appellant CompleteAppealPopup', ()=>{
            let popup = mount(<InfoPopupFactory show="true" type="appellantcomplete" close={close} />).instance();
            let view = popup.render();

            expect(view).toEqual(<CompleteAppealPopup close={close} getSections={popup.getSections} type="appellant" />);
        });

        test('can build respondent CompleteAppealPopup', ()=>{
            let popup = mount(<InfoPopupFactory show="true" type="respondentcomplete" close={close} />).instance();
            let view = popup.render();

            expect(view).toEqual(<CompleteAppealPopup close={close} getSections={popup.getSections} type="respondent" />);
        });

        test('can build respondent RespondToAppealHearingPopup', ()=>{
            let popup = mount(<InfoPopupFactory show="true" type="respondentappealhearing" close={close} />).instance();
            let view = popup.render();

            expect(view).toEqual(<RespondToAppealHearingPopup close={close} getSections={popup.getSections} />);
        });

        test('can build respondent RespondToLeaveToAppealHearingPopup', ()=>{
            let popup = mount(<InfoPopupFactory show="true" type="respondentleavetoappealhearing" close={close} />).instance();
            let view = popup.render();

            expect(view).toEqual(<RespondToLeaveToAppealHearingPopup close={close} getSections={popup.getSections} />);
        });
    });
});