<template>
    <b-card no-body v-if="dataReady" class="border-white" >  

        <b-card class="ml-2 mt-2 border-white" >
            <h2 class="ml-4 mt-3 text-primary">Lower Court Case Information</h2>      

            <p class="ml-4">Find the Supreme Court case you are appealing by entering the following information about the case.</p>

            <b-row class="mt-0 question">
                <b-col cols="7" class="labels">
                    Level of Court                                
                </b-col>
                <b-col class="mt-2">                    
                    <b-form-input                       
                        disabled
                        style="max-width:75%" 
                        v-model="levelOfCourt">
                    </b-form-input>
                                       
                </b-col>
            </b-row>

            <b-row class="mt-2 question">
                <b-col cols="7" class="labels">
                    Supreme Court File No.                                
                </b-col>
                <b-col class="mt-2">                    
                    <b-form-input 
                        :formatter="supremeFileformatter"
                        style="max-width:75%" 
                        v-model="searchParams.file">
                    </b-form-input>
                    <span 
                        style="font-size: 0.75rem;" 
                        class="text-secondary ml-2">ex. S12345678
                    </span>
                                       
                </b-col>
            </b-row>

            <b-row class="mt-2 question">
                <b-col cols="7" class="labels">
                    Supreme Court Registry                                
                </b-col>
                <b-col class="mt-2">                    
                    <b-form-select
                        style="max-width:75%"                                                                                                                                 
                        v-model="searchParams.location">
                            <b-form-select-option
                                v-for="location in locationsInfo" 
                                :key="location.id"
                                :value="location.id">
                                    {{location.name}}
                            </b-form-select-option>    
                    </b-form-select>
                                       
                </b-col>
            </b-row>         

            <b-button 
                style="float: right;  width: 80px; height: 50px; opacity:1;" 
                :class="((!searchParams.file || !searchParams.location)?inactiveButtonClass:activeButtonClass) + ' ml-4 '"
                :disabled="searching || !searchParams.file || !searchParams.location"
                @click="findFile()"
                ><spinner color="#FFF" v-if="searching" style="margin:0; padding: 0; transform:translate(-12px,-22px);"/>
                <span style="font-size: 20px;" v-else>Find</span>
            </b-button> 

        </b-card>

        <b-card v-if="cases.length || (!searching && notFound)" class="ml-2 mt-2 border-white">
            <hr class="mb-4">
            <p style="font-size: 1.25rem; ">Case Results</p>
            <b-card no-body class="border-white" v-if="!searching && notFound">
                <p>
                    Please be advised that we are unable to locate the file number you have entered. Please 
                    check the case number and registry location entered, and try again. If the case cannot be 
                    located, you will need to submit your document(s) at a
                    <a
                        href="http://www.courts.gov.bc.ca/Court_of_Appeal/court_locations_and_contacts.aspx"
                        target="_blank">Court of Appeal Registry
                    </a>.
                </p>

            </b-card>
            <b-card no-body class="border-white" v-else>
                <p>
                    Below are the results of your search, please ensure you select the correct case using 
                    the style of proceeding (names of the parties) and the date of the order that you are 
                    appealing. <b>Note</b> that only one order can be appealed on a Notice of Appeal form.
                </p>
                <b-card no-body class="mx-3 mb-5 bg-primary" style="overflow:auto">           
                    <b-table
                        :items="cases"
                        :fields="caseFields"                    
                        :no-sort-reset="true"
                        sort-icon-left
                        thead-class="d-none"
                        borderless                    
                        small
                        responsive="sm"
                    >
                        <template v-slot:cell(styleOfCause)="data" >
                           
                            <b-button style="transform: translate(0,7px); font-size:20px" 
                                size="sm" 
                                @click="OpenDetails(data);data.toggleDetails();" 
                                class="text-white bg-transparent border-primary" 
                                >
                                <b-icon-caret-right-fill v-if="!data.item['_showDetails']"></b-icon-caret-right-fill>
                                <b-icon-caret-down-fill v-if="data.item['_showDetails']"></b-icon-caret-down-fill>
                                {{data.value}} | {{data.item.courtClass}}                                
                            </b-button>
                           
                        </template>
                        <template v-slot:row-details>
                            <b-card>  
                                <loading-spinner color="#000" v-if="loadingOrders" waitingText="Loading ..." />                              
                                <form-1-search-order-details v-else @selectOrder="selectOrder"/>
                            </b-card>
                        </template>
                        
                    </b-table>
                </b-card>
            </b-card>

            <b-card no-body class="border-white">
                <p class="ml-3">
                    <span v-if="!notFound">If the order you are appealing is not listed above and you have </span>
                    <span v-else>If you have </span>information corresponding to the case, you may enter 
                    the information manually:
                    <b-button 
                        class="bg-success mr-4 mt-2"
                        style="display: block; float: right; height: 50px; opacity:1;"            
                        @click="navigateToForm1()">
                        Continue to Notice of Appeal
                    </b-button> 
                </p>
            </b-card>

        </b-card>
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';
import Spinner from "@/components/utils/Spinner.vue";
import Form1SearchOrderDetails from "./Form1SearchOrderDetails.vue";
import { locationsInfoType } from '@/types/Common';
import { form1DataInfoType, form1SearchInfoType } from '@/types/Information/Form1';

