<template>
    <b-card v-if="dataReady" no-body border-variant="light" bg-variant="light" :key="updatedInfo">        
              
        <save-or-preview-buttons class="mx-2" :expiredDeadline="expiredDeadline" :textBelow="false" @saveForm1="saveForm1" />    

        <fill-form-1-tribunal-summary-info v-if="form1Info.appealTribunal" class="mt-2 mx-2" @displayResults="displayResults"/>

        <fill-form-1-summary-info v-else class="mt-2 mx-2" @displayResults="displayResults"/>

        <!-- <b-card class="mb-2 border-light bg-light">
            <b-row class="ml-0 mt-0 font-weight-bold">Please complete the following fields:</b-row>
        </b-card> -->

        <fill-form-1-common-info class="mx-2"/>

        <fill-form-1-style-of-proceedings-info />

        <b-card class="mb-4 border-white bg-white">

            <b-row class="mt-2 question">
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

        <save-or-preview-buttons :expiredDeadline="expiredDeadline" @saveForm1="saveForm1" />
        
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

import { serviceInformationJsonDataType, supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';
import { locationsInfoType } from '@/types/Common';
import { accountInfoType, userAccessInfoType, form1DataInfoType, form1StatesInfoType } from '@/types/Information/Form1';

import FillForm1SummaryInfo from "@/components/process/Form1/components/fillForm1/FillForm1SummaryInfo.vue";
import FillForm1TribunalSummaryInfo from "@/components/process/Form1/components/fillForm1/FillForm1TribunalSummaryInfo.vue";
import FillForm1CommonInfo from "@/components/process/Form1/components/fillForm1/FillForm1CommonInfo.vue";
import FillForm1StyleOfProceedingsInfo from "@/components/process/Form1/components/fillForm1/FillForm1StyleOfProceedingsInfo.vue";

import SaveOrPreviewButtons from './components/SaveOrPreviewButtons.vue'

@Component({
    components:{        
        FillForm1SummaryInfo,
        FillForm1TribunalSummaryInfo,
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

    mounted() { 
        this.expiredDeadline = false;
        this.dataReady = false;
        if (!this.currentNoticeOfAppealId){         
            this.loadOrderDetails();            
        } else {
            this.getForm1Data();
        }          
                       
    }  
    
    public getForm1Data() {        
       
        this.$http.get('/form1/forms/'+this.currentNoticeOfAppealId)
        .then((response) => {
            if(response?.data?.data){            
                            
                const form1Data: form1DataInfoType = response.data.data   
                if (form1Data.appealTribunal){
                    this.showTribunalDetailsForm = true;
                } else {
                    this.showTribunalDetailsForm = false;
                    form1Data['appealSubmissionDeadline']=moment(form1Data['appealSubmissionDeadline']).local().format()
                    form1Data['dateOfJudgement']=moment(form1Data['dateOfJudgement']).local().format();
                }           
                
                //TODO: handle tribunal case
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
        form1SubmissionData.appealingFirmAddress = {} as serviceInformationJsonDataType;
        form1SubmissionData.appealingFirmAddress.province = "British Columbia";
        form1SubmissionData.appealingFirmAddress.country = "Canada";
            
        if (form1SubmissionData.appealTribunal){

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

        let stateCheck = true;
        
        this.fieldStates = this.form1InfoStates;

        if (this.form1Info.appealTribunal){
            this.fieldStates.tribunalType = !this.form1Info.tribunalType? false : null;            
            this.fieldStates.tribunalDateOfOrder = !this.form1Info.tribunalDateOfOrder? false : null;
            this.fieldStates.tribunalOriginalDecisionMaker = !this.form1Info.tribunalOriginalDecisionMaker? false : null;
        } else {
            this.fieldStates.tribunalType = null;           
            this.fieldStates.tribunalDateOfOrder = null;
            this.fieldStates.tribunalOriginalDecisionMaker = null;
        }   
        
        this.fieldStates.cityOfOrder = !this.form1Info.cityOfOrder? false : null;

        const durationValue = this.form1Info.trialDurationDays?.trim().toLowerCase();
      //  this.fieldStates.appearanceDays = this.checkDay(numberOfDays)==false? false : null;
        const includesIdentifier = durationValue?.includes('day') || durationValue?.includes('hour')
        this.fieldStates.appearanceDays = !(this.form1Info.trialDurationDays && includesIdentifier)? false : null;
        this.fieldStates.applyLeave = !(this.form1Info.applyLeave != null)? false : null;
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
        
        const phoneFormat = /^[0-9]{3}-[0-9]{3}\-[0-9]{4}((\s\x[0-9]{4})|)$/;
        const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        const postcodeFormat = /^(([A-Z][0-9][A-Z] [0-9][A-Z][0-9])|([a-z][0-9][a-z] [0-9][a-z][0-9]))?$/;

        this.fieldStates.addressLine1 = !this.form1Info.appealingFirmAddress.addressLine1? false : null;
        this.fieldStates.city = !this.form1Info.appealingFirmAddress.city? false : null;

        const postalCode = this.form1Info.appealingFirmAddress.postalCode?.trim()
        this.fieldStates.postalCode = !postcodeFormat.test(postalCode)? false : null;   
        
        const phone = this.form1Info.appealingFirmAddress.phone?.trim()
        this.fieldStates.phone = (!phone || (phone && phoneFormat.test(phone)==false))? false : null;

        const email = this.form1Info.appealingFirmAddress.email?.trim();
        this.fieldStates.email =(email && !emailFormat.test(email))? false : null;        

        
        this.UpdateForm1InfoStates(this.fieldStates);
        this.updatedInfo ++;

        for(const field of Object.keys(this.fieldStates)){
            if(this.fieldStates[field]==false)
                stateCheck = false;
        }       

        return stateCheck;            
    }

    public saveForm1(draft: boolean) {

        let method = 'post';
        let url = '/form1/forms';

        if (this.currentNoticeOfAppealId){
            method = 'put';
            url = '/form1/forms/'+this.currentNoticeOfAppealId;
            const form1 = this.form1Info;
            form1.refOptional = this.referenceNumber;
            this.UpdateForm1Info(form1);

            if (this.checkWithinAppealPeriod() ){ 
                this.expiredDeadline = false;

                if (!draft && !this.checkStates()){               
                    return                    
                }
                
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
        data.appealingFirmAddress = this.form1Info.appealingFirmAddress;
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