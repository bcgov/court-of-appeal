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
                <b-button 
                    class="ml-5 mb-1 bg-primary outline-dark"
                    size="sm"
                    @click="navigateToSubmitPackagePage">
                    Submit Court of Appeal Package
                </b-button>
                <b-button 
                    style="float:right;"
                    class="ml-5 mb-1 bg-success"
                    size="sm" 
                    variant="success" 
                    @click="showSelectFormToFill=true">
                    New Form
                    <b-icon-plus scale="1.5" variant="white"/>
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
                            Restart process
                        </b-button>
                    </b-row>

                    <appeal-process v-if="journeyStarted" :key="updated"></appeal-process>
                    <start-efiling v-else ></start-efiling>

                    
                </b-col>
                <b-col cols="4">

                    <most-used-forms></most-used-forms>
                    <applications></applications>
                    <additional-forms></additional-forms>
                    <representation-address-forms></representation-address-forms>
                    <orders></orders>
                    <need-help class="mt-3"></need-help>

                </b-col>
            </b-row>
        </b-card>       
        <new-form-modal :showSelectFormToFill="showSelectFormToFill" @closeModal="CloseModal" />
        
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

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

import "@/store/modules/forms/form3";
const form3State = namespace("Form3");

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

import "@/store/modules/forms/form6";
const form6State = namespace("Form6");

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

import "@/store/modules/forms/form10";
const form10State = namespace("Form10");

import "@/store/modules/forms/form11";
const form11State = namespace("Form11");

import "@/store/modules/forms/form12";
const form12State = namespace("Form12");

import "@/store/modules/forms/form13";
const form13State = namespace("Form13");

import "@/store/modules/forms/form14";
const form14State = namespace("Form14");

import "@/store/modules/forms/form15";
const form15State = namespace("Form15");

import "@/store/modules/forms/form16";
const form16State = namespace("Form16");

import "@/store/modules/forms/form17";
const form17State = namespace("Form17");

import "@/store/modules/forms/form18";
const form18State = namespace("Form18");

import "@/store/modules/forms/form19";
const form19State = namespace("Form19");

import "@/store/modules/forms/form20";
const form20State = namespace("Form20");

import "@/store/modules/forms/form22";
const form22State = namespace("Form22");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import {migrate} from './MigrateStore'
import NewFormModal from "@/components/process/MyDocuments/NewFormModal.vue";
import MyDocumentsTableBrief from "@/components/process/MyDocuments/MyDocumentsTableBrief.vue";
import AppealProcess from "@/components/process/AppealProcess/AppealProcess.vue";
import StartEfiling from "@/components/process/AppealProcess/StartEfiling.vue";
import NeedHelp from "@/components/utils/NeedHelp.vue";
import MostUsedForms from "@/components/utils/MostUsedForms.vue";
import Applications from "@/components/utils/Applications.vue";
import AdditionalForms from "@/components/utils/AdditionalForms.vue";
import RepresentationAddressForms from "@/components/utils/RepresentationAddressForms.vue";
import Orders from "@/components/utils/Orders.vue";
import { toggleStep, toggleAllSteps} from '@/components/utils/StepsPagesFunctions';
import {GetFilingLocations} from '@/components/utils/GetFilingLocations';
import {GetDocumentTypes} from '@/components/utils/GetDocumentTypes'

import {GetHearingLocations} from '@/components/utils/GetHearingLocations';

import { caseJsonDataType, journeyJsonDataType } from '@/types/Information/json';
import { pathwayTypeInfoType } from '@/types/Information';

