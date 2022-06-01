<template>
    <b-card v-if="dataReady" no-body border-variant="light" bg-variant="light" :key="updatedInfo">        
              
        <save-or-preview-buttons class="mx-2 mb-2" :expiredDeadline="expiredDeadline" :textBelow="false" @saveForm1="saveForm1" />    

        <fill-form-1-summary-info v-if="normalForm" class="mt-2 mx-2" @displayResults="displayResults"/> 
        
        <fill-form-1-manual-summary-info 
            v-else 
            :manualNorm="manualNorm"
            :manualNTrib="manualNTrib"
            :manualTrib="manualTrib"
            class="mt-2 mx-2" 
            @displayResults="displayResults"/>

             

        <fill-form-1-common-info class="mx-2"/>

        <fill-form-1-style-of-proceedings-info class="mx-2" />

        <b-card class="mb-4 mx-2 border-white bg-white">

            <b-row class="question">
                <b-col cols="7" class="labels">
                    Reference Number (optional) 
                    <p class="content text-primary">
                        If you have a reference number you would like to 
                        use for your records, please enter it here.
                    </p>                               
                </b-col>
                <b-col class="mt-1">
                    <b-form-input v-model="referenceNumber" ></b-form-input>   
                </b-col>
            </b-row>

        </b-card>

        <save-or-preview-buttons class="mx-2" :expiredDeadline="expiredDeadline" @saveForm1="saveForm1" />
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import moment from 'moment-timezone';

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';
import { locationsInfoType } from '@/types/Common';
import { accountInfoType, userAccessInfoType, form1DataInfoType, form1StatesInfoType } from '@/types/Information/Form1';

import FillForm1SummaryInfo from "@/components/process/Form1/components/fillForm1/FillForm1SummaryInfo.vue";
import FillForm1ManualSummaryInfo from "@/components/process/Form1/components/fillForm1/FillForm1ManualSummaryInfo.vue";
import FillForm1CommonInfo from "@/components/process/Form1/components/fillForm1/FillForm1CommonInfo.vue";
import FillForm1StyleOfProceedingsInfo from "@/components/process/Form1/components/fillForm1/FillForm1StyleOfProceedingsInfo.vue";

import SaveOrPreviewButtons from './components/SaveOrPreviewButtons.vue'

@Component({
    components:{        
        FillForm1SummaryInfo,
        FillForm1ManualSummaryInfo,
        FillForm1CommonInfo,
        FillForm1StyleOfProceedingsInfo,
        SaveOrPreviewButtons
    }
})
export default class FillForm1 extends Vue {    

    @commonState.State
    public accountInfo!: accountInfoType;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    @informationState.Action
    public UpdateCaseLocation!: (newCaseLocation: locationsInfoType) => void

    @form1State.State
    public form1AccessInfo!: userAccessInfoType[];

    @form1State.State
    public form1Info: form1DataInfoType;

    @informationState.State
    public supremeCourtOrderJson: supremeCourtOrdersJsonInfoType;

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;

    @form1State.State
    public currentNoticeOfAppealId: string;

    @form1State.State
    public form1InfoStates: form1StatesInfoType;

    @form1State.Action
    public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void

    @form1State.Action
    public UpdateForm1Info!: (newForm1Info: form1DataInfoType) => void

    @form1State.Action
    public UpdateForm1InfoStates!: (newForm1StatesInfo: form1StatesInfoType) => void

    referenceNumber = '';   
    expiredDeadline = false; 
    updatedInfo = 0;
    dataReady = false;
    fieldStates = {} as form1StatesInfoType;
    showTribunalDetailsForm = false;

    manualNTrib = false
    manualTrib = false
    manualNorm = false
    normalForm = false


    mounted() { 
        this.expiredDeadline = false;
        this.dataReady = false;
        if (!this.currentNoticeOfAppealId){         
            this.loadOrderDetails();            
        } else {
            this.getForm1Data();
        }          
                       
    }
    
