<template>
    <b-card no-body v-if="dataReady" class="border-white" >  

        <b-card class="ml-2 mt-2 border-white" >
            <p style="font-size: 1.25rem;" >Lower Court Case Information</p>      

            <p>Find the Supreme Court case you are appealing by entering the following information about the case.</p>

            <b-form-group
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Level of Court" 
                label-for="level-of-court">
                <b-form-input 
                    id="level-of-court"
                    disabled
                    style="max-width:75%" 
                    v-model="levelOfCourt">
                </b-form-input>
            </b-form-group>

            <b-form-group
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Supreme Court File no." 
                label-for="supreme-court-file-no">
                <b-form-input 
                    id="supreme-court-file-no"
                    style="max-width:75%" 
                    v-model="searchParams.file">
                </b-form-input>            
            </b-form-group>       

            <b-form-group
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Supreme Court Registry" 
                label-for="location">
                <b-form-select
                    style="max-width:75%"
                    id="location"                                                                                                           
                    v-model="searchParams.location">
                        <b-form-select-option
                            v-for="location in locationsInfo" 
                            :key="location.id"
                            :value="location.id">
                                {{location.name}}
                        </b-form-select-option>    
                </b-form-select>
                
            </b-form-group>        

            <b-button 
                style="float: right;  width: 80px; height: 50px; opacity:1;" 
                :disabled="searching"
                variant="success"
                @click="findFile()"
                ><spinner color="#FFF" v-if="searching" style="margin:0; padding: 0; transform:translate(-12px,-22px);"/>
                <span style="font-size: 20px;" v-else>Find</span>
            </b-button> 

        </b-card>

        <b-card v-if="cases.length || (!searching && notFound)" class="ml-2 mt-2 border-white">
            <hr class="mb-4">
            <p style="font-size: 1.25rem; ">Case Results</p>
            <p v-if="!searching && notFound">
                Please be advised that we are unable to locate the file number you have entered. Please 
                check the case number and registry location entered, and try again. If the case cannot be 
                located, you will need to submit your document(s) at a
                <a
                    href="http://www.courts.gov.bc.ca/Court_of_Appeal/court_locations_and_contacts.aspx"
                    target="_blank">Court of Appeal Registry
                </a>.
            </p>
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

import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';
import Spinner from "@/components/utils/Spinner.vue";
import Form1SearchOrderDetails from "./Form1SearchOrderDetails.vue";
import { locationsInfoType } from '@/types/Common';
import { form1SearchInfoType } from '@/types/Information/Form1';

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
                this.noOrdersFound = true;
            }
                
        },err => {
            console.error(err); 
            this.noOrdersFound = true;  
            this.loadingOrders = false;
           
        });
    }

    public selectOrder(){
        const locationName = this.locationsInfo.filter(location => {return location.id == this.searchParams.location})[0].name;
        this.$emit('fillForm', this.levelOfCourt, this.searchParams.location, locationName);
    }
}
</script>

<style scoped lang="scss">

</style>