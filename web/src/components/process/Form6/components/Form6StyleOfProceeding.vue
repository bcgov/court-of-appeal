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

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    <p>Are you self-represented?</p>                    
                </b-col>
                <b-col class="ml-1">
                    <b-form-radio-group                
                        style="width:100%"                                       
                        v-model="form6Info.selfRepresented"
                        :options="representationOptions">
                    </b-form-radio-group>
                </b-col>
            </b-row>  

           
        </div>

        <div v-if="form6Info.selfRepresented !=null">

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Name of party(ies) who wishes to abandon an appeal or cross appeal:                                
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-checkbox-group  
                        stacked
                        :state="state.abandoningParties"
                        @change="form6Info.abandoningAgainstParties=[]; updateOtherParties()"                   
                        v-model="form6Info.abandoningParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group>

                    <b-row class="ml-1 text-danger" v-if="invalidAbandoningParties">You cannot select all parties.</b-row>
                    
                </b-col>
            </b-row>
            

        </div>

        <div v-if="!invalidAbandoningParties && form6Info.abandoningParties && form6Info.abandoningParties.length > 0">

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    This party is abandoning a:                                
                </b-col>
                <b-col :class="state.abandonType==false?'border border-danger ml-1': 'ml-1'">   

                    <b-form-radio-group                
                        style="width:100%" 
                        :state="state.abandonType"                   
                        v-model="form6Info.abandonType"                    
                        :options="abandonTypeOptions">
                    </b-form-radio-group>
                    
                </b-col>
            </b-row>

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Which party(ies) are you abandoning against?                                
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-checkbox-group 
                        stacked
                        :key="updated" 
                        :state="state.abandoningAgainstParties"                   
                        v-model="form6Info.abandoningAgainstParties"                    
                        :options="otherPartyNames">
                    </b-form-checkbox-group>
                </b-col>
            </b-row> 

           <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Who made the Order?
                </b-col>
                <b-col>                    
                    <b-form-input                
                        style="width:100%"                        
                        :state="state.judgeName"                                                           
                        v-model="form6Info.judgeName">
                    </b-form-input>
                </b-col>
            </b-row>  

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Date the order under appeal was pronounced:
                </b-col>
                <b-col>

                    <b-card                 
                        class="mt-2" 
                        style="padding: 0; float: center;" 
                        :border-variant="state.orderDate == false?'danger': 'muted'">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    @change="updateOrderDate"
                                    v-model="orderDateValue"                           
                                    color="warning"             
                                    :allowed-dates="allowedDates"                            
                                    header-color="red"
                                ></v-date-picker>                            
                            </v-app>
                        </div>    
                    </b-card>
                    <span 
                        style="display: inline-block; font-size: 0.75rem;" 
                        class="text-orange"
                        :key="updateOrderDetails"
                        v-if="isPastDeadline">You may need to apply to extend the time to cross appeal.</span>

                    <!-- <b-card body-class="py-2 bg-select" style="min-height:2.75rem;">
                        {{form6Info.orderDate | beautify-date-blank}}
                    </b-card> -->
                </b-col>
            </b-row>  

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Date the initiating document in the appeal or cross appeal 
                    you are abandoning was filed:
                </b-col>
                <b-col>
                    <b-card                 
                        class="mt-2" 
                        style="padding: 0; float: center;" 
                        :border-variant="state.initiatingDocumentDate == false?'danger': 'muted'">
                        <div class="vuetify">
                            <v-app style="height:17rem; padding:0; margin:0 0 4rem 0;">                        
                                <v-date-picker
                                    @change="updateInitiatingDocumentDate"
                                    v-model="initiatingDocumentDateValue"                           
                                    color="warning"             
                                    :allowed-dates="allowedDates"                            
                                    header-color="red"
                                ></v-date-picker>                            
                            </v-app>
                        </div>    
                    </b-card>
                    <!-- <b-card body-class="py-2 bg-select" style="min-height:2.75rem; margin-top:0rem;">
                        {{form6Info.initiatingDocumentDate | beautify-date-blank}}
                    </b-card> -->
                </b-col>
            </b-row>       

            <b-row class="mt-4 question">
                <b-col cols="7" class="labels">
                    Name of lawyer or party authorizing filing of this Form:                                 
                </b-col>
                <b-col>
                    <b-form-input                    
                        v-model="form6Info.authorizedName"                        
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
import moment from 'moment-timezone';
import { namespace } from "vuex-class";

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form6";
const form6State = namespace("Form6");

import { form6DataInfoType } from '@/types/Information/Form6';
import { initiatingDocumentJsonInfoType, partiesDataJsonDataType, previousCourtJsonInfoType } from '@/types/Information/json';

