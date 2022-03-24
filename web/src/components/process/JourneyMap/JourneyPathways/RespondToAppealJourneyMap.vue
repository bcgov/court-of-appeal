<template>
    <div v-if="dataReady">
    <div class="journey-map-container">

        <div :class="{'journey-start-circle':true, 'completed-step': completedTrail[0]}" />        
            
        <div
            :style="{marginLeft: '50px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '65%',
                position: 'absolute',
                top: '92px',
                zIndex: '1'}"
        />

        <trail                
            className="journey-trail-l1-moveable"
            :completed="completedTrail[0]"
            width='15%'
            level=1                
        />

        <form-icon   
            style="left: 20%"
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
            width='24%'
            level=1
        />

        <form-icon 
            style="left: 44%"
            :twoPages="false"
            stepTitle="Notice of Cross Appeal"
            stepTitleOptional="(optional)"
            @action="displayWindow('Notice of Cross Appeal')"
            @completed="completed"            
            order=2
            v-bind="pageState[1]"            
        />

        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[1]"
            width='24%'
            level=1
        />

        <form-icon 
            style="left: 68%"
            :twoPages="true"
            stepTitle="Factum and Appeal Book"
            @action="displayWindow('Factum and Appeal Book')"
            @completed="completed"            
            order=3
            v-bind="pageState[2]"
        />

        <return-trail
            :status="completedTrail[2]?'completed':''"
            startpoint='70%'
        />

        <div
            :style="{marginLeft: '141px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '67%',
                position: 'absolute',
                top: '374px',
                zIndex: '1',
                marginBottom: '81px'}"
        />

        <form-icon 
            :style="{left: '20%', top: '69.75%'}"
            :twoPages="false"
            stepTitle="Notice of Hearing"
            stepTitleOptional="(if required)"
            @action="displayWindow('Notice of Hearing')"
            @completed="completed"            
            order=4
            v-bind="pageState[3]"            
        />

        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[3]"
            :style="{position: 'absolute', marginLeft:'20%', top:'70.3%',width: '22%'}"
            width='22%'
            level=2
        />

        <gavel-icon 
            :style="{left: '42%', top: '65%'}"
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
            :style="{position: 'absolute', marginLeft:'41%', top:'70.3%',width: '25%'}"
            width='25%'
            level=2
        />

        <form-icon 
            :style="{left: '64%', top: '69%'}"
            :twoPages="false"
            stepTitle="Court Order"
            stepTitleOptional="(if required)"            
            stepTitleClass="step-title-wide"
            @action="displayWindow('Court Order')"
            @completed="completed"            
            order=6
            v-bind="pageState[5]"
        />

        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[5]"
            width='20%'
            :style="{position: 'absolute', width: '20%', left: '64%', top: '70.3%'}"
            level=2
        />

        <end-circle
            stepTitle="Appeal Process Complete"
            :style="{top: '70%', left: '80%'}"
            titleStyle="margin-top: 1.5rem;"
            @action="displayWindow('Appeal Process Complete')" 
            :completed="completedTrail[5]"
            order=6
            v-bind="pageState[6]"           
        />
    </div>

    <b-modal size="xl" v-model="showWindow" header-class="bg-primary">

        <template v-slot:modal-title>
            <div style="font-size: 2em;" class="mb-0 text-white">{{windowTitle}}</div>
        </template>

        <b-row v-if="singlePath" no-gutters>
            <b-col cols="1">
                <path-sidebar v-bind:pathTypes="pathTypes" v-bind:pathHeights="pathHeights"/>
            </b-col>
            <b-col cols="11" style="padding: 0 0 0 2rem;">                
                
                <notice-of-appearance-rsp-to-appeal-pg v-if="noticeOfAppearanceContent"/>
                <the-hearing-rsp-to-appeal-pg v-if="theHearingContent"/>
                <court-order-rsp-to-appeal-pg v-if="courtOrderContent"/>
                <appeal-process-complete-rsp-to-appeal-pg v-if="appealProcessCompleteContent"/>
                <notice-of-hearing-rsp-to-appeal-pg @adjustHeights="adjustHeights" v-if="noticeOfHearingContent"/>

            </b-col>

        </b-row>
        <b-card v-else no-body class="bg-white border-white">

            <b-row style="font-size: 2em; font-weight: 700;" class="mb-1 ml-4">{{contentTitle}}</b-row>
            
            <b-row no-gutters>
                <b-col cols="1">
                    <path-sidebar :key="updated" v-bind:pathTypes="pathTypes" v-bind:pathHeights="pathHeights"/>
                </b-col>
                <b-col cols="11" style="padding: 0 0 0 2rem;">                
                    
                    <notice-of-cross-appeal-rsp-to-appeal-pg @adjustHeights="adjustHeights" v-if="noticeOfCrossAppealContent"/>
                    <factum-appeal-book-rsp-to-appeal-pg @adjustHeights="adjustHeights" v-if="factumAppealBookContent"/>              

                </b-col>
            </b-row>

        </b-card>
      
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
import NoticeOfAppearanceRspToAppealPg from '../components/RspToAppeal/NoticeOfAppearanceRspToAppealPg.vue';
import NoticeOfCrossAppealRspToAppealPg from '../components/RspToAppeal/NoticeOfCrossAppealRspToAppealPg.vue';
import FactumAppealBookRspToAppealPg from '../components/RspToAppeal/FactumAppealBookRspToAppealPg.vue';
import TheHearingRspToAppealPg from '../components/RspToAppeal/TheHearingRspToAppealPg.vue';
import CourtOrderRspToAppealPg from '../components/RspToAppeal/CourtOrderRspToAppealPg.vue';
import AppealProcessCompleteRspToAppealPg from '../components/RspToAppeal/AppealProcessCompleteRspToAppealPg.vue';
import NoticeOfHearingRspToAppealPg from '../components/RspToAppeal/NoticeOfHearingRspToAppealPg.vue'