@Component({
    components: {           
        Spinner,
        Form1SearchOrderDetails
    }        
}) 
export default class Form1CaseInformationSearch extends Vue {

    @informationState.Action
    public UpdateSupremeCourtCaseJson!: (newSupremeCourtCaseJson: supremeCourtCaseJsonDataInfoType) => void

    @informationState.Action
    public UpdateCaseLocation!: (newCaseLocation: locationsInfoType) => void

    @informationState.Action
    public UpdateSupremeCourtOrderJson!: (newSupremeCourtOrderJson: supremeCourtOrdersJsonInfoType) => void

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    @form1State.State
    public form1Info: form1DataInfoType;

    @form1State.Action
    public UpdateForm1Info!: (newForm1Info: form1DataInfoType) => void
    
    inactiveButtonClass = "bg-secondary text-white"; 
    activeButtonClass = "bg-success text-white";
    levelOfCourt = "Supreme Court of BC";

    dataReady = false;
    searching = false;
    loadingOrders = false;
    noOrdersFound = false;    

    searchParams = {} as form1SearchInfoType;
    notFound = false;    
    cases: supremeCourtCaseJsonDataInfoType[];

    caseFields =  
    [
        {key:'styleOfCause', label:'', cellStyle:'', cellClass:''}
    ];

    mounted(){
        this.dataReady = false;
        this.cases = [];        
        this.searching = false;
        this.dataReady = true; 
    }

    public findFile(){

        this.searching = true;        
        this.notFound = false;
        
        const url = '/file-detail/?'+
            'courtLevel=S'+
            '&locationId='+ this.searchParams.location +
            '&fileNumber='+ this.searchParams.file; 
        
        this.$http.get(url)
        .then(res => {
            this.searching = false;
            if(res.data){
                this.cases = res.data;
                if(this.cases.length==1){
                    this.cases[0]['_showDetails'] = true;
                    this.getOrders(this.cases[0])
                }
            } else {
                this.notFound = true;
            }
                
        },err => {
            console.error(err); 
            this.notFound = true;  
            this.searching = false;
        });
    }

    public OpenDetails(data)
    {
        console.log(data.item)
        if(!data.detailsShowing)
        {
            this.getOrders(data.item)            
        }       
    }

    public getOrders(caseInfo: supremeCourtCaseJsonDataInfoType){

        this.loadingOrders = true;        
        this.noOrdersFound = false;
        
        const url = '/file-detail/orders/'+ caseInfo.fileId; 
        
        this.$http.get(url)
        .then(res => {
            
            if(res.data){                
                const orders = res.data;
                caseInfo.orders = orders
                this.UpdateSupremeCourtCaseJson(caseInfo)           
                const selectedLocation: locationsInfoType = this.locationsInfo.filter(location=>location.id == this.searchParams.location)[0]
                this.UpdateCaseLocation(selectedLocation);
                this.loadingOrders = false;

            } else {
                this.UpdateSupremeCourtCaseJson(null);
                this.UpdateSupremeCourtOrderJson(null);
                this.noOrdersFound = true;
            }
                
        },err => {
            console.error(err); 
            this.noOrdersFound = true;  
            this.loadingOrders = false;
           
        });
    }

    public navigateToForm1() {

        const form1SubmissionData = this.form1Info;
        form1SubmissionData.parties = [];
        form1SubmissionData.requiresManualEntry = true;
       
        this.UpdateForm1Info(form1SubmissionData);
        this.selectOrder();
    }

    public selectOrder(){
        const locationName = this.locationsInfo.filter(location => {return location.id == this.searchParams.location})[0].name;
        this.$emit('fillForm', this.levelOfCourt, this.searchParams.location, this.searchParams.file, locationName);
    }

    public supremeFileformatter(value){
        if(value.slice(0,1)!='S'){
            if(isNaN(Number(value.slice(0))))
                return 'S'
            else
                return 'S'+value
        }
        if(isNaN(Number(value.slice(-1)))) return value.slice(0,-1)
        return value
    }
}
</script>

<style lang="scss" scoped>
    
    .content {        
        margin-bottom: 0px !important; 
        font-size: 0.75rem; 
        font-weight:400;
    }

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

    .question {
        margin-left: 1.15rem !important;
    }
</style>