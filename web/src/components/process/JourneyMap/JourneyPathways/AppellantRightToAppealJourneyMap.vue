<template>
<div v-if="dataReady">
    <div class="journey-map-container">

        <!-- LEVEL 1 -->

        <div :class="{'journey-start-circle':true, 'completed-step': completedTrail[0]}" />        
        
        <div
            :style="{marginLeft: '50px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '67%',
                position: 'absolute',
                top: '92px',
                zIndex: '1'}"
        />

        <trail                
            className="journey-trail-l1-moveable-scoped"
            :completed="completedTrail[0]"
            width='57%'
            level=1                
        />

        <form-icon   
            style="left: 27%"
            :twoPages="false"
            stepTitle="Initial Document"
            @action="displayWindow('Initial Document')"
            @completed="completed"            
            order=1
            v-bind="pageState[0]"           
        />

         <trail                
            className="journey-trail-l1-moveable-scoped"
            :completed="completedTrail[1]"
            width='20%'
            level=1                
        />

        <form-icon   
            style="left: 60%"
            :twoPages="false"
            stepTitle="If Leave required"
            stepTitleOptional="Apply/Respond for Leave to Appeal"
            stepTitleClass="step-title-wide"
            @action="displayWindow('If Leave required')"
            @completed="completed"            
            order=2
            v-bind="pageState[1]"           
        />

        <return-trail
            :status="completedTrail[1]?'completed':''"
            startpoint='73%'
            :extendEnd="true"
            :returnLevel="1"
        />

        <!-- LEVEL 2 -->

        <div
            :style="{marginLeft: '190px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '56%',
                position: 'absolute',
                top: '374px',
                zIndex: '1',
                marginBottom: '81px'}"
        />

        <form-icon 
            style="top: 34%; left: 27%"
            :twoPages="true"
            stepTitle="Applications"
            stepTitleOptional="(Optional)"            
            @action="displayWindow('Applications')"
            @completed="completed"            
            order=3
            v-bind="pageState[2]"            
        />

        <trail
            className="journey-trail-l1-moveable-scoped"
            :completed="completedTrail[2]"
            width='35%'
            :style="{top: '34.15%', left: '30%', position: 'absolute'}"
            level=1
        />

        <form-icon 
            style="top: 34%; left: 60%"
            :twoPages="true"
            stepTitle="Appeal Record and Transcript"           
            @action="displayWindow('Appeal Record and Transcript')"
            @completed="completed"            
            order=4
            v-bind="pageState[3]"            
        />

        <trail
            className="journey-trail-l1-moveable-scoped"
            :completed="completedTrail[3]"
            width='10%'
            :style="{top: '34.15%', left: '65%', position: 'absolute'}"
            level=1
        />

        <return-trail
            :status="completedTrail[3]?'completed':''"
            startpoint='73%'
            top='117px'
            :extendEnd="false"
            :returnLevel="2"
        />

        <!-- LEVEL 3 -->

        <div
            :style="{marginLeft: '204px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '55%',
                position: 'absolute',
                top: '656px',
                zIndex: '1',
                marginBottom: '81px'}"
        />

       <form-icon 
            :style="{top: '63%', left: '21%'}"
            :twoPages="true"
            stepTitle="Factums and Appeal Book"
            @action="displayWindow('Factums and Appeal Book')"
            stepTitleClass="step-title-wide"
            @completed="completed"            
            order=5
            v-bind="pageState[4]"
        />

        <trail
            className="journey-trail-l1-moveable-scoped"
            :completed="completedTrail[4]"
            width='24%'
            :style="{top: '63.25%', left: '25%', position: 'absolute'}"
            level=2
        />

        <calendar-icon 
            :style="{top: '63.5%', left: '44%', height:'6rem'}"
            stepTitle="Book Appeal Date with Registry"
            stepTitleClass="step-title-wide"
            @action="displayWindow('Book Appeal Date')"
            @completed="completed"            
            order=6
            v-bind="pageState[5]"
        />

        <trail
            className="journey-trail-l1-moveable-scoped"
            :completed="completedTrail[5]"
            width='25%'
            :style="{top: '63.25%', left: '48%', position: 'absolute'}"
            level=2
        />

        <form-icon 
            :style="{top: '63%', left: '70%'}"
            :twoPages="false"
            stepTitle="Notice of Hearing"
            @action="displayWindow('Notice of Hearing')"
            @completed="completed"            
            order=7
            v-bind="pageState[6]"            
        />

         <return-trail
            priorstep="this.state.steps[4]"
            :status="completedTrail[6]?'completed':''"
            top='150px'
            startpoint='73%'
            :extendEnd="true"
            :returnLevel="3"
        />
        
        <!-- LEVEL 4 -->  
        
        <div
            :style="{marginLeft: '170px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '66%',
                position: 'absolute',
                top: '96.65%',
                zIndex: '1',
                marginBottom: '81px'}"
        />

        <gavel-icon 
            :style="{left: '26%', top: '89.85%'}"
            class="journey-box" 
            stepTitle="The Hearing" 
            @action="displayWindow('The Hearing')"
            @completed="completed"            
            order=8
            v-bind="pageState[7]"            
        />

        <trail
            className="journey-trail-l1-moveable-scoped"
            :completed="completedTrail[7]"
            width='40%'
            :style="{top: '92.25%', left: '25%', position: 'absolute'}"
            level=3
        />

        <form-icon 
            :style="{left: '60%', top: '92%'}"
            class="journey-box"
            :twoPages="false"
            stepTitle="Final Order"
            @action="displayWindow('Final Order')"
            @completed="completed"            
            order=9
            v-bind="pageState[8]"
        />

        <trail
            className="journey-trail-l1-moveable-scoped"
            :completed="completedTrail[8]"
            width='25%'
            :style="{top: '92.25%', left: '60%', position: 'absolute', marginBottom: '100px'}"
            level=3
        />

       <end-circle
            stepTitle="Appeal Process Complete"
            :style="{top: '92%', left: '82%'}"
            titleStyle="margin-top: -3.5rem;" 
            @action="displayWindow('Appeal Process Complete')"
            :completed="completedTrail[8]"
            order=10
            v-bind="pageState[9]" 
        />

        
    </div>
   

    <b-modal size="xl" v-model="showWindow" header-class="bg-primary">
        <template v-slot:modal-title>
            <div style="font-size: 2em;" class="mb-0 text-white">{{windowTitle}}</div>
        </template>

        <b-card no-body class="bg-white border-white">

            <b-row 
                style="font-size: 2em; font-weight: 700; padding: 0 0 0 6rem;" 
                class="mb-1 ml-2">
                {{contentTitle}}
            </b-row> 

            <b-row no-gutters>
                <b-col cols="1">
                    <path-sidebar :key="updated" v-bind:pathTypes="pathTypes" v-bind:pathHeights="pathHeights"/>
                </b-col>
                <b-col cols="11" style="padding: 0 0 0 1rem;">

                    <initial-documents-app-right-to-appeal-pg v-if="initialDocumentsContent"/> 
                    <apply-leave-app-right-to-appeal-pg v-bind:app='true' @adjustHeights="adjustHeights" v-if="applyForLeaveToAppealContent"/>
                    <appeal-record-transcript-app-right-to-appeal-pg @adjustHeights="adjustHeights" v-if="appealRecordTranscriptContent"/>
                    <factum-appeal-book-app-right-to-appeal-pg @adjustHeights="adjustHeights" v-if="factumAppealBookContent"/>              

                    <book-appeal-date-app-right-to-appeal-pg @adjustHeights="adjustHeights" v-else-if="bookAppealDateContent"/>
                    <notice-of-hearing-app-right-to-appeal-pg @adjustHeights="adjustHeights" v-else-if="noticeOfHearingContent"/>                
                    <the-hearing-app-right-to-appeal-pg v-bind:app='true' @showOrders="showOrders" @adjustHeights="adjustHeights" v-else-if="theHearingContent"/>                
                    <orders-app-right-to-appeal-pg @adjustHeights="adjustHeights" v-else-if="courtOrderContent"/>
                    <appeal-process-complete-app-right-to-appeal-pg v-else-if="appealProcessCompleteContent"/>
                    <managing-appeal-process-pg @adjustHeights="adjustHeights" v-if="applicationsContent"/>
                
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

