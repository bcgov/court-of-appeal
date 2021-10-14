<template>
<div>
    <b-button  v-on:click="trail1 = !trail1">GLOW</b-button>
    <div class="journey-map-container">

        <div :class="{'journey-start-circle':true, 'completed-step': trail1}" />        
            
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
            :completed="trail1"
            width='28%'
            level=1                
        />

        <form-icon   
            style="left: 28%"
            :twoPages="false"
            stepTitle="Initial Documents"
            @action="displayWindow('Initial Documents')"
            :active="true"                       
            order=1
            status="new"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(1, this.state.steps)"
            :ready="true"
        />
                    
        <trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='30%'
            level=1
        />

        <form-icon 
            style="left: 58%"
            :twoPages="true"
            stepTitle="Hearing Documents"
            stepTitleClass="step-title-wide"
            @action="displayWindow('Hearing Documents')"
            :active="true"
            order=2
            status="twoPages"
            :ready="true"
            completed="this.stepCompleted.bind(this)"
            readys="this.props.isStepReady(2,this.state.steps)"
        />

        <trail
            className="journey-trail-l1-moveable"
            :completed="trail1"
            width='25%'
            level=1
        />

        <gavel-end-circle
            stepTitle="Decision on Leave to Appeal"
            @action="displayWindow('Decision on Leave')"
            :active="true"
            :completed="trail1"
            :style="{position: 'absolute', left: '82%'}"
            :titleStyle="{position: 'absolute', top:'97px', width: '150px', left: '-17px'}"            
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

    trail1 = false
    showWindow = false;
    windowTitle = '';
    pathType = '';
    pathHeight = '';

    initialDocumentsContent = false;
    hearingDocumentsContent = false;
    decisionOnLeaveContent = false;

    displayWindow(contentType: string){

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

}
</script>

<style scoped>
    @import './journeyStyles/JourneyMap.css';
    @import "./journeyStyles/ReturnTrail.css";
    @import './journeyStyles/JourneyIcons.css';
    @import './journeyStyles/PageeIcon.css';
</style>