<template>
    <b-card border-variant="white" class="pb-5">
      
        <b-card class="border-primary bg-primary text-white my-4 mr-5" v-if="!selfRep">                    
            <h3 style="text-decoration: underline;">Not self-represented</h3>
            If you are filing for multiple Court of Appeal matters, this service 
            will assist you in completing and submitting forms online.
            <h4 class="mt-2">Options for using the service:</h4>
            <ol class="mt-2">
                <li>
                    You can use direct links to the forms by clicking the  
                    <span class="bg-success text-white p-1" >New Form
                        <b-icon-plus scale="1.5" variant="white"/>
                    </span>                    
                    button found on this screen or by clicking on the document 
                    descriptions found on the right-side menus to complete the forms.
                </li>
                <li>
                    Use the journey map below for a specific matter.
                </li>
            </ol>                  

        </b-card>  
        
        <h3>The Appeal Process</h3>      

        <app-right-to-appeal-instructions v-if="appRightToAppeal"/>
        <app-apply-leave-instructions v-else-if="appApplyLeave" />
        <app-leave-refused-instructions v-else-if="appLeaveRefused" />
        <app-leave-granted-instructions v-else-if="appLeaveGranted" />
        <app-leave-refused-final-instructions v-else-if="appLeaveRefusedFinal" />
        <app-leave-granted-final-instructions v-else-if="appLeaveGrantedFinal" />
        <rsp-to-appeal-instructions v-else-if="rspToAppeal" />
        <rsp-to-leave-instructions v-else-if="rspToLeave" />
        <rsp-to-leave-granted-instructions v-else-if="rspToLeaveGranted" />
        <rsp-to-leave-refused-instructions v-else-if="rspToLeaveRefused" />
        <rsp-to-leave-refused-final-instructions v-else-if="rspToLeaveRefusedFinal" />
        
        <p v-if="!appLeaveRefused && !appLeaveRefusedFinal && !rspToLeaveRefusedFinal">
            <b style="text-decoration: underline;">NOTE:</b> Every appeal process is unique. If you have any questions, please visit the 
            <a 
                href="http://www.courtofappealbc.ca/civil-family-law/guidebook-for-appellants/deciding-to-appeal" 
                target="_blank">Online Guidebook
            </a>, the  
            <a 
                href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2022a" 
                target="_blank">Court of Appeal Rules
            </a> or 
            <a 
                href="mailto:courts.cso@gov.bc.ca">contact the registry
            </a>.
        </p>
        <b-row>
            <b-button 
                style="float:right;"
                class="ml-3 mb-1 bg-success"
                size="md" 
                variant="success" 
                @click="downloadInstructions()">
                Print Process Map
                <b-icon-printer-fill scale="1" variant="white"/>
            </b-button>
        </b-row>
    
        <journey-map style="width: 63%; margin: 0 auto;" />
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import { GetInstructionFile } from '@/components/utils/GetInstructionFile';

import "@/store/modules/application";
const applicationState = namespace("Application");

import { stepInfoType } from '@/types/Application';
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';

import JourneyMap from "../JourneyMap/JourneyMap.vue";
import appRightToAppealInstructions from "./pathwayInstructions/appRightToAppealInstructions.vue";
import appApplyLeaveInstructions from "./pathwayInstructions/appApplyLeaveInstructions.vue";
import appLeaveRefusedInstructions from "./pathwayInstructions/appLeaveRefusedInstructions.vue";
import appLeaveGrantedInstructions from "./pathwayInstructions/appLeaveGrantedInstructions.vue";
import appLeaveRefusedFinalInstructions from "./pathwayInstructions/appLeaveRefusedFinalInstructions.vue";
import appLeaveGrantedFinalInstructions from "./pathwayInstructions/appLeaveGrantedFinalInstructions.vue";

import rspToAppealInstructions from "./pathwayInstructions/rspToAppealInstructions.vue";
import rspToLeaveInstructions from "./pathwayInstructions/rspToLeaveInstructions.vue";
import rspToLeaveGrantedInstructions from "./pathwayInstructions/rspToLeaveGrantedInstructions.vue";
import rspToLeaveRefusedInstructions from "./pathwayInstructions/rspToLeaveRefusedInstructions.vue";
import rspToLeaveRefusedFinalInstructions from "./pathwayInstructions/rspToLeaveRefusedFinalInstructions.vue";

@Component({
    components:{
        JourneyMap,
        appRightToAppealInstructions,
        appApplyLeaveInstructions,
        appLeaveRefusedInstructions,
        appLeaveGrantedInstructions,
        appLeaveRefusedFinalInstructions,
        appLeaveGrantedFinalInstructions,
        rspToAppealInstructions,
        rspToLeaveInstructions,
        rspToLeaveGrantedInstructions,
        rspToLeaveRefusedInstructions,
        rspToLeaveRefusedFinalInstructions
    }
})
export default class AppealProcess extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;  

    @applicationState.State
    public steps!: stepInfoType[];

    appApplyLeave = false;
    appLeaveGranted = false;
    appLeaveRefused = false;
    appLeaveGrantedFinal = false;
    appLeaveRefusedFinal = false;
    appRightToAppeal = false;
    rspToAppeal = false;   
    rspToLeave = false; 
    rspToLeaveRefusedFinal = false;
    rspToLeaveRefused = false;
    rspToLeaveGranted = false;
    selfRep = false;

    mounted(){
        this.selfRep = this.$store.state.Common.userSelfRepresented;
        this.appApplyLeave = this.steps[this.stPgNo.APP_APPLY_LEAVE._StepNo].active;
        this.appLeaveGranted = this.steps[this.stPgNo.APP_LEAVE_GRANTED._StepNo].active;
        this.appLeaveRefused = this.steps[this.stPgNo.APP_LEAVE_REFUSED._StepNo].active;
        this.appLeaveGrantedFinal = this.steps[this.stPgNo.APP_LEAVE_GRANTED_FINAL._StepNo].active;
        this.appLeaveRefusedFinal = this.steps[this.stPgNo.APP_LEAVE_REFUSED_FINAL._StepNo].active;
        this.appRightToAppeal = this.steps[this.stPgNo.APP_RIGHT_TO_APPEAL._StepNo].active;
        this.rspToAppeal = this.steps[this.stPgNo.RSP_TO_APPEAL._StepNo].active;
        this.rspToLeave = this.steps[this.stPgNo.RSP_TO_LEAVE._StepNo].active;
        this.rspToLeaveGranted = this.steps[this.stPgNo.RSP_TO_LEAVE_GRANTED._StepNo].active;
        this.rspToLeaveRefused = this.steps[this.stPgNo.RSP_TO_LEAVE_REFUSED._StepNo].active;
        this.rspToLeaveRefusedFinal = this.steps[this.stPgNo.RSP_TO_LEAVE_REFUSED_FINAL._StepNo].active;
    }

    public downloadInstructions(){

        if(this.appRightToAppeal){
            GetInstructionFile('applying-pathway', '.pdf');
        } else if (this.rspToAppeal) {
            GetInstructionFile('responding-pathway', '.pdf');
        }

    }

}

</script>