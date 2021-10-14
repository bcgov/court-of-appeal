<template>
<div>
    <b-button  v-on:click="trail1 = !trail1">GLOW</b-button>
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
            :active="true"                       
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
            startpoint='70%'
        />

        <div
            :style="{marginLeft: '204px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '3%',
                position: 'absolute',
                top: '374px',
                zIndex: '1',
                marginBottom: '81px'}"
        />

        <FormIcon 
            :style="{top: '46%', left: '21%'}"
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
            :style="{top: '46.75%', left: '44%', height:'6rem'}"
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
                width: '2%',
                position: 'absolute',
                top: '91%',
                zIndex: '1',
                marginBottom: '81px'}"
        />

        <GavelIcon 
            :style="{left: '24%', top: '82%'}"
            class="journey-box" 
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
            titleStyle="margin-top: 1.5rem;"            
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

                <initial-documents-notice-of-appeal-window-content v-if="windowType.initialDocumentsNoticeOfAppealHasRight"/> 
                <book-appeal-date-window-content v-else-if="windowType.bookAppealDateHasRight"/>
                <notice-of-hearing-window-content v-else-if="windowType.noticeOfHearingHasRight"/>                
                <the-hearing-start-appeal-window-content v-else-if="windowType.theHearingStartAppeal"/>                
                <court-order-window-content v-else-if="windowType.courtOrder"/>
                <appeal-process-complete-window-content v-else-if="windowType.appealProcessCompleteHasRight"/>
               
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

import { journeyStepType } from '@/types/Information';
import Trail from './Trail.vue'
import FormIcon from './journeyicons/FormIcon.vue'
import ReturnTrail from './ReturnTrail.vue'
import CalendarIcon from './journeyicons/CalendarIcon.vue'
import GavelIcon from './journeyicons/GavelIcon.vue'
import EndCircle from './journeyicons/EndCircle.vue'

import InstructionWindowFooter from '../components/InstructionWindowFooter.vue';
import PathSidebar from '../components/PathSidebar.vue';
import NoticeOfHearingWindowContent from '../components/AppRightToAppeal/NoticeOfHearingAppRightToAppealPg.vue';
import BookAppealDateWindowContent from '../components/AppRightToAppeal/BookAppealDateAppRightToAppealPg.vue';
import InitialDocumentsNoticeOfAppealWindowContent from '../components/AppRightToAppeal/InitialDocumentsAppRightToAppealPg.vue';
import TheHearingStartAppealWindowContent from '../components/AppRightToAppeal/TheHearingAppRightToAppealPg.vue';
import CourtOrderWindowContent from '../components/AppRightToAppeal/CourtOrderAppRightToAppealPg.vue';
import AppealProcessCompleteWindowContent from '../components/AppRightToAppeal/AppealProcessCompleteAppRightToAppealPg.vue';





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
        TheHearingStartAppealWindowContent,
        CourtOrderWindowContent,
        AppealProcessCompleteWindowContent
    }
})
export default class AppellantRightToAppealJourneyMap extends Vue {

trail1 = false;
    showWindow = false;
    windowTitle = '';
    pathType = '';
    pathHeight = '';
    noticeOfHearingHeight = '11rem';
    bookAppealDateHeight = '2rem';
    initialDocumentsNoticeOfAppealHeight = '32rem';
    theHearingStartAppealHeight = '6rem';
    courtOrderHeight = '6rem';
    appealProcessCompleteHeight = '3rem';
    windowType = {theHearing: true} as journeyStepType;

    displayWindow(){
        if (this.windowType.noticeOfHearingHasRight){
            this.windowTitle = "Notice of Hearing";
            this.pathType = "share";
            this.pathHeight = this.noticeOfHearingHeight;
        } else if (this.windowType.bookAppealDateHasRight){
            this.windowTitle = "Book Appeal Date";
            this.pathType = "gavel";
            this.pathHeight = this.bookAppealDateHeight;
        } else if (this.windowType.initialDocumentsNoticeOfAppealHasRight){
            this.windowTitle = "Initial Documents";
            this.pathType = "share";
            this.pathHeight = this.initialDocumentsNoticeOfAppealHeight;
        } else if (this.windowType.theHearingStartAppeal){
            this.windowTitle = "The Hearing";
            this.pathType = "gavel";
            this.pathHeight = this.theHearingStartAppealHeight;
        } else if (this.windowType.courtOrder){
            this.windowTitle = "Court Order";
            this.pathType = "info";
            this.pathHeight = this.courtOrderHeight;
        } else if (this.windowType.appealProcessCompleteHasRight){
            this.windowTitle = "Appeal Process Complete";
            this.pathType = "info";
            this.pathHeight = this.appealProcessCompleteHeight;
        } 
    }


}
</script>
<style scoped>
@import './journeyStyles/JourneyMap.css';
@import "./journeyStyles/ReturnTrail.css";
@import './journeyStyles/JourneyIcons.css';
@import './journeyStyles/PageeIcon.css';
</style>