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
                <b-col cols="10" >
                    <p style="font-weight: 700;">Is Leave to Cross Appeal Required?</p>
                    (Court of Appeal Rule 12 explains when you need to cross appeal, if unsure check "yes")
                </b-col>
                <b-col class="ml-1 mt-2">   

                    <b-form-checkbox-group                
                        style="width:100%" 
                        :state="state.crossAppealRequired"                                         
                        v-model="form3Info.crossAppealRequired"
                        :options="yesNoOptions">
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
                        {{form3Info.judgeName}}
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
                        {{form3Info.orderDate | beautify-date-blank}}
                    </b-card>
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
                    v-model="form3Info.selfRepresented"
                    :options="yesNoOptions"                
                ></b-form-radio-group>
            
            </b-form-group>
        </div>

        <div v-if="form3Info.selfRepresented !=null">

            <b-row>
                <b-col cols="3" style="font-weight: 700;">
                    Name of party(ies) who wishes to abandon an appeal or cross appeal:                                
                </b-col>
                <b-col class="ml-1 mt-2">   

                    <b-form-checkbox-group                
                        style="width:100%" 
                        :state="state.abandoningParties"
                        @change="updateOtherParties"                   
                        v-model="form3Info.abandoningParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group>

                    <b-row class="ml-1 text-danger" v-if="invalidAbandoningParties">You cannot select all parties.</b-row>
                    
                </b-col>
            </b-row>
            

        </div>

        <div v-if="!invalidAbandoningParties && form3Info.abandoningParties && form3Info.abandoningParties.length > 0">

            <b-row class="mt-4">
                <b-col cols="3" style="font-weight: 700;">
                    This party is abandoning a:                                
                </b-col>
                <b-col :class="state.abandonType==false?'border border-danger ml-1': 'ml-1'">   

                    <b-form-radio-group                
                        style="width:100%" 
                        :state="state.abandonType"                   
                        v-model="form3Info.abandonType"                    
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
                        v-model="form3Info.abandoningAgainstParties"                    
                        :options="otherPartyNames">
                    </b-form-checkbox-group>
                    
                </b-col>
            </b-row> 

             

            <b-row class="my-3" style="padding: 0;">
                <b-col 
                    cols="3" 
                    style="font-weight: 700;">Date the initiating document in the appeal or cross appeal you are abandoning was filed:
                </b-col>
                <b-col>
                    <b-card body-class="py-2 bg-select" style="min-height:2.75rem; margin-top:0rem;">
                        {{form3Info.initiatingDocumentDate | beautify-date-blank}}
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
                        v-model="form3Info.authorizedName"                        
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

import { form3DataInfoType } from '@/types/Information/Form3';
import { initiatingDocumentJsonInfoType, partiesDataJsonDataType, previousCourtJsonInfoType } from '@/types/Information/json';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form3";
const form3State = namespace("Form3");

@Component
export default class Form3StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public previousCourts: previousCourtJsonInfoType[]

    @informationState.State
    public initiatingDocuments: initiatingDocumentJsonInfoType[]

    @informationState.State
    public fileNumber: string;

    @form3State.State
    public form3Info: form3DataInfoType;

    @form3State.Action
    public UpdateForm3Info!: (newForm3Info: form3DataInfoType) => void  
    
    @form3State.State
    public currentNoticeOfCrossAppealId: string;

    @form3State.Action
    public UpdateCurrentNoticeOfCrossAppealId!: (newCurrentNoticeOfCrossAppealId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    partyNames: string[] = [];
    otherPartyNames: string[] = [];
    
    yesNoOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    abandonTypeOptions = [ 'Appeal', 'Cross Appeal' ];

    state = {
        firstAppellant: null,
        firstRespondent: null,
        crossAppealRequired: null,
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

        if(this.currentNoticeOfCrossAppealId){
            this.getForm3Data();
           
        } else {   
            
            const form3Data = {} as form3DataInfoType;

            form3Data.appellants = this.partiesJson.appellants
            form3Data.respondents = this.partiesJson.respondents;
            form3Data.formSevenNumber = this.fileNumber;
            
            form3Data.version = this.$store.state.Application.version;            

            form3Data.judgeName = Vue.filter('getFullName')(this.previousCourts[0]?.JudgeFirstName, this.previousCourts[0]?.JudgeLastName) 
            form3Data.orderDate = this.previousCourts[0]?.JudgmentDate;
            form3Data.initiatingDocumentDate = this.initiatingDocuments[0]?.DateFiled;  
           
            this.UpdateForm3Info(form3Data);                       
            this.saveForm(true);
        }  
          

    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];

        for (const respondent of this.form3Info.respondents){
            this.respondentNames.push(respondent.name); 
            this.partyNames.push(respondent.name) 
        }

        for (const applicant of this.form3Info.appellants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name);  
        }
        this.updateOtherParties()
        this.dataReady = true;

    }

    public getForm3Data() {        
       
        this.$http.get('/form3/forms/'+this.currentNoticeOfCrossAppealId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form3Data = response.data.data                
                this.UpdateForm3Info(form3Data) 
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
            crossAppealRequired: null,
            abandoningParties:null,
            abandonType: null,
            abandoningAgainstParties: null,        
            authorizedName:null
        }
        this.dataReady = true; 
    }

    public checkStates(){   
        
        this.state.firstAppellant = !this.form3Info.firstAppellant? false : null;
        this.state.firstRespondent = !this.form3Info.firstRespondent? false : null; 
        this.state.abandoningParties = this.form3Info.abandoningParties?.length>0? null :false;
        this.state.abandonType = !this.form3Info.abandonType? false : null;
        this.state.abandoningAgainstParties = this.form3Info.abandoningAgainstParties?.length>0? null :false;
        this.state.authorizedName = !this.form3Info.authorizedName? false : null;       
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }    

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form3/forms';

        if (this.currentNoticeOfCrossAppealId){
            method = 'put';
            url = '/form3/forms/'+this.currentNoticeOfCrossAppealId;               

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form3Info,
                    type:'Form3',
                    description:'Notice of Settlement or Abandonment'
                }
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form3Info,
                    type:'Form3',
                    description:'Notice of Settlement or Abandonment'
                }
            }
            this.saveInfo(options, draft);
        }        
       
    }

    public saveInfo(options, draft){

        // this.$http(options)
        //     .then(response => {
        //         if(response.data){
        //             if(options.method == "post"){
        //                 this.UpdateCurrentNoticeOfCrossAppealId(response.data.file_id);
                        this.extractPartiesData();                        
            //         }

            //         this.clearStates();                    
            //         if(!draft) this.navigateToPreviewPage();                           
            //     }
            // }, err => {
            //     const errMsg = err.response.data.error;
                
            // })
    }
    
    public updateOtherParties(){

        const otherParties = [];

        if (this.partyNames.length == this.form3Info.abandoningParties?.length){

            this.invalidAbandoningParties = true;

        } else {

            this.invalidAbandoningParties = false;

            for (const partyName of this.partyNames){
                const index = this.form3Info.abandoningParties?.indexOf(partyName)
                if (index == -1){
                    otherParties.push(partyName);
                }
            }
            this.otherPartyNames = otherParties;
            this.updated ++;
        }        
    }

    public navigateToPreviewPage() {        
        this.$router.push({name: "preview-form3"}) 
    }

}
</script>

<style scoped lang="scss">
</style>