<template>
    <div v-if="dataReady">
        <div class="journey-map-container">

            <div :class="{'journey-start-circle':true, 'completed-step': completedTrail[0]}" />        
                
            <div
                :style="{marginLeft: '50px',
                    borderTop: '9px solid rgb(159, 191, 226)',
                    width: '79%',
                    position: 'absolute',
                    top: '41.5%',
                    zIndex: '1'}"
            />         

            <trail
                className="journey-trail-l1-moveable"
                :completed="completedTrail[0]"
                width='25%'
                level=1
            />
            
            <form-icon 
                :style="{left: '28%'}"
                :twoPages="true"
                stepTitle="Application for Review"            
                @action="displayWindow('Application for Review')"
                @completed="completed"            
                order=1
                v-bind="pageState[0]"
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="completedTrail[0]"
                width='31%'
                level=1
            />

            <gavel-icon 
                :style="{left: '55%', top:'15%'}"
                stepTitle="The Hearing"
                class="journey-box"             
                @action="displayWindow('The Hearing')"
                @completed="completed"            
                order=2
                v-bind="pageState[1]"
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="completedTrail[1]"
                width='25%'
                level=1
            />

            <clock-end-circle 
                :style="{position: 'absolute', left: '80%', top: '22%'}"
                stepTitle="Final Decision on Leave to Appeal"
                :titleStyle="{position: 'absolute', top: '27px', width: '150px', left: '0px'}"
                @action="displayWindow('Final Decision on Leave to Appeal')"
                :completed="completedTrail[1]"
                order=3
                v-bind="pageState[2]"
            />
        </div>

        <b-modal size="xl" v-model="showWindow" header-class="bg-primary">

            <template v-slot:modal-title>
                <div style="font-size: 2em;" class="mb-0 text-white">{{windowTitle}}</div>
            </template>

            <b-row no-gutters>

                <b-col cols="1">
                    <path-sidebar v-bind:pathTypes="pathTypes" v-bind:pathHeights="pathHeights"/>
                </b-col>
                <b-col cols="11" style="padding: 0 0 0 2rem;">                
                    
                    <application-for-review-rsp-to-leave-refused-pg v-if="applicationForReviewContent"/>
                    <the-hearing-rsp-to-leave-refused-pg v-else-if="theHearingContent"/>                    
                    <final-decision-on-leave-to-appeal-rsp-to-leave-refused-pg @closeWindow="showWindow = false" v-else-if="finalDecisionOnLeaveToAppealContent"/>
                    
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
import { namespace } from "vuex-class";

import "@/store/modules/application";
const applicationState = namespace("Application");

import Trail from './Trail.vue';
import FormIcon from './journeyicons/FormIcon.vue';
import GavelIcon from './journeyicons/GavelIcon.vue';
import ClockEndCircle from './journeyicons/ClockEndCircle.vue';

import InstructionWindowFooter from '../components/InstructionWindowFooter.vue';
import PathSidebar from '../components/PathSidebar.vue';
import ApplicationForReviewRspToLeaveRefusedPg from '../components/RspToLeaveRefused/ApplicationForReviewRspToLeaveRefusedPg.vue';
import TheHearingRspToLeaveRefusedPg from '../components/RspToLeaveRefused/TheHearingRspToLeaveRefusedPg.vue';
import FinalDecisionOnLeaveToAppealRspToLeaveRefusedPg from '../components/RspToLeaveRefused/FinalDecisionOnLeaveToAppealRspToLeaveRefusedPg.vue';

import {activatePage, evaluateCompletedTrails, evaluatePageState} from '@/components/utils/TrailOperations';
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        Trail,
        FormIcon,
        GavelIcon,
        ClockEndCircle,
        InstructionWindowFooter,
        PathSidebar,
        ApplicationForReviewRspToLeaveRefusedPg,
        TheHearingRspToLeaveRefusedPg,
        FinalDecisionOnLeaveToAppealRspToLeaveRefusedPg
    }
})
export default class RespondToLeaveRefusedJourneyMap extends Vue {
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    dataReady = false;
    completedTrail :boolean[] = []
    numOfPages = 0;
    currentStep = 0;
    pageState : {active:boolean; status:string; ready:boolean;}[] = []

    showWindow = false;
    windowTitle = '';
    pathTypes = [] as string[];
    pathHeights = [] as string[];

    applicationForReviewContent = false;
    theHearingContent = false;   
    finalDecisionOnLeaveToAppealContent = false; 
    
    mounted(){
        this.dataReady = false;

        this.currentStep = this.stPgNo.RSP_TO_LEAVE_REFUSED._StepNo;
        this.numOfPages = Object.keys(this.stPgNo.RSP_TO_LEAVE_REFUSED).length-1;

        this.getJourneyMapCurrentState();
        
        this.dataReady = true;
    }

    public completed(order, checked){        
        activatePage(order, checked, this.currentStep)
        this.getJourneyMapCurrentState();
    }

    public getJourneyMapCurrentState(){
        this.completedTrail = evaluateCompletedTrails(this.numOfPages, this.currentStep);
        this.pageState = evaluatePageState(this.numOfPages, this.currentStep);
    }

    public displayWindow(contentType: string){
        
        this.applicationForReviewContent = false;
        this.theHearingContent = false;   
        this.finalDecisionOnLeaveToAppealContent = false; 

        if (contentType == "Application for Review"){

            this.windowTitle = "Hearing Documents: Reply Book";
            this.pathTypes = ["share"];
            this.pathHeights = ['12rem'];
            this.applicationForReviewContent = true;

        } else if (contentType == "The Hearing"){
            
            this.windowTitle = "The Hearing";
            this.pathTypes = ["gavel"];
            this.pathHeights = ['0'];
            this.theHearingContent = true;

        } else if (contentType == "Final Decision on Leave to Appeal"){
            
            this.windowTitle = "Final Decision on Leave to Appeal";
            this.pathTypes = ["info"];
            this.pathHeights = ['3rem'];
            this.finalDecisionOnLeaveToAppealContent = true;
        } 

        this.showWindow = true;
    }

}
</script>

<style scoped>
    @import './journeyStyles/JourneyMap.css';
    @import "./journeyStyles/ReturnTrail.css";
    @import './journeyStyles/JourneyIcons.css';
    @import './journeyStyles/PageeIcon.css';
</style>