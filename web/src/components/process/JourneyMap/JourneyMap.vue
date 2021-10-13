<template>
<div>
    <b-button  v-on:click="trail1 = !trail1">H</b-button>
    <b-button  v-on:click="displayWindow()">modal</b-button>
    <div class="journey-map-container">

        <div :class="{'journey-start-circle':true, 'completed-step': trail1}" />        
            
        <div
            :style="{marginLeft: '50px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '65%',
                position: 'absolute',
                top: '92px',
                zIndex: '1'}"
        />

        <Trail                
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='25%'
            level=1                
        />

        <FormIcon   
            style="left: 30%"
            :twoPages="false"
            stepTitle="Initial Documents"
            action="this.iconClicked.bind(this, 'appellantinitial')"
            :active="false"                       
            order=1
            status="new"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(1, this.state.steps)"
            :ready="true"
        />
                    
        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='32%'
            level=1
        />

        <FormIcon 
            style="left: 60%"
            :twoPages="true"
            stepTitle="Appeal Record and Transcript"
            stepTitleClass="step-title-wide"
            action="this.iconClicked.bind(this, 'appealrecord')"
            :active="true"
            order=2
            status="twoPages"
            :ready="true"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(2,this.state.steps)"
        />

        <ReturnTrail
            :status="trail1?'completed':''"
            startpoint='68%'
        />

        <div
            :style="{marginLeft: '204px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '53%',
                position: 'absolute',
                top: '79%',
                zIndex: '1',
                marginBottom: '81px'}"
        />

        <FormIcon 
            :style="{top: '46%', left: '24%'}"
            :twoPages="true"
            stepTitle="Factum, Appeal Book, and Certificate of Readiness"
            action="this.iconClicked.bind(this, 'factum')"
            stepTitleClass="step-title-wide"
            :active="true"
            order=3
            status="twoPages"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(3, this.state.steps)"
            :ready="true"
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='27%'
            :style="{top: '46%', left: '25%', position: 'absolute'}"
            level=2
        />

        <CalendarIcon 
            :style="{top: '46%', left: '46%'}"
            stepTitle="Book Appeal Date with Registry"
            stepTitleClass="step-title-wide"
            action="this.iconClicked.bind(this, 'bookappeal')"
            :active="true"
            order=4
            :status="trail1?'completed':''"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(4, this.state.steps)"
            :ready="true"
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='27%'
            :style="{top: '46%', left: '50%', position: 'absolute'}"
            level=2
        />

        <FormIcon 
            :style="{top: '46%', left: '70%'}"
            :twoPages="false"
            stepTitle="Notice of Hearing"
            action="this.iconClicked.bind(this, 'noticeofhearing')"
            :active="true"
            order=5
            :status="'new'"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(5, this.state.steps)"
            :ready="true"
        />

        <ReturnTrail
            priorstep="this.state.steps[4]"
            :status="trail1?'completed':''"
            top='117px'
            startpoint='71%'
        />
            
        <div
            :style="{marginLeft: '204px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '62%',
                position: 'absolute',
                top: '91%',
                zIndex: '1',
                marginBottom: '81px'}"
        />

        <GavelIcon 
            :style="{left: '24%', top: '82%'}"
            className="journey-box" 
            stepTitle="The Hearing" 
            action="this.iconClicked.bind(this, 'appellanthearing')"
            :active="true"
            order=6
            :status="trail1?'completed':''"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(6, this.state.steps)"
            :ready="true"
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='35%'
            :style="{top: '85.05%', left: '25%', position: 'absolute'}"
            level=3
        />

        <FormIcon 
            :style="{left: '54%', top: '84.7%'}"
            class="journey-box"
            :twoPages="false"
            stepTitle="Court Order"
            action="this.iconClicked.bind(this, 'appellantcourtorder')"
            :active="true"
            order=7
            :status="'new'"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(7, this.state.steps)"
            :ready="true"
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='33%'
            :style="{top: '85.05%', left: '58%', position: 'absolute', marginBottom: '100px'}"
            level=3
        />

        <EndCircle
            stepTitle="Appeal Process Complete"
            action="this.iconClicked.bind(this,'appellantcomplete')"
            :active="true"
            :completed="trail1"
            :style="{top: '84.7%', left: '82%'}"
            titleStyle="margin-top: 6rem;"            
        />
    </div>

    <b-modal size="xl" v-model="showWindow" header-class="bg-primary">
        <template v-slot:modal-title>
            <div style="font-size: 2em;" class="mb-0 text-white">{{windowTitle}}</div>
        </template>

        <b-row no-gutters>
            <b-col cols="1">
                <path-sidebar v-bind:pathType="pathType" v-bind:pathHeight="pathHeight"/>
            </b-col>
            <b-col cols="11" style="padding: 0 0 0 2rem;">
                <notice-of-hearing-window-content v-if="windowType.noticeOfHearing"/>
                <book-appeal-date-window-content v-else-if="windowType.bookAppealDate"/>
                <initial-documents-notice-of-appeal-window-content v-else-if="windowType.initialDocumentsNoticeOfAppeal"/>
                <the-hearing-window-content v-else-if="windowType.theHearing"/>
                <court-order-window-content v-else-if="windowType.courtOrder"/>
                <appeal-process-complete-window-content v-else-if="windowType.appealProcessComplete"/>
                <initial-documents-notice-of-application-for-leave-to-appeal-window-content v-else-if="windowType.initialDocumentsNoticeOfApplicationForLeaveToAppeal"/>
                <hearing-documents-motion-window-content v-else-if="windowType.hearingDocumentsMotion"/>
                <decision-on-leave-to-appeal-window-content v-else-if="windowType.decisionOnLeaveToAppeal"/>
                <notice-of-appearance-window-content v-else-if="windowType.noticeOfAppearance"/>
            </b-col>

        </b-row>

      

      
      <template v-slot:modal-footer>
        <instruction-window-footer/>
      </template>
      <template v-slot:modal-header-close>
        <b-button
          variant="outline-primary text-white"
          style="font-weight: bold; font-size: 1.25em;"
          class="closeButton"
          @click="showWindow = false"
          >&times;</b-button
        >
      </template>
    </b-modal>

    
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Trail from './Trail.vue';
import FormIcon from './journeyicons/FormIcon.vue';
import ReturnTrail from './ReturnTrail.vue';
import CalendarIcon from './journeyicons/CalendarIcon.vue';
import GavelIcon from './journeyicons/GavelIcon.vue';
import EndCircle from './journeyicons/EndCircle.vue';
import InstructionWindowFooter from './components/InstructionWindowFooter.vue';
import PathSidebar from './components/PathSidebar.vue';
import NoticeOfHearingWindowContent from './components/startAppeal/hasRightToAppeal/NoticeOfHearingWindowContent.vue';
import BookAppealDateWindowContent from './components/startAppeal/hasRightToAppeal/BookAppealDateWindowContent.vue';
import InitialDocumentsNoticeOfAppealWindowContent from './components/startAppeal/hasRightToAppeal/InitialDocumentsNoticeOfAppealWindowContent.vue';
import TheHearingWindowContent from './components/startAppeal/hasRightToAppeal/TheHearingWindowContent.vue';
import CourtOrderWindowContent from './components/startAppeal/hasRightToAppeal/CourtOrderWindowContent.vue';
import AppealProcessCompleteWindowContent from './components/startAppeal/hasRightToAppeal/AppealProcessCompleteWindowContent.vue';
import InitialDocumentsNoticeOfApplicationForLeaveToAppealWindowContent from './components/startAppeal/noRightToAppeal/InitialDocumentsNoticeOfApplicationForLeaveToAppealWindowContent.vue'
import HearingDocumentsMotionWindowContent from './components/startAppeal/noRightToAppeal/HearingDocumentsMotionWindowContent.vue';
import DecisionOnLeaveToAppealWindowContent from './components/startAppeal/noRightToAppeal/DecisionOnLeaveToAppealWindowContent.vue';
import NoticeOfAppearanceWindowContent from './components/respondToAppeal/noticeOfAppeal/NoticeOfAppearanceWindowContent.vue';
import { journeyStepType } from '@/types/Information';

