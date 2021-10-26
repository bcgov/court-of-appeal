<template>
    <div v-if="dataReady">
       
        <div class="journey-map-container">

            <div :class="{'journey-start-circle':true, 'completed-step': completedTrail[0]}" />        
                
            <div
                :style="{marginLeft: '50px',
                    borderTop: '9px solid rgb(159, 191, 226)',
                    width: '75%',
                    position: 'absolute',
                    top: '19.6%',
                    zIndex: '0'}"
            />

            <trail                
                className="journey-trail-l1-moveable"
                :completed="completedTrail[0]"
                width='15%'
                level=1                
            />

            <form-icon   
                style="left: 20%"
                :twoPages="true"
                stepTitle="Appeal Record and Transcript"
                stepTitleClass="step-title-wide"
                @action="displayWindow('Appeal Record and Transcript')"
                @completed="completed"
                order=1
                v-bind="pageState[0]"                
            />
                        
            <trail
                className="journey-trail-l1-moveable"
                :completed="completedTrail[0]"
                width='28%'
                level=1
            />

            <form-icon 
                style="left: 45%"
                :twoPages="true"
                stepTitle="Factum, Appeal Book and Certificate of Readiness"
                stepTitleClass="step-title-wide"
                @action="displayWindow('Factum, Appeal Book and Certificate of Readiness')"
                @completed="completed"
                order=2
                v-bind="pageState[1]"                
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="completedTrail[1]"
                width='27%'
                level=1
            />

            <calendar-icon 
                :style="{left: '69%', marginTop: '5px'}"
                stepTitle="Book Appeal Date with Registry"
                stepTitleClass="step-title-wide"
                @action="displayWindow('Book Appeal Date')"
                @completed="completed"
                order=3
                v-bind="pageState[2]"
            />

            <return-trail
                :status="completedTrail[2]?'completed':''"
                startpoint='73%'
            />

            <div
                :style="{marginLeft: '141px',
                    borderTop: '9px solid rgb(159, 191, 226)',
                    width: '70%',
                    position: 'absolute',
                    top: '374px',
                    zIndex: '1',
                    marginBottom: '81px'
                }"
            />

            <form-icon 
                :style="{top: '70%', left: '18%'}"
                :twoPages="false"
                stepTitle="Notice of Hearing"
                stepTitleClass="step-title-wide"
                @action="displayWindow('Notice of Hearing')"
                @completed="completed"
                order=4
                v-bind="pageState[3]"
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="completedTrail[3]"
                width='25%'
                :style="{position: 'absolute', marginLeft:'20%', top:'70.3%'}"
                level=2
            />

            <gavel-icon 
                :style="{left: '41%', top: '66%'}"
                class="journey-box" 
                stepTitle="The Hearing" 
                @action="displayWindow('The Hearing')"
                @completed="completed"
                order=5
                v-bind="pageState[4]"
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="completedTrail[4]"
                width='24%'
                :style="{position: 'absolute', left:'45%', top:'70.3%'}"
                level=2
            />

            <form-icon 
                :style="{top: '70%', left: '64%'}"
                :twoPages="false"
                stepTitle="Court Order"
                stepTitleOptional="(if applicable)"
                stepTitleClass="step-title-wide"
                @action="displayWindow('Court Order')"
                @completed="completed"
                order=6
                v-bind="pageState[5]"
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="completedTrail[5]"
                width='22%'
                :style="{position: 'absolute', left:'70%', top:'70.3%'}"
                level=2
            />

            <end-circle
                stepTitle="Appeal Process Complete"
                :style="{top: '70%', left: '84%'}"
                titleStyle="margin-top: 1.5rem;"
                @action="displayWindow('Appeal Process Complete')"
                :completed="completedTrail[5]"
                order=7
                v-bind="pageState[6]"                                       
            />
        </div>

        <b-modal size="xl" v-model="showWindow" header-class="bg-primary">

            <template v-slot:modal-title>
                <div style="font-size: 2em;" class="mb-0 text-white">{{windowTitle}}</div>
            </template>

            <b-row no-gutters>

                <b-col cols="1">
                    <path-sidebar :key="updated" v-bind:pathTypes="pathTypes" v-bind:pathHeights="pathHeights"/>
                </b-col>
                <b-col cols="11" style="padding: 0 0 0 2rem;">
                
                    <appeal-record-transcript-app-leave-granted-pg @adjustHeights="adjustHeights" v-if="appealRecordTranscriptContent"/>
                    <factum-appeal-book-certificate-app-leave-granted-pg @adjustHeights="adjustHeights" v-if="factumAppealBookCertificateContent"/> 
                    <book-appeal-date-app-leave-granted-pg v-if="bookAppealDateContent"/>
                    <notice-of-hearing-app-leave-granted-pg v-else-if="noticeOfHearingContent"/>
                    <the-hearing-app-leave-granted-pg v-else-if="theHearingContent"/>
                    <court-order-app-leave-granted-pg v-else-if="courtOrderContent"/>
                    <appeal-process-complete-app-leave-granted-pg v-else-if="appealProcessCompleteContent"/>
                    
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
import Trail from './Trail.vue'
import FormIcon from './journeyicons/FormIcon.vue'
import ReturnTrail from './ReturnTrail.vue'
import CalendarIcon from './journeyicons/CalendarIcon.vue'
import GavelIcon from './journeyicons/GavelIcon.vue'
import EndCircle from './journeyicons/EndCircle.vue'

import InstructionWindowFooter from '../components/InstructionWindowFooter.vue';
import PathSidebar from '../components/PathSidebar.vue';

