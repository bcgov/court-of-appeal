<template>
    <div v-if="dataReady">
    <div class="journey-map-container" style="margin-bottom:8rem;">

        <div :class="{'journey-start-circle':true, 'completed-step': completedTrail[0]}" />        

<!-- <LEVEL 1> -->            
        <div
            :style="{marginLeft: '50px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '65%',
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
            stepTitle="Notice of Appearance"
            @action="displayWindow('Notice of Appearance')"
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
            stepTitle="Notice of Cross Appeal"
            stepTitleOptional="(Optional)"
            @action="displayWindow('Notice of Cross Appeal')"
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

<!-- <LEVEL 2> -->
        <div
            :style="{marginLeft: '141px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '61%',
                position: 'absolute',
                top: '374px',
                zIndex: '1',
                marginBottom: '81px'}"
        />

        <form-icon   
            :style="{left: '30%', top: '34%'}"
            :twoPages="false"
            stepTitle="Respond to Application"
            stepTitleOptional="for Leave to Appeal"
            stepTitleClass="step-title-wide"
            @action="displayWindow('Respond to Application for Leave to Appeal')"
            @completed="completed"            
            order=3
            v-bind="pageState[2]"           
        />
        
        <trail
            className="journey-trail-l1-moveable-scoped"
            :completed="completedTrail[2]"
            :style="{position: 'absolute', marginLeft:'33%', top:'34.12%',width: '30%'}"
            width='22%'
            level=2
        />

        <form-icon 
            :style="{left: '60%', top: '34%'}"
            :twoPages="true"
            stepTitle="Factum and Appeal Book"
            @action="displayWindow('Factum and Appeal Book')"
            @completed="completed"            
            order=4
            v-bind="pageState[3]"
        /> 

        <return-trail
            :status="completedTrail[3]?'completed':''"
            startpoint='70%'
            top='117px'
            :extendEnd="false"
            :returnLevel="2"
            :extendBegin="true"
        />

<!-- <LEVEL 3> -->
        <div
            :style="{marginLeft: '141px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '57%',
                position: 'absolute',
                top: '67.6%',
                zIndex: '1',
                marginBottom: '81px'}"
        />

        <calendar-icon 
            :style="{left: '20%', top: '64%',  height:'6rem'}"
            stepTitle="Book Appeal Date with Registry"
            stepTitleOptional="(Optional)"
            stepTitleClass="step-title-wide"
            @action="displayWindow('Book Appeal Date')"
            @completed="completed"            
            order=5
            v-bind="pageState[4]"
        />

        <trail
            className="journey-trail-l1-moveable-scoped"
            :completed="completedTrail[4]"
            :style="{position: 'absolute', marginLeft:'24%', top:'63.12%',width: '20%'}"
            width='22%'
            level=2
        />

        <form-icon 
            :style="{left: '44%', top: '63.5%'}"
            :twoPages="false"
            stepTitle="Notice of Hearing"
            stepTitleOptional="(Optional)"
            @action="displayWindow('Notice of Hearing')"
            @completed="completed"            
            order=6
            v-bind="pageState[5]"            
        />

        <trail
            className="journey-trail-l1-moveable-scoped"
            :completed="completedTrail[5]"
            :style="{position: 'absolute', marginLeft:'46%', top:'63.12%',width: '22%'}"
            width='22%'
            level=2
        />

        <form-icon 
            :style="{left: '67.5%', top: '63.5%'}"
            :twoPages="false"
            stepTitle="Book of Authorities"
            @action="displayWindow('Book of Authorities')"
            @completed="completed"            
            order=7
            v-bind="pageState[6]"            
        />

<!-- <LEVEL 4> -->        

        <return-trail
            :status="completedTrail[6]?'completed':''"
            startpoint='70%'
            top='147px'
            :extendEnd="true"
            :returnLevel="3"
        />

        <div
            :style="{marginLeft: '141px',
                borderTop: '9px solid rgb(159, 191, 226)',
                width: '67%',
                position: 'absolute',
                top: '96.35%',
                zIndex: '1',
                marginBottom: '81px'}"
        />        

        <gavel-icon 
            :style="{left: '28%', top: '90%'}"
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
            :style="{position: 'absolute', marginLeft:'32%', top:'91.9%',width: '28%'}"
            width='25%'
            level=2
        />

        <form-icon 
            :style="{left: '60%', top: '92%'}"
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
            width='20%'
            :style="{position: 'absolute', width: '20%', left: '64%', top: '91.9%'}"
            level=2
        />

        <end-circle
            stepTitle="Appeal Process Complete"
            :style="{left: '80%', top: '92%'}"
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

            <b-row style="font-size: 2em; font-weight: 700;" class="mb-1 ml-4">{{contentTitle}}</b-row>
            
            <b-row no-gutters>
                <b-col cols="1">
                    <path-sidebar :key="updated" v-bind:pathTypes="pathTypes" v-bind:pathHeights="pathHeights"/>
                </b-col>
                <b-col cols="11" style="padding: 0 0 0 2rem;">               
                    
                    <notice-of-appearance-rsp-to-appeal-pg @adjustHeights="adjustHeights" v-if="noticeOfAppearanceContent"/>
                    <notice-of-cross-appeal-rsp-to-appeal-pg @showFactums="showFactums" @adjustHeights="adjustHeights" v-else-if="noticeOfCrossAppealContent"/>
                    <apply-leave-app-right-to-appeal-pg v-bind:app='false' @adjustHeights="adjustHeights" v-else-if="applyForLeaveToAppealContent"/>
                    
                    <factum-appeal-book-rsp-to-appeal-pg @adjustHeights="adjustHeights" v-else-if="factumAppealBookContent"/>              
                    <book-appeal-date-rsp-to-appeal-pg @adjustHeights="adjustHeights" v-else-if="bookAppealDateContent"/>
                    
                    <notice-of-hearing-rsp-to-appeal-pg @adjustHeights="adjustHeights" v-else-if="noticeOfHearingContent"/>
                    <book-of-authorities-rsp-to-appeal-pg v-else-if="bookOfAuthoritiesContent"/>
                    <the-hearing-app-right-to-appeal-pg v-bind:app='false' @showOrders="showOrders" @adjustHeights="adjustHeights" v-else-if="theHearingContent"/>                
                    <orders-app-right-to-appeal-pg @adjustHeights="adjustHeights" v-else-if="courtOrderContent"/>                    
                    <appeal-process-complete-rsp-to-appeal-pg v-else-if="appealProcessCompleteContent"/>
                
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
import ApplyLeaveAppRightToAppealPg from '../components/AppRightToAppeal/ApplyLeaveAppRightToAppealPg.vue';

