<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        <div>
            <p style="font-size: 1.25rem; ">Style of Proceeding (Parties) in Case</p>
            
            <b-row class="mt-4" style="font-weight: 700;">
                <b-col cols="10">Between: <span style="font-weight: 200;">{{applicantNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-primary">Appellant</b-col>
            </b-row>
            <b-row class="mt-3" style="font-weight: 700;">
                <b-col cols="10">And: <span style="font-weight: 200;">{{respondentNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-info">Respondent</b-col>
            </b-row>
           
        </div>

        <div>

            <b-row class="mt-5 question">
                <b-col cols="7" class="labels">
                    Name of party(ies) who are allowed costs:                                
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-checkbox-group  
                        stacked              
                        style="width:100%" 
                        :state="state.allowedCostsParties"
                        @change="updateOtherParties"                   
                        v-model="form17Info.allowedCostsParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group>

                    <b-row class="ml-1 text-danger" v-if="invalidAllowedCostsParties">You cannot select all parties.</b-row>
                    
                </b-col>
            </b-row>

        </div>

        <div v-if="!invalidAllowedCostsParties && form17Info.allowedCostsParties && form17Info.allowedCostsParties.length > 0">            

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Which party(ies) are to pay costs?                                
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-checkbox-group 
                        stacked
                        :key="updated"               
                        style="width:100%" 
                        :state="state.payingCostsParties"                   
                        v-model="form17Info.payingCostsParties"                    
                        :options="otherPartyNames">
                    </b-form-checkbox-group>
                </b-col>
            </b-row>              

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    What was the amount which was allowed?                                 
                </b-col>
                <b-col>
                    <b-form-input                    
                        v-model="form17Info.amount"                        
                        :state ="state.amount">
                    </b-form-input>
                </b-col>
            </b-row>
            <hr/>    

            <b-row >
                <b-col cols="10">
                    <b-button 
                        style="float: left;" 
                        variant="success"
                        @click="saveForm(true)"
                        >Save as Draft
                    </b-button>
                </b-col>
                <b-col cols="2">
                    <b-button
                        style="float: right;" 
                        variant="success"
                        @click="saveForm(false)"
                        >Continue
                        <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                    </b-button>
                </b-col>
            </b-row>

        </div>
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form17";
const form17State = namespace("Form17");

import { form17DataInfoType } from '@/types/Information/Form17';
import { partiesDataJsonDataType } from '@/types/Information/json';

@Component
export default class Form17StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;    

    @informationState.State
    public fileNumber: string;

    @form17State.State
    public form17Info: form17DataInfoType;

    @form17State.Action
    public UpdateForm17Info!: (newForm17Info: form17DataInfoType) => void  
    
    @form17State.State
    public currentCertificateOfCostsId: string;

    @form17State.Action
    public UpdateCurrentCertificateOfCostsId!: (newCurrentCertificateOfCostsId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    partyNames: string[] = [];
    otherPartyNames: string[] = [];  

    state = {
        allowedCostsParties:null,
        payingCostsParties: null,        
        amount:null
    }

    respondentName = ""; 
    updated=0;  
    invalidAllowedCostsParties = false;

    mounted() {
        this.dataReady = false;
        this.extractInfo();              
    }

    public extractInfo(){

        this.invalidAllowedCostsParties = false;

        if(this.currentCertificateOfCostsId){
            this.getForm17Data();
           
        } else {   
            
            const form17Data = {} as form17DataInfoType;

            form17Data.appellants = this.partiesJson.appellants
            form17Data.respondents = this.partiesJson.respondents;
            form17Data.formSevenNumber = this.fileNumber;
            
            form17Data.version = this.$store.state.Application.version;  
            
            this.UpdateForm17Info(form17Data);                       
            this.saveForm(true);
        }

    }    

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];

        for (const respondent of this.form17Info.respondents){
            this.respondentNames.push(respondent.name); 
            this.partyNames.push(respondent.name) 
        }

        for (const applicant of this.form17Info.appellants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name);  
        }
        this.updateOtherParties()
        this.dataReady = true;

    }

    public getForm17Data() {        
       
        this.$http.get('/form17/forms/'+this.currentCertificateOfCostsId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form17Data = response.data.data;
                this.UpdateForm17Info(form17Data) 
                this.extractPartiesData();
                this.clearStates();                
            }
                
        },(err) => {
            console.log(err)        
        });      
    }

     public clearStates(){
        this.state = {
            allowedCostsParties:null,
            payingCostsParties: null,        
            amount:null
        }
        this.dataReady = true; 
    }

    public checkStates(){   
        
        
        this.state.allowedCostsParties = this.form17Info.allowedCostsParties?.length>0? null :false;
        
        this.state.payingCostsParties = this.form17Info.payingCostsParties?.length>0? null :false;
        this.state.amount = !this.form17Info.amount? false : null;       
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }   

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form17/forms';

        if (this.currentCertificateOfCostsId){
            method = 'put';
            url = '/form17/forms/'+this.currentCertificateOfCostsId;               

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form17Info,
                    type:'Form17',
                    description:'Certificate of Costs'
                }
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form17Info,
                    type:'Form17',
                    description:'Certificate of Costs'
                }
            }
            this.saveInfo(options, draft);
        }        
       
    }

    public saveInfo(options, draft){

        this.$http(options)
            .then(response => {
                if(response.data){
                    if(options.method == "post"){
                        this.UpdateCurrentCertificateOfCostsId(response.data.file_id);
                        this.extractPartiesData();                        
                    }

                    this.clearStates();                    
                    if(!draft) this.navigateToPreviewPage();                           
                }
            }, err => {
                const errMsg = err.response.data.error;
                
            })
    }
    
    public updateOtherParties(){

        const otherParties = [];

        if (this.partyNames.length == this.form17Info.allowedCostsParties?.length){

            this.invalidAllowedCostsParties = true;

        } else {

            this.invalidAllowedCostsParties = false;

            for (const partyName of this.partyNames){
                const index = this.form17Info.allowedCostsParties?.indexOf(partyName)
                if (index == -1){
                    otherParties.push(partyName);
                }
            }
            this.otherPartyNames = otherParties;
            this.updated ++;
        }        
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form17"}) 
    }

}
</script>

<style scoped lang="scss">

    ::v-deep .vuetify{
        @import "@/styles/vuetify.scss";
        @import "@/styles/_custom_vuetify.scss";
    }

    .content {        
        margin-bottom: 0px !important; 
        font-size: 0.75rem; 
        font-weight:400;
    }

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

    .question {
        margin-left: 0.75rem !important;
    }

</style>