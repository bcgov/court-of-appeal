<template>
    <b-card v-if="dataReady" no-body border-variant="light" bg-variant="light" :key="updatedInfo">
       
        <fill-form-7-summary-info class="mx-2" @displayResults="displayResults"/>

        <b-card class="mb-4 border-light bg-light">
            <b-row class="ml-4 mt-0 font-weight-bold">Please complete the following fields:</b-row>
        </b-card>

        <fill-form-7-common-info class="mx-2"/>

        <fill-form-7-style-of-proceedings-info />

        <b-card class="mb-4 border-white bg-white">
            <p class="ml-4 mt-2" style="font-size: 1.35rem; font-weight:700;">Reference Number (optional)</p>           
            
            <b-form-group
                class="ml-4 mt-3 labels"                
                label="If you have a reference number you would like to use for your records, please enter it below:" 
                label-for="reference-number">
                <b-form-input 
                    id="reference-number" 
                    :state="form7InfoStates.referenceNumber"                   
                    v-model="referenceNumber">
                </b-form-input>
            </b-form-group>
        </b-card>

        <b-row>
            <b-col cols="9" style="padding-right: 0;">
                <b-button 
                    style="float: right;" 
                    variant="primary"
                    @click="saveForm7(true)"
                    >
                    <i class="fas fa-save mr-1"></i>Save
                </b-button>
            </b-col>
            <b-col cols="3">
                <b-button
                    style="float: right;" 
                    variant="primary"
                    @click="saveForm7(false)"
                    >Preview Form
                    <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                </b-button>
            </b-col>
            
        </b-row> 
        <b-row 
            v-if="expiredDeadline" 
            style="font-size: 0.75rem;" 
            class="text-danger ml-auto mr-0 mt-1">The deadline for submission has expired.
        </b-row>
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/common";
const commonState = namespace("Common");

import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';
import { accountInfoType, form7StatesInfoType, form7SubmissionDataInfoType, userAccessInfoType } from '@/types/Information';

import FillForm7SummaryInfo from "@/components/process/Form7/components/fillForm7/FillForm7SummaryInfo.vue";
import FillForm7CommonInfo from "@/components/process/Form7/components/fillForm7/FillForm7CommonInfo.vue";
import FillForm7StyleOfProceedingsInfo from "@/components/process/Form7/components/fillForm7/FillForm7StyleOfProceedingsInfo.vue";
import moment from 'moment-timezone';
import { locationsInfoType } from '@/types/Common';

@Component({
    components:{        
        FillForm7SummaryInfo,
        FillForm7CommonInfo,
        FillForm7StyleOfProceedingsInfo
    }
})
export default class FillForm7 extends Vue {    

    @commonState.State
    public accountInfo!: accountInfoType;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    @informationState.Action
    public UpdateCaseLocation!: (newCaseLocation: locationsInfoType) => void

    @informationState.State
    public form7AccessInfo!: userAccessInfoType[];

    @informationState.State
    public form7SubmissionInfo: form7SubmissionDataInfoType;

    @informationState.State
    public supremeCourtOrderJson: supremeCourtOrdersJsonInfoType;

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;

    @informationState.State
    public currentNoticeOfAppealId: string;

    @informationState.State
    public form7InfoStates: form7StatesInfoType;

    @informationState.Action
    public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void

    @informationState.Action
    public UpdateForm7SubmissionInfo!: (newForm7SubmissionInfo: form7SubmissionDataInfoType) => void

    @informationState.Action
    public UpdateForm7InfoStates!: (newForm7StatesInfo: form7StatesInfoType) => void

    referenceNumber = '';   
    expiredDeadline = false; 
    updatedInfo = 0;
    dataReady = false;
    fieldStates = {} as form7StatesInfoType;

    mounted() { 

        this.expiredDeadline = false;
        this.dataReady = false;
        if (!this.currentNoticeOfAppealId){         
            this.loadOrderDetails();            
        } else {
            this.getForm7Data()
        }           
                       
    }  
    
