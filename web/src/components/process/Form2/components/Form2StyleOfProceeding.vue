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

            <b-row class="mt-4">
                <b-col cols="6" style="font-weight: 700;">First Appellant:
                   
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="Name of the first appellant named on Form 1: Notice of Appeal."/>
                    <b-form-select                            
                        class="mt-2"                        
                        :state="state.firstAppellant"                   
                        v-model="form2Info.firstAppellant"                    
                        :options="applicantNames">
                    </b-form-select>
                    
                </b-col>

                <b-col cols="6" style="font-weight: 700;">First Respondent:
                   
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="Name of the first respondent named on Form 1: Notice of Appeal."/>
                    <b-form-select 
                        class="mt-2"             
                        :state="state.firstRespondent"                   
                        v-model="form2Info.firstRespondent"                    
                        :options="respondentNames">
                    </b-form-select>
                    
                </b-col>
            </b-row>

            
        </div>

        <div class="mt-5" >

            <b-row class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    Name of party(ies) filing the Notice of Appearance:                                
                </b-col>
                <b-col >   

                    <b-form-checkbox-group                
                        style="width:100%" 
                        :state="state.filingParties"                                        
                        v-model="form2Info.filingParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group>

                                     
                </b-col>
            </b-row>

            <b-row class="mt-5">
                <b-col cols="6" style="font-weight: 700;">
                    Phone number(s) of the party(ies) filing the Notice of Appearance                                
                </b-col>
                <b-col>                    
                    <b-form-textarea                
                        style="width:100%"  
                        :state="state.phoneNumbers"                                                          
                        v-model="form2Info.phoneNumbers">
                    </b-form-textarea>                    
                </b-col>                
            </b-row>
            <b-row class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    Name(s) and address(es) within BC for the service of the respondent(s)                                                    
                </b-col>
                <b-col>                   
                    <b-form-textarea                
                        style="width:100%" 
                        rows="6" 
                        :state="state.addresses"                                                           
                        v-model="form2Info.addresses">
                    </b-form-textarea>                    
                </b-col>                
            </b-row>
            <b-row class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    Email(s) address(es) for service of respondent(s)                                
                </b-col>
                <b-col>                   
                    <b-form-textarea                
                        style="width:100%"                                                            
                        v-model="form2Info.emailAdresses">
                    </b-form-textarea>                    
                </b-col>                
            </b-row>

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="6" 
                    style="font-weight: 700;">Name of lawyer or party authorizing filing of this Form: 
                                
                </b-col>
                <b-col>
                    <b-form-input                    
                        v-model="form2Info.authorizedName"                        
                        :state ="state.authorizedName">
                    </b-form-input>
                    <span class="ml-2" style="font-weight: 600; font-size:11pt;">Electronically filed</span>

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

import "@/store/modules/forms/form2";
const form2State = namespace("Form2");

import { form2DataInfoType } from '@/types/Information/Form2';
import { partiesDataJsonDataType } from '@/types/Information/json';

@Component
export default class Form2StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public fileNumber: string;

    @form2State.State
    public form2Info: form2DataInfoType;

    @form2State.Action
    public UpdateForm2Info!: (newForm2Info: form2DataInfoType) => void  
    
    @form2State.State
    public currentCaseId: string;

    @form2State.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    partyNames: string[] = [];

    state = {
        firstAppellant: null,
        firstRespondent: null,
        filingParties:null,
        authorizedName: null,
        phoneNumbers: null,       
        addresses: null 
    }

    mounted() {
        this.dataReady = false;
        this.extractInfo();                
    }

    async getForm2Data() {
        
        this.$http.get('/case/'+this.currentCaseId+'/')
        .then((response) => {
            if(response?.data?.data){ 
                const form2Data = response.data.data                
                this.UpdateForm2Info(form2Data); 
                this.extractPartiesData();
                this.clearStates(); 
            }                
        },(err) => {
            console.log(err)        
        });      
    }

    public clearStates(){
        this.state = {
            firstAppellant: null,
            firstRespondent: null,
            filingParties:null,
            authorizedName: null,
            phoneNumbers: null,       
            addresses: null 
        }
        this.dataReady = true; 
    }

    async extractInfo(){

        if(this.currentCaseId){
            await this.getForm2Data();
        } else {            
             
            const form2Data = {} as form2DataInfoType;
            form2Data.appellants = this.partiesJson.appellants;
            form2Data.respondents = this.partiesJson.respondents;
            form2Data.formSevenNumber = this.fileNumber;            
            form2Data.version = this.$store.state.Application.version;
            form2Data.filingParties = [];
            this.UpdateForm2Info(form2Data);           
            this.saveForm(true);
            
        } 
    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];               

        for (const applicant of this.form2Info.appellants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name);
        }

        for (const respondent of this.form2Info.respondents){
            this.respondentNames.push(respondent.name);
            this.partyNames.push(respondent.name);            
        }        
        this.dataReady = true;
    }  

    public checkStates(){ 
        this.state.firstAppellant = !this.form2Info.firstAppellant? false : null;
        this.state.firstRespondent = !this.form2Info.firstRespondent? false : null;
         this.state.filingParties = (this.form2Info.filingParties.length == 0)? false : null; 
        this.state.phoneNumbers = !this.form2Info.phoneNumbers? false : null;
        this.state.addresses = !this.form2Info.addresses? false : null;           
        this.state.authorizedName = !this.form2Info.authorizedName? false : null; 
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }    

    public saveForm(draft: boolean) { 
        
        const url = this.currentCaseId? ('/case/'+this.currentCaseId+'/') : '/case/';
        const method = this.currentCaseId? "put" : "post"
        const body = {
            type: "form-2",
            status:"Draft",
            description:"form2",
            data: this.form2Info
        }  

        const options = {
            method: method,
            url: url,
            data: body
        }       
            
        if (this.currentCaseId && !draft && !this.checkStates()){               
            return                
        }             
        
        this.saveInfo(options, draft);              
       
    }

    public saveInfo(options, draft){

        this.$http(options)
            .then(response => {
                if(response.data){
                    if(options.method == "post"){
                        this.UpdateCurrentCaseId(response.data.case_id);
                        this.extractPartiesData();                       
                    }
                    this.clearStates();                    
                    if(!draft) this.navigateToPreviewPage();                           
                }
            }, err => {
                const errMsg = err.response.data.error;                
            })
    }   

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form2"}) 
    }

}
</script>

<style scoped lang="scss">
</style>