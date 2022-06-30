<template>
    <b-card v-if="dataReady" class="ml-4 border-white">
        <div>
            <b-card class="bg-light border-0">
                <p style="font-size: 1.25rem; font-weight: 700;">Style of Proceeding (Parties) in Case</p>
                
                <b-row style="font-weight: 700;">
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
                        v-model="form20Info.firstAppellant"                    
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
                        v-model="form20Info.firstRespondent"                    
                        :options="respondentNames">
                    </b-form-select>
                    
                </b-col>
            </b-row>

            <b-row class="mt-5">
                <b-col cols="6" style="font-weight: 700;">
                    Name(s) of the party(ies) objecting                                
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-checkbox-group                
                        stacked
                        style="width:100%"
                        @change="recheckStates()" 
                        :state="state.objectingParties"                                        
                        v-model="form20Info.objectingParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group> 
                    <b-form-input
                        v-if="form20Info.objectingParties && form20Info.objectingParties.includes('Other')"
                        style="width:100%" 
                        placeholder="party name"
                        @change="recheckStates()"
                        class="mt-2"
                        :state="state.objectingPartiesOther"                                    
                        v-model="form20Info.objectingPartiesOther">
                    </b-form-input>
                </b-col>
            </b-row>

            <b-row class="mt-5">
                <b-col cols="6" style="font-weight: 700;">
                    Name of lawyer seeking to withdraw:                                
                </b-col>
                <b-col>
                    <b-form-select                
                        style="width:100%"
                        @change="recheckStates()" 
                        :state="state.withdrawingLawyerName"                                    
                        v-model="form20Info.withdrawingLawyerName"                    
                        :options="lawyerNameOptions">
                    </b-form-select>
                    <b-form-input
                        v-if="form20Info.withdrawingLawyerName == 'Other'"
                        @change="recheckStates()"
                        style="width:100%" 
                        placeholder="Lawyer name"
                        class="mt-2"
                        :state="state.withdrawingLawyerNameOther"                                    
                        v-model="form20Info.withdrawingLawyerNameOther">
                    </b-form-input>
                   
                </b-col>
            </b-row>

            
        </div>

        <b-row class="my-5" style="padding: 0;">
            <b-col 
                cols="3" 
                style="font-weight: 700;">Name of lawyer or party authorizing filing of this Form: 
                            
            </b-col>
            <b-col>
                <b-form-input                    
                    v-model="form20Info.authorizedName"
                    @change="recheckStates()"                        
                    :state ="state.authorizedName">
                </b-form-input>
                <span class="ml-2" style="font-weight: 600;font-size:11pt;">Electronically filed</span>

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
        
    </b-card>
</template>

<script lang="ts">

import { form20DataInfoType } from '@/types/Information/Form20';
import { partiesDataJsonDataType } from '@/types/Information/json';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form20";
const form20State = namespace("Form20");