import {activatePage, evaluateCompletedTrails, evaluatePageState} from '@/components/utils/TrailOperations';

import { namespace } from "vuex-class";
import "@/store/modules/application";
const applicationState = namespace("Application")
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

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
        NoticeOfAppearanceRspToAppealPg,
        NoticeOfCrossAppealRspToAppealPg,
        FactumAppealBookRspToAppealPg,
        TheHearingRspToAppealPg,
        CourtOrderRspToAppealPg,
        AppealProcessCompleteRspToAppealPg,
        NoticeOfHearingRspToAppealPg
    }
})
export default class RespondToAppealJourneyMap extends Vue {
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    dataReady = false;
    completedTrail :boolean[] = []
    numOfPages = 0;
    currentStep = 0;
    pageState : {active:boolean; status:string; ready:boolean;}[] = []

    showWindow = false;
    singlePath = true;
    windowTitle = '';
    contentTitle = '';
    pathTypes = [] as string[];
    pathHeights = [] as string[];    
    noticeOfAppearanceContent = false; 
    noticeOfCrossAppealContent = false;
    factumAppealBookContent = false;
    noticeOfHearingContent = false;
    theHearingContent = false;
    courtOrderContent = false;
    appealProcessCompleteContent = false;

    updated=0;

    mounted(){
        this.dataReady = false;

        this.currentStep = this.stPgNo.RSP_TO_APPEAL._StepNo;
        this.numOfPages = Object.keys(this.stPgNo.RSP_TO_APPEAL).length-1;
        
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

    public adjustHeights(index: number, pathHeight: string){       
        this.updated++;
        this.pathHeights[index] = pathHeight;
    }

    public displayWindow(contentType: string){

        this.noticeOfAppearanceContent = false; 
        this.noticeOfCrossAppealContent = false;
        this.factumAppealBookContent = false;
        this.noticeOfHearingContent = false;
        this.theHearingContent = false;
        this.courtOrderContent = false;
        this.appealProcessCompleteContent = false;

        if (contentType == "Notice of Appearance"){
            this.singlePath = true;
            this.windowTitle = "Notice of Appearance";
            this.pathTypes = ["share"];
            this.pathHeights = ['28rem'];
            this.noticeOfAppearanceContent = true;

        } else if (contentType == "Notice of Cross Appeal"){
            this.singlePath = false;
            this.windowTitle = "Cross Appeal (Optional)";
            this.contentTitle = 'Were you served with any of the following documents?';
            this.pathTypes = ["share", "info"];
            this.pathHeights = ['15rem', '0'];
            this.noticeOfCrossAppealContent = true;

        } else if (contentType == "Factum and Appeal Book"){
            this.singlePath = false;
            this.windowTitle = "The Factum and Appeal Book";
            this.contentTitle = '';
            this.pathTypes = ["share", "info", "info", "info", "calendar"];
            this.pathHeights = ['17rem', '0', '0', '0', '0'];
            this.factumAppealBookContent = true;

        } else if (contentType == "Notice of Hearing"){
            this.windowTitle = "Notice of Hearing";
            this.pathTypes = ["question", "share"];
            this.pathHeights = ['38rem', '0'];
            this.noticeOfHearingContent = true; 

        } else if (contentType == "The Hearing"){
            this.singlePath = true;
            this.windowTitle = "The Hearing";
            this.pathTypes = ["gavel"];
            this.pathHeights = ['6rem'];
            this.theHearingContent = true;

        } else if (contentType == "Court Order"){
            this.singlePath = true;
            this.windowTitle = "Court Order";
            this.pathTypes = ["info"];
            this.pathHeights = ['6rem'];
            this.courtOrderContent = true;

        } else if (contentType == "Appeal Process Complete"){
            this.singlePath = true;
            this.windowTitle = "Appeal Process Complete";
            this.pathTypes = ["info"];
            this.pathHeights = ['3rem'];
            this.appealProcessCompleteContent = true;
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