@Component({
    components:{
        Trail,
        FormIcon,
        ReturnTrail,
        CalendarIcon,
        GavelIcon,
        EndCircle,
        InstructionWindowFooter,
        PathSidebar,
        NoticeOfHearingWindowContent,
        BookAppealDateWindowContent,
        InitialDocumentsNoticeOfAppealWindowContent,
        InitialDocumentsNoticeOfApplicationForLeaveToAppealWindowContent,
        TheHearingWindowContent,
        CourtOrderWindowContent,
        AppealProcessCompleteWindowContent,
        HearingDocumentsMotionWindowContent,
        DecisionOnLeaveToAppealWindowContent,
        NoticeOfAppearanceWindowContent
    }
})
export default class JourneyMap extends Vue {

    trail1 = false

    showWindow = false;
    windowTitle = '';
    pathType = '';
    pathHeight = '';
    noticeOfHearingHeight = '11rem';
    bookAppealDateHeight = '2rem';
    initialDocumentsNoticeOfAppealHeight = '32rem';
    theHearingHeight = '6rem';
    courtOrderHeight = '6rem';
    appealProcessCompleteHeight = '3rem';
    initialDocumentsNoticeOfApplicationForLeaveToAppealHeight = '28rem';
    hearingDocumentsMotionHeight = '16rem';
    decisionOnLeaveToAppealHeight = '0';
    noticeOfAppearanceHeight = '28rem';
    windowType = {hearingDocumentsMotion: true} as journeyStepType;

