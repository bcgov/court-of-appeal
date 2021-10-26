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
            width='28%'
            level=1                
        />

        <form-icon   
            style="left: 28%"
            :twoPages="false"
            stepTitle="Initial Documents"
            @action="displayWindow('Initial Documents')"
            @completed="completed"            
            order=1
            v-bind="pageState[0]"           
        />
                    
        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[0]"
            width='30%'
            level=1
        />

        <form-icon 
            style="left: 58%"
            :twoPages="true"
            stepTitle="Hearing Documents"
            stepTitleClass="step-title-wide"
            @action="displayWindow('Hearing Documents')"
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

        <gavel-end-circle
            stepTitle="Decision on Leave to Appeal"
            @action="displayWindow('Decision on Leave')"
            :completed="completedTrail[1]"
            :style="{position: 'absolute', left: '82%'}"
            :titleStyle="{position: 'absolute', top:'97px', width: '150px', left: '-17px'}" 
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
              
                <initial-documents-app-apply-leave-pg v-if="initialDocumentsContent"/>
                <hearing-documents-motion-app-apply-leave-pg v-else-if="hearingDocumentsContent"/>
                <decision-on-leave-to-appeal-app-apply-leave-pg v-else-if="decisionOnLeaveContent"/>
                
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
import GavelEndCircle from './journeyicons/GavelEndCircle.vue';

import InstructionWindowFooter from '../components/InstructionWindowFooter.vue';
import PathSidebar from '../components/PathSidebar.vue';
import InitialDocumentsAppApplyLeavePg from '../components/AppApplyLeave/InitialDocumentsAppApplyLeavePg.vue';
import HearingDocumentsMotionAppApplyLeavePg from '../components/AppApplyLeave/HearingDocumentsMotionAppApplyLeavePg.vue';
import DecisionOnLeaveToAppealAppApplyLeavePg from '../components/AppApplyLeave/DecisionOnLeaveToAppealAppApplyLeavePg.vue';

import {activatePage, evaluateCompletedTrails, evaluatePageState} from '@/components/utils/TrailOperations'

import { namespace } from "vuex-class";
import "@/store/modules/application";
const applicationState = namespace("Application")
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        Trail,
        FormIcon,
        GavelEndCircle,
        InstructionWindowFooter,
        PathSidebar,       
        InitialDocumentsAppApplyLeavePg,       
        HearingDocumentsMotionAppApplyLeavePg,
        DecisionOnLeaveToAppealAppApplyLeavePg
    }
})

export default class AppellantApplyForLeaveJourneyMap extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    showWindow = false;
    windowTitle = '';
    pathTypes = [] as string[];
    pathHeights = [] as string[];

    dataReady = false;
    completedTrail :boolean[] = []
    numOfPages = 0;
    currentStep = 0;
    pageState : {active:boolean; status:string; ready:boolean;}[] = []


    initialDocumentsContent = false;
    hearingDocumentsContent = false;
    decisionOnLeaveContent = false;

    mounted(){
        this.dataReady = false;

        this.currentStep = this.stPgNo.APP_APPLY_LEAVE._StepNo;
        this.numOfPages = Object.keys(this.stPgNo.APP_APPLY_LEAVE).length-1;

        this.pageState = evaluatePageState(this.numOfPages, this.currentStep);
        
        this.dataReady = true;
    }

    public displayWindow(contentType: string){

        this.initialDocumentsContent = false;
        this.hearingDocumentsContent = false;
        this.decisionOnLeaveContent = false;

        if (contentType == "Initial Documents"){

            this.windowTitle = "Initial Documents";
            this.pathTypes = ["share"];
            this.pathHeights = ['28rem'];
            this.initialDocumentsContent = true;

        } else if (contentType == "Hearing Documents"){

            this.windowTitle = "Hearing Documents";
            this.pathTypes = ["share"];
            this.pathHeights = ['16rem'];
            this.hearingDocumentsContent = true;

        } else if (contentType == "Decision on Leave"){
            
            this.windowTitle = "Decision on Leave to Appeal";
            this.pathTypes = ["gavel"];
            this.pathHeights = ['0'];
            this.decisionOnLeaveContent = true;
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