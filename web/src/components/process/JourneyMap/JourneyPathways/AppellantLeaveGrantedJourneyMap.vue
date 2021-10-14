<template>
    <div>
        <b-button  v-on:click="trail1 = !trail1">GLOW</b-button>
        <div class="journey-map-container">

            <div :class="{'journey-start-circle':true, 'completed-step': trail1}" />        
                
            <div
                :style="{marginLeft: '50px',
                    borderTop: '9px solid rgb(159, 191, 226)',
                    width: '75%',
                    position: 'absolute',
                    top: '19.6%',
                    zIndex: '0'}"
            />

            <trail                
                className="journey-trail-l1-moveable"
                :completed="trail1"
                width='15%'
                level=1                
            />

            <form-icon   
                style="left: 20%"
                :twoPages="true"
                stepTitle="Appeal Record and Transcript"
                stepTitleClass="step-title-wide"
                @action="displayWindow('Appeal Record and Transcript')"
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
                width='28%'
                level=1
            />

            <form-icon 
                style="left: 45%"
                :twoPages="true"
                stepTitle="Factum, Appeal Book and Certificate of Readiness"
                stepTitleClass="step-title-wide"
                @action="displayWindow('Factum, Appeal Book and Certificate of Readiness')"
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
                width='27%'
                level=1
            />

            <calendar-icon 
                :style="{left: '69%', marginTop: '5px'}"
                stepTitle="Book Appeal Date with Registry"
                stepTitleClass="step-title-wide"
                @action="displayWindow('Book Appeal Date')"
                :active="true"
                order=3
                :status="trail1?'completed':''"
                completed="this.stepCompleted.bind(this)"
                readys="this.props.isStepReady(3, this.state.steps)"
                :ready="true"
            />

            <return-trail
                :status="trail1?'completed':''"
                startpoint='73%'
            />

            <div
                :style="{marginLeft: '141px',
                    borderTop: '9px solid rgb(159, 191, 226)',
                    width: '70%',
                    position: 'absolute',
                    top: '374px',
                    zIndex: '1',
                    marginBottom: '81px'
                }"
            />

            <form-icon 
                :style="{top: '70%', left: '18%'}"
                :twoPages="false"
                stepTitle="Notice of Hearing"
                @action="displayWindow('Notice of Hearing')"
                stepTitleClass="step-title-wide"
                :active="true"
                order=4
                status="new"
                completed="this.stepCompleted.bind(this)"
                readys="this.props.isStepReady(3, this.state.steps)"
                :ready="true"
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="trail1"
                width='25%'
                :style="{position: 'absolute', marginLeft:'20%', top:'70.3%'}"
                level=2
            />

            <gavel-icon 
                :style="{left: '41%', top: '66%'}"
                class="journey-box" 
                stepTitle="The Hearing" 
                @action="displayWindow('The Hearing')"
                :active="true"
                order=5
                :status="trail1?'completed':''"
                completed="this.stepCompleted.bind(this)"
                readys="this.props.isStepReady(6, this.state.steps)"
                :ready="true"
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="trail1"
                width='24%'
                :style="{position: 'absolute', left:'45%', top:'70.3%'}"
                level=2
            />

            <form-icon 
                :style="{top: '70%', left: '64%'}"
                :twoPages="false"
                stepTitle="Court Order"
                stepTitleOptional="(if applicable)"
                @action="displayWindow('Court Order')"
                stepTitleClass="step-title-wide"
                :active="true"
                order=6
                status="new"
                completed="this.stepCompleted.bind(this)"
                readys="this.props.isStepReady(3, this.state.steps)"
                :ready="true"
            />

            <trail
                className="journey-trail-l1-moveable"
                :completed="trail1"
                width='22%'
                :style="{position: 'absolute', left:'70%', top:'70.3%'}"
                level=2
            />

            <end-circle
                stepTitle="Appeal Process Complete"
                @action="displayWindow('Appeal Process Complete')"
                :active="true"
                :completed="trail1"
                :style="{top: '70%', left: '84%'}"
                titleStyle="margin-top: 1.5rem;"                       
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
                
                    <book-appeal-date-app-leave-granted-pg v-if="bookAppealDateContent"/>
                    <notice-of-hearing-app-leave-granted-pg v-else-if="noticeOfHearingContent"/>
                    <the-hearing-app-leave-granted-pg v-else-if="theHearingContent"/>
                    <court-order-app-leave-granted-pg v-else-if="courtOrderContent"/>
                    <appeal-process-complete-app-leave-granted-pg v-else-if="appealProcessCompleteContent"/>
                    
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
import BookAppealDateAppLeaveGrantedPg from '../components/AppLeaveGranted/BookAppealDateAppLeaveGrantedPg.vue';
import NoticeOfHearingAppLeaveGrantedPg from '../components/AppLeaveGranted/NoticeOfHearingAppLeaveGrantedPg.vue';
import TheHearingAppLeaveGrantedPg from '../components/AppLeaveGranted/TheHearingAppLeaveGrantedPg.vue';
import CourtOrderAppLeaveGrantedPg from '../components/AppLeaveGranted/CourtOrderAppLeaveGrantedPg.vue';
import AppealProcessCompleteAppLeaveGrantedPg from '../components/AppLeaveGranted/AppealProcessCompleteAppLeaveGrantedPg.vue';

@Component({
    components:{
        Trail,
        FormIcon,
        CalendarIcon,
        ReturnTrail,
        GavelIcon,
        EndCircle,
        InstructionWindowFooter,
        PathSidebar,
        BookAppealDateAppLeaveGrantedPg,
        NoticeOfHearingAppLeaveGrantedPg,
        TheHearingAppLeaveGrantedPg,
        CourtOrderAppLeaveGrantedPg,
        AppealProcessCompleteAppLeaveGrantedPg
    }
})
export default class AppellantLeaveGrantedJourneyMap extends Vue {

    trail1 = false
    
    showWindow = false;
    windowTitle = '';
    pathType = '';
    pathHeight = '';

    bookAppealDateContent = false;
    noticeOfHearingContent = false;
    theHearingContent = false;
    courtOrderContent = false;
    appealProcessCompleteContent = false;
    

    displayWindow(contentType: string){

        this.bookAppealDateContent = false;
        this.noticeOfHearingContent = false;
        this.theHearingContent = false;
        this.courtOrderContent = false;
        this.appealProcessCompleteContent = false;

        if (contentType == "Book Appeal Date"){

            this.windowTitle = "Book Appeal Date";
            this.pathType = "gavel";
            this.pathHeight = '2rem';
            this.bookAppealDateContent = true;

        } else if (contentType == "Notice of Hearing"){

            this.windowTitle = "Notice of Hearing";
            this.pathType = "share";
            this.pathHeight = '12rem';
            this.noticeOfHearingContent = true;

        } else if (contentType == "The Hearing"){
            
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


