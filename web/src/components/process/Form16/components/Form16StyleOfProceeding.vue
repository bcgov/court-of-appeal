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
                        v-model="form16Info.firstAppellant"                    
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
                        v-model="form16Info.firstRespondent"                    
                        :options="respondentNames">
                    </b-form-select>
                    
                </b-col>
            </b-row>
            
        </div>       

        <b-row class="mt-4 question">
            <b-col cols="7" class="labels">
                Name of the party making the offer:                                
            </b-col>
            <b-col class="ml-1 mt-2">   

                <b-form-checkbox-group 
                    stacked               
                    style="width:100%" 
                    :state="state.offeringParties"
                    @change="updateOtherParties"                   
                    v-model="form16Info.offeringParties"                    
                    :options="partyNames">
                </b-form-checkbox-group>

                <b-row class="ml-1 text-danger" v-if="invalidOfferingParties">You cannot select all parties.</b-row>
                
            </b-col>
        </b-row>        

        <div v-if="!invalidOfferingParties && form16Info.offeringParties && form16Info.offeringParties.length > 0">            

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Which party(ies) are you sending the offer to?                                
                </b-col>
                <b-col class="ml-1 mt-2">   

                    <b-form-checkbox-group 
                        stacked
                        :key="updated"               
                        style="width:100%" 
                        :state="state.receivingParties"                   
                        v-model="form16Info.receivingParties"                    
                        :options="otherPartyNames">
                    </b-form-checkbox-group>
                    
                </b-col>
            </b-row>

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    The amount of money you are offering:                                
                </b-col>
                <b-col :class="state.amount==false?'border border-danger ml-1': 'ml-1'">
                    <b-form-input                
                        style="width:100%" 
                        :state="state.amount"                   
                        v-model="form16Info.amount">
                    </b-form-input>
                </b-col>
            </b-row>                 

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Name of lawyer or party authorizing filing of this Form: 
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-input                    
                        v-model="form16Info.authorizedName"                        
                        :state ="state.authorizedName">
                    </b-form-input>
                    <span class="ml-2" style="font-weight: 600; font-size:11pt;">Electronically filed</span>

                </b-col>
            </b-row>            

            <hr/>    

            <b-row>
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

import { form16DataInfoType } from '@/types/Information/Form16';
import { partiesDataJsonDataType } from '@/types/Information/json';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form16";
const form16State = namespace("Form16");

@Component
export default class Form16StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;   

    @informationState.State
    public fileNumber: string;

    @form16State.State
    public form16Info: form16DataInfoType;

    @form16State.Action
    public UpdateForm16Info!: (newForm16Info: form16DataInfoType) => void  
    
    @form16State.State
    public currentOfferToSettleCostsId: string;

    @form16State.Action
    public UpdateCurrentOfferToSettleCostsId!: (newCurrentOfferToSettleCostsId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    partyNames: string[] = [];
    otherPartyNames: string[] = [];

    state = {
        firstAppellant: null,
        firstRespondent: null,
        offeringParties:null,
        amount: null,
        receivingParties: null,        
        authorizedName:null
    }
   
    updated=0;  
    invalidOfferingParties = false;

    mounted() {
        this.dataReady = false;
        this.extractInfo();              
    }

    public extractInfo(){

        this.invalidOfferingParties = false;

        if(this.currentOfferToSettleCostsId){
            this.getForm16Data();
           
        } else {   
            
            const form16Data = {} as form16DataInfoType;

            form16Data.appellants = this.partiesJson.appellants
            form16Data.respondents = this.partiesJson.respondents;
            form16Data.formSevenNumber = this.fileNumber;
            
            form16Data.version = this.$store.state.Application.version; 
           
            this.UpdateForm16Info(form16Data);                       
            this.saveForm(true);
        }            

    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];

        for (const respondent of this.form16Info.respondents){
            this.respondentNames.push(respondent.name); 
            this.partyNames.push(respondent.name) 
        }

        for (const applicant of this.form16Info.appellants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name);  
        }
        this.updateOtherParties()
        this.dataReady = true;

    }

    public getForm16Data() {        
       
        this.$http.get('/form16/forms/'+this.currentOfferToSettleCostsId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form16Data = response.data.data                
                this.UpdateForm16Info(form16Data) 
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
            offeringParties:null,
            amount: null,
            receivingParties: null,        
            authorizedName:null
        }
        this.dataReady = true; 
    }

    public checkStates(){   
        
        this.state.firstAppellant = !this.form16Info.firstAppellant? false : null;
        this.state.firstRespondent = !this.form16Info.firstRespondent? false : null; 
        this.state.offeringParties = this.form16Info.offeringParties?.length>0? null :false;
        this.state.amount = !this.form16Info.amount? false : null;
        this.state.receivingParties = this.form16Info.receivingParties?.length>0? null :false;
        this.state.authorizedName = !this.form16Info.authorizedName? false : null;       
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }    

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form16/forms';

        if (this.currentOfferToSettleCostsId){
            method = 'put';
            url = '/form16/forms/'+this.currentOfferToSettleCostsId;               

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form16Info,
                    type:'Form16',
                    description:'Offer To Settle Costs'
                }
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form16Info,
                    type:'Form16',
                    description:'Offer To Settle Costs'
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
                        this.UpdateCurrentOfferToSettleCostsId(response.data.file_id);
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

        if (this.partyNames.length == this.form16Info.offeringParties?.length){

            this.invalidOfferingParties = true;

        } else {

            this.invalidOfferingParties = false;

            for (const partyName of this.partyNames){
                const index = this.form16Info.offeringParties?.indexOf(partyName)
                if (index == -1){
                    otherParties.push(partyName);
                }
            }
            this.otherPartyNames = otherParties;
            this.updated ++;
        }        
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form16"}) 
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
        margin: 2rem 0.5rem !important;
    }

</style>