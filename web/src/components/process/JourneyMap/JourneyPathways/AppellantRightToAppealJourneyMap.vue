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
            width='25%'
            level=1                
        />

        <form-icon   
            style="left: 30%"
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
            width='32%'
            level=1
        />

        <form-icon 
            style="left: 60%"
            :twoPages="true"
            stepTitle="Appeal Record and Transcript"
            stepTitleClass="step-title-wide"
            @action="displayWindow('Appeal Record and Transcript')"
            @completed="completed"            
            order=2
            v-bind="pageState[1]"            
        />

        <return-trail
            :status="completedTrail[1]?'completed':''"
            startpoint='70%'
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
            order=3
            v-bind="pageState[2]"
        />

        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[2]"
            width='27%'
            :style="{top: '46%', left: '25%', position: 'absolute'}"
            level=2
        />

        <calendar-icon 
            :style="{top: '46.75%', left: '44%', height:'6rem'}"
            stepTitle="Book Appeal Date with Registry"
            stepTitleClass="step-title-wide"
            @action="displayWindow('Book Appeal Date')"
            @completed="completed"            
            order=4
            v-bind="pageState[3]"
        />

        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[3]"
            width='27%'
            :style="{top: '46%', left: '50%', position: 'absolute'}"
            level=2
        />

        <form-icon 
            :style="{top: '46%', left: '70%'}"
            :twoPages="false"
            stepTitle="Notice of Hearing"
            @action="displayWindow('Notice of Hearing')"
            @completed="completed"            
            order=5
            v-bind="pageState[4]"            
        />

        <return-trail
            priorstep="this.state.steps[4]"
            :status="completedTrail[4]?'completed':''"
            top='117px'
            startpoint='71%'
        />
            
        <div
            :style="{marginLeft: '204px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '52%',
                position: 'absolute',
                top: '91%',
                zIndex: '1',
                marginBottom: '81px'}"
        />

        <gavel-icon 
            :style="{left: '24%', top: '82%'}"
            class="journey-box" 
            stepTitle="The Hearing" 
            @action="displayWindow('The Hearing')"
            @completed="completed"            
            order=6
            v-bind="pageState[5]"            
        />

        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[5]"
            width='35%'
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
            order=7
            v-bind="pageState[6]"
        />

        <trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[6]"
            width='33%'
            :style="{top: '85.05%', left: '58%', position: 'absolute', marginBottom: '100px'}"
            level=3
        />

        <end-circle
            stepTitle="Appeal Process Complete"
            :style="{top: '84.7%', left: '82%'}"
            titleStyle="margin-top: 1.5rem;" 
            @action="displayWindow('Appeal Process Complete')"
            :completed="completedTrail[6]"
            order=8
            v-bind="pageState[7]" 
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

                <initial-documents-app-right-to-appeal-pg v-if="initialDocumentsContent"/> 
                <book-appeal-date-app-right-to-appeal-pg v-else-if="bookAppealDateContent"/>
                <notice-of-hearing-app-right-to-appeal-pg v-else-if="noticeOfHearingContent"/>                
                <the-hearing-app-right-to-appeal-pg v-else-if="theHearingContent"/>                
                <court-order-app-right-to-appeal-pg v-else-if="courtOrderContent"/>
                <appeal-process-complete-app-right-to-appeal-pg v-else-if="appealProcessCompleteContent"/>
               
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
import NoticeOfHearingAppRightToAppealPg from '../components/AppRightToAppeal/NoticeOfHearingAppRightToAppealPg.vue';
import BookAppealDateAppRightToAppealPg from '../components/AppRightToAppeal/BookAppealDateAppRightToAppealPg.vue';
import InitialDocumentsAppRightToAppealPg from '../components/AppRightToAppeal/InitialDocumentsAppRightToAppealPg.vue';
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
        NoticeOfHearingAppRightToAppealPg,
        BookAppealDateAppRightToAppealPg,
        InitialDocumentsAppRightToAppealPg,
        TheHearingAppRightToAppealPg,
        CourtOrderAppRightToAppealPg,
        AppealProcessCompleteAppRightToAppealPg
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
    pathType = '';
    pathHeight = '';
    initialDocumentsContent = false;
    bookAppealDateContent = false;
    noticeOfHearingContent = false;
    theHearingContent = false;
    courtOrderContent = false;
    appealProcessCompleteContent = false; 

    mounted(){
        this.dataReady = false;

        this.currentStep = this.stPgNo.APP_RIGHT_TO_APPEAL._StepNo;
        this.numOfPages = Object.keys(this.stPgNo.APP_RIGHT_TO_APPEAL).length-1;

        this.pageState = evaluatePageState(this.numOfPages, this.currentStep);
        
        this.dataReady = true;
    }

    public completed(order, checked){
        
        activatePage(order, checked, this.currentStep)
        this.completedTrail = evaluateCompletedTrails(this.numOfPages, this.currentStep)
        this.pageState = evaluatePageState(this.numOfPages, this.currentStep)
    }

    public displayWindow(contentType: string){

        this.initialDocumentsContent = false;
        this.bookAppealDateContent = false;
        this.noticeOfHearingContent = false;
        this.theHearingContent = false;
        this.courtOrderContent = false;
        this.appealProcessCompleteContent = false; 

        if (contentType == "Initial Documents"){

            this.windowTitle = "Initial Documents";
            this.pathType = "share";
            this.pathHeight = '32rem';
            this.initialDocumentsContent = true;

        } else if (contentType == "Book Appeal Date"){

            this.windowTitle = "Book Appeal Date";
            this.pathType = "gavel";
            this.pathHeight = '2rem';
            this.bookAppealDateContent = true;

        } else if (contentType == "Notice of Hearing"){

            this.windowTitle = "Notice of Hearing";
            this.pathType = "share";
            this.pathHeight = '11rem';
            this.noticeOfHearingContent = true;

        }  else if (contentType == "The Hearing"){

            this.windowTitle = "The Hearing";
            this.pathType = "gavel";
            this.pathHeight = '6rem';
            this.theHearingContent = true;

        } else if (contentType == "Court Order"){

            this.windowTitle = "Court Order";
            this.pathType = "info";
            this.pathHeight = '6rem';
            this.courtOrderContent = true;

        } else if (contentType == "Appeal Process Complete"){

            this.windowTitle = "Appeal Process Complete";
            this.pathType = "info";
            this.pathHeight = '3rem';
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