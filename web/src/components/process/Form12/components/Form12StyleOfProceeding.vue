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

            <b-row class="mt-5">
                <b-col cols="6" style="font-weight: 700;">First Appellant:
                   
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="Name of the first appellant named on Form 1: Notice of Appeal."/>
                    <b-form-select                            
                        class="mt-2"                        
                        :state="state.firstAppellant"                   
                        v-model="form12Info.firstAppellant"                    
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
                        v-model="form12Info.firstRespondent"                    
                        :options="respondentNames">
                    </b-form-select>
                    
                </b-col>
            </b-row>

            <p class="mt-5 mb-0" style="font-weight: 700;">Representation</p>

            <b-form-group
                class="mx-3" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Are you self-represented?" 
                label-for="representation">
                <b-form-radio-group
                    id="representation"
                    style="max-width:75%"                   
                    v-model="form12Info.selfRepresented"
                    :options="representationOptions"                
                ></b-form-radio-group>
            
            </b-form-group>
        </div>

        <div v-if="form12Info.selfRepresented !=null">

            <b-row>
                <b-col cols="3" style="font-weight: 700;">
                    Name of party(ies) who wishes to abandon an appeal or cross appeal:                                
                </b-col>
                <b-col class="ml-1 mt-2">   

                    <b-form-checkbox-group                
                        style="width:100%" 
                        :state="state.filingParties"
                        @change="updateOtherParties"                   
                        v-model="form12Info.filingParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group>

                    
                </b-col>
            </b-row>
            

        </div>

        <div v-if="form12Info.filingParties && form12Info.filingParties.length > 0">

            <b-row class="mt-4">
                <b-col cols="3" style="font-weight: 700;">
                    This party is abandoning a:                                
                </b-col>
                <b-col :class="state.abandonType==false?'border border-danger ml-1': 'ml-1'">   

                    <b-form-radio-group                
                        style="width:100%" 
                        :state="state.abandonType"                   
                        v-model="form12Info.abandonType"                    
                        :options="abandonTypeOptions">
                    </b-form-radio-group>
                    
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col cols="3" style="font-weight: 700;">
                    Which party(ies) are you abandoning against?                                
                </b-col>
                <b-col class="ml-1 mt-2">   

                    <b-form-checkbox-group 
                        :key="updated"               
                        style="width:100%" 
                        :state="state.appearingParties"                   
                        v-model="form12Info.appearingParties"                    
                        :options="otherPartyNames">
                    </b-form-checkbox-group>
                    
                </b-col>
            </b-row> 

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Who made the Order?
                </b-col>
                <b-col>
                    <b-card body-class="py-2 bg-select" >                   
                        {{form12Info.judgeName}}
                    </b-card>
                </b-col>
            </b-row>  

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Date the order under appeal was pronounced:
                </b-col>
                <b-col>
                    <b-card body-class="py-2 bg-select" style="min-height:2.75rem;">
                        {{form12Info.orderDate | beautify-date-blank}}
                    </b-card>
                </b-col>
            </b-row>  

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Date the initiating document in the appeal or cross appeal you are abandoning was filed:
                </b-col>
                <b-col>
                    <b-card body-class="py-2 bg-select" style="min-height:2.75rem; margin-top:0rem;">
                        {{form12Info.initiatingDocumentDate | beautify-date-blank}}
                    </b-card>
                </b-col>
            </b-row>       

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Name of lawyer or party authorizing filing of this Form: 
                                
                </b-col>
                <b-col>
                    <b-form-input                    
                        v-model="form12Info.authorizedName"                        
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

import "@/store/modules/forms/form12";
const form12State = namespace("Form12");

import { form12DataInfoType } from '@/types/Information/Form12';
import { partiesDataJsonDataType } from '@/types/Information/json';

