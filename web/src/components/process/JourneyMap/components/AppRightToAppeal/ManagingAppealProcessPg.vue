<template>
    <b-card class="bg-white border-white w-90"> 
<!--Make an Application  -->
        <b-row class="mt-1" style="padding-top: 0.85rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Make an Application:
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showAppIntro(!showAppIntroInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showAppIntroInfo"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>       

        <b-row v-if="showAppIntroInfo" class="mt-4" >

            <p>
                If you need to make an application, please select the items 
                below that you will be applying for to see the instructions 
                of what will be required.
            </p>
            <p class="step-title-column ml-5">I am applying for:</p>
            <p class="ml-5 mt-2">
                <b-form-checkbox-group
                    style="font-size: 1rem; font-weight:500; display: block;"        
                    v-model="applications"                
                    @change="updateApps"                                     
                    stacked                
                >                        
                    <b-form-checkbox
                        v-for="application in applicationsList" 
                        @change="updateApps"
                        :key="application.value"
                        :value="application.value">
                            {{application.text}}
                    </b-form-checkbox> 
                </b-form-checkbox-group>
            </p>

            <p v-if="applications.length > 0"                
                class="step-title-column">Applications Requirements or Steps</p>

            <div v-if="getAppRules().includes('54')">
                <rule-54-application-instructions/>
            </div>

            <div v-if="getAppRules().includes('59')">
                <rule-59-application-instructions/>
            </div>

            <div v-if="getAppRules().includes('58')">
                <rule-58-application-instructions/>
            </div>            

            <div v-if="getAppRules().includes('60')">
                <rule-60-application-instructions/>
            </div>

            <div v-if="getAppRules().includes('61')">
                <rule-61-application-instructions/>
            </div>

            <div v-if="getAppRules().includes('63')">
                <rule-63-application-instructions/>
            </div>

        </b-row>
<!-- urgent applications -->
        <b-row 
            :class="showAppIntroInfo?'mt-2':'mt-4'" 
            :style="showAppIntroInfo?'padding-top: 1.75rem;':'padding-top: 0.75rem;'">            
            <b-col cols="11" class="step-title-column pl-0">
                Urgent Applications
            </b-col>   
           
            <b-col cols="1">
                <b-button
                    @click="showUrgent(!showUrgentInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showUrgentInfo"></expand-icon>
                </b-button>
            </b-col>         
            
        </b-row>

        <b-row v-if="showUrgentInfo" class="mt-4">
            <rule-57-application-instructions/>
        </b-row>        

<!-- stay applications -->
        <b-row :class="showUrgentInfo?'mt-2':'mt-3'" style="padding-top: 1rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Stay Applications when not joined with an application for leave to appeal
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showStayApplications(!showStayApplicationsInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showStayApplicationsInfo"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>       

        <b-row v-if="showStayApplicationsInfo" class="mt-4" >
            <rule-20-application-instructions/> 
        </b-row> 

<!--Respond to an Application  -->
        <b-row :class="showStayApplicationsInfo?'mt-3':'mt-4'" style="padding-top: 1rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Respond to an Application
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showRespIntro(!showRespIntroInfo)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showRespIntroInfo"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>       

        <b-row v-if="showRespIntroInfo" class="mt-4" >

            <p>
                If you need to make an application, please select the items 
                below that you will be applying for to see the instructions 
                of what will be required.
            </p>
            <p class="step-title-column ml-5">I am applying for:</p>
            <p class="ml-5 mt-2">
                <b-form-checkbox-group
                    style="font-size: 1rem; font-weight:500; display: block;"        
                    v-model="responses"                
                    @change="updateResp"                                     
                    stacked                
                >                        
                    <b-form-checkbox
                        v-for="response in responsesList" 
                        @change="updateResp"
                        :key="response.value"
                        :value="response.value">
                            {{response.text}}
                    </b-form-checkbox> 
                </b-form-checkbox-group>
            </p>

            <p v-if="responses.length > 0"                
                class="step-title-column">Application Requirements or Steps</p>

            <div v-if="getRespRules().includes('54')">
                <rule-54-response-instructions/>
            </div>

            <div v-if="getRespRules().includes('59')">
                <rule-59-response-instructions/>
            </div>

            <div v-if="getRespRules().includes('58')">
                <rule-58-response-instructions/>
            </div>            

            <div v-if="getRespRules().includes('60')">
                <rule-60-response-instructions/>
            </div>

            <!-- <div v-if="getRespRules().includes('61')">
                <rule-61-response-instructions/>
            </div> -->

            <div v-if="getRespRules().includes('63')">
                <rule-63-response-instructions/>
            </div>

        </b-row>

<!-- Vary an Order of a Justice -->
        <b-row :class="showRespIntroInfo && responses.length > 0?'mt-1':'mt-4'" style="padding-top: 0.5rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Vary an Order of a Justice
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showForm8(!showForm8Info)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showForm8Info"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>

        <rule-62-application-instructions v-if="showForm8Info"/>        

<!-- I need to Request -->
        <b-row :class="showForm8Info?'mt-0':'mt-4'" style="padding-top: 1rem;">            
            <b-col cols="11" class="step-title-column pl-0">
                Request to adjourn or reset a matter
            </b-col>   
            <b-col cols="1">
                <b-button
                    @click="showForm9(!showForm9Info)"                                       
                    class="p-1 bg-white border-white expand-steps-button">                    
                    <expand-icon v-bind:showExpanded="showForm9Info"></expand-icon>
                </b-button>
            </b-col>         
        </b-row>

        <b-row v-if="showForm9Info" class="mt-4" >
            If you wish to submit a request:
            <ol class="mt-3">
                <li>
                    Complete either the .DOC or .PDF below. Click on the document name for more information.
                    <ul>
                        <li>
                            <b-row class="my-1 w-110">
                                <b-col cols="9">
                                    Requisition
                                    <!-- <a 
                                        href=""
                                        target="_blank">Requisition
                                    </a> -->
                                </b-col>                                
                                <b-col cols="3" class="p-0" >
                                    <b-button
                                        @click="startNewForm9Document"
                                        target="_blank"                                                                                
                                        class="p-1 bg-white text-primary border-primary online-form-button">Online form
                                    </b-button>
                                </b-col>
                            </b-row>
                        </li>
                    </ul>
                </li>                
                <li>
                    File the document with the registry.
                </li>
                <li>
                    Serve one copy of the notice hearing and each attached order to each respondent.
                </li>
            </ol>
        </b-row> 

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import ExpandIcon from "@/components/utils/ExpandIcon.vue";

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

import Rule20ApplicationInstructions from "./components/Rule20ApplicationInstructions.vue";
import Rule54ApplicationInstructions from "./components/Rule54ApplicationInstructions.vue";
import Rule57ApplicationInstructions from "./components/Rule57ApplicationInstructions.vue";
import Rule58ApplicationInstructions from "./components/Rule58ApplicationInstructions.vue";
import Rule59ApplicationInstructions from "./components/Rule59ApplicationInstructions.vue";
import Rule60ApplicationInstructions from "./components/Rule60ApplicationInstructions.vue";
import Rule61ApplicationInstructions from "./components/Rule61ApplicationInstructions.vue";
import Rule62ApplicationInstructions from "./components/Rule62ApplicationInstructions.vue";
import Rule63ApplicationInstructions from "./components/Rule63ApplicationInstructions.vue";
import Rule54ResponseInstructions from "./components/Rule54ResponseInstructions.vue";
import Rule58ResponseInstructions from "./components/Rule58ResponseInstructions.vue";
import Rule59ResponseInstructions from "./components/Rule59ResponseInstructions.vue";
import Rule60ResponseInstructions from "./components/Rule60ResponseInstructions.vue";
import Rule61ResponseInstructions from "./components/Rule61ResponseInstructions.vue";
import Rule63ResponseInstructions from "./components/Rule63ResponseInstructions.vue";

@Component({
    components:{
        ExpandIcon,
        Rule20ApplicationInstructions,
        Rule54ApplicationInstructions,
        Rule57ApplicationInstructions,
        Rule58ApplicationInstructions,
        Rule59ApplicationInstructions,
        Rule60ApplicationInstructions,
        Rule61ApplicationInstructions,
        Rule62ApplicationInstructions,
        Rule63ApplicationInstructions,
        Rule54ResponseInstructions,
        Rule58ResponseInstructions,
        Rule59ResponseInstructions,
        Rule60ResponseInstructions,
        Rule61ResponseInstructions,
        Rule63ResponseInstructions
    }
})
export default class ManagingAppealProcessPg extends Vue {  

    @form4State.Action
    public UpdateCurrentNoticeOfApplicationId!: (newCurrentNoticeOfApplicationId: string) => void

    @form8State.Action
    public UpdateCurrentNoticeOfApplicationToVaryId!: (newCurrentNoticeOfApplicationToVaryId: string) => void

    @form9State.Action
    public UpdateCurrentRequisitionId!: (newCurrentRequisitionId: string) => void

    applicationsList = [
        {text: 'adjournment', value:'adjournment'},
        {text: 'adducing fresh or new evidence', value:'adducing'},
        {text: 'to consolidate or have appeals heard together', value:'consolidate'},
        {text: 'directions', value:'directions'},
        {text: 'dismissal of appeal in chambers', value:'dismissalChambers'},
        {text: 'dismissal (other)', value:'dismissalOther'},
        {text: 'extend time to file books or documents', value:'extendOther'},
        {text: 'extend time to appeal or cross-appeal', value:'extendCrossAppeal'},
        {text: 'intervener status', value:'intervener'},       
        {text: 'payment of security', value:'security'},
        {text: 'quashing an appeal or raising a preliminary objection', value:'objection'},
        {text: 'reinstate appeal that is dismissed as abandoned', value:'reinstate'},
        {text: 'remove appeal from the inactive list', value:'remove'},       
        {text: 'varying or cancelling an order of the registrar', value:'varying'},
        {text: 'other', value:'other'}
    ]

    responsesList = [
        {text: 'adjournment', value:'adjournment'},
        {text: 'adducing fresh or new evidence', value:'adducing'},
        {text: 'to consolidate or have appeals heard together', value:'consolidate'},
        {text: 'directions', value:'directions'},
        {text: 'dismissal of appeal in chambers', value:'dismissalChambers'},
        {text: 'dismissal (other)', value:'dismissalOther'},
        {text: 'extend time to file books or documents', value:'extendOther'},
        {text: 'extend time to appeal or cross-appeal', value:'extendCrossAppeal'},
        {text: 'intervener status', value:'intervener'},       
        {text: 'payment of security', value:'security'},
        {text: 'quashing an appeal or raising a preliminary objection', value:'objection'},
        {text: 'reinstate appeal that is dismissed as abandoned', value:'reinstate'},
        {text: 'remove appeal from the inactive list', value:'remove'},       
        {text: 'varying or cancelling an order of the registrar', value:'varying'},
        {text: 'other', value:'other'}
    ]

    showAppIntroInfo = true;
    showUrgentInfo = false;     
    showStayApplicationsInfo = false;
    showRespIntroInfo = false;
    showForm8Info = false; 
    showForm9Info = false;     
    applications = [];
    responses = [];
    updatedApps = 0;
    updatedResps = 0;
    appStepsLength = 31;
    respStepsLength = 16;
    Rule54 = [
        'adjournment', 'consolidate', 'directions', 'dismissalChambers', 
        'dismissalOther', 'extendOther', 'extendCrossAppeal', 
        'reinstate', 'remove', 'other'];
    Rule58 = ['security'];
    Rule59 = ['adducing'];
    Rule60 = ['objection'];
    Rule61 = ['intervener'];
    Rule63 = ['varying'];

    mounted(){
        this.appStepsLength = 31;
        this.respStepsLength = 31;
    }

    public updateApps(){          
        this.appStepsLength = 31;

        if (this.getAppRules().includes('54')){
            this.appStepsLength = this.appStepsLength + 29;
        }

        if (this.getAppRules().includes('58')){
            this.appStepsLength = this.appStepsLength + 33;
        }

        if (this.getAppRules().includes('59')){
            this.appStepsLength = this.appStepsLength + 34;
        }

        if (this.getAppRules().includes('60')){
            this.appStepsLength = this.appStepsLength + 42;
        }

        if (this.getAppRules().includes('61')){
            this.appStepsLength = this.appStepsLength + 29;
        }      

        if (this.getAppRules().includes('63')){
            this.appStepsLength = this.appStepsLength + 29;
        }

        if (this.showAppIntroInfo){
            this.$emit('adjustHeights', 0, this.appStepsLength + "rem");
        }            
        
        this.updatedApps ++; 
    }

    public updateResp(){   

        this.respStepsLength = 31;

        if (this.getRespRules().includes('54')){
            this.respStepsLength = this.respStepsLength + 22;
        }

        if (this.getRespRules().includes('58')){
            this.respStepsLength = this.respStepsLength + 28;
        }

        if (this.getRespRules().includes('59')){
            this.respStepsLength = this.respStepsLength + 29;
        }

        if (this.getRespRules().includes('60')){
            this.respStepsLength = this.respStepsLength + 29;
        }

        // if (this.getRespRules().includes('61')){
        //     this.respStepsLength = this.respStepsLength + 29;
        // }      

        if (this.getRespRules().includes('63')){
            this.respStepsLength = this.respStepsLength + 26;
        }

        if (this.showRespIntroInfo){
            this.$emit('adjustHeights', 3, this.respStepsLength + "rem");
        }            
        
        this.updatedResps ++; 
    }

    public getAppRules(){

        const rules = [];

        if (this.applications.some(app => this.Rule54.includes(app))){
            rules.push('54');
        }

        if (this.applications.some(app => this.Rule58.includes(app))){
            rules.push('58');
        }

        if (this.applications.some(app => this.Rule59.includes(app))){
            rules.push('59');
        }

        if (this.applications.some(app => this.Rule60.includes(app))){
            rules.push('60');
        }

        if (this.applications.some(app => this.Rule61.includes(app))){
            rules.push('61');
        }

        if (this.applications.some(app => this.Rule63.includes(app))){
            rules.push('63');
        }

        return rules;

    }

    public getRespRules(){

        const rules = [];

        if (this.responses.some(app => this.Rule54.includes(app))){
            rules.push('54');
        }

        if (this.responses.some(app => this.Rule58.includes(app))){
            rules.push('58');
        }

        if (this.responses.some(app => this.Rule59.includes(app))){
            rules.push('59');
        }

        if (this.responses.some(app => this.Rule60.includes(app))){
            rules.push('60');
        }

        if (this.responses.some(app => this.Rule61.includes(app))){
            rules.push('61');
        }

        if (this.responses.some(app => this.Rule63.includes(app))){
            rules.push('63');
        }

        return rules;

    }
    
    public showAppIntro(show: boolean){
        if (show) {
            this.showAppIntroInfo = true;
            this.$emit('adjustHeights', 0, this.appStepsLength + "rem");
        } else {
            this.showAppIntroInfo = false;
            this.$emit('adjustHeights', 0, "0");
        }
    } 
    
    public showUrgent(show: boolean){
        if (show) {
            this.showUrgentInfo = true;
            this.$emit('adjustHeights', 1, "22rem");
        } else {
            this.showUrgentInfo = false;
            this.$emit('adjustHeights', 1, "0");
        }
    } 

    public showStayApplications(show: boolean){
        if (show) {
            this.showStayApplicationsInfo = true;
            this.$emit('adjustHeights', 2, "26rem");
        } else {
            this.showStayApplicationsInfo = false;
            this.$emit('adjustHeights', 2, "0");
        }
    } 

    public showRespIntro(show: boolean){
        if (show) {
            this.showRespIntroInfo = true;
            this.$emit('adjustHeights', 3, this.respStepsLength + "rem");
        } else {
            this.showRespIntroInfo = false;
            this.$emit('adjustHeights', 3, "0");
        }
    } 
    
    public showForm8(show: boolean){
        if (show) {
            this.showForm8Info = true;
            this.$emit('adjustHeights', 4, "31rem");
        } else {
            this.showForm8Info = false;
            this.$emit('adjustHeights', 4, "0");
        }
    }    

    public showForm9(show: boolean){
        if (show) {
            this.showForm9Info = true;
            this.$emit('adjustHeights', 5, "12rem");
        } else {
            this.showForm9Info = false;
            this.$emit('adjustHeights', 5, "0");
        }
    }
    
    public startNewForm8Document(){
        this.UpdateCurrentNoticeOfApplicationToVaryId(null);
        this.$router.push({name: "start-form8" })
    }

    public startNewForm9Document(){
        this.UpdateCurrentRequisitionId(null);
        this.$router.push({name: "start-form9" })
    }

    public startNewForm4Document(){
        this.UpdateCurrentNoticeOfApplicationId(null);
        this.$router.push({name: "start-form4" })
    }
    
}
</script>

<style scoped lang="scss">

</style>