    public determineFormType(form1Info: form1DataInfoType){          
        this.manualNTrib = form1Info.appealingScFlaDivorce || form1Info.insideTimeLimit         
        this.manualTrib = form1Info.appealTribunal
        this.manualNorm = form1Info.requiresManualEntry
        this.normalForm = !this.manualNTrib && !this.manualTrib && !this.manualNorm
    }
    
    public getForm1Data() {        
       
        this.$http.get('/form1/forms/'+this.currentNoticeOfAppealId)
        .then((response) => {
            if(response?.data?.data){            
                
                const form1Data: form1DataInfoType = response.data.data 
                this.determineFormType(form1Data)  
                if (this.manualTrib || this.manualNTrib){
                    this.showTribunalDetailsForm = true;
                } else {
                    this.showTribunalDetailsForm = false;
                    form1Data['appealSubmissionDeadline']=moment(form1Data['appealSubmissionDeadline']).local().format()
                    form1Data['dateOfJudgement']=moment(form1Data['dateOfJudgement']).local().format();
                }
                
                this.UpdateForm1Info(form1Data) 
                this.setCurrentCourtLocation(form1Data['lowerCourtRegistryId'])
                this.clearStates();                
            }
                
        },(err) => {
            console.log(err)        
        });      
    }

    public setCurrentCourtLocation(locationId){
        const selectedLocation: locationsInfoType = this.locationsInfo.filter(location=>location.id == locationId)[0]
        this.UpdateCaseLocation(selectedLocation);
    }

    public loadOrderDetails(){

        const form1SubmissionData = this.form1Info;
        form1SubmissionData.manualSop = [];       
        form1SubmissionData.addresses = [];
        form1SubmissionData.emailAdresses = [];
        form1SubmissionData.phoneNumbers = [];
        
        this.determineFormType(form1SubmissionData)
        
        if (!this.normalForm){
            this.showTribunalDetailsForm = true;
        } else {
            this.showTribunalDetailsForm = false;
            form1SubmissionData.parties = this.supremeCourtCaseJson.parties;            
            form1SubmissionData.appealSubmissionDeadline = moment(this.supremeCourtOrderJson.appealSubmissionDeadline).format();
            form1SubmissionData.honorificTitle = this.supremeCourtOrderJson.honorificTitle;
            form1SubmissionData.dateOfJudgement = moment(this.supremeCourtOrderJson.orderDate).format();
            form1SubmissionData.nameOfJudge = this.supremeCourtOrderJson.judgeFirstName + ' ' + this.supremeCourtOrderJson.judgeSurname;               
        }
        this.UpdateForm1Info(form1SubmissionData);
        this.saveForm1(true);

    }

    public clearStates(){
        const form1States = {} as form1StatesInfoType;
        this.UpdateForm1InfoStates(form1States); 
        this.fieldStates = {} as form1StatesInfoType;
        this.dataReady = true; 
    }

    public checkWithinAppealPeriod(){
        return !this.form1Info.isPastDeadline;
    }  
    
    public checkDay(day: string){

        let valid = false;
        if ((Number(day)>0) && (Number(day) % 1 == 0 || Number(day) % 1 == 0.5)){
            valid = true;
        }       

        return valid;
    }

