<template>
    <b-card no-body v-if="dataReady" class="border-white" >  

        <b-card class="border-white">      

            <p>Find the Supreme Court case you are appealing by entering the following information about the case.</p>

            <b-form-group
                class="mx-1" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Level of Court" 
                label-for="level-of-court">
                <b-form-input 
                    id="level-of-court"
                    disabled='true'
                    style="max-width:25%" 
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
                    style="max-width:25%" 
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
                    style="max-width:25%"
                    id="location"                                                                                                           
                    v-model="searchParams.location">
                        <b-form-select-option
                            v-for="location in locations" 
                            :key="location.key"
                            :value="location.key">
                                {{location.value}}
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

        <b-card v-if="cases.length || (!searching && notFound)" class="border-white">
            <hr class="mb-4">
            <p style="font-size: 1.25rem; ">Case Results</p>
            <p v-if="!searching && notFound">
                
            </p>
            <p v-else>
                Below are the results of your search, please ensure you select the correct case using 
                the style of proceeding (names of the parties) and the date of the order that you are 
                appealing. <b>Note</b> that only one order can be appealed on a Notice of Appeal form.
            </p>


        </b-card>

        




        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import { form7SearchInfoType } from '@/types/Information';
import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';
import Spinner from "@/components/utils/Spinner.vue";
import { supremeCourtLocationsInfoType } from '@/types/Common';

@Component({
    components: {           
        Spinner
    }        
}) 
export default class Form7CaseInformationSearch extends Vue {

    @informationState.Action
    public UpdateSupremeCourtCaseJson!: (newSupremeCourtCaseJson: supremeCourtCaseJsonDataInfoType) => void

    @informationState.Action
    public UpdateSupremeCourtOrderJson!: (newSupremeCourtOrderJson: supremeCourtOrdersJsonInfoType) => void


    // @informationState.Action
    // public UpdateFileNumber!: (newFileNumber: string) => void
    
    // @informationState.Action
    // public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void
    
    levelOfCourt = "Supreme Court of BC";

    dataReady = false;
    searching = false;
    locations: supremeCourtLocationsInfoType[] = [];

    searchParams = {} as form7SearchInfoType;
    notFound = false;    
    cases: supremeCourtCaseJsonDataInfoType[];

    mounted(){
        this.dataReady = false;
        this.cases = [];
        this.loadLocations();
        this.searching = false;
        this.dataReady = true; 
    }

    public loadLocations(){
        //TODO: use api to load locations
        this.locations = [
            {
                "key": 9067.0001,
                "value": "Campbell River Court"
            },
            {
                "key": 8824.0001,
                "value": "Chilliwack Law Courts"
            },
            {
                "key": 9068.0001,
                "value": "Courtenay Law Courts"
            },
            {
                "key": 29.0001,
                "value": "Cranbrook Law Courts"
            },
            {
                "key": 110.0001,
                "value": "Dawson Creek Law Courts"
            },
            {
                "key": 10231.0001,
                "value": "Duncan Law Courts"
            },
            {
                "key": 112.0001,
                "value": "Fort Nelson Law Courts"
            },
            {
                "key": 114.0001,
                "value": "Fort St. John Law Courts"
            },
            {
                "key": 79.0001,
                "value": "Golden Law Court"
            },
            {
                "key": 82.0001,
                "value": "Kamloops Court"
            },
            {
                "key": 83.0001,
                "value": "Kelowna Law Courts"
            },
            {
                "key": 16164.0026,
                "value": "Lytton Provincial Court"
            },
            {
                "key": 89.0001,
                "value": "Nelson Law Courts"
            },
            {
                "key": 8839.0001,
                "value": "New Westminster Law Courts"
            },
            {
                "key": 91.0001,
                "value": "Penticton Law Courts"
            },
            {
                "key": 10235.0001,
                "value": "Port Alberni Law Courts"
            },
            {
                "key": 10236.0001,
                "value": "Port Hardy Law Courts"
            },
            {
                "key": 10237.0001,
                "value": "Powell River Law Courts"
            },
            {
                "key": 8844.0001,
                "value": "Prince George Law Courts"
            },
            {
                "key": 9075.0001,
                "value": "Prince Rupert Law Courts"
            },
            {
                "key": 9074.0001,
                "value": "Quesnel Law Courts"
            },
            {
                "key": 94.0001,
                "value": "Rossland Law Courts"
            },
            {
                "key": 95.0001,
                "value": "Salmon Arm Law Courts"
            },
            {
                "key": 9073.0001,
                "value": "Smithers Law Courts"
            },
            {
                "key": 9072.0001,
                "value": "Terrace Law Courts"
            },
            {
                "key": 19228.0734,
                "value": "Vancouver Law Courts"
            },
            {
                "key": 96.0001,
                "value": "Vernon Law Courts"
            },
            {
                "key": 8807.0001,
                "value": "Victoria Law Courts"
            },
            {
                "key": 9070.0001,
                "value": "Williams Lake Law Courts"
            }
        ];

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

    public selectOrder(selectedCase: supremeCourtCaseJsonDataInfoType, selectedOrder: supremeCourtOrdersJsonInfoType){
        this.UpdateSupremeCourtCaseJson(selectedCase);
        this.UpdateSupremeCourtOrderJson(selectedOrder);
        this.$emit('fillForm', true);
    }
}
</script>

<style scoped lang="scss">



</style>