import AppealRecordTranscriptAppLeaveGrantedPg from '../components/AppLeaveGranted/AppealRecordTranscriptAppLeaveGrantedPg.vue';
import FactumAppealBookCertificateAppLeaveGrantedPg from '../components/AppLeaveGranted/FactumAppealBookCertificateAppLeaveGrantedPg.vue';
import BookAppealDateAppLeaveGrantedPg from '../components/AppLeaveGranted/BookAppealDateAppLeaveGrantedPg.vue';
import NoticeOfHearingAppLeaveGrantedPg from '../components/AppLeaveGranted/NoticeOfHearingAppLeaveGrantedPg.vue';
import TheHearingAppLeaveGrantedPg from '../components/AppLeaveGranted/TheHearingAppLeaveGrantedPg.vue';
import CourtOrderAppLeaveGrantedPg from '../components/AppLeaveGranted/CourtOrderAppLeaveGrantedPg.vue';
import AppealProcessCompleteAppLeaveGrantedPg from '../components/AppLeaveGranted/AppealProcessCompleteAppLeaveGrantedPg.vue';

import {activatePage, evaluateCompletedTrails, evaluatePageState} from '@/components/utils/TrailOperations'

import { namespace } from "vuex-class";
import "@/store/modules/application";
const applicationState = namespace("Application")
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        Trail,
        FormIcon,
        CalendarIcon,
        ReturnTrail,
        GavelIcon,
        EndCircle,
        InstructionWindowFooter,
        PathSidebar,
        AppealRecordTranscriptAppLeaveGrantedPg,
        FactumAppealBookCertificateAppLeaveGrantedPg,
        BookAppealDateAppLeaveGrantedPg,
        NoticeOfHearingAppLeaveGrantedPg,
        TheHearingAppLeaveGrantedPg,
        CourtOrderAppLeaveGrantedPg,
        AppealProcessCompleteAppLeaveGrantedPg
    }
})
export default class AppellantLeaveGrantedJourneyMap extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    showWindow = false;
    windowTitle = '';
    pathTypes = [] as string[];
    pathHeights = [] as string[];

    appealRecordTranscriptContent = false;
    factumAppealBookCertificateContent = false;
    bookAppealDateContent = false;
    noticeOfHearingContent = false;
    theHearingContent = false;
    courtOrderContent = false;
    appealProcessCompleteContent = false;
    updated=0;
    dataReady = false;
    completedTrail :boolean[] = []
    numOfPages = 0;
    currentStep = 0;
    pageState : {active:boolean; status:string; ready:boolean;}[] = []

    mounted(){
        this.dataReady = false;

        this.currentStep = this.stPgNo.APP_LEAVE_GRANTED._StepNo;
        this.numOfPages = Object.keys(this.stPgNo.APP_LEAVE_GRANTED).length-1;

        this.pageState = evaluatePageState(this.numOfPages, this.currentStep);
        
        this.dataReady = true;
    }

    public adjustHeights(index: number, pathHeight: string) {
        this.updated++;
        this.pathHeights[index] = pathHeight;
    }

    public displayWindow(contentType: string){

        this.appealRecordTranscriptContent = false;
        this.factumAppealBookCertificateContent = false;
        this.bookAppealDateContent = false;
        this.noticeOfHearingContent = false;
        this.theHearingContent = false;
        this.courtOrderContent = false;
        this.appealProcessCompleteContent = false;

        if (contentType == "Appeal Record and Transcript"){

            this.windowTitle = "Appeal Record and Transcript";
            this.pathTypes = ["share", "info"];
            this.pathHeights = ['15rem', '0'];
            this.appealRecordTranscriptContent = true;

        } else if (contentType == "Factum, Appeal Book and Certificate of Readiness"){

            this.windowTitle = "The Factum, Appeal Book and Certificate of Readiness";
            this.pathTypes = ["share", "share", "info"];
            this.pathHeights = ['20rem', '0', '0'];
            this.factumAppealBookCertificateContent = true;

        } else if (contentType == "Book Appeal Date"){

            this.windowTitle = "Book Appeal Date";
            this.pathTypes = ["gavel"];
            this.pathHeights = ['2rem'];
            this.bookAppealDateContent = true;

        } else if (contentType == "Notice of Hearing"){

            this.windowTitle = "Notice of Hearing";
            this.pathTypes = ["share"];
            this.pathHeights = ['12rem'];
            this.noticeOfHearingContent = true;

        } else if (contentType == "The Hearing"){
            
            this.windowTitle = "The Hearing";
            this.pathTypes = ["gavel"];
            this.pathHeights = ['6rem'];
            this.theHearingContent = true;

        } else if (contentType == "Court Order"){

            this.windowTitle = "Court Order";
            this.pathTypes = ["info"];
            this.pathHeights = ['6rem'];
            this.courtOrderContent = true;

        } else if (contentType == "Appeal Process Complete"){
            
            this.windowTitle = "Appeal Process Complete";
            this.pathTypes = ["info"];
            this.pathHeights = ['3rem'];
            this.appealProcessCompleteContent = true;
        } 

        this.showWindow = true;
    }

    public completed(order, checked){
        
        activatePage(order, checked, this.currentStep)
        this.completedTrail = evaluateCompletedTrails(this.numOfPages, this.currentStep)
        this.pageState = evaluatePageState(this.numOfPages, this.currentStep)
    }

    

}
</script>
<style scoped>
    @import './journeyStyles/JourneyMap.css';
    @import "./journeyStyles/ReturnTrail.css";
    @import './journeyStyles/JourneyIcons.css';
    @import './journeyStyles/PageeIcon.css';
</style>