    public checkStates(){
        
        this.fieldStates = this.form1InfoStates;        

        if (this.manualTrib)
            this.fieldStates.tribunalType = !this.form1Info.tribunalType? false : null;
        else 
           this.fieldStates.tribunalType = null;
           
        if (this.manualTrib || this.manualNorm || this.manualNTrib){   
            this.fieldStates.tribunalDateOfOrder = !this.form1Info.tribunalDateOfOrder? false : null;
            this.fieldStates.tribunalOriginalDecisionMaker = !this.form1Info.tribunalOriginalDecisionMaker? false : null;
        } else {                       
            this.fieldStates.tribunalDateOfOrder = null;
            this.fieldStates.tribunalOriginalDecisionMaker = null;
        }   
        
        this.fieldStates.cityOfOrder = !this.form1Info.cityOfOrder? false : null;

        if (this.manualTrib){
            this.fieldStates.lowerCourtFileNo = null;            
        } else {
            this.fieldStates.lowerCourtFileNo = !this.form1Info.lowerCourtFileNo? false : null;            
        } 
        
        if (this.manualNorm || this.manualNTrib){
            this.fieldStates.lowerCourtRegistryId = this.form1Info.lowerCourtRegistryId? null: false
        } else
            this.fieldStates.lowerCourtRegistryId = null;

        const durationValue = this.form1Info.trialDurationDays?.trim().toLowerCase();
        const includesIdentifier = durationValue?.includes('day') || durationValue?.includes('hour')
        this.fieldStates.appearanceDays = !(this.form1Info.trialDurationDays && includesIdentifier)? false : null;
        this.fieldStates.applyLeave = !(this.form1Info.applyLeave != null)? false : null;
        this.fieldStates.amending = !(this.form1Info.amending != null)? false : null; 
        this.fieldStates.appealInvolvesChild = !(this.form1Info.appealInvolvesChild != null)? false : null;        
        this.fieldStates.respondents = !(this.form1Info.respondents && this.form1Info.respondents.length > 0 )? false : null;
        this.fieldStates.appellants = !(this.form1Info.appellants && this.form1Info.appellants.length > 0 )? false : null;
        this.fieldStates.appealFrom = !this.form1Info.appealFrom? false : null;
        this.fieldStates.wasSupremeAppeal = !(this.form1Info.wasSupremeAppeal != null)? false : null;
        this.fieldStates.decisionMaker = (this.form1Info.wasSupremeAppeal && !this.form1Info.decisionMaker)? false : null;        
        this.fieldStates.involves = !(this.form1Info.involves && this.form1Info.involves.length > 0)? false : null;
        this.fieldStates.orderSought = !this.form1Info.orderSought? false : null;

        this.fieldStates.orderSealed = !(this.form1Info.orderSealed != null)? false : null;
        this.fieldStates.dateSealed = (this.form1Info.orderSealed && !this.form1Info.dateSealed)? false : null;
        this.fieldStates.orderBan = !(this.form1Info.orderBan != null)? false : null;
        this.fieldStates.dateBan = (this.form1Info.orderBan && !this.form1Info.dateBan)? false : null;
      
        this.fieldStates.mainAppellant = !this.form1Info.appealingFirm? false : null;
        
        this.fieldStates.phoneNumbers = !(this.form1Info.phoneNumbers && this.verifyPhoneNumbers()
                                    && this.form1Info.phoneNumbers.length == this.form1Info.appellants.length)? false : null;
        this.fieldStates.addresses = !(this.form1Info.addresses && this.verifyAddresses()
                                    && this.form1Info.addresses.length == this.form1Info.appellants.length)? false : null;       
      
        this.UpdateForm1InfoStates(this.fieldStates);
        this.updatedInfo ++;

        for(const field of Object.keys(this.fieldStates)){
            if(this.fieldStates[field]==false){
                Vue.filter('findInvalidFields')()
                return false
            }                
        }       

        return true;            
    }

    public verifyPhoneNumbers(){
        for(const phoneNumber of this.form1Info.phoneNumbers){            
            if(phoneNumber.contactInfo.trim().length == 0)
                return false;
        }
        return true;
    }

    public verifyAddresses(){
        for(const address of this.form1Info.addresses){            
            if(address.contactInfo.trim().length == 0)
                return false;
        }
        return true;
    }

    public extractAddresses(){
        const addresses = [];
        for(const contactAddress of this.form1Info.addresses){            
            if(contactAddress.contactInfo.trim().length != 0){
                addresses.push(contactAddress.name + ': ' + contactAddress.contactInfo.trim());
            }  
        }
        return addresses.join('<br>');        
    }

    public extractPhoneNumbers(){
        const phoneNumbers = [];
        for(const phone of this.form1Info.phoneNumbers){            
            if(phone.contactInfo.trim().length != 0){
                phoneNumbers.push(phone.name + ': ' + phone.contactInfo.trim());
            }  
        }
        return phoneNumbers.join('<br>');        
    }

