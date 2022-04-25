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
                        v-model="form19Info.firstAppellant"                    
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
                        v-model="form19Info.firstRespondent"                    
                        :options="respondentNames">
                    </b-form-select>
                    
                </b-col>
            </b-row>

            <b-row class="mt-5">
                <b-col cols="6" style="font-weight: 700;">
                    Name of lawyer seeking to withdraw:                                
                </b-col>
                <b-col>
                    <b-form-select                
                        style="width:100%" 
                        :state="state.withdrawingLawyerName"                                    
                        v-model="form19Info.withdrawingLawyerName"                    
                        :options="lawyerNameOptions">
                    </b-form-select>
                    <b-form-input
                        v-if="form19Info.withdrawingLawyerName == 'Other'"
                        style="width:100%" 
                        placeholder="Lawyer name"
                        class="mt-2"
                        :state="state.withdrawingLawyerNameOther"                                    
                        v-model="form19Info.withdrawingLawyerNameOther">
                    </b-form-input>
                   
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    Name(s) of the party(ies) the lawyer represents                                
                </b-col>
                <b-col class="ml-1 mt-2">
                    <b-form-checkbox-group                
                        stacked
                        style="width:100%" 
                        :state="state.representingParties"                                        
                        v-model="form19Info.representingParties"                    
                        :options="partyNames">
                    </b-form-checkbox-group> 
                </b-col>
            </b-row>
        </div>

        <div>
            <b-row class="mt-5">
                <b-col cols="6" style="font-weight: 700;">
                    Last known phone number(s) of the party(ies) the lawyer represents                                
                </b-col>
                <b-col>                    
                    <b-form-textarea                
                        style="width:100%"  
                        :state="state.phoneNumbers"                                                          
                        v-model="form19Info.phoneNumbers">
                    </b-form-textarea>                    
                </b-col>                
            </b-row>
            <b-row class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    Last known address(es) of the party(ies) the lawyer represents                                                    
                </b-col>
                <b-col>                   
                    <b-form-textarea                
                        style="width:100%" 
                        rows="6" 
                        :state="state.addresses"                                                           
                        v-model="form19Info.addresses">
                    </b-form-textarea>                    
                </b-col>                
            </b-row>
            <b-row class="mt-4">
                <b-col cols="6" style="font-weight: 700;">
                    Last known email(s) of the party(ies) the lawyer represents                                
                </b-col>
                <b-col>                   
                    <b-form-textarea                
                        style="width:100%"                                                            
                        v-model="form19Info.emailAdresses">
                    </b-form-textarea>                    
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
                    v-model="form19Info.authorizedName"                        
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
        
    </b-card>
</template>

<script lang="ts">

import { form19DataInfoType } from '@/types/Information/Form19';
import { partiesDataJsonDataType } from '@/types/Information/json';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form19";
const form19State = namespace("Form19");

@Component
export default class Form19StyleOfProceeding extends Vue {

    @informationState.State
    public partiesJson: partiesDataJsonDataType;

    @informationState.State
    public fileNumber: string;

    @form19State.State
    public form19Info: form19DataInfoType;

    @form19State.Action
    public UpdateForm19Info!: (newForm19Info: form19DataInfoType) => void  
    
    @form19State.State
    public currentNoticeOfWithdrawalOfLawyerId: string;

    @form19State.Action
    public UpdateCurrentNoticeOfWithdrawalOfLawyerId!: (newCurrentNoticeOfWithdrawalOfLawyerId: string) => void
    
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
        representingParties: null,
        phoneNumbers: null,       
        addresses: null,  
        authorizedName:null
    }

    mounted() {
        this.dataReady = false;
        this.extractInfo();             
    }

    public extractInfo(){     

        if(this.currentNoticeOfWithdrawalOfLawyerId){
            this.getForm19Data();
           
        } else {  
            const form19Data = {} as form19DataInfoType;                  

            form19Data.appellants = this.partiesJson.appellants
            form19Data.respondents = this.partiesJson.respondents;
            form19Data.formSevenNumber = this.fileNumber;
            form19Data.version = this.$store.state.Application.version; 
            form19Data.representingParties = [];
                  
            this.UpdateForm19Info(form19Data);            
            this.saveForm(true);                  
            
        }       

    }

    public extractPartiesData(){

        this.applicantNames = [];
        this.respondentNames = [];
        this.partyNames = [];
        this.lawyerNameOptions = [];        

        for (const applicant of this.form19Info.appellants){
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

        for (const respondent of this.form19Info.respondents){
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
        
        this.lawyerNameOptions.push('Other')
        this.dataReady = true;

    }  

    public getForm19Data() {        
       
        this.$http.get('/form19/forms/'+this.currentNoticeOfWithdrawalOfLawyerId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form19Data = response.data.data                
                this.UpdateForm19Info(form19Data) 
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
            representingParties: null,
            phoneNumbers: null,           
            addresses: null, 
            authorizedName:null
        }
        this.dataReady = true; 
    }

    public checkStates(){        
        
        this.state.firstAppellant = !this.form19Info.firstAppellant? false : null;
        this.state.firstRespondent = !this.form19Info.firstRespondent? false : null;

        this.state.withdrawingLawyerName = !this.form19Info.withdrawingLawyerName? false : null; 
        if (this.form19Info.withdrawingLawyerName == 'Other'){
            this.state.withdrawingLawyerNameOther = !this.form19Info.withdrawingLawyerNameOther? false : null; 
        } else {
            this.state.withdrawingLawyerNameOther = null;
        }

        this.state.representingParties = (this.form19Info.representingParties.length == 0)? false : null; 
        this.state.phoneNumbers = !this.form19Info.phoneNumbers? false : null;
        this.state.addresses = !this.form19Info.addresses? false : null;
           
        this.state.authorizedName = !this.form19Info.authorizedName? false : null;       
        
        for(const field of Object.keys(this.state)){
            if(this.state[field]==false)
                return false
        }
        return true            
    }    

    public saveForm(draft: boolean) { 
        
        let method = 'post';
        let url = '/form19/forms';

        if (this.currentNoticeOfWithdrawalOfLawyerId){
            method = 'put';
            url = '/form19/forms/'+this.currentNoticeOfWithdrawalOfLawyerId;               

            if (!draft && !this.checkStates()){
               
                return
                
            } 
            
            const options = {
                method: method,
                url: url,                
                data: {
                    data:this.form19Info,
                    type:'Form19',
                    description:'Notice of Withdrawal of Lawyer'
                }
            }
            this.saveInfo(options, draft);

        } else {           

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form19Info,
                    type:'Form19',
                    description:'Notice of Withdrawal of Lawyer'
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
                        this.UpdateCurrentNoticeOfWithdrawalOfLawyerId(response.data.file_id);
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
        this.$router.push({name: "preview-form19"}) 
    }

}
</script>

<style scoped lang="scss">
</style>