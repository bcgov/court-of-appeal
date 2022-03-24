<template>
<div v-if="dataReady">
    <div class="journey-map-container">
        
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
            className="journey-trail-l1-moveable"
            :completed="completedTrail[0]"
            width='30%'
            level=1                
        />

        <form-icon   
            style="left: 17%"
            :twoPages="false"
            stepTitle="Initial Documents"
            @action="displayWindow('Initial Documents')"
            @completed="completed"            
            order=1
            v-bind="pageState[0]"           
        />

        <trail                
            className="journey-trail-l1-moveable"
            :completed="completedTrail[1]"
            width='20%'
            level=1                
        />

        <form-icon   
            style="left: 35%"
            :twoPages="false"
            stepTitle="Apply for Leave to Appeal"
            @action="displayWindow('Apply for Leave to Appeal')"
            @completed="completed"            
            order=2
            v-bind="pageState[1]"           
        />
                    
        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[2]"
            width='20%'
            level=1
        />

        <form-icon 
            style="left: 53%"
            :twoPages="true"
            stepTitle="Applications"
            stepTitleOptional="(Optional)"
            stepTitleClass="step-title"
            @action="displayWindow('Applications')"
            @completed="completed"            
            order=3
            v-bind="pageState[2]"            
        />

        <form-icon 
            style="left: 72%"
            :twoPages="true"
            stepTitle="Appeal Record and Transcript"
            stepTitleClass="step-title"
            @action="displayWindow('Appeal Record and Transcript')"
            @completed="completed"            
            order=4
            v-bind="pageState[3]"            
        />

        <return-trail
            :status="completedTrail[3]?'completed':''"
            startpoint='73%'
        />

        <div
            :style="{marginLeft: '204px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '53%',
                position: 'absolute',
                top: '374px',
                zIndex: '1',
                marginBottom: '81px'}"
        />

        <form-icon 
            :style="{top: '46%', left: '21%'}"
            :twoPages="true"
            stepTitle="Factum, Appeal Book, and Certificate of Readiness"
            @action="displayWindow('Factum, Appeal Book, and Certificate of Readiness')"
            stepTitleClass="step-title-wide"
            @completed="completed"            
            order=5
            v-bind="pageState[4]"
        />

        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[4]"
            width='25%'
            :style="{top: '46%', left: '25%', position: 'absolute'}"
            level=2
        />

        <calendar-icon 
            :style="{top: '46.75%', left: '44%', height:'6rem'}"
            stepTitle="Book Appeal Date with Registry"
            stepTitleClass="step-title-wide"
            @action="displayWindow('Book Appeal Date')"
            @completed="completed"            
            order=6
            v-bind="pageState[5]"
        />

        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[5]"
            width='25%'
            :style="{top: '46%', left: '50%', position: 'absolute'}"
            level=2
        />

        <form-icon 
            :style="{top: '46%', left: '70%'}"
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
            top='117px'
            startpoint='73%'
        />
            
        <div
            :style="{marginLeft: '170px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '66%',
                position: 'absolute',
                top: '91%',
                zIndex: '1',
                marginBottom: '81px'}"
        />

        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[6]"
            width='10%'
            :style="{top: '85.14%', left: '15%', position: 'absolute'}"
            level=3
        />

        <gavel-icon 
            :style="{left: '24%', top: '82%'}"
            class="journey-box" 
            stepTitle="The Hearing" 
            @action="displayWindow('The Hearing')"
            @completed="completed"            
            order=8
            v-bind="pageState[7]"            
        />

        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[7]"
            width='30%'
            :style="{top: '85.05%', left: '25%', position: 'absolute'}"
            level=3
        />

        <form-icon 
            :style="{left: '54%', top: '84.7%'}"
            class="journey-box"
            :twoPages="false"
            stepTitle="Court Order"
            @action="displayWindow('Court Order')"
            @completed="completed"            
            order=9
            v-bind="pageState[8]"
        />

        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[8]"
            width='30%'
            :style="{top: '85.05%', left: '58%', position: 'absolute', marginBottom: '100px'}"
            level=3
        />

        <end-circle
            stepTitle="Appeal Process Complete"
            :style="{top: '84.7%', left: '82%'}"
            titleStyle="margin-top: 1.5rem;" 
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

            <b-row v-if="initialDocumentsContent" style="font-size: 2em; font-weight: 700; padding: 0 0 0 6rem;" class="mb-1 ml-2">Would you like to start your appeal?</b-row>            

            <b-row no-gutters>
                <b-col cols="1">
                    <path-sidebar :key="updated" v-bind:pathTypes="pathTypes" v-bind:pathHeights="pathHeights"/>
                </b-col>
                <b-col cols="11" style="padding: 0 0 0 1rem;">

                    <initial-documents-app-right-to-appeal-pg v-if="initialDocumentsContent"/> 
                    <apply-leave-app-right-to-appeal-pg @adjustHeights="adjustHeights" v-if="applyForLeaveToAppealContent"/>
                    <appeal-record-transcript-app-right-to-appeal-pg @adjustHeights="adjustHeights" v-if="appealRecordTranscriptContent"/>
                    <factum-appeal-book-certificate-app-right-to-appeal-pg @adjustHeights="adjustHeights" v-if="factumAppealBookCertificateContent"/>              

                    <book-appeal-date-app-right-to-appeal-pg v-else-if="bookAppealDateContent"/>
                    <notice-of-hearing-app-right-to-appeal-pg @adjustHeights="adjustHeights" v-else-if="noticeOfHearingContent"/>                
                    <the-hearing-app-right-to-appeal-pg v-else-if="theHearingContent"/>                
                    <court-order-app-right-to-appeal-pg v-else-if="courtOrderContent"/>
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
import ManagingAppealProcessPg from '@/components/utils/ManagingAppealProcessPg.vue';
import AppealRecordTranscriptAppRightToAppealPg from '../components/AppRightToAppeal/AppealRecordTranscriptAppRightToAppealPg.vue';
import FactumAppealBookCertificateAppRightToAppealPg from '../components/AppRightToAppeal/FactumAppealBookCertificateAppRightToAppealPg.vue';
import BookAppealDateAppRightToAppealPg from '../components/AppRightToAppeal/BookAppealDateAppRightToAppealPg.vue';
import NoticeOfHearingAppRightToAppealPg from '../components/AppRightToAppeal/NoticeOfHearingAppRightToAppealPg.vue';
import TheHearingAppRightToAppealPg from '../components/AppRightToAppeal/TheHearingAppRightToAppealPg.vue';
import CourtOrderAppRightToAppealPg from '../components/AppRightToAppeal/CourtOrderAppRightToAppealPg.vue';
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
        FactumAppealBookCertificateAppRightToAppealPg,
        BookAppealDateAppRightToAppealPg,
        NoticeOfHearingAppRightToAppealPg,
        TheHearingAppRightToAppealPg,
        CourtOrderAppRightToAppealPg,
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
    pathTypes = [] as string[];
    pathHeights = [] as string[];
    initialDocumentsContent = false;
    applyForLeaveToAppealContent = false;
    applicationsContent = false;
    appealRecordTranscriptContent = false;
    factumAppealBookCertificateContent = false;
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

    public displayWindow(contentType: string){

        this.initialDocumentsContent = false;
        this.applyForLeaveToAppealContent = false;
        this.applicationsContent = false;
        this.appealRecordTranscriptContent = false;
        
        this.factumAppealBookCertificateContent = false;
        this.bookAppealDateContent = false;
        this.noticeOfHearingContent = false;
        this.theHearingContent = false;
        this.courtOrderContent = false;
        this.appealProcessCompleteContent = false; 

        if (contentType == "Initial Documents"){

            this.windowTitle = "Initial Documents";
            this.pathTypes = ["share"];
            this.pathHeights = ['29rem'];
            this.initialDocumentsContent = true;

        } else if (contentType == "Apply for Leave to Appeal") {

            this.windowTitle = "Apply for Leave to Appeal";
            this.pathTypes = ["info", "share", "share", "info"];
            this.pathHeights = ['10rem', '0', '0', '0'];
            this.applyForLeaveToAppealContent = true;

        } else if (contentType == "Applications") {

            this.windowTitle = "Applications";
            this.pathTypes = ["share", "share"];
            this.pathHeights = ['14rem', '0'];
            this.applicationsContent = true;

        } else if (contentType == "Appeal Record and Transcript"){

            this.windowTitle = "Appeal Record and Transcript";
            this.pathTypes = ["share", "info"];
            this.pathHeights = ['15rem', '0'];
            this.appealRecordTranscriptContent = true;

        } else if (contentType == "Factum, Appeal Book, and Certificate of Readiness"){

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
            this.pathTypes = ["question", "share"];
            this.pathHeights = ['38rem', '0'];
            this.noticeOfHearingContent = true;

        }  else if (contentType == "The Hearing"){

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
}
</script>

<style scoped>
    @import './journeyStyles/JourneyMap.css';
    @import "./journeyStyles/ReturnTrail.css";
    @import './journeyStyles/JourneyIcons.css';
    @import './journeyStyles/PageeIcon.css';
</style>