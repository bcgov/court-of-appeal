<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        <div>
            <b-card class="bg-light border-0">
                <p style="font-size: 1.25rem; font-weight: 700;">Style of Proceeding (Parties) in Case</p>

                
                <b-row class="mt-4" style="font-weight: 700;">
                    <b-col cols="10">Between: <span style="font-weight: 200;">{{applicantNames.join(', ')}}</span></b-col>
                    <b-col cols="2" class="text-primary">Appellant</b-col>
                </b-row>
                <b-row class="mt-3" style="font-weight: 700;">
                    <b-col cols="10">And: <span style="font-weight: 200;">{{respondentNames.join(', ')}}</span></b-col>
                    <b-col cols="2" class="text-info">Respondent</b-col>
                </b-row>
            </b-card>

            <b-row class="mt-5">
                <b-col cols="6" style="font-weight: 700;">First Appellant:
                   
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="Name of the first appellant named on Form 1: Notice of Appeal."/>
                    <b-form-select                            
                        class="mt-2"
                        @change="recheckStates()"                       
                        :state="state.firstAppellant"                   
                        v-model="form9Info.firstAppellant"                    
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
                        @change="recheckStates()"             
                        :state="state.firstRespondent"                   
                        v-model="form9Info.firstRespondent"                    
                        :options="respondentNames">
                    </b-form-select>
                    
                </b-col>
            </b-row>

            <p class="mt-5 mb-0" style="font-weight: 700;">Representation</p>

            <b-form-group
                class="mx-3" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Are you self-represented?">
                <b-form-radio-group
                    :class="state.selfRepresented==false?'border border-danger is-invalid w-50':''"
                    style="max-width:75%"
                    @change="recheckStates()"                   
                    v-model="form9Info.selfRepresented"
                    :options="representationOptions"                
                ></b-form-radio-group>
            
            </b-form-group>
        </div>

        <div v-if="form9Info.selfRepresented !=null">

            <b-row class="mt-4">
                <b-col cols="3" style="font-weight: 700;">
                    Name of party(ies) filing the requisition:                                
                </b-col>
                <b-col class="ml-1 mt-2"> 
                    <b-form-checkbox-group                
                        stacked
                        @change="recheckStates()"
                        style="width:100%" 
                        :state="state.filingRequisitionParties"                                    
                        v-model="form9Info.filingRequisitionParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group>
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col cols="3" style="font-weight: 700;">
                    I am wanting to:                                
                </b-col>
                <b-col class="ml-1 mt-2"> 
                    <b-form-radio-group                
                        stacked
                        :class="state.requisitionType==false?'border border-danger is-invalid w-50':''"
                        @change="recheckStates()"
                        style="width:100%"                          
                        v-model="form9Info.requisitionType"                    
                        :options="requestOptions">
                    </b-form-radio-group>
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col cols="3" style="font-weight: 700;">
                    What are you asking for?                               
                </b-col>
                <b-col class="ml-1">   

                    <b-form-textarea                
                        style="width:100%"
                        @change="recheckStates()" 
                        :state="state.reliefSought"                   
                        v-model="form9Info.reliefSought">
                    </b-form-textarea>
                    
                </b-col>
            </b-row>

            <b-row class="my-4" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Name of lawyer or party authorizing filing of this Form: 
                                
                </b-col>
                <b-col class="ml-1">
                    <b-form-input                    
                        v-model="form9Info.authorizedName"
                        @change="recheckStates()"                        
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

import { form9DataInfoType } from '@/types/Information/Form9';
import { partiesDataJsonDataType } from '@/types/Information/json';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

@Component
export default class Form9StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public fileNumber: string;

    @form9State.State
    public form9Info: form9DataInfoType;

    @form9State.Action
    public UpdateForm9Info!: (newForm9Info: form9DataInfoType) => void  
    
    @form9State.State
    public currentRequisitionId: string;

    @form9State.Action
    public UpdateCurrentRequisitionId!: (newCurrentRequisitionId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    partyNames: string[] = [];
    otherPartyNames: string[] = [];
    
    representationOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    requestOptions = [ 'Adjourn a hearing', 'Reset a hearing', 'Other' ];
    abandonTypeOptions = [ 'Appeal', 'Cross Appeal' ];

    state = {
        firstAppellant: null,
        firstRespondent: null,
        filingRequisitionParties:null,
        requisitionType: null,
        reliefSought: null,              
        authorizedName:null,
        selfRepresented:null
    }

    respondentName = ""; 
    updated=0;  
  

    mounted() {
        this.dataReady = false;
        this.extractInfo();
              
    }

    public extractInfo(){     

        if(this.currentRequisitionId){
            this.getForm9Data();
           
        } else {  
            const form9Data = {} as form9DataInfoType;                  

            form9Data.appellants = this.partiesJson.appellants
            form9Data.respondents = this.partiesJson.respondents;
            form9Data.formSevenNumber = this.fileNumber;            
            form9Data.version = this.$store.state.Application.version;  
            form9Data.selfRepresented = this.$store.state.Common.userSelfRepresented;          
            this.UpdateForm9Info(form9Data);
            
            this.saveForm(true);                  
            
        }       

    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];

        for (const respondent of this.form9Info.respondents){
            this.respondentNames.push(respondent.name); 
            this.partyNames.push(respondent.name) 
        }

        for (const applicant of this.form9Info.appellants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name);  
        }
        this.dataReady = true;

    }

    public getForm9Data() {        
       
        this.$http.get('/form9/forms/'+this.currentRequisitionId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form9Data = response.data.data                
                this.UpdateForm9Info(form9Data) 
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
            filingRequisitionParties:null, 
            requisitionType: null,
            reliefSought:null,                 
            authorizedName:null,
            selfRepresented:null
        }
        this.dataReady = true; 
    }

    public recheckStates(){
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false){
                this.checkStates()
                return 
            }
        }
    }

    public checkStates(){   
        
        this.state.firstAppellant = !this.form9Info.firstAppellant? false : null;
        this.state.firstRespondent = !this.form9Info.firstRespondent? false : null; 
        this.state.filingRequisitionParties = this.form9Info.filingRequisitionParties?.length>0 ? null: false;  
        this.state.requisitionType = this.form9Info.requisitionType ? null: false;        
        this.state.reliefSought = !this.form9Info.reliefSought? false : null;     
        this.state.authorizedName = !this.form9Info.authorizedName? false : null;       
        this.state.selfRepresented = this.form9Info.selfRepresented != null? null: false;

        for(const field of Object.keys(this.state)){
            if(this.state[field]==false){
                Vue.filter('findInvalidFields')()
                return false
            }
        }
        return true            
    }    

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form9/forms';

        if (this.currentRequisitionId){
            method = 'put';
            url = '/form9/forms/'+this.currentRequisitionId;               

            if (!draft && !this.checkStates()){
               
                return
                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form9Info,
                    type:'Form9',
                    description:'Requisition'
                }
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form9Info,
                    type:'Form9',
                    description:'Requisition'
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
                        this.UpdateCurrentRequisitionId(response.data.file_id);
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
        this.$router.push({name: "preview-form9"}) 
    }

}
</script>

<style scoped lang="scss">
</style>