import InitialDocumentsAppRightToAppealPg from '../components/AppRightToAppeal/InitialDocumentsAppRightToAppealPg.vue';
import ApplyLeaveAppRightToAppealPg from '../components/AppRightToAppeal/ApplyLeaveAppRightToAppealPg.vue';
import ManagingAppealProcessPg from '@/components/process/JourneyMap/components/AppRightToAppeal/ManagingAppealProcessPg.vue';
import AppealRecordTranscriptAppRightToAppealPg from '../components/AppRightToAppeal/AppealRecordTranscriptAppRightToAppealPg.vue';
import FactumAppealBookAppRightToAppealPg from '../components/AppRightToAppeal/FactumAppealBookAppRightToAppealPg.vue';
import BookAppealDateAppRightToAppealPg from '../components/AppRightToAppeal/BookAppealDateAppRightToAppealPg.vue';
import NoticeOfHearingAppRightToAppealPg from '../components/AppRightToAppeal/NoticeOfHearingAppRightToAppealPg.vue';
import TheHearingAppRightToAppealPg from '../components/AppRightToAppeal/TheHearingAppRightToAppealPg.vue';
import OrdersAppRightToAppealPg from '../components/AppRightToAppeal/OrdersAppRightToAppealPg.vue';
import AppealProcessCompleteAppRightToAppealPg from '../components/AppRightToAppeal/AppealProcessCompleteAppRightToAppealPg.vue';

