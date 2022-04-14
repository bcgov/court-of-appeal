<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        <p style="font-size: 1.25rem; ">Court of Appeal Case Information</p>

        <p class="mt-3">Find the Court of Appeal case appeal you are responding to by entering the following case information:</p>

        <b-form-group
            class="mx-1" 
            label-cols-sm="3"
            content-cols-sm="3"
            label="Level of Court" 
            label-for="level-of-court">
            <b-form-input 
                id="level-of-court"
                style="max-width:75%" 
                :disabled="true"
                v-model="levelOfCourt">
            </b-form-input>
        </b-form-group>

        <b-form-group
            class="mx-1" 
            label-cols-sm="3"
            content-cols-sm="3"
            label="Court of Appeal File no." 
            label-for="court-of-appeal-file-no">
            <b-form-input 
                id="court-of-appeal-file-no"
                style="max-width:75%" 
                :state="fileNumberState? null:false"
                v-model="searchParams.file">
            </b-form-input>
            <span 
                style="font-size: 0.75rem;" 
                class="text-secondary ml-2">ex. CA12345
            </span>
        </b-form-group>

        <b-form-group
            class="mx-1" 
            label-cols-sm="3"
            content-cols-sm="3"
            label="Respondent" 
            label-for="respondent">
            <b-form-radio-group
                id="respondent"
                style="max-width:75%" 
                :state="respondentState? null:false"
                v-model="searchParams.searchBy"
                :options="respondentOptions"                
            ></b-form-radio-group>
           
        </b-form-group>

        <b-form-group
            v-if="searchParams.searchBy=='Organization'"
            class="mx-1" 
            label-cols-sm="3"
            content-cols-sm="3"
            label="Organization Name" 
            label-for="organization-name">
            <b-form-input 
                id="organization-name"
                style="width:150%" 
                v-model="searchParams.organizationName">
            </b-form-input>
        </b-form-group>

        <div v-else>

            <b-form-group
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="First Name" 
                label-for="first-name">
                <b-form-input 
                    id="first-name"
                    style="max-width:75%" 
                    v-model="searchParams.firstName">
                </b-form-input>
            </b-form-group>

            <b-form-group
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Last Name" 
                label-for="last-name">
                <b-form-input 
                    id="last-name"
                    style="max-width:75%" 
                    v-model="searchParams.lastName">
                </b-form-input>
            </b-form-group>
        </div>
        <div>
            <h2 v-if="notFound" style="float:left" class="mt-4"><b-badge variant="danger">No such Court of Appeal document found</b-badge></h2>           
        
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
            
        
        </div>

        <b-button 
            style="float: right;  width: 80px; height: 50px; opacity:1;" 
            :disabled="searching"
            variant="success"
            @click="findFile()"
            ><spinner color="#FFF" v-if="searching" style="margin:0; padding: 0; transform:translate(-12px,-22px);"/>
            <span style="font-size: 20px;" v-else>Find</span>
        </b-button>               
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form12";
const form12State = namespace("Form12");

import { partiesDataJsonDataType, supremeCourtCaseJsonDataInfoType } from '@/types/Information/json';
import Spinner from "@/components/utils/Spinner.vue";
import { form12SearchInfoType } from '@/types/Information/Form12';

@Component({
    components: {           
        Spinner
    }        
}) 
export default class Form12CaseInformation extends Vue {

    @informationState.Action
    public UpdatePartiesJson!: (newPartiesJson: partiesDataJsonDataType) => void

    @informationState.Action
    public UpdateFileNumber!: (newFileNumber: string) => void
    
    @form12State.Action
    public UpdateCurrentOrderToVarySingleJusticeId!: (newCurrentOrderToVarySingleJusticeId: string) => void
    
    levelOfCourt = "Court of Appeal";

    fileNumberState = true;
    respondentState = true;

    dataReady = false;
    searching = false;
    loadingOrders = false;
    noOrdersFound = false; 

    searchParams = {} as form12SearchInfoType;
    notFound = false;
    cases;

    caseFields =  
    [
        {key:'styleOfCause', label:'', cellStyle:'', cellClass:''}
    ];
    respondentOptions = [
        {text: 'Individual', value: 'Individual'},
        {text: 'Organization', value: 'Organization'}
    ];

    mounted(){
        this.fileNumberState = true;
        this.respondentState = true;
        this.dataReady = false;
        this.cases = [];
        this.searching = false;
        this.dataReady = true; 
    }

    public selectOrder(){
        this.$router.push({name: "fill-form12"});
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
                // this.UpdateSupremeCourtCaseJson(caseInfo)           
                // const selectedLocation: locationsInfoType = this.locationsInfo.filter(location=>location.id == this.searchParams.location)[0]
                // this.UpdateCaseLocation(selectedLocation);
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



    public findFile(){

        this.searching = true;        
        this.notFound = false;
        this.fileNumberState = true;
        this.respondentState = true;

        if(!this.searchParams.file){
            this.fileNumberState = false;
            this.searching = false;
            return
        }

        if(!this.searchParams.searchBy){
            this.respondentState = false;
            this.searching = false;
            return
        }
        
        const url = '/form7s/?'+
            'caseNumber='+(this.searchParams.file?this.searchParams.file:'')+
            '&firstName='+(this.searchParams.firstName?this.searchParams.firstName:'')+
            '&lastName='+(this.searchParams.lastName?this.searchParams.lastName:'')+
            '&searchBy='+(this.searchParams.searchBy?this.searchParams.searchBy:'')+
            '&organizationName='+(this.searchParams.organizationName?this.searchParams.organizationName:''); 
        
        this.$http.get(url)
        .then(res => {
            this.searching = false;
            if(res.data?.parties){
                this.UpdatePartiesJson(res.data.parties);
                this.UpdateFileNumber(this.searchParams.file)
                this.UpdateCurrentOrderToVarySingleJusticeId(null);
                this.$router.push({name: "fill-form12"})
            }
            else
                this.notFound = true;
        },err => {
            console.error(err); 
            this.notFound = true;  
            this.searching = false;     
        });
    }
}
</script>

<style scoped lang="scss">



</style>