@Component
export default class Form20StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public fileNumber: string;

    @form20State.State
    public form20Info: form20DataInfoType;

    @form20State.Action
    public UpdateForm20Info!: (newForm20Info: form20DataInfoType) => void  
    
    @form20State.State
    public currentNoticeOfObjectionToWithdrawalId: string;

    @form20State.Action
    public UpdateCurrentNoticeOfObjectionToWithdrawalId!: (newCurrentNoticeOfObjectionToWithdrawalId: string) => void
    
    dataReady = false;
    applicantNames: string[] = [];
    respondentNames: string[] = [];
    partyNames: string[] = [];
       

    lawyerNameOptions: string[] = [];

    state = {
        firstAppellant: null,
        firstRespondent: null,        
        withdrawingLawyerName: null, 
        withdrawingLawyerNameOther: null, 
        objectingParties: null,
        objectingPartiesOther: null,
        authorizedName:null
    }

    mounted() {
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;              
    }

    public extractInfo(){     

        if(this.currentNoticeOfObjectionToWithdrawalId){
            this.getForm20Data();
           
        } else {  
            const form20Data = {} as form20DataInfoType;                  

            form20Data.appellants = this.partiesJson.appellants
            form20Data.respondents = this.partiesJson.respondents;
            form20Data.formSevenNumber = this.fileNumber;
            form20Data.version = this.$store.state.Application.version; 
            form20Data.objectingParties = [];
                  
            this.UpdateForm20Info(form20Data);            
            this.saveForm(true);                  
            
        }       

    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];
        this.lawyerNameOptions = [];

        for (const respondent of this.form20Info.respondents){
            this.respondentNames.push(respondent.name);
            this.partyNames.push(respondent.name);
            if (respondent.solicitor){

                const lawyerName = 
                    Vue.filter('getFullName')(respondent.solicitor.counselFirstName, respondent.solicitor.counselLastName)+
                    (respondent.solicitor.firmName? " ("+respondent.solicitor.firmName+")":"");

                if (!this.lawyerNameOptions.includes(lawyerName)){
                    this.lawyerNameOptions.push(lawyerName);
                }
                
            }
        }

        for (const applicant of this.form20Info.appellants){
            this.applicantNames.push(applicant.name);
            this.partyNames.push(applicant.name)  
            if (applicant.solicitor){

                const lawyerName = 
                    Vue.filter('getFullName')(applicant.solicitor.counselFirstName, applicant.solicitor.counselLastName)+
                    (applicant.solicitor.firmName? " ("+applicant.solicitor.firmName+")":"");
                
                if (!this.lawyerNameOptions.includes(lawyerName)){
                    this.lawyerNameOptions.push(lawyerName);
                }
            }         
        }
        this.lawyerNameOptions.push('Other')
        this.partyNames.push('Other')
        this.dataReady = true;

    }  

    public getForm20Data() {        
       
        this.$http.get('/form20/forms/'+this.currentNoticeOfObjectionToWithdrawalId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form20Data = response.data.data                
                this.UpdateForm20Info(form20Data) 
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
            withdrawingLawyerName: null, 
            withdrawingLawyerNameOther: null, 
            objectingParties: null,
            objectingPartiesOther: null,
            authorizedName:null
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
        
        this.state.firstAppellant = !this.form20Info.firstAppellant? false : null;
        this.state.firstRespondent = !this.form20Info.firstRespondent? false : null;

        this.state.withdrawingLawyerName = !this.form20Info.withdrawingLawyerName? false : null; 
        if (this.form20Info.withdrawingLawyerName == 'Other'){
            this.state.withdrawingLawyerNameOther = !this.form20Info.withdrawingLawyerNameOther? false : null; 
        } else {
            this.state.withdrawingLawyerNameOther = null;
        }

        this.state.objectingParties = (this.form20Info.objectingParties.length == 0)? false : null; 
        if (this.form20Info.objectingParties.includes('Other')){
            this.state.objectingPartiesOther = !this.form20Info.objectingPartiesOther? false : null; 
        } else {
            this.state.objectingPartiesOther = null;
        }       
           
        this.state.authorizedName = !this.form20Info.authorizedName? false : null;       
        
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
        let url = '/form20/forms';

        if (this.currentNoticeOfObjectionToWithdrawalId){
            method = 'put';
            url = '/form20/forms/'+this.currentNoticeOfObjectionToWithdrawalId;               

            if (!draft && !this.checkStates()){               
                return                
            } 
            
            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form20Info,
                    type:'Form20',
                    description:'Notice of Objection to Withdrawal'
                }
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form20Info,
                    type:'Form20',
                    description:'Notice of Objection to Withdrawal'
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
                        this.UpdateCurrentNoticeOfObjectionToWithdrawalId(response.data.file_id);
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
        this.$router.push({name: "preview-form20"}) 
    }

}
</script>

<style scoped lang="scss">
</style>