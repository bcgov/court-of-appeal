<template>
<div>

    <b-button  v-on:click="displayWindow()">modal</b-button>

    <div>        
        <AppellantApplyForLeaveJourneyMap />
        <AppellantLeaveGrantedJourneyMap />
        <AppellantLeaveRefusedJourneyMap />
        <AppellantRightToAppealJourneyMap />
        
        <RespondToAppealJourneyMap />
        <RespondToLeaveGrantedJourneyMap />
        <RespondToLeaveJourneyMap />
        <RespondToLeaveRefusedFinalJourneyMap />
        <RespondToLeaveRefusedJourneyMap />
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

                <initial-documents-notice-of-appeal-window-content v-if="windowType.initialDocumentsNoticeOfAppeal"/> 
                <book-appeal-date-window-content v-else-if="windowType.bookAppealDate"/>
                <notice-of-hearing-window-content v-else-if="windowType.noticeOfHearing"/>                
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


import AppellantApplyForLeaveJourneyMap from './JourneyPathways/AppellantApplyForLeaveJourneyMap.vue'
import AppellantLeaveGrantedJourneyMap from './JourneyPathways/AppellantLeaveGrantedJourneyMap.vue'
import AppellantLeaveRefusedJourneyMap from './JourneyPathways/AppellantLeaveRefusedJourneyMap.vue'
import AppellantRightToAppealJourneyMap from './JourneyPathways/AppellantRightToAppealJourneyMap.vue'

import RespondToAppealJourneyMap from './JourneyPathways/RespondToAppealJourneyMap.vue'
import RespondToLeaveGrantedJourneyMap from './JourneyPathways/RespondToLeaveGrantedJourneyMap.vue'
import RespondToLeaveJourneyMap from './JourneyPathways/RespondToLeaveJourneyMap.vue'
import RespondToLeaveRefusedFinalJourneyMap from './JourneyPathways/RespondToLeaveRefusedFinalJourneyMap.vue'
import RespondToLeaveRefusedJourneyMap from './JourneyPathways/RespondToLeaveRefusedJourneyMap.vue'


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
        NoticeOfAppearanceWindowContent,
       
        AppellantApplyForLeaveJourneyMap,
        AppellantLeaveGrantedJourneyMap,
        AppellantLeaveRefusedJourneyMap,
        AppellantRightToAppealJourneyMap,

        RespondToAppealJourneyMap,
        RespondToLeaveGrantedJourneyMap,
        RespondToLeaveJourneyMap,
        RespondToLeaveRefusedFinalJourneyMap,
        RespondToLeaveRefusedJourneyMap
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



