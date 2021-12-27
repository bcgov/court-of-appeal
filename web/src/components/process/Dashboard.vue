<template>
    <b-card bg-variant="light" border-variant="white">
        <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>
        <loading-spinner color="#000" v-if="!dataLoaded" waitingText="Loading ..." />   

        <b-container v-else class="container">            
            <my-documents-table 
                v-bind:enableActions="false" 
                v-bind:title="'Submissions'">
            </my-documents-table>
            <b-row no-gutters class="bg-white pt-0">
                <b-button 
                    class="ml-5 mb-3 bg-primary outline-dark"
                
                    @click="navigateToDocumentsPage">
                    View All Submissions
                </b-button>
            </b-row>
        </b-container>

        <b-container class="container mt-3">
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
                    <need-help class="mt-3"></need-help>

                </b-col>
            </b-row>
        </b-container>       
        
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
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import {migrate} from './MigrateStore'

import MyDocumentsTable from "@/components/process/MyDocuments/MyDocumentsTable.vue";
import AppealProcess from "@/components/process/AppealProcess/AppealProcess.vue";
import StartEfiling from "@/components/process/AppealProcess/StartEfiling.vue";
import NeedHelp from "@/components/utils/NeedHelp.vue";
import MostUsedForms from "@/components/utils/MostUsedForms.vue";
import { caseJsonDataType, journeyJsonDataType } from '@/types/Information/json';
import { lookupsInfoType, pathwayTypeInfoType } from '@/types/Information';

import { toggleStep, toggleAllSteps} from '@/components/utils/StepsPagesFunctions';