@Component
export default class Form6StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public previousCourts: previousCourtJsonInfoType[]

    @informationState.State
    public initiatingDocuments: initiatingDocumentJsonInfoType[]

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
        orderDate: null,
        judgeName: null,
        initiatingDocumentDate: null,
        abandoningParties:null,
        abandonType: null,
        abandoningAgainstParties: null,        
        authorizedName:null
    }

    respondentName = ""; 
    updated=0;  
    invalidAbandoningParties = false;
    updateOrderDetails = 0;
    orderDateValue = '';
    updateInitiatingDocumentDateDetails = 0;
    initiatingDocumentDateValue = '';

    mounted() {
        this.dataReady = false;
        this.extractInfo();              
    }

    public updateOrderDate(){       
        this.form6Info.orderDate = this.orderDateValue;
        this.updateOrderDetails ++;
    }

    public updateInitiatingDocumentDate(){       
        this.form6Info.initiatingDocumentDate = this.initiatingDocumentDateValue;
        this.updateInitiatingDocumentDateDetails ++;
    }

    public extractInfo(){

        this.invalidAbandoningParties = false;

        if(this.currentNoticeOfSettlementOrAbandonmentId){
            this.getForm6Data();
           
        } else {   
            
            const form6Data = {} as form6DataInfoType;

            form6Data.appellants = this.partiesJson.appellants
            form6Data.respondents = this.partiesJson.respondents;
            form6Data.formSevenNumber = this.fileNumber;
            
            form6Data.version = this.$store.state.Application.version;  
            form6Data.selfRepresented = this.$store.state.Common.userSelfRepresented;
            form6Data.judgeName = Vue.filter('getFullJudgeName')(this.previousCourts[0]?.JudgeFirstName, this.previousCourts[0]?.JudgeLastName) 
            const orderDate = this.previousCourts[0]?.JudgmentDate?this.previousCourts[0].JudgmentDate.slice(0,10):'';
            form6Data.orderDate = orderDate;
            this.orderDateValue = orderDate;
            const initiatingDocumentDate = this.initiatingDocuments[0]?.DateFiled? this.initiatingDocuments[0].DateFiled.slice(0,10):'';
            form6Data.initiatingDocumentDate = initiatingDocumentDate;
            this.initiatingDocumentDateValue = initiatingDocumentDate;  
           
            this.UpdateForm6Info(form6Data);                       
            this.saveForm(true);
        }

    }

    get isPastDeadline(){

        const today = new Date();
        const orderDate = new Date(this.form6Info.orderDate);

        const TimePast = today.getTime() - orderDate.getTime();
        const daysPast = TimePast / (1000 * 3600 * 24);        
        
        return daysPast > 30;
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
        this.updateOtherParties()
        this.dataReady = true;

    }

    public getForm6Data() {        
       
        this.$http.get('/form6/forms/'+this.currentNoticeOfSettlementOrAbandonmentId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form6Data = response.data.data;
                this.orderDateValue = form6Data.orderDate? form6Data.orderDate.slice(0,10):'';  
                this.initiatingDocumentDateValue = form6Data.initiatingDocumentDate? form6Data.initiatingDocumentDate.slice(0,10):'';              
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
            orderDate: null,
            judgeName: null,
            initiatingDocumentDate: null,
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
        this.state.orderDate = this.form6Info.orderDate != null? null:false;
        this.state.judgeName = this.form6Info.judgeName != null? null:false;        
        this.state.initiatingDocumentDate = this.form6Info.initiatingDocumentDate != null? null:false;
        this.state.abandoningParties = this.form6Info.abandoningParties?.length>0? null :false;
        this.state.abandonType = !this.form6Info.abandonType? false : null;
        this.state.abandoningAgainstParties = this.form6Info.abandoningAgainstParties?.length>0? null :false;
        this.state.authorizedName = !this.form6Info.authorizedName? false : null;       
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }    

    public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');
        return (date <= day);           
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
                data: {
                    data:this.form6Info,
                    type:'Form6',
                    description:'Notice of Settlement or Abandonment'
                }
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form6Info,
                    type:'Form6',
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
        

        if (this.partyNames.length == this.form6Info.abandoningParties?.length){

            this.invalidAbandoningParties = true;

        } else {

            this.invalidAbandoningParties = false;

            for (const partyName of this.partyNames){
                const index = this.form6Info.abandoningParties?.indexOf(partyName)
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

    ::v-deep .vuetify{
        @import "@/styles/vuetify.scss";
        @import "@/styles/_custom_vuetify.scss";
        overflow: hidden;
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