@Component
export default class Form12StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public fileNumber: string;

    @form12State.State
    public form12Info: form12DataInfoType;

    @form12State.Action
    public UpdateForm12Info!: (newForm12Info: form12DataInfoType) => void  
    
    @form12State.State
    public currentOrderToVarySingleJusticeId: string;

    @form12State.Action
    public UpdateCurrentOrderToVarySingleJusticeId!: (newCurrentOrderToVarySingleJusticeId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    partyNames: string[] = [];
    otherPartyNames: string[] = [];
    updated=0;

    state = {
        hearingLocation: null,     
        hearingDate: null,
        filingParties: null,
        judgeName: null,
        appearingParties: null,
        orderAllowed: null,
        furtherOrders: null 
    }

    mounted() {
        this.dataReady = false;
        this.extractInfo();                
    }

    async getForm12Data() {
        
        this.$http.get('/form12/forms/'+this.currentOrderToVarySingleJusticeId+'/')
        .then((response) => {
            if(response?.data?.data){ 
                const form12Data = response.data.data                
                this.UpdateForm12Info(form12Data); 
                this.extractPartiesData();
                this.clearStates(); 
            }                
        },(err) => {
            console.log(err)        
        });      
    }

    public clearStates(){
        this.state = {
            hearingLocation: null,     
            hearingDate: null,
            filingParties: null,
            judgeName: null,
            appearingParties: null,
            orderAllowed: null,
            furtherOrders: null            
        }
        this.dataReady = true; 
    }

    async extractInfo(){

        if(this.currentOrderToVarySingleJusticeId){
            await this.getForm12Data();
        } else {            
             
            const form12Data = {} as form12DataInfoType;
            form12Data.appellants = this.partiesJson.appellants;
            form12Data.respondents = this.partiesJson.respondents;
            form12Data.formSevenNumber = this.fileNumber;            
            form12Data.version = this.$store.state.Application.version;
            form12Data.filingParties = [];
            form12Data.appearingParties = [];
            this.UpdateForm12Info(form12Data);           
            this.saveForm(true);
            
        } 
    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];               

        for (const applicant of this.form12Info.appellants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name);
        }

        for (const respondent of this.form12Info.respondents){
            this.respondentNames.push(respondent.name);
            this.partyNames.push(respondent.name);            
        }        
        this.dataReady = true;
    }  

    public checkStates(){ 
        this.state.hearingLocation = !this.form12Info.hearingLocation? false : null;
        this.state.hearingDate = !this.form12Info.hearingDate? false : null;
        this.state.filingParties = (this.form12Info.filingParties.length == 0)? false : null; 
        this.state.judgeName = !this.form12Info.judgeName? false : null;
        this.state.appearingParties = (this.form12Info.appearingParties.length == 0)? false : null; 
        this.state.orderAllowed = this.form12Info.orderAllowed == null? false : null;           
        this.state.furtherOrders = !this.form12Info.furtherOrders? false : null; 
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }    

    public saveForm(draft: boolean) { 
        
        const url = this.currentOrderToVarySingleJusticeId? ('/form12/forms/'+this.currentOrderToVarySingleJusticeId+'/') : '/case/';
        const method = this.currentOrderToVarySingleJusticeId? "put" : "post"
        const body = {
            type: "form-12",
            status:"Draft",
            description:"form12",
            data: this.form12Info
        }  

        const options = {
            method: method,
            url: url,
            data: body
        }       
            
        if (this.currentOrderToVarySingleJusticeId && !draft && !this.checkStates()){               
            return                
        }             
        
        this.saveInfo(options, draft);              
       
    }

    public saveInfo(options, draft){

        this.$http(options)
            .then(response => {
                if(response.data){
                    if(options.method == "post"){
                        this.UpdateCurrentOrderToVarySingleJusticeId(response.data.case_id);
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

        // if (this.partyNames.length == this.form6Info.abandoningParties?.length){

        //     this.invalidAbandoningParties = true;

        // } else {

            //this.invalidAbandoningParties = false;

            for (const partyName of this.partyNames){
                const index = this.form12Info.filingParties?.indexOf(partyName)
                if (index != -1){
                    otherParties.push(partyName);
                }
            }
            this.otherPartyNames = otherParties;
            this.updated ++;
        // }        
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form12"}) 
    }

}
</script>

<style scoped lang="scss">
</style>