    public getForm7Data() {        
       
        this.$http.get('/form7/forms/'+this.currentNoticeOfAppealId)
        .then((response) => {
            if(response?.data){            
                            
                const form7Data = response.data
                // console.log(form7Data)
                // console.log(moment(form7Data['dateOfJudgement']).local().format())
                form7Data['appealSubmissionDeadline']=moment(form7Data['appealSubmissionDeadline']).local().format()
                form7Data['dateOfJudgement']=moment(form7Data['dateOfJudgement']).local().format()
                // moment(form7Data['dateOfJudgement']).local().format()
                this.UpdateForm7SubmissionInfo(form7Data) 
                this.setCurrentCourtLocation(form7Data['lowerCourtRegistryId'])
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

        const form7SubmissionData = this.form7SubmissionInfo;
        form7SubmissionData.parties = this.supremeCourtCaseJson.parties;
        form7SubmissionData.manualSop = [];
        form7SubmissionData.appealSubmissionDeadline = moment(this.supremeCourtOrderJson.appealSubmissionDeadline).format();
        form7SubmissionData.honorificTitle = this.supremeCourtOrderJson.honorificTitle;
        form7SubmissionData.dateOfJudgement = moment(this.supremeCourtOrderJson.orderDate).format();
        form7SubmissionData.nameOfJudge = this.supremeCourtOrderJson.judgeFirstName + ' ' + this.supremeCourtOrderJson.judgeSurname;   
        this.UpdateForm7SubmissionInfo(form7SubmissionData);
        this.saveForm7(true);        

    }

    public clearStates(){
        const form7States = {} as form7StatesInfoType;
        this.UpdateForm7InfoStates(form7States); 
        this.fieldStates = {} as form7StatesInfoType;
        this.dataReady = true; 
    }

    public checkWithinAppealPeriod(){
        return !this.form7SubmissionInfo.isPastDeadline;
    }     

    public checkStates(){

        let stateCheck = true;
        
        this.fieldStates = this.form7InfoStates;

        this.fieldStates.appearanceDays = !(this.form7SubmissionInfo.trialDurationDays && Number(this.form7SubmissionInfo.trialDurationDays)>0)? false : null;
        this.fieldStates.respondents = !(this.form7SubmissionInfo.respondents && this.form7SubmissionInfo.respondents.length > 0 )? false : null;
        this.fieldStates.appellants = !(this.form7SubmissionInfo.appellants && this.form7SubmissionInfo.appellants.length > 0 )? false : null;
        this.fieldStates.orderType = !this.form7SubmissionInfo.appealFrom? false : null;
        this.fieldStates.appealedInSupremeCourt = !this.form7SubmissionInfo.wasSupremeAppeal? false : null;
        this.fieldStates.makerName = (this.form7SubmissionInfo.wasSupremeAppeal && !this.form7SubmissionInfo.decisionMaker)? false : null;        
        this.fieldStates.appealNature = !this.form7SubmissionInfo.involves? false : null;
        this.fieldStates.orderSought = !this.form7SubmissionInfo.orderSought? false : null;
        this.fieldStates.mainAppellant = !this.form7SubmissionInfo.appealingFirm? false : null;
        this.fieldStates.serviceAddress = !this.form7SubmissionInfo.appealingFirmAddress? false : null;

        const requiredContent = ['BC', 'B.C.', 'BRITISH COLUMBIA']               
        if (this.form7SubmissionInfo.appealingFirmAddress && requiredContent.some(v => this.form7SubmissionInfo.appealingFirmAddress.toUpperCase().includes(v))) {
            this.fieldStates.validServiceAddress = null;            
        } else if (this.form7SubmissionInfo.appealingFirmAddress && !requiredContent.some(v => this.form7SubmissionInfo.appealingFirmAddress.toUpperCase().includes(v))) {
            this.fieldStates.validServiceAddress = false;            
        }

        this.UpdateForm7InfoStates(this.fieldStates);
        this.updatedInfo ++;

        for(const field of Object.keys(this.fieldStates)){
            if(this.fieldStates[field]==false)
                stateCheck = false;
        }       

        return stateCheck;            
    }

    public saveForm7(draft: boolean) {

        let method = 'post';
        let url = '/form7/forms';

        if (this.currentNoticeOfAppealId){
            method = 'put';
            url = '/form7/forms/'+this.currentNoticeOfAppealId;
            const form7 = this.form7SubmissionInfo;
            form7.refOptional = this.referenceNumber;
            this.UpdateForm7SubmissionInfo(form7);

            if (this.checkWithinAppealPeriod() ){ 
                this.expiredDeadline = false;

                if (!draft){
                    if (!this.checkStates()){
                        return
                    }
                }                    

                const form7SubmissionData = this.getForm7Info();
                const options = {
                    method: method,
                    url: url,
                    data: form7SubmissionData
                }
                this.saveInfo(options, draft); 

            } else {
                this.expiredDeadline = true;               
            }

        } else {           

            const options = {
                method: method,
                url: url,
                data: this.form7SubmissionInfo
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
                        this.form7SubmissionInfo.id = response.data.file_id;
                    }

                    this.clearStates(); 
                    
                    this.UpdateForm7SubmissionInfo(this.form7SubmissionInfo);
                    if(!draft) this.navigateToPreviewPage();                           
                }
            }, err => {
                const errMsg = err.response.data.error;
                
            })
    }

    public getForm7Info(){

        const data = this.form7SubmissionInfo;
        data.electronicallyFiled = 'N';
        data.trialDurationDays = this.form7SubmissionInfo.trialDurationDays.toString();
        data.appealingFirm = this.form7SubmissionInfo.appealingFirm;
        data.appealingFirmAddress = this.form7SubmissionInfo.appealingFirmAddress;
        data.toRespondents = this.form7SubmissionInfo.respondents?this.form7SubmissionInfo.respondents.map(respondent => {return respondent.fullName}).join(', '):'';
        data.respondentSolicitor = this.form7SubmissionInfo.respondentSolicitor?this.form7SubmissionInfo.respondentSolicitor:'';
        data.wasSupremeAppeal = this.form7SubmissionInfo.wasSupremeAppeal;
        data.appealFrom = this.form7SubmissionInfo.appealFrom;
        data.decisionMaker = this.form7SubmissionInfo.decisionMaker?this.form7SubmissionInfo.decisionMaker:null;
        data.refOptional = this.form7SubmissionInfo.refOptional?this.form7SubmissionInfo.refOptional: null;
        data.involves = this.form7SubmissionInfo.involves;
        data.manualSop = this.form7SubmissionInfo.manualSop;
        data.parties = this.form7SubmissionInfo.parties;
        data.partOfJudgment = this.form7SubmissionInfo.partOfJudgment?this.form7SubmissionInfo.partOfJudgment:null;
        data.orderSought = this.form7SubmissionInfo.orderSought;

        data.readOnlyUsers = [];
        data.readWriteUsers = [];
        
        if (this.accountInfo?.accountUsers?.length > 1 && this.form7AccessInfo.length > 0){
            for (const accessInfo of this.form7AccessInfo){

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
            this.$router.push({name: "preview-form7"});
        }
        
    }

    public displayResults(){
        this.$emit('displayResults');
    }
}
</script>

<style scoped lang="scss">

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

</style>