@Component({
    components:{
        MyDocumentsTable,
        AppealProcess,
        StartEfiling,
        NeedHelp,
        MostUsedForms
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
    
    @informationState.Action
    public UpdateCasesJson!: (newCasesJson: caseJsonDataType[]) => void

    @informationState.Action
    public UpdateJourneyJson!: (newJourneyJson: journeyJsonDataType) => void

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    @commonState.Action
    public UpdateLookups!: (newLookups: lookupsInfoType) => void

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

    public loadLookups(){
        // this.$http.get('/lookups/')
        // .then((response) => {
            
        //     //console.log(response)
        //     if(response?.data){
                const res = {
                    "involvesFamilyList": [
                        "Divorce",
                        "Family Law Act",
                        "Other Family",
                        "Corollary Relief in a Divorce Proceeding"
                    ],
                    "involvesOtherList": [
                        "Constitutional / Administrative",
                        "Civil Procedure",
                        "Commercial",
                        "Motor Vehicle Accidents",
                        "Municipal Law",
                        "Real Property",
                        "Torts",
                        "Equity",
                        "Wills and Estate"
                    ],
                    "involvesOtherHelp": [
                        "Constitutional/Administrative law – appeal from decisions involving the relationship between the government and its citizens, including the Charter of Rights and Freedoms and tribunal decisions.",
                        "Civil Procedure – appeal from a decision that applies the Supreme Court rules or processes to a private dispute about people, relationships or property.",
                        "Commercial law – appeal from a decision regarding business and commercial transactions.",
                        "Motor Vehicle accidents – appeal from a decision of someone being found at fault or for damages as a result of a motor vehicle accident.",
                        "Municipal law – appeal from a decision of legal issues relating to municipal (towns or city) governments.",
                        "Real Property – appeal from a decision relating to the use and rights of ownership of land or whatever grows on it or is built on it.",
                        "Torts – appeal from a decision that provides compensation for people who have been injured or whose property has been damaged by the actions or inactions of others.",
                        "Equity – appeal from decisions based on the application of fairness and other principles of equity.",
                        "Wills and Estate – appeal from a decision relating to the drafting or execution of wills or distribution of real property of a deceased person."
                    ],
                    "appealFromOptionsList": [
                        "Trial Judgment",
                        "Summary Trial Judgment",
                        "Chambers Judgment"
                    ],
                    "appealFromOptionsHelp": [
                        "Trial Judgment – a final order made after a full hearing where witnesses were called and oral evidence given.",
                        "Summary Trial Judgment – a trial conducted in a summary manner by way of affidavit or transcript rather than oral testimony.  See Supreme Court Civil Rule 9-7.",
                        "Chambers Judgment – an application made to a Supreme Court Judge or Master where evidence is presented in the form of affidavits.  See Supreme Court Civil Rule 8-1."
                    ],
                    "lowerCourtRoles": [
                        "NONE (New Party)",
                        "Appellant",
                        "Applicant",
                        "Bankrupt",
                        "Citator",
                        "Claimant",
                        "Claimant 1",
                        "Claimant 2",
                        "Client",
                        "Creditor",
                        "Debtor",
                        "Deceased",
                        "Defendant",
                        "Defendant by Counterclaim",
                        "Intervener",
                        "Petitioner",
                        "Plaintiff",
                        "Respondent",
                        "Respondent by Counterclaim",
                        "Solicitor",
                        "Third Party",
                        "Trustee"
                    ],
                    "aliasTypes": [
                        "also known as",
                        "a subsidiary of",
                        "and the said",
                        "carrying on business as",
                        "division of",
                        "doing business as",
                        "formerly known as",
                        "now known as",
                        "operating as",
                        "otherwise known as",
                        "previous",
                        "previously known as",
                        "trading as",
                        "with assumed name of"
                    ],
                    "individualLegalReps": [
                        "administrator (estate)",
                        "administrator",
                        "administratrix (estate)",
                        "administratrix",
                        "caveator",
                        "committee (estate)",
                        "committee",
                        "executor",
                        "executrix",
                        "intervener",
                        "litigation guardian",
                        "litigation guardian (child)",
                        "litigation guardian (infant)",
                        "litigation guardian (disability)",
                        "receiver manager",
                        "trustee"
                    ],
                    "organizationLegalReps": [
                        "administrator",
                        "administratrix",
                        "committee",
                        "intervener",
                        "receiver manager",
                        "trustee"
                    ],
                    "legalRepFormatters": {
                        "administrator (estate)": "{0}, administrator for the Estate of {1}",
                        "administrator": "{0}, administrator for {1}",
                        "administratrix (estate)": "{0}, administratrix for the Estate of {1}",
                        "administratrix": "{0}, administratrix for {1}",
                        "caveator": "{0}, caveator for the Estate of {1}",
                        "committee (estate)": "{0}, committee for the Estate of {1}",
                        "committee": "{0}, committee for {1}",
                        "executor": "{0}, executor for the Estate of {1}",
                        "executrix": "{0}, executrix for the Estate of {1}",
                        "intervener": "{0}, intervener on behalf of {1}",
                        "litigation guardian": "{1} by way of their litigation guardian, {0}",
                        "litigation guardian (child)": "{1}, a child, by way of their litigation guardian, {0}",
                        "litigation guardian (infant)": "{1}, an infant, by way of their litigation guardian, {0}",
                        "litigation guardian (disability)": "{1}, a person under disability, by way of their litigation guardian, {0}",
                        "receiver manager": "{0}, receiver manager on behalf of {1}",
                        "trustee": "{0}, trustee on behalf of {1}"
                    },
                    "holidays": {
                        "20210101": "New Years Day 2021",
                        "20210215": "BC Family Day",
                        "20210402": "Good Friday",
                        "20210405": "Easter Monday",
                        "20210524": "Victoria Day",
                        "20210701": "Canada Day",
                        "20210802": "BC Day",
                        "20210906": "Labour Day",
                        "20210930": "Truth and Reconciliation Day",
                        "20211011": "Thanksgiving",
                        "20211111": "Remembrance Day",
                        "20211227": "Christmas Day",
                        "20211228": "Boxing Day",
                        "20220103": "New Years Day 2022"
                    }
                    }
                
                this.UpdateLookups(res);

                           
            // }
            this.loadCases();     
        // },(err) => {
        //     this.dataLoaded = true;
        //     this.error = err;        
        // });
    }

    public loadInfo () {
    
        this.$http.get('/journey/')
        .then((response) => {
            
            //console.log(response)
            if(response?.data?.steps){

                const applicationData ={
                    steps: response.data.steps, 
                    version: (response?.data?.version)? response.data.version: "0.0"
                }      
                migrate(applicationData, this.CURRENT_VERSION);
                this.journeyStarted = this.getCurrentState();                
            }
            this.loadLookups();     
        },(err) => {
            this.dataLoaded = true;
            this.error = err;        
        });
    }

    public loadCases () {
    //TODO: when extending to use throughout the province, the timezone should be changed accordingly
    
        this.$http.get('/case/')
        .then((response) => {

            if(response?.data){
            //const response = {"cases":[{"id":22,"personId":12,"type":"form-2","status":"Draft","modified":"2021-09-10T15:49:35Z","packageUrl":null,"data":{"formSevenNumber":"CA39029","appellants":[{"name":"One TEST","firstName":"One","lastName":"TEST","solicitor":{"name":"William T. H. Lovatt null","counselFirstName":"William T. H. Lovatt","counselLastName":null,"firmName":"Axis Law","firmPhone":"604 601-8501","addressLine1":"1500 - 701 West Georgia Street","addressLine2":null,"city":"Vancouver","postalCode":"V7Y 1C6","province":"BC"},"partyId":118931,"id":0}],"respondents":[{"name":"Two TEST","firstName":"Two","lastName":"TEST","solicitor":{"name":"Jane Doe","counselFirstName":"Jane","counselLastName":"Doe","firmName":"Edward F. Macaulay Law Corporation","firmPhone":"604 684-0112","addressLine1":"#1400 - 1125 Howe Street","addressLine2":null,"city":"Vancouver","postalCode":"V6Z 2K8","province":"British Columbia"},"partyId":118932,"id":0,"responding":true}],"useServiceEmail":true,"sendNotifications":true,"serviceInformation":{"province":"British Columbia","country":"Canada","selectedContactId":0,"name":"Two TEST","addressLine1":"4 - 5 st","addressLine2":null,"city":"Coquitlam","postalCode":"V3K1C9","phone":"9876543654","email":"email@yahoo.com"},"selfRepresented":true,"version":"0.1"}}]};            
                this.casesJson = response.data;
                this.UpdateCasesJson(this.casesJson)
            }

            this.dataLoaded = true;       
        },(err) => {
            this.dataLoaded = true;
            this.error = err;        
        });
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
        padding-top: 2rem;
        max-width: 950px;
        color: black;
    }

</style>