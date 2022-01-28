<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        <div>
            <p style="font-size: 1.25rem; ">Style of Proceeding (Parties) in Case</p>

            
            <b-row style="font-weight: 700;">
                <b-col cols="10">Between: <span style="font-weight: 200;">{{applicantNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-primary">Appellant</b-col>
            </b-row>
            <b-row class="mt-3" style="font-weight: 700;">
                <b-col cols="10">And: <span style="font-weight: 200;">{{respondentNames.join(', ')}}</span></b-col>
                <b-col cols="2" class="text-info">Respondent</b-col>
            </b-row>

            <b-row class="mt-3">
                <b-col cols="6" style="font-weight: 700;">First Appellant:
                   
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="Name of the first appellant named on Form 1: Notice of Appeal."/>
                    <b-form-select                            
                        class="mt-2"                        
                        :state="state.firstAppellant"                   
                        v-model="form6Info.firstAppellant"                    
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
                        v-model="form6Info.firstRespondent"                    
                        :options="respondentNames">
                    </b-form-select>
                    
                </b-col>
            </b-row>

            <p class="mt-3 mb-0" style="font-weight: 700;">Representation</p>

            <b-form-group
                class="mx-3" 
                label-cols-sm="3"
                content-cols-sm="3"
                label="Are you self-represented?" 
                label-for="representation">
                <b-form-radio-group
                    id="representation"
                    style="max-width:75%"                   
                    v-model="form6Info.selfRepresented"
                    :options="representationOptions"                
                ></b-form-radio-group>
            
            </b-form-group>
        </div>

        <div v-if="form6Info.selfRepresented !=null">

            <b-row>
                <b-col cols="3" style="font-weight: 700;">
                    Name of party(ies) who wishes to abandon an appeal or cross appeal:                                
                </b-col>
                <b-col class="ml-1 mt-2">   

                    <b-form-checkbox-group                
                        style="width:100%" 
                        :state="state.abandoningParties"
                        @change="updateOtherParties"                   
                        v-model="form6Info.abandoningParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group>

                    <b-row class="ml-1 text-danger" v-if="invalidAbandoningParties">You cannot select all parties.</b-row>
                    
                </b-col>
            </b-row>
            

        </div>

        <div v-if="!invalidAbandoningParties && form6Info.abandoningParties && form6Info.abandoningParties.length > 0">

            <b-row class="mt-4">
                <b-col cols="3" style="font-weight: 700;">
                    This party is abandoning a:                                
                </b-col>
                <b-col class="ml-1">   

                    <b-form-radio-group                
                        style="width:100%" 
                        :state="state.abandonType"                   
                        v-model="form6Info.abandonType"                    
                        :options="abandonTypeOptions">
                    </b-form-radio-group>
                    
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col cols="3" style="font-weight: 700;">
                    Which party(ies) are you abandonign against?                                
                </b-col>
                <b-col class="ml-1 mt-2">   

                    <b-form-checkbox-group 
                        :key="updated"               
                        style="width:100%" 
                        :state="state.abandoningAgainstParties"                   
                        v-model="form6Info.abandoningAgainstParties"                    
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
                    <b-form-input                    
                        v-model="form6Info.judgeName"                        
                        disabled>
                    </b-form-input>
                </b-col>
            </b-row>  

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Date the order under appeal was pronounced:
                </b-col>
                <b-col>
                    <b-form-input                    
                        v-model="form6Info.orderDate"                        
                        disabled>
                    </b-form-input>
                </b-col>
            </b-row>  

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Date the initiating document in the appeal or cross appeal you are abandoning was filed:
                </b-col>
                <b-col>
                    <b-form-input                    
                        v-model="form6Info.initiatingDocumentDate"                        
                        disabled>
                    </b-form-input>
                </b-col>
            </b-row>       

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Name of lawyer or party authorizing filing of this Form: 
                                
                </b-col>
                <b-col>
                    <b-form-input                    
                        v-model="form6Info.authorizedName"                        
                        :state ="state.authorizedName">
                    </b-form-input>
                    <span class="ml-2" style="font-weight: 700;">Electronically filed</span>

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

import { form6DataInfoType } from '@/types/Information/Form6';
import { applicantJsonDataType, partiesDataJsonDataType, respondentsJsonDataType } from '@/types/Information/json';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form6";
const form6State = namespace("Form6");

@Component
export default class Form6StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public fileNumber: string;

    @form6State.State
    public form6Info: form6DataInfoType;

    @form6State.Action
    public UpdateForm6Info!: (newForm6Info: form6DataInfoType) => void  
    
    @form6State.State
    public currentNoticeOfSettlementOrAbandonmentId: string;

    @form6State.Action
    public UpdateCurrentNoticeOfSettlementOrAbandonmentId!: (newCurrentNoticeOfSettlementOrAbandonmentId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    partyNames: string[] = [];
    otherPartyNames: string[] = [];
    
    representationOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    abandonTypeOptions = [ 'Appeal', 'Cross Appeal' ];

    state = {
        firstAppellant: null,
        firstRespondent: null,
        abandoningParties:null,
        abandonType: null,
        abandoningAgainstParties: null,        
        authorizedName:null
    }

    respondentName = ""; 
    updated=0;  
    invalidAbandoningParties = false;

    mounted() {
        this.dataReady = false;
        this.extractInfo();
              
    }

    public extractInfo(){

        this.invalidAbandoningParties = false;

        if(this.currentNoticeOfSettlementOrAbandonmentId){
            this.getForm6Data();
           
        } else {                     

            this.form6Info.appellants = this.partiesJson.appellants
            this.form6Info.respondents = this.partiesJson.respondents;
            this.form6Info.formSevenNumber = this.fileNumber;
            
            this.form6Info.version = this.$store.state.Application.version;
            //TODO: populate following with real data from webcats
            this.form6Info.judgeName = 'Drake';
            this.form6Info.orderDate = '11/11/2021';
            this.form6Info.initiatingDocumentDate = '11/11/2020';  
            const form6Data = this.form6Info
            this.UpdateForm6Info(form6Data);
            //TODO: remove extract and uncomment save after api is in place
            this.extractPartiesData();  
            // this.saveForm(true);                  
            
        }       

    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];

        for (const respondent of this.form6Info.respondents){
            this.respondentNames.push(respondent.name); 
            this.partyNames.push(respondent.name) 
        }

        for (const applicant of this.form6Info.appellants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name);  
        }
        this.dataReady = true;

    }

    public getForm6Data() {        
       
        this.$http.get('/form6/forms/'+this.currentNoticeOfSettlementOrAbandonmentId)
        .then((response) => {
            if(response?.data){            
                            
                const form6Data = response.data                
                this.UpdateForm6Info(form6Data) 
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
            abandoningParties:null,
            abandonType: null,
            abandoningAgainstParties: null,        
            authorizedName:null
        }
        this.dataReady = true; 
    }

    public checkStates(){   
        
        this.state.firstAppellant = !this.form6Info.firstAppellant? false : null;
        this.state.firstRespondent = !this.form6Info.firstRespondent? false : null; 
        this.state.abandoningParties = !this.form6Info.abandoningParties? false : null;
        this.state.abandonType = !this.form6Info.abandonType? false : null;
        this.state.abandoningAgainstParties = !this.form6Info.abandoningAgainstParties? false : null;
        this.state.authorizedName = !this.form6Info.authorizedName? false : null;       
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }    

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form6/forms';

        if (this.currentNoticeOfSettlementOrAbandonmentId){
            method = 'put';
            url = '/form6/forms/'+this.currentNoticeOfSettlementOrAbandonmentId;               

            if (!draft && !this.checkStates()){
               
                return
                
            } 
            
            const options = {
                method: method,
                url: url,
                data: this.form6Info
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: this.form6Info
            }
            this.saveInfo(options, draft);
        }        
       
    }

    public saveInfo(options, draft){

        this.$http(options)
            .then(response => {
                if(response.data){
                    if(options.method == "post"){
                        this.UpdateCurrentNoticeOfSettlementOrAbandonmentId(response.data.file_id);
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

        if (this.partyNames.length == this.form6Info.abandoningParties.length){

            this.invalidAbandoningParties = true;

        } else {

            this.invalidAbandoningParties = false;

            for (const partyName of this.partyNames){
                const index = this.form6Info.abandoningParties.indexOf(partyName)
                if (index == -1){
                    otherParties.push(partyName);
                }
            }
            this.otherPartyNames = otherParties;
            this.updated ++;
        }        
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form6"}) 
    }

}
</script>

<style scoped lang="scss">
</style>