import {activatePage, evaluateCompletedTrails, evaluatePageState} from '@/components/utils/TrailOperations'

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
        InitialDocumentsAppRightToAppealPg,
        ApplyLeaveAppRightToAppealPg,
        AppealRecordTranscriptAppRightToAppealPg,
        FactumAppealBookAppRightToAppealPg,
        BookAppealDateAppRightToAppealPg,
        NoticeOfHearingAppRightToAppealPg,
        TheHearingAppRightToAppealPg,
        OrdersAppRightToAppealPg,
        AppealProcessCompleteAppRightToAppealPg,
        ManagingAppealProcessPg
    }
})
export default class AppellantRightToAppealJourneyMap extends Vue {
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    dataReady = false;
    completedTrail :boolean[] = []
    numOfPages = 0;
    currentStep = 0;
    pageState : {active:boolean; status:string; ready:boolean;}[] = []

    showWindow = false;
    windowTitle = '';
    contentTitle = '';
    pathTypes = [] as string[];
    pathHeights = [] as string[];
    initialDocumentsContent = false;
    applyForLeaveToAppealContent = false;
    applicationsContent = false;
    appealRecordTranscriptContent = false;
    factumAppealBookContent = false;
    bookAppealDateContent = false;
    noticeOfHearingContent = false;
    theHearingContent = false;
    courtOrderContent = false;
    appealProcessCompleteContent = false; 
    updated=0;

    mounted(){
        this.dataReady = false;

        this.currentStep = this.stPgNo.APP_RIGHT_TO_APPEAL._StepNo;
        this.numOfPages = Object.keys(this.stPgNo.APP_RIGHT_TO_APPEAL).length-1;
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

    public showOrders(){
        this.showWindow = false;
        this.displayWindow('Final Order');
    }

    public displayWindow(contentType: string){

        this.contentTitle = '';
        this.initialDocumentsContent = false;
        this.applyForLeaveToAppealContent = false;
        this.applicationsContent = false;
        this.appealRecordTranscriptContent = false;        
        this.factumAppealBookContent = false;
        this.bookAppealDateContent = false;
        this.noticeOfHearingContent = false;
        this.theHearingContent = false;
        this.courtOrderContent = false;
        this.appealProcessCompleteContent = false; 

        if (contentType == "Initial Document"){
            this.contentTitle = 'Would you like to start your appeal?';
            this.windowTitle = "Initial Document";
            this.pathTypes = ["share"];
            this.pathHeights = ['18rem'];
            this.initialDocumentsContent = true;

        } else if (contentType == "If Leave required") {

            this.windowTitle = "If Leave required";
            this.pathTypes = ["info", "share", "share", "share", "share", "share", "share"];
            this.pathHeights = ['14rem', '0', '0', '0', '0', '0', '0'];
            this.applyForLeaveToAppealContent = true;

        } else if (contentType == "Applications") {

            this.windowTitle = "Applications";
            this.pathTypes = ["info", "share", "share", "share", "share", "share", "share"];
            this.pathHeights = ['33rem', '0', '0', '0', '0', '0', '0'];
            this.applicationsContent = true;

        } else if (contentType == "Appeal Record and Transcript"){

            this.windowTitle = "Appeal Record and Transcript";
            this.pathTypes = ["share", "info"];
            this.pathHeights = ['33rem', '0'];
            this.appealRecordTranscriptContent = true;

        } else if (contentType == "Factums and Appeal Book"){

            this.windowTitle = "Factums and Appeal Book";
            this.pathTypes = ["share", "share", "info", "info"];
            this.pathHeights = ['56rem', '0', '0', '0'];
            this.factumAppealBookContent = true;

        } else if (contentType == "Book Appeal Date"){

            this.windowTitle = "Book Appeal Date";
            this.pathTypes = ["gavel", "info", "info"];
            this.pathHeights = ['7rem', '0', '0'];
            this.bookAppealDateContent = true;

        } else if (contentType == "Notice of Hearing"){

            this.windowTitle = "Notice of Hearing";
            this.pathTypes = ["question", "share", "share"];
            this.pathHeights = ['31rem', '0', '0'];
            this.noticeOfHearingContent = true;

        }  else if (contentType == "The Hearing"){
            this.contentTitle = "For more information about the hearing process, click the topics below:";
            this.windowTitle = "The Hearing";
            this.pathTypes = ["gavel", "share", "share", "info"];
            this.pathHeights = ['5rem', '0', '0', '0'];
            this.theHearingContent = true;

        } else if (contentType == "Final Order"){

            this.windowTitle = "Final Order";
            this.pathTypes = ["info", "info", "share"];
            this.pathHeights = ['21rem', '0', '0'];
            this.courtOrderContent = true;

        } else if (contentType == "Appeal Process Complete"){

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