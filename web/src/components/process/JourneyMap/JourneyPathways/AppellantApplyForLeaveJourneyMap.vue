<template>
<div v-if="dataReady">
    <b-button  v-on:click="trail1 = !trail1">GLOW</b-button>
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
            :active="pageState[0].active"
            :status="pageState[0].status"                        
            :ready="pageState[0].ready"
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
            :active="pageState[1].active"
            :status="pageState[1].status"                        
            :ready="pageState[1].ready"            
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
            :active="pageState[2].active"
            :status="pageState[2].status"                        
            :ready="pageState[2].ready"        
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
import { togglePage, pageStatus, prevPageStatus, nextPageStatus } from '@/components/utils/StepsPagesFunctions';

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
    
    trail1 = false
    showWindow = false;
    windowTitle = '';
    pathType = '';
    pathHeight = '';

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
        this.evaluatePageState();
        this.dataReady = true;
    }

    public displayWindow(contentType: string){

        this.initialDocumentsContent = false;
        this.hearingDocumentsContent = false;
        this.decisionOnLeaveContent = false;

        if (contentType == "Initial Documents"){

            this.windowTitle = "Initial Documents";
            this.pathType = "share";
            this.pathHeight = '28rem';
            this.initialDocumentsContent = true;

        } else if (contentType == "Hearing Documents"){

            this.windowTitle = "Hearing Documents";
            this.pathType = "share";
            this.pathHeight = '16rem';
            this.hearingDocumentsContent = true;

        } else if (contentType == "Decision on Leave"){
            
            this.windowTitle = "Decision on Leave to Appeal";
            this.pathType = "gavel";
            this.pathHeight = '0';
            this.decisionOnLeaveContent = true;
        }         
        this.showWindow = true;
    }

    public completed(order, checked){

        order--;

        if(  checked && prevPageStatus(order, this.currentStep) && !nextPageStatus(order, this.currentStep)||
            !checked && prevPageStatus(order, this.currentStep) && !nextPageStatus(order, this.currentStep)
        ){
            togglePage(order, checked, this.currentStep);        
        }

        this.evaluateCompletedTrails()
        this.evaluatePageState()
    }

    public evaluateCompletedTrails(){
        this.completedTrail = []
        for(let pageNum=0; pageNum<this.numOfPages; pageNum++){
            this.completedTrail.push(pageStatus(pageNum, this.currentStep))
        }
    }

    public evaluatePageState(){
        this.pageState = [];
        for(let pageNum=0; pageNum<=this.numOfPages; pageNum++){

            const active = pageStatus(pageNum, this.currentStep)
            const ready = prevPageStatus(pageNum, this.currentStep) && !nextPageStatus(pageNum, this.currentStep)

            this.pageState.push({active:active, status:"new", ready:ready})
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