import FactumAppealBookRspToAppealPg from '../components/RspToAppeal/FactumAppealBookRspToAppealPg.vue';
import BookAppealDateRspToAppealPg from '../components/RspToAppeal/BookAppealDateRspToAppealPg.vue';
import BookOfAuthoritiesRspToAppealPg from '../components/RspToAppeal/BookOfAuthoritiesRspToAppealPg.vue';
import TheHearingAppRightToAppealPg from '../components/AppRightToAppeal/TheHearingAppRightToAppealPg.vue';
import OrdersAppRightToAppealPg from '../components/AppRightToAppeal/OrdersAppRightToAppealPg.vue';

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
        ApplyLeaveAppRightToAppealPg,
        FactumAppealBookRspToAppealPg,
        BookAppealDateRspToAppealPg,
        BookOfAuthoritiesRspToAppealPg,
        TheHearingAppRightToAppealPg,
        OrdersAppRightToAppealPg,
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
    windowTitle = '';
    contentTitle = '';
    pathTypes = [] as string[];
    pathHeights = [] as string[];    
    noticeOfAppearanceContent = false; 
    noticeOfCrossAppealContent = false;
    applyForLeaveToAppealContent = false;
    factumAppealBookContent = false;
    bookAppealDateContent = false;
    noticeOfHearingContent = false;
    bookOfAuthoritiesContent = false;
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

    public showOrders(){
        this.showWindow = false;
        this.displayWindow('Final Order');
    }

    public showFactums(){
        this.showWindow = false;
        this.displayWindow('Factum and Appeal Book');
    }

    public displayWindow(contentType: string){

        this.noticeOfAppearanceContent = false; 
        this.noticeOfCrossAppealContent = false;
        this.applyForLeaveToAppealContent = false;
        this.factumAppealBookContent = false;
        this.bookAppealDateContent = false;
        this.noticeOfHearingContent = false;
        this.bookOfAuthoritiesContent = false;
        this.theHearingContent = false;
        this.courtOrderContent = false;
        this.appealProcessCompleteContent = false;
        this.contentTitle = '';

        if (contentType == "Notice of Appearance"){            
            this.windowTitle = "Notice of Appearance";
            this.pathTypes = ["share", "info", "info"];
            this.pathHeights = ['14rem', '0', '0'];
            this.noticeOfAppearanceContent = true;

        } else if (contentType == "Notice of Cross Appeal"){            
            this.windowTitle = "Cross Appeal (Optional)";
            this.contentTitle = '';
            this.pathTypes = ["info", "share", "share", "share", "info"];
            this.pathHeights = ['5rem', '0', '0', '0', '0'];
            this.noticeOfCrossAppealContent = true;

        } else if (contentType == "Respond to Application for Leave to Appeal") {
            this.windowTitle = "Respond to Application for Leave to Appeal";
            this.pathTypes = ["info", "share", "share", "share", "share"];
            this.pathHeights = ['9rem', '0', '0', '0', '0'];
            this.applyForLeaveToAppealContent = true;

        } else if (contentType == "Factum and Appeal Book"){            
            this.windowTitle = "Factum and Appeal Book";
            this.pathTypes = ["share", "info", "info", "info"];
            this.pathHeights = ['39rem', '0', '0', '0'];
            this.factumAppealBookContent = true;

        } else if (contentType == "Book Appeal Date"){            
            this.windowTitle = "Book Appeal Date";
            this.pathTypes = ["gavel", "info", "info", "info"];
            this.pathHeights = ['7rem', '0', '0', '0'];
            this.bookAppealDateContent = true;

        } else if (contentType == "Notice of Hearing"){            
            this.windowTitle = "Notice of Hearing";
            this.pathTypes = ["question", "share"];
            this.pathHeights = ['17rem', '0'];
            this.noticeOfHearingContent = true; 

        } else if (contentType == "Book of Authorities"){            
            this.windowTitle = "Book of Authorities";
            this.pathTypes = ["info"];
            this.pathHeights = ['23rem'];            
            this.bookOfAuthoritiesContent = true;

        } else if (contentType == "The Hearing"){
            this.windowTitle = "The Hearing";
            this.contentTitle = 'For more information about the hearing process, click the topics below:';
            this.pathTypes = ["gavel", "share", "share", "info"];
            this.pathHeights = ['5rem', '0', '0', '0'];
            this.theHearingContent = true;

        } else if (contentType == "Final Order"){
            this.windowTitle = "Final Order";
            this.pathTypes = ["info", "info", "share"];
            this.pathHeights = ['21rem', '0', '0'];
            this.courtOrderContent = true;

        }else if (contentType == "Appeal Process Complete"){
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