import { locationsInfoType } from '@/types/Common';
import { form1FormsJsonDataType, lookupsInfoType } from '@/types/Information/Form1';
import { form3FormsJsonDataType } from '@/types/Information/Form3';
import { form4FormsJsonDataType } from '@/types/Information/Form4';
import { form5FormsJsonDataType } from '@/types/Information/Form5';
import { form6FormsJsonDataType } from '@/types/Information/Form6';
import { form7FormsJsonDataType } from '@/types/Information/Form7';
import { form8FormsJsonDataType } from '@/types/Information/Form8';
import { form9FormsJsonDataType } from '@/types/Information/Form9';
import { form10FormsJsonDataType } from '@/types/Information/Form10';
import { form11FormsJsonDataType } from '@/types/Information/Form11';
import { form12FormsJsonDataType } from '@/types/Information/Form12';
import { form13FormsJsonDataType } from '@/types/Information/Form13';
import { form14FormsJsonDataType } from '@/types/Information/Form14';
import { form15FormsJsonDataType } from '@/types/Information/Form15';
import { form16FormsJsonDataType } from '@/types/Information/Form16';
import { form18FormsJsonDataType } from '@/types/Information/Form18';
import { form19FormsJsonDataType } from '@/types/Information/Form19';
import { form20FormsJsonDataType } from '@/types/Information/Form20';
import { form22FormsJsonDataType } from '@/types/Information/Form22';
import { form17FormsJsonDataType } from '@/types/Information/Form17';


@Component({
    components:{
        MyDocumentsTableBrief,
        AppealProcess,
        StartEfiling,
        NeedHelp,
        MostUsedForms,
        Applications,
        AdditionalForms,
        RepresentationAddressForms,
        Orders,
        NewFormModal
    }
})
export default class DashboardPage extends Vue {

    //___________________________
    //___________________________
    //___________________________NEW VERSION goes here _________________
    CURRENT_VERSION: string = "1.2.7";
    //__________________________
    //___________________________
    //___________________________


    @informationState.State
    public pathType: pathwayTypeInfoType;

    @form1State.Action
    public UpdateForm1FormsJson!: (newForm1FormsJson: form1FormsJsonDataType[])=> void
    
    @form2State.Action
    public UpdateCasesJson!: (newCasesJson: caseJsonDataType[]) => void

    @form3State.Action
    public UpdateForm3FormsJson!: (newForm3FormsJson: form3FormsJsonDataType[])=> void

    @form4State.Action
    public UpdateForm4FormsJson!: (newForm4FormsJson: form4FormsJsonDataType[])=> void

    @form5State.Action
    public UpdateForm5FormsJson!: (newForm5FormsJson: form5FormsJsonDataType[])=> void

    @form6State.Action
    public UpdateForm6FormsJson!: (newForm6FormsJson: form6FormsJsonDataType[])=> void

    @form7State.Action
    public UpdateForm7FormsJson!: (newForm7FormsJson: form7FormsJsonDataType[])=> void

    @form8State.Action
    public UpdateForm8FormsJson!: (newForm8FormsJson: form8FormsJsonDataType[])=> void

    @form9State.Action
    public UpdateForm9FormsJson!: (newForm9FormsJson: form9FormsJsonDataType[])=> void

    @form10State.Action
    public UpdateForm10FormsJson!: (newForm10FormsJson: form10FormsJsonDataType[])=> void

    @form11State.Action
    public UpdateForm11FormsJson!: (newForm11FormsJson: form11FormsJsonDataType[])=> void

    @form12State.Action
    public UpdateForm12FormsJson!: (newForm12FormsJson: form12FormsJsonDataType[])=> void

    @form13State.Action
    public UpdateForm13FormsJson!: (newForm13FormsJson: form13FormsJsonDataType[])=> void

    @form14State.Action
    public UpdateForm14FormsJson!: (newForm14FormsJson: form14FormsJsonDataType[])=> void

    @form15State.Action
    public UpdateForm15FormsJson!: (newForm15FormsJson: form15FormsJsonDataType[])=> void

    @form16State.Action
    public UpdateForm16FormsJson!: (newForm16FormsJson: form16FormsJsonDataType[])=> void

    @form17State.Action
    public UpdateForm17FormsJson!: (newForm17FormsJson: form17FormsJsonDataType[])=> void

    @form18State.Action
    public UpdateForm18FormsJson!: (newForm18FormsJson: form18FormsJsonDataType[])=> void

