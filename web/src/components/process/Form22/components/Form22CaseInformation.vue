<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        
        <b-card class="ml-2 mt-2 border-white" >
            <h2 class="mt-3 text-primary">
                Court of Appeal Case Information
            </h2>

            <p class="mt-3"></p>

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    <p>Do you have a Court of Appeal file number?</p>                    
                </b-col>
                <b-col class="ml-1">
                    <b-form-radio-group                
                        style="width:100%"                      
                        v-model="caseInfoExists"
                        :options="yesNoOptions">
                    </b-form-radio-group>
                </b-col>
            </b-row>  

            <div v-if="caseInfoExists">

                <p style="margin:1rem 0 1rem 2rem;">Find the Court of Appeal case appeal you are responding to by entering the following case information:</p>

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
                        Court of Appeal File No.                                
                    </b-col>
                    <b-col class="mt-2">                    
                        <b-form-input 
                            :formatter="coaFileformatter"
                            :state="fileNumberState? null:false"
                            style="max-width:75%" 
                            v-model="searchParams.file">
                        </b-form-input>
                        <span 
                            style="font-size: 0.75rem;" 
                            class="text-secondary ml-2">ex. CA12345
                        </span>
                                            
                    </b-col>
                </b-row>

                <b-row class="mt-2 question">
                    <b-col cols="7" class="labels">
                        Party                                
                    </b-col>
                    <b-col class="mt-2">                    
                        <b-form-radio-group                    
                            style="max-width:75%"
                            :class="partyState==false? 'border border-danger':''" 
                            :state="partyState? null:false"
                            v-model="searchParams.searchBy"
                            :options="partyOptions"                
                        ></b-form-radio-group>
                                            
                    </b-col>
                </b-row>

                <b-row v-if="searchParams.searchBy=='Organization'" class="mt-2 question">
                    <b-col cols="7" class="labels">
                        Organization Name                                
                    </b-col>
                    <b-col class="mt-2">                    
                        <b-form-input 
                            style="width:75%" 
                            v-model="searchParams.organizationName">
                        </b-form-input>                                    
                    </b-col>
                </b-row> 

                <div v-else>

                    <b-row class="mt-2 question">
                        <b-col cols="7" class="labels">
                            First Name                                
                        </b-col>
                        <b-col class="mt-2">                    
                            <b-form-input 
                                style="width:75%" 
                                v-model="searchParams.firstName">
                            </b-form-input>                                    
                        </b-col>
                    </b-row> 

                    <b-row class="mt-2 question">
                        <b-col cols="7" class="labels">
                            Last Name                                
                        </b-col>
                        <b-col class="mt-2">                    
                            <b-form-input 
                                style="width:75%" 
                                v-model="searchParams.lastName">
                            </b-form-input>                                    
                        </b-col>
                    </b-row>
                        
                </div>
                <div>
                    <h2 v-if="notFound" style="float:left" class="mt-4"><b-badge variant="danger">No such Court of Appeal document found</b-badge></h2>           
                </div>        

                <b-button 
                    style="float: right;  width: 80px; height: 50px; opacity:1;" 
                    :disabled="searching"
                    variant="success"
                    @click="findFile()"
                    ><spinner color="#FFF" v-if="searching" style="margin:0; padding: 0; transform:translate(-12px,-22px);"/>
                    <span style="font-size: 20px;" v-else>Find</span>
                </b-button> 

            </div>
        </b-card>  

        <b-card class="border-white">
            <p class="ml-2 mt-2">
                If you have information corresponding to the case, you may <b>enter 
                the information manually:</b>
                <b-button 
                    variant="outline-success"
                    class="mt-2"
                    style="display: block; float: right; height: 50px; opacity:1;"            
                    @click="navigateToForm22()">
                    Manually enter information to file Application For Order that No Fees are Payable
                    <b-icon-pencil-square />
                </b-button> 
            </p>
        </b-card>            
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form22";
const form22State = namespace("Form22");

import { form22DataInfoType, form22SearchInfoType } from '@/types/Information/Form22';
import { initiatingDocumentJsonInfoType, partiesDataJsonDataType, previousCourtJsonInfoType } from '@/types/Information/json';
import Spinner from "@/components/utils/Spinner.vue";

@Component({
    components: {           
        Spinner
    }        
}) 
export default class Form22CaseInformation extends Vue {

    @informationState.Action
    public UpdatePartiesJson!: (newPartiesJson: partiesDataJsonDataType) => void

    @informationState.Action
    public UpdatePreviousCourts!: (newPreviousCourts: previousCourtJsonInfoType[]) => void

    @informationState.Action
    public UpdateInitiatingDocuments!: (newInitiatingDocuments: initiatingDocumentJsonInfoType[]) => void

    @informationState.Action
    public UpdateFileNumber!: (newFileNumber: string) => void
    
    @form22State.Action
    public UpdateCurrentNoFeesPayableId!: (newCurrentNoFeesPayableId: string) => void
    
    @form22State.Action
    public UpdateForm22Info!: (newForm22Info: form22DataInfoType) => void

    @form22State.State
    public form22Info: form22DataInfoType;
    
    levelOfCourt = "Court of Appeal";

    fileNumberState = true;
    partyState = true;
    dataReady = false;
    searching = false;
    caseInfoExists = false;

    searchParams = {} as form22SearchInfoType;
    notFound = false;
    partyOptions = [
        {text: 'Individual', value: 'Individual'},
        {text: 'Organization', value: 'Organization'}
    ];

    yesNoOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    mounted(){
        this.fileNumberState = true;
        this.partyState = true;
        this.dataReady = false;
        this.searching = false;
        this.caseInfoExists = false;
        this.dataReady = true; 
    }

    public navigateToForm22() {

        const form22SubmissionData = {} as form22DataInfoType;
        form22SubmissionData.manualAppellants = [];
        form22SubmissionData.manualRespondents = [];
        form22SubmissionData.appellants = [];
        form22SubmissionData.respondents = [];
        form22SubmissionData.requiresManualEntry = true;       
        this.UpdateForm22Info(form22SubmissionData);
        this.UpdateCurrentNoFeesPayableId(null);
        this.$router.push({name: "fill-form22"})
    }

    public findFile(){

        this.searching = true;        
        this.notFound = false;
        this.fileNumberState = true;
        this.partyState = true;

        if(!this.searchParams.file){
            this.fileNumberState = false;
            this.searching = false;
            return
        }

        if(!this.searchParams.searchBy){
            this.partyState = false;
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
                this.UpdateFileNumber(this.searchParams.file);
                const form22SubmissionData = {} as form22DataInfoType;        
                form22SubmissionData.requiresManualEntry = false;       
                this.UpdateForm22Info(form22SubmissionData);
                this.UpdateCurrentNoFeesPayableId(null);

                this.$router.push({name: "fill-form22"})
            }

            if (!res.data){
                this.notFound = true;
            }
                
        },err => {
            console.error(err); 
            this.notFound = true;  
            this.searching = false;     
        });
    }

    public coaFileformatter(value){
        if(value.slice(0,2)!='CA'){
            if(isNaN(Number(value.slice(0))))
                return 'CA'
            else
                return 'CA'+value
        }
        if(isNaN(Number(value.slice(-1)))) return value.slice(0,-1)
        return value
    }
}
</script>

<style scoped lang="scss">

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