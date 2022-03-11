<template>
    <b-card bg-variant="light" border-variant="white" no-body>
        <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>
        <loading-spinner color="#000" v-if="!dataLoaded" waitingText="Loading ..." />
        
        <b-card  no-body v-else class="home-content border-white p-0">          
             

            <my-documents-table-brief style="max-height:25rem; overflow-y:auto;" />
            
            <b-row no-gutters class="bg-white pt-1">
                <b-button 
                    class="ml-5 mb-1 bg-primary outline-dark"
                    size="sm"
                    @click="navigateToDocumentsPage">
                    View All Submissions
                </b-button>
            </b-row>
        </b-card>

        <b-card no-body class="home-content mt-3 border-light bg-light p-0">
            <b-row >
                <b-col cols="8">

                    <b-row v-if="journeyStarted" no-gutters class="bg-white">
                        <b-button 
                            @click="restartJourney" 
                            variant="outline-success bg-light text-dark" 
                            class="mt-3 mr-3"
                            style="margin-left:auto; right:0; top: 1; border-width: 2px;">
                            Restart journey
                        </b-button>
                    </b-row>

                    <appeal-process v-if="journeyStarted" :key="updated"></appeal-process>
                    <start-efiling v-else ></start-efiling>

                    
                </b-col>
                <b-col cols="4">

                    <most-used-forms></most-used-forms>
                    <additional-forms></additional-forms>
                    <need-help class="mt-3"></need-help>

                </b-col>
            </b-row>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/application";
const applicationState = namespace("Application")

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

import "@/store/modules/forms/form6";
const form6State = namespace("Form6");

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

import "@/store/modules/forms/form18";
const form18State = namespace("Form18");

import "@/store/modules/forms/form19";
const form19State = namespace("Form19");

import "@/store/modules/forms/form20";
const form20State = namespace("Form20");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import {migrate} from './MigrateStore'

import MyDocumentsTableBrief from "@/components/process/MyDocuments/MyDocumentsTableBrief.vue";
import AppealProcess from "@/components/process/AppealProcess/AppealProcess.vue";
import StartEfiling from "@/components/process/AppealProcess/StartEfiling.vue";
import NeedHelp from "@/components/utils/NeedHelp.vue";
import MostUsedForms from "@/components/utils/MostUsedForms.vue";
import AdditionalForms from "@/components/utils/AdditionalForms.vue";
import { toggleStep, toggleAllSteps} from '@/components/utils/StepsPagesFunctions';
import {GetFilingLocations} from '@/components/utils/GetFilingLocations';

import { caseJsonDataType, journeyJsonDataType } from '@/types/Information/json';
import { pathwayTypeInfoType } from '@/types/Information';

import { locationsInfoType } from '@/types/Common';
import { form7SubmissionDataInfoType, lookupsInfoType } from '@/types/Information/Form7';
import { form5FormsJsonDataType } from '@/types/Information/Form5';
import { form6FormsJsonDataType } from '@/types/Information/Form6';
import { form9FormsJsonDataType } from '@/types/Information/Form9';
import { form18FormsJsonDataType } from '@/types/Information/Form18';

import { form19FormsJsonDataType } from '@/types/Information/Form19';
import { form20FormsJsonDataType } from '@/types/Information/Form20';

@Component({
    components:{
        MyDocumentsTableBrief,
        AppealProcess,
        StartEfiling,
        NeedHelp,
        MostUsedForms,
        AdditionalForms
    }
})
export default class DashboardPage extends Vue {

    //___________________________
    //___________________________
    //___________________________NEW VERSION goes here _________________
    CURRENT_VERSION: string = "1.0";
    //__________________________
    //___________________________
    //___________________________


    @informationState.State
    public pathType: pathwayTypeInfoType;
    
    @form2State.Action
    public UpdateCasesJson!: (newCasesJson: caseJsonDataType[]) => void

    @form5State.Action
    public UpdateForm5FormsJson!: (newForm5FormsJson: form5FormsJsonDataType[])=> void

    @form6State.Action
    public UpdateForm6FormsJson!: (newForm6FormsJson: form6FormsJsonDataType[])=> void

    @form7State.Action
    public UpdateForm7FormsJson!: (newForm7FormsJson: form7SubmissionDataInfoType[])=> void

    @form9State.Action
    public UpdateForm9FormsJson!: (newForm9FormsJson: form9FormsJsonDataType[])=> void

    @form18State.Action
    public UpdateForm18FormsJson!: (newForm18FormsJson: form18FormsJsonDataType[])=> void

    @form19State.Action
    public UpdateForm19FormsJson!: (newForm19FormsJson: form19FormsJsonDataType[])=> void    

    @form20State.Action
    public UpdateForm20FormsJson!: (newForm20FormsJson: form20FormsJsonDataType[])=> void

    @informationState.Action
    public UpdateJourneyJson!: (newJourneyJson: journeyJsonDataType) => void

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    @commonState.Action
    public UpdateLookups!: (newLookups: lookupsInfoType) => void

    @commonState.Action
    public UpdateLocationsInfo!: (newLocationsInfo: locationsInfoType) => void

    dataLoaded = false;    
    journeyStarted = false;
    error = '';
    updated = 0;

    casesJson: caseJsonDataType[] = [];
    journeyJson = {} as journeyJsonDataType;

