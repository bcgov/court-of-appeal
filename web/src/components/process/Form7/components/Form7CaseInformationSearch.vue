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
                                <form-7-search-order-details @selectOrder="selectOrder"/>
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

import { form7SearchInfoType } from '@/types/Information';
import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';
import Spinner from "@/components/utils/Spinner.vue";
import Form7SearchOrderDetails from "./Form7SearchOrderDetails.vue";
import { locationsInfoType } from '@/types/Common';

@Component({
    components: {           
        Spinner,
        Form7SearchOrderDetails
    }        
}) 
export default class Form7CaseInformationSearch extends Vue {

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

    searchParams = {} as form7SearchInfoType;
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
        
        const url = '/search/?'+
            'courtLevel=S'+
            '&location='+ this.searchParams.location +
            '&fileNumber='+ this.searchParams.file; 
        
        this.$http.get(url)
        .then(res => {
            this.searching = false;
            if(res.data){
                this.cases = res.data;                
            }
            else
                this.notFound = true;
        },err => {
            console.error(err); 
            // this.notFound = true;  
            this.searching = false;  
             //TODO change here
            this.cases = [
                    {
                        "fileId": 5187,
                        "fileNumber": "20191119",
                        "styleOfCause": "TEST, One v TEST, Two",
                        "courtClassCd": "S",
                        "courtClass": "Supreme civil (General)",
                        "accessType": "GEN",
                        "orders": [
                            {
                                "documentId": 14614,
                                "documentTypeCode": "ORD",
                                "documentType": "Order",
                                "orderDate": "2021-11-06T00:00:00-07:00",
                                "honorificTitle": "The Honourable Justice",
                                "judgeFirstName": "M L",
                                "judgeSurname": "Drake",
                                "appearanceDays": 1,
                                "canAccess": false,
                                "appealSubmissionDeadline": "2021-12-06T16:00:00-08:00",
                                "isPastDeadline": false
                            }
                        ],
                        "parties": [
                            {
                                "ceisPartyId": 9590,
                                "isOrganization": false,
                                "firstGivenName": "One",
                                "secondGivenName": null,
                                "thirdGivenName": null,
                                "surname": "Test",
                                "organizationName": null,
                                "fullName": "TEST, One",
                                "counselName": null,
                                "lowerCourtRole": "Plaintiff",
                                "aliases": [],
                                "legalReps": []
                            },
                            {
                                "ceisPartyId": 9591,
                                "isOrganization": false,
                                "firstGivenName": "Two",
                                "secondGivenName": null,
                                "thirdGivenName": null,
                                "surname": "Test",
                                "organizationName": null,
                                "fullName": "TEST, Two",
                                "counselName": "Smith, J",
                                "lowerCourtRole": "Defendant",
                                "aliases": [],
                                "legalReps": []
                            }
                        ]
                    }
                ]

        });
    }

    public OpenDetails(data)
    {
        if(!data.detailsShowing)
        {
            this.UpdateSupremeCourtCaseJson(data.item)           
            const selectedLocation: locationsInfoType = this.locationsInfo.filter(location=>location.id == this.searchParams.location)[0]
            this.UpdateCaseLocation(selectedLocation)
        }       
    }

    public selectOrder(){
        this.$emit('fillForm', true);
    }
}
</script>

<style scoped lang="scss">



</style>