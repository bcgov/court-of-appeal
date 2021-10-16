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
                width='25%'
                level=1
            />
            
            <form-icon 
                :style="{left: '28%'}"
                :twoPages="true"
                stepTitle="Application for Review"            
                @action="displayWindow('Application for Review')"
                :active="true"                       
                order=1
                status="twopages"
                completed="this.stepCompleted.bind(this)"
                readys="this.props.isStepReady(1, this.state.steps)"
                :ready="true"
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="trail1"
                width='31%'
                level=1
            />

            <gavel-icon 
                :style="{left: '55%', top:'15%'}"
                stepTitle="The Hearing"
                class="journey-box"             
                @action="displayWindow('The Hearing')"
                :active="true"
                order=2
                :status="trail1?'completed':''"
                completed="this.stepCompleted.bind(this)"
                readys="this.props.isStepReady(6, this.state.steps)"
                :ready="true"
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="trail1"
                width='25%'
                level=1
            />

            <clock-end-circle 
                :style="{position: 'absolute', left: '80%', top: '22%'}"
                stepTitle="Final Decision on Leave to Appeal"
                :titleStyle="{position: 'absolute', top: '97px', width: '150px', left: '-22px'}"
                :active="true"
                @action="displayWindow('Final Decision on Leave to Appeal')"
                :completed="trail1"
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
                    
                    <application-for-review-rsp-to-leave-refused-pg v-if="applicationForReviewContent"/>
                    <the-hearing-rsp-to-leave-refused-pg v-else-if="theHearingContent"/>                    
                    <final-decision-on-leave-to-appeal-rsp-to-leave-refused-pg v-else-if="finalDecisionOnLeaveToAppealContent"/>
                    
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

import GavelIcon from './journeyicons/GavelIcon.vue'
import ClockEndCircle from './journeyicons/ClockEndCircle.vue'

import InstructionWindowFooter from '../components/InstructionWindowFooter.vue';
import PathSidebar from '../components/PathSidebar.vue';
import ApplicationForReviewRspToLeaveRefusedPg from '../components/RspToLeaveRefused/ApplicationForReviewRspToLeaveRefusedPg.vue';
import TheHearingRspToLeaveRefusedPg from '../components/RspToLeaveRefused/TheHearingRspToLeaveRefusedPg.vue';
import FinalDecisionOnLeaveToAppealRspToLeaveRefusedPg from '../components/RspToLeaveRefused/FinalDecisionOnLeaveToAppealRspToLeaveRefusedPg.vue';

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

    trail1 = false;
    showWindow = false;
    windowTitle = '';
    pathType = '';
    pathHeight = '';

    applicationForReviewContent = false;
    theHearingContent = false;   
    finalDecisionOnLeaveToAppealContent = false;   

    displayWindow(contentType: string){
        
        this.applicationForReviewContent = false;
        this.theHearingContent = false;   
        this.finalDecisionOnLeaveToAppealContent = false; 

        if (contentType == "Application for Review"){

            this.windowTitle = "Hearing Documents: Reply Book";
            this.pathType = "share";
            this.pathHeight = '12rem';
            this.applicationForReviewContent = true;

        } else if (contentType == "The Hearing"){
            
            this.windowTitle = "The Hearing";
            this.pathType = "gavel";
            this.pathHeight = '0';
            this.theHearingContent = true;

        } else if (contentType == "Final Decision on Leave to Appeal"){
            
            this.windowTitle = "Final Decision on Leave to Appeal";
            this.pathType = "info";
            this.pathHeight = '3rem';
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