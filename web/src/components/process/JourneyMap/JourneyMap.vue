<template>
<div v-if="dataReady">      
    <appellant-apply-for-leave-journey-map v-if="appApplyLeave"/>
    <appellant-leave-granted-journey-map v-if="appLeaveGranted"/>
    <appellant-leave-refused-journey-map v-if="appLeaveRefused"/>
    <appellant-right-to-appeal-journey-map v-if="appRightToAppeal"/>
    
    <respond-to-appeal-journey-map v-if="rspToAppeal"/>
    <respond-to-leave-granted-journey-map v-if="rspToLeaveGranted"/>
    <respond-to-leave-journey-map v-if="rspToLeave"/>
    <respond-to-leave-refused-final-journey-map v-if="rspToLeaveRefusedFinal"/>
    <respond-to-leave-refused-journey-map v-if="rspToLeaveRefused"/>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AppellantApplyForLeaveJourneyMap from './JourneyPathways/AppellantApplyForLeaveJourneyMap.vue'
import AppellantLeaveGrantedJourneyMap from './JourneyPathways/AppellantLeaveGrantedJourneyMap.vue'
import AppellantLeaveRefusedJourneyMap from './JourneyPathways/AppellantLeaveRefusedJourneyMap.vue'
import AppellantRightToAppealJourneyMap from './JourneyPathways/AppellantRightToAppealJourneyMap.vue'

import RespondToAppealJourneyMap from './JourneyPathways/RespondToAppealJourneyMap.vue'
import RespondToLeaveGrantedJourneyMap from './JourneyPathways/RespondToLeaveGrantedJourneyMap.vue'
import RespondToLeaveJourneyMap from './JourneyPathways/RespondToLeaveJourneyMap.vue'
import RespondToLeaveRefusedFinalJourneyMap from './JourneyPathways/RespondToLeaveRefusedFinalJourneyMap.vue'
import RespondToLeaveRefusedJourneyMap from './JourneyPathways/RespondToLeaveRefusedJourneyMap.vue'

import { namespace } from "vuex-class";
import "@/store/modules/application";
const applicationState = namespace("Application")
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { stepInfoType } from '@/types/Application';


@Component({
    components:{        
       
        AppellantApplyForLeaveJourneyMap,
        AppellantLeaveGrantedJourneyMap,
        AppellantLeaveRefusedJourneyMap,
        AppellantRightToAppealJourneyMap,
        RespondToAppealJourneyMap,
        RespondToLeaveGrantedJourneyMap,
        RespondToLeaveJourneyMap,
        RespondToLeaveRefusedFinalJourneyMap,
        RespondToLeaveRefusedJourneyMap
    }
})
export default class JourneyMap extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;  

    @applicationState.State
    public steps!: stepInfoType[]; 

    dataReady = false

    appApplyLeave = false;
    appLeaveGranted = false;
    appLeaveRefused = false;
    appRightToAppeal = false;
    rspToAppeal = false;
    rspToLeaveGranted = false;
    rspToLeave = false;
    rspToLeaveRefusedFinal = false;
    rspToLeaveRefused = false;

    mounted(){
 console.log('MAP')
        this.dataReady = false;
        this.appApplyLeave = this.steps[this.stPgNo.APP_APPLY_LEAVE._StepNo].active;
        this.appLeaveGranted = this.steps[this.stPgNo.APP_LEAVE_GRANTED._StepNo].active || this.steps[this.stPgNo.APP_LEAVE_GRANTED_FINAL._StepNo].active;
        this.appLeaveRefused = this.steps[this.stPgNo.APP_LEAVE_REFUSED._StepNo].active;
        this.appRightToAppeal = this.steps[this.stPgNo.APP_RIGHT_TO_APPEAL._StepNo].active;
        this.rspToAppeal = this.steps[this.stPgNo.RSP_TO_APPEAL._StepNo].active;
        this.rspToLeave = this.steps[this.stPgNo.RSP_TO_LEAVE._StepNo].active;
        this.rspToLeaveGranted = this.steps[this.stPgNo.RSP_TO_LEAVE_GRANTED._StepNo].active;
        this.rspToLeaveRefused = this.steps[this.stPgNo.RSP_TO_LEAVE_REFUSED._StepNo].active;
        this.rspToLeaveRefusedFinal = this.steps[this.stPgNo.RSP_TO_LEAVE_REFUSED_FINAL._StepNo].active;
        this.dataReady = true;
    } 

}
</script>

<style scoped lang="scss">


</style>