    public extractEmails(){
        const emails = [];
        for(const email of this.form1Info.emailAdresses){            
            if(email.contactInfo.trim().length != 0){
                emails.push(email.name + ': ' + email.contactInfo.trim());
            }  
        }
        return emails.join('<br>');        
    }

    public saveForm1(draft: boolean) {

        let method = 'post';
        let url = '/form1/forms';

        if (this.currentNoticeOfAppealId){
            method = 'put';
            url = '/form1/forms/'+this.currentNoticeOfAppealId;
            const form1 = this.form1Info;
            form1.refOptional = this.referenceNumber;
            form1.contactAddress = this.extractAddresses();
            form1.emails = this.extractEmails();
            form1.phones = this.extractPhoneNumbers();
            this.UpdateForm1Info(form1);

            if (this.checkWithinAppealPeriod() ){ 
                this.expiredDeadline = false;

                if (!draft && !this.checkStates()){               
                    return                    
                }

                const form1Data = this.getForm1Info();
                
                const options = {
                    method: method,
                    url: url,
                    data: {
                        data:form1Data,
                        type:'Form1',
                        description:'Notice of Appeal'
                    }
                }

                this.saveInfo(options, draft); 

            } else {
                this.expiredDeadline = true;               
            }

        } else { 

            const options = {
                method: method,
                url: url,
                data: {
                    data:this.form1Info,
                    type:'Form1',
                    description:'Notice of Appeal'
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
                        this.UpdateCurrentNoticeOfAppealId(response.data.file_id);
                        this.form1Info.id = response.data.file_id;
                    }

                    this.clearStates(); 
                    
                    this.UpdateForm1Info(this.form1Info);
                    if(!draft) this.navigateToPreviewPage();                           
                }
            }, err => {
                const errMsg = err.response.data.error;
                
            })
    }

    public getForm1Info(){

        const data = JSON.parse(JSON.stringify(this.form1Info));
        data.electronicallyFiled = 'N';
        data.trialDurationDays = this.form1Info.trialDurationDays.toString();
        data.appealingFirm = this.form1Info.appealingFirm;
        
        data.toRespondents = this.form1Info.respondents?this.form1Info.respondents.map(respondent => {return respondent.fullName}).join(', '):'';
        data.respondentSolicitor = this.form1Info.respondentSolicitor?this.form1Info.respondentSolicitor:'';
        data.wasSupremeAppeal = this.form1Info.wasSupremeAppeal;
        data.appealFrom = this.form1Info.appealFrom;
        data.decisionMaker = this.form1Info.decisionMaker?this.form1Info.decisionMaker:null;
        data.refOptional = this.form1Info.refOptional?this.form1Info.refOptional: null;
        data.involves = this.form1Info.involves;
        data.manualSop = this.form1Info.manualSop;
        data.parties = this.form1Info.parties;
        data.partOfJudgment = this.form1Info.partOfJudgment?this.form1Info.partOfJudgment:null;
        data.orderSought = this.form1Info.orderSought;

        data.readOnlyUsers = [];
        data.readWriteUsers = [];
        
        if (this.accountInfo?.accountUsers?.length > 1 && this.form1AccessInfo.length > 0){
            for (const accessInfo of this.form1AccessInfo){

                console.log(accessInfo);
                if (accessInfo.readOnly){
                    data.readOnlyUsers.push(accessInfo.user.clientId);
                } else if (accessInfo.update){
                    data.readWriteUsers.push(accessInfo.user.clientId);
                }

            }

        } else {            
            data.readWriteUsers.push(this.accountInfo.clientId);
        }
        
        return data;
    }

    public navigateToPreviewPage() {          
        if (this.checkStates()){
            this.$router.push({name: "preview-form1"});
        }        
    }

    public displayResults(){
        this.$emit('displayResults');
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
        margin-left: 1.15rem !important;
    }

</style>