    @Watch('pathType')
    setPath(newPath: pathwayTypeInfoType) 
    {
        toggleAllSteps(false);
        
        if (newPath.appRightToAppeal){
            this.journeyStarted = true;
            toggleStep(this.stPgNo.APP_RIGHT_TO_APPEAL._StepNo, true)            
        } else if (newPath.appApplyLeave){
            this.journeyStarted = true;
            toggleStep(this.stPgNo.APP_APPLY_LEAVE._StepNo, true)
        } else if (newPath.appLeaveRefused){
            this.journeyStarted = true;
            toggleStep(this.stPgNo.APP_LEAVE_REFUSED._StepNo, true)
        } else if (newPath.appLeaveGranted){
            this.journeyStarted = true;
            toggleStep(this.stPgNo.APP_LEAVE_GRANTED._StepNo, true)
        } else if (newPath.appLeaveRefusedFinal){
            this.journeyStarted = true;
            toggleStep(this.stPgNo.APP_LEAVE_REFUSED_FINAL._StepNo, true)
        } else if (newPath.appLeaveGrantedFinal){
            this.journeyStarted = true;
            toggleStep(this.stPgNo.APP_LEAVE_GRANTED_FINAL._StepNo, true)
        } else if (newPath.rspToAppeal){
            this.journeyStarted = true;
            toggleStep(this.stPgNo.RSP_TO_APPEAL._StepNo, true)
        } else if (newPath.rspToLeave){
            this.journeyStarted = true;
            toggleStep(this.stPgNo.RSP_TO_LEAVE._StepNo, true)
        } else if (newPath.rspToLeaveGranted){
            this.journeyStarted = true;
            toggleStep(this.stPgNo.RSP_TO_LEAVE_GRANTED._StepNo, true)
        } else if (newPath.rspToLeaveRefused){
            this.journeyStarted = true;
            toggleStep(this.stPgNo.RSP_TO_LEAVE_REFUSED._StepNo, true)
        } else if (newPath.rspToLeaveRefusedFinal){
            this.journeyStarted = true;
            toggleStep(this.stPgNo.RSP_TO_LEAVE_REFUSED_FINAL._StepNo, true)
        } else {
            this.journeyStarted = false;
        }

        Vue.nextTick(()=> {
            this.updated++;
            Vue.prototype.$UpdateJourney();
        });
            
    }

    mounted() {  
        this.dataLoaded = false;
        this.initSteps();
        this.loadInfo(); 
        this.extractFilingLocations();       
    }

    public getCurrentState(){
        const steps = this.$store.state.Application.steps;
        for(const step of steps){
            if(step.active){                
                return true
            }
        }
        return false
    }


    public loadInfo () {
        this.dataLoaded = false;
        const calls =[]
        calls.push(this.$http.get('/journey/'));
        calls.push(this.$http.get('/lookup/'));
        calls.push(this.$http.get('/case/'));
        calls.push(this.$http.get('/form5/forms'));
        calls.push(this.$http.get('/form6/forms'));
        calls.push(this.$http.get('/form7/forms'));
        calls.push(this.$http.get('/form9/forms'));
        calls.push(this.$http.get('/form18/forms'));
        calls.push(this.$http.get('/form19/forms'));
        calls.push(this.$http.get('/form20/forms'));

        Promise.all(calls).then(values => { 
            console.log(values)
            
            if(values[0]?.data?.steps){

                const applicationData ={
                    steps: values[0].data.steps, 
                    version: (values[0].data.version)? values[0].data.version: "0.0"
                }      
                migrate(applicationData, this.CURRENT_VERSION);
                this.journeyStarted = this.getCurrentState();                
            }

            if(values[1]?.data) this.UpdateLookups(values[1].data);
            
            if(values[2]?.data) this.UpdateCasesJson(values[2]?.data)
            if(values[3]?.data) this.UpdateForm5FormsJson(values[3]?.data)
            if(values[4]?.data) this.UpdateForm6FormsJson(values[4]?.data)
            if(values[5]?.data) this.UpdateForm7FormsJson(values[5]?.data)
            if(values[6]?.data) this.UpdateForm9FormsJson(values[6]?.data)
            if(values[7]?.data) this.UpdateForm18FormsJson(values[7]?.data)
            if(values[8]?.data) this.UpdateForm19FormsJson(values[8]?.data)
            if(values[9]?.data) this.UpdateForm20FormsJson(values[9]?.data)

            this.dataLoaded = true;

        }, err =>{this.error = err +' ' +(err.response.detail? err.response.detail:'');})
    }
      
    public extractFilingLocations() {
        GetFilingLocations();       
    }


    public restartJourney() {
        this.journeyStarted = false;
        this.$store.commit("Application/ResetStepsAndPages");
        Vue.nextTick(()=>Vue.prototype.$UpdateJourney());
    }

    public navigateToDocumentsPage() {

        this.$router.push({name: "my-submissions" }) 
    }

    public initSteps(){
        this.$store.commit("Application/init");
        this.$store.dispatch("Application/UpdateStPgNo");
    }

}
</script>

<style scoped lang="scss">

@import "src/styles/common";
@import "~@fortawesome/fontawesome-free/css/all.min.css";

    .home-content {
        padding-bottom: 20px;
        padding-top: 0rem;
        width: 95%;
        color: black;
        margin: 0 auto;
    }

</style>