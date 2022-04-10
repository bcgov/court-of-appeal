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
                <b-col cols="4" style="font-weight: 700;">First Appellant:
                   
                    <b-icon-question-circle-fill 
                        class="text-primary"
                        v-b-tooltip.hover.noninteractive
                        scale="1.1"
                        title="Name of the first appellant named on Form 1: Notice of Appeal."/>
                    <b-form-select                            
                        class="mt-2"                        
                        :state="state.firstAppellant"                   
                        v-model="form4Info.firstAppellant"                    
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
                        v-model="form4Info.firstRespondent"                    
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
                    v-model="form4Info.selfRepresented"
                    :options="representationOptions"                
                ></b-form-radio-group>
            
            </b-form-group>
        </div>

        <div v-if="form4Info.selfRepresented !=null">

            <b-row>
                <b-col cols="3" style="font-weight: 700;">
                    Name of party(ies) who wishes to abandon an appeal or cross appeal:                                
                </b-col>
                <b-col class="ml-1 mt-2">   

                    <b-form-checkbox-group                
                        style="width:100%" 
                        :state="state.abandoningParties"
                        @change="updateOtherParties"                   
                        v-model="form4Info.abandoningParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group>

                    <b-row class="ml-1 text-danger" v-if="invalidAbandoningParties">You cannot select all parties.</b-row>
                    
                </b-col>
            </b-row>
            

        </div>

        <div v-if="!invalidAbandoningParties && form4Info.abandoningParties && form4Info.abandoningParties.length > 0">

            <b-row class="mt-4">
                <b-col cols="3" style="font-weight: 700;">
                    This party is abandoning a:                                
                </b-col>
                <b-col :class="state.abandonType==false?'border border-danger ml-1': 'ml-1'">   

                    <b-form-radio-group                
                        style="width:100%" 
                        :state="state.abandonType"                   
                        v-model="form4Info.abandonType"                    
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
                        :state="state.abandoningAgainstParties"                   
                        v-model="form4Info.abandoningAgainstParties"                    
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
                        {{form4Info.judgeName}}
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
                        {{form4Info.orderDate | beautify-date-blank}}
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
                        {{form4Info.initiatingDocumentDate | beautify-date-blank}}
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
                        v-model="form4Info.authorizedName"                        
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

import { form4DataInfoType } from '@/types/Information/Form4';
import { initiatingDocumentJsonInfoType, partiesDataJsonDataType, previousCourtJsonInfoType } from '@/types/Information/json';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

@Component
export default class Form4StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public previousCourts: previousCourtJsonInfoType[]

    @informationState.State
    public initiatingDocuments: initiatingDocumentJsonInfoType[]

    @informationState.State
    public fileNumber: string;

    @form4State.State
    public form4Info: form4DataInfoType;

    @form4State.Action
    public UpdateForm4Info!: (newForm4Info: form4DataInfoType) => void  
    
    @form4State.State
    public currentNoticeOfSettlementOrAbandonmentId: string;

    @form4State.Action
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
            this.getForm4Data();
           
        } else {   
            
            const form4Data = {} as form4DataInfoType;

            form4Data.appellants = this.partiesJson.appellants
            form4Data.respondents = this.partiesJson.respondents;
            form4Data.formSevenNumber = this.fileNumber;
            
            form4Data.version = this.$store.state.Application.version;  
            form4Data.selfRepresented = this.$store.state.Common.userSelfRepresented;
            form4Data.judgeName = Vue.filter('getFullJudgeName')(this.previousCourts[0]?.JudgeFirstName, this.previousCourts[0]?.JudgeLastName) 
            form4Data.orderDate = this.previousCourts[0]?.JudgmentDate;
            form4Data.initiatingDocumentDate = this.initiatingDocuments[0]?.DateFiled;  
           
            this.UpdateForm4Info(form4Data);                       
            this.saveForm(true);
        }  
          

    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];

        for (const respondent of this.form4Info.respondents){
            this.respondentNames.push(respondent.name); 
            this.partyNames.push(respondent.name) 
        }

        for (const applicant of this.form4Info.appellants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name);  
        }
        this.updateOtherParties()
        this.dataReady = true;

    }

    public getForm4Data() {        
       
        this.$http.get('/form4/forms/'+this.currentNoticeOfSettlementOrAbandonmentId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form4Data = response.data.data                
                this.UpdateForm4Info(form4Data) 
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
        
        this.state.firstAppellant = !this.form4Info.firstAppellant? false : null;
        this.state.firstRespondent = !this.form4Info.firstRespondent? false : null; 
        this.state.abandoningParties = this.form4Info.abandoningParties?.length>0? null :false;
        this.state.abandonType = !this.form4Info.abandonType? false : null;
        this.state.abandoningAgainstParties = this.form4Info.abandoningAgainstParties?.length>0? null :false;
        this.state.authorizedName = !this.form4Info.authorizedName? false : null;       
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }    

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form4/forms';

        if (this.currentNoticeOfSettlementOrAbandonmentId){
            method = 'put';
            url = '/form4/forms/'+this.currentNoticeOfSettlementOrAbandonmentId;               

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form4Info,
                    type:'Form4',
                    description:'Notice of Settlement or Abandonment'
                }
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form4Info,
                    type:'Form4',
                    description:'Notice of Settlement or Abandonment'
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

        if (this.partyNames.length == this.form4Info.abandoningParties?.length){

            this.invalidAbandoningParties = true;

        } else {

            this.invalidAbandoningParties = false;

            for (const partyName of this.partyNames){
                const index = this.form4Info.abandoningParties?.indexOf(partyName)
                if (index == -1){
                    otherParties.push(partyName);
                }
            }
            this.otherPartyNames = otherParties;
            this.updated ++;
        }        
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form4"}) 
    }

}
</script>

<style scoped lang="scss">
</style>