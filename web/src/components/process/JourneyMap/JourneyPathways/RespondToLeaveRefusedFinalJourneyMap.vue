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

        <Trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[0]"
            width='25%'
            level=1
        />
        
        <FormIcon 
            :style="{left: '28%'}"
            :twoPages="true"
            stepTitle="Application for Review"            
            action="this.iconClicked.bind(this, 'applicationforReview')"
            @completed="completed"            
            order=1
            v-bind="pageState[0]"
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[0]"
            width='31%'
            level=1
        />

        <GavelIcon 
            :style="{left: '55%', top:'15%'}"
            stepTitle="The Hearing"
            class="journey-box"             
            action="this.iconClicked.bind(this, 'respondentleavetoappealhearing')"
            @completed="completed"            
            order=2
            v-bind="pageState[1]"            
        />

        <Trail
            className="journey-trail-l1-moveable"
            :completed="completedTrail[1]"
            width='25%'
            level=1
        />

        <ClockEndCircle 
            :style="{position: 'absolute', left: '80%', top: '22%'}"
            stepTitle="Final Decision on Leave to Appeal"
            :titleStyle="{position: 'absolute', top: '97px', width: '150px', left: '-22px'}"
            :completed="completedTrail[1]"
            order=3
            v-bind="pageState[2]"
        />
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Trail from './Trail.vue'
import FormIcon from './journeyicons/FormIcon.vue'

import GavelIcon from './journeyicons/GavelIcon.vue'
import ClockEndCircle from './journeyicons/ClockEndCircle.vue'

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
        ClockEndCircle
    }
})
export default class RespondToLeaveRefusedFinalJourneyMap extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    dataReady = false;
    completedTrail :boolean[] = []
    numOfPages = 0;
    currentStep = 0;
    pageState : {active:boolean; status:string; ready:boolean;}[] = []

    mounted(){
        this.dataReady = false;

        this.currentStep = this.stPgNo.RSP_TO_LEAVE_REFUSED._StepNo;
        this.numOfPages = Object.keys(this.stPgNo.RSP_TO_LEAVE_REFUSED).length-1;

        this.pageState = evaluatePageState(this.numOfPages, this.currentStep);
        
        this.dataReady = true;
    }

    public completed(order, checked){
        
        activatePage(order, checked, this.currentStep)
        this.completedTrail = evaluateCompletedTrails(this.numOfPages, this.currentStep)
        this.pageState = evaluatePageState(this.numOfPages, this.currentStep)
    }

}
</script>
<style scoped>
@import './journeyStyles/JourneyMap.css';
@import "./journeyStyles/ReturnTrail.css";
@import './journeyStyles/JourneyIcons.css';
@import './journeyStyles/PageeIcon.css';
</style>