    @form19State.Action
    public UpdateForm19FormsJson!: (newForm19FormsJson: form19FormsJsonDataType[])=> void    

    @form20State.Action
    public UpdateForm20FormsJson!: (newForm20FormsJson: form20FormsJsonDataType[])=> void

    @form22State.Action
    public UpdateForm22FormsJson!: (newForm22FormsJson: form22FormsJsonDataType[])=> void

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

    showSelectFormToFill=false;

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
        this.extractHearingLocations();
        this.extractFilingLocations(); 
        this.extractDocumentTypes();     
    }

    public CloseModal(){
        this.showSelectFormToFill=false
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
        calls.push(this.$http.get('/form9/forms'));
        calls.push(this.$http.get('/form18/forms'));
        calls.push(this.$http.get('/form19/forms'));
        calls.push(this.$http.get('/form20/forms'));
        calls.push(this.$http.get('/form1/forms'));
        calls.push(this.$http.get('/form3/forms'));
        calls.push(this.$http.get('/form4/forms'));
        calls.push(this.$http.get('/form8/forms'));
        calls.push(this.$http.get('/form16/forms'));
        calls.push(this.$http.get('/form7/forms'));
        calls.push(this.$http.get('/form12/forms'));
        calls.push(this.$http.get('/form22/forms'));
        calls.push(this.$http.get('/form10/forms'));
        calls.push(this.$http.get('/form11/forms'));
        calls.push(this.$http.get('/form17/forms'));
        calls.push(this.$http.get('/form14/forms'));
        calls.push(this.$http.get('/form13/forms'));
        calls.push(this.$http.get('/form15/forms'));

        Promise.all(calls).then(values => {
            
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
            if(values[5]?.data) this.UpdateForm9FormsJson(values[5]?.data)
            if(values[6]?.data) this.UpdateForm18FormsJson(values[6]?.data)
            if(values[7]?.data) this.UpdateForm19FormsJson(values[7]?.data)
            if(values[8]?.data) this.UpdateForm20FormsJson(values[8]?.data)
            if(values[9]?.data) this.UpdateForm1FormsJson(values[9]?.data)
            if(values[10]?.data) this.UpdateForm3FormsJson(values[10]?.data)
            if(values[11]?.data) this.UpdateForm4FormsJson(values[11]?.data)
            if(values[12]?.data) this.UpdateForm8FormsJson(values[12]?.data)
            if(values[13]?.data) this.UpdateForm16FormsJson(values[13]?.data)
            if(values[14]?.data) this.UpdateForm7FormsJson(values[14]?.data)
            if(values[15]?.data) this.UpdateForm12FormsJson(values[15]?.data)
            if(values[16]?.data) this.UpdateForm22FormsJson(values[16]?.data)
            if(values[17]?.data) this.UpdateForm10FormsJson(values[17]?.data)
            if(values[18]?.data) this.UpdateForm11FormsJson(values[18]?.data)
            if(values[19]?.data) this.UpdateForm17FormsJson(values[19]?.data)
            if(values[20]?.data) this.UpdateForm14FormsJson(values[20]?.data)
            if(values[21]?.data) this.UpdateForm13FormsJson(values[21]?.data)
            if(values[22]?.data) this.UpdateForm15FormsJson(values[22]?.data)
            
            this.dataLoaded = true;

        }, err =>{this.error = err +' ' +(err.response.detail? err.response.detail:'');})
    }
      
    public extractFilingLocations() {
        GetFilingLocations();       
    }

    public extractDocumentTypes() {
        GetDocumentTypes();       
    }

    public extractHearingLocations() {
        GetHearingLocations();       
    }

    public restartJourney() {
        this.journeyStarted = false;
        this.$store.commit("Application/ResetStepsAndPages");
        Vue.nextTick(()=>Vue.prototype.$UpdateJourney());
    }

    public navigateToDocumentsPage() {

        this.$router.push({name: "my-submissions" }) 
    }

    public navigateToSubmitPackagePage() {
        this.$router.push({name: "file-submission" });
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