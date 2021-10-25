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
                width='18%'
                level=1
            />
            
            <form-icon 
                :style="{left: '20%'}"
                :twoPages="false"
                stepTitle="Notice of Appearance"
                @action="displayWindow('Notice of Appearance')"
                @completed="completed"            
                order=1
                v-bind="pageState[0]"                
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="completedTrail[0]"
                width='21%'
                level=1
            />
            
            <form-icon 
                :style="{left: '42%'}"
                :twoPages="false"
                stepTitle="Reply Book"
                @action="displayWindow('Reply Book')"
                @completed="completed"            
                order=2
                v-bind="pageState[1]"                
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="completedTrail[1]"
                width='21%'
                level=1
            />

            <gavel-icon 
                :style="{left: '64%', top:'15%'}"
                stepTitle="The Hearing"
                class="journey-box"             
                @action="displayWindow('The Hearing')"
                @completed="completed"            
                order=3
                v-bind="pageState[2]"                
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="completedTrail[2]"
                width='25%'
                level=1
            />

            <clock-end-circle 
                :style="{position: 'absolute', left: '84%', top: '22%'}"
                stepTitle="Decision on Leave to Appeal"
                @action="displayWindow('Decision on Leave to Appeal')"
                :titleStyle="{position: 'absolute', top: '97px', width: '150px', left: '-22px'}"
                :completed="completedTrail[2]"
                order=4
                v-bind="pageState[3]"
            
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
                    
                    <notice-of-appearance-rsp-to-leave-pg v-if="noticeOfAppearanceContent"/>

                    <reply-book-rsp-to-leave-pg v-if="replyBookContent"/>
                    <the-hearing-rsp-to-leave-pg v-if="theHearingContent"/>
                    <decision-on-leave-to-appeal-rsp-to-leave-pg v-if="decisionOnLeaveToAppealContent"/>

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
import NoticeOfAppearanceRspToLeavePg from '../components/RspToLeave/NoticeOfAppearanceRspToLeavePg.vue';
import ReplyBookRspToLeavePg from '../components/RspToLeave/ReplyBookRspToLeavePg.vue';
import TheHearingRspToLeavePg from '../components/RspToLeave/TheHearingRspToLeavePg.vue';
import DecisionOnLeaveToAppealRspToLeavePg from '../components/RspToLeave/DecisionOnLeaveToAppealRspToLeavePg.vue';

import {activatePage, evaluateCompletedTrails, evaluatePageState} from '@/components/utils/TrailOperations'

import { namespace } from "vuex-class";
import "@/store/modules/application";
const applicationState = namespace("Application")
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        Trail,
        FormIcon,
        GavelIcon,
        ClockEndCircle,
        InstructionWindowFooter,
        PathSidebar,
        NoticeOfAppearanceRspToLeavePg,
        ReplyBookRspToLeavePg,
        TheHearingRspToLeavePg,
        DecisionOnLeaveToAppealRspToLeavePg
    }
})
export default class RespondToLeaveJourneyMap extends Vue {
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    dataReady = false;
    completedTrail :boolean[] = []
    numOfPages = 0;
    currentStep = 0;
    pageState : {active:boolean; status:string; ready:boolean;}[] = []

    showWindow = false;
    windowTitle = '';
    pathType = '';
    pathHeight = '';    
    noticeOfAppearanceContent = false; 
    replyBookContent = false;
    theHearingContent = false;
    decisionOnLeaveToAppealContent = false;

    mounted(){
        this.dataReady = false;

        this.currentStep = this.stPgNo.RSP_TO_LEAVE._StepNo;
        this.numOfPages = Object.keys(this.stPgNo.RSP_TO_LEAVE).length-1;

        this.pageState = evaluatePageState(this.numOfPages, this.currentStep);
        
        this.dataReady = true;
    }

    public completed(order, checked){
        
        activatePage(order, checked, this.currentStep)
        this.completedTrail = evaluateCompletedTrails(this.numOfPages, this.currentStep)
        this.pageState = evaluatePageState(this.numOfPages, this.currentStep)
    }

    public displayWindow(contentType: string){

        this.noticeOfAppearanceContent = false; 
        this.replyBookContent = false;
        this.theHearingContent = false;
        this.decisionOnLeaveToAppealContent = false;

        if (contentType == "Notice of Appearance"){
            this.windowTitle = "Notice of Appearance";
            this.pathType = "share";
            this.pathHeight = '28rem';
            this.noticeOfAppearanceContent = true;
        } else if (contentType == "Reply Book"){
            this.windowTitle = "Hearing Documents: Reply Book";
            this.pathType = "share";
            this.pathHeight = '12rem';
            this.replyBookContent = true;
        } else if (contentType == "The Hearing"){
            this.windowTitle = "The Hearing";
            this.pathType = "gavel";
            this.pathHeight = '0';
            this.theHearingContent = true;
        } else if (contentType == "Decision on Leave to Appeal"){
            this.windowTitle = "Decision on Leave to Appeal";
            this.pathType = "gavel";
            this.pathHeight = '0';
            this.decisionOnLeaveToAppealContent = true;
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