    displayWindow(){

        if (this.windowType.noticeOfHearing){
            this.windowTitle = "Notice of Hearing";
            this.pathType = "share";
            this.pathHeight = this.noticeOfHearingHeight;
        } else if (this.windowType.bookAppealDate){
            this.windowTitle = "Book Appeal Date";
            this.pathType = "gavel";
            this.pathHeight = this.bookAppealDateHeight;
        } else if (this.windowType.initialDocumentsNoticeOfAppeal){
            this.windowTitle = "Initial Documents";
            this.pathType = "share";
            this.pathHeight = this.initialDocumentsNoticeOfAppealHeight;
        } else if (this.windowType.theHearing){
            this.windowTitle = "The Hearing";
            this.pathType = "gavel";
            this.pathHeight = this.theHearingHeight;
        } else if (this.windowType.courtOrder){
            this.windowTitle = "Court Order";
            this.pathType = "info";
            this.pathHeight = this.theHearingHeight;
        } else if (this.windowType.appealProcessComplete){
            this.windowTitle = "Appeal Process Complete";
            this.pathType = "info";
            this.pathHeight = this.appealProcessCompleteHeight;
        } else if (this.windowType.initialDocumentsNoticeOfApplicationForLeaveToAppeal){
            this.windowTitle = "Initial Documents";
            this.pathType = "share";
            this.pathHeight = this.initialDocumentsNoticeOfApplicationForLeaveToAppealHeight;
        } else if (this.windowType.hearingDocumentsMotion){
            this.windowTitle = "Hearing Documents";
            this.pathType = "share";
            this.pathHeight = this.hearingDocumentsMotionHeight;
        } else if (this.windowType.decisionOnLeaveToAppeal){
            this.windowTitle = "Decision on Leave to Appeal";
            this.pathType = "gavel";
            this.pathHeight = this.decisionOnLeaveToAppealHeight;
        } else if (this.windowType.noticeOfAppearance){
            this.windowTitle = "Notice of Appearance";
            this.pathType = "share";
            this.pathHeight = this.noticeOfAppearanceHeight;
        }
        
        
        this.showWindow = true;

    }


}
</script>

<style scoped lang="scss">


</style>



