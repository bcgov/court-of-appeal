<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header 
            header-bg-variant="light" 
            header-border-variant="white" 
            class="my-2 mx-4" 
            style="font-size: 42px; font-weight: 700;">            
            NOTICE OF APPEAL FORM (Form 1)
            <p style="font-size: 18px; font-weight: 300;">
                To assist you in the completing the Notice of Appeal 
                form, you will need to answer the questions in the section below.
            </p>
        </b-card-header>      

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-1-qualify-questions @disableContinue="disableNavigateForm1"/>
        </b-card>

        <div
            style="width: 30%; height: 3rem; padding:0;"
            class="mt-4 p-0"
            v-b-tooltip.hover.top.v-warning
            :title="disableContinue?'In order to proceed, you must respond to all questions above.':''">

            <b-button 
                :class="(disableContinue?inactiveButtonClass:activeButtonClass) + ' ml-4 '"
                style="opacity:1;"                
                :disabled="disableContinue"            
                @click="navigateToForm1()"
                >
                <span style="font-size: 20px;">Continue to Notice of Appeal</span>
            </b-button> 
        </div>     
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import Form1QualifyQuestions from "@/components/process/Form1/components/Form1QualifyQuestions.vue";
import { accountInfoType, form1QualificationInfoType, form1DataInfoType } from '@/types/Information/Form1';

@Component({
    components:{
        Form1QualifyQuestions
    }
})
export default class ChecklistForm1 extends Vue {    
    
    @commonState.Action
    public UpdateAccountInfo!: (newAccountInfo: accountInfoType) => void
   
    @commonState.State
    public accountInfo!: accountInfoType;

    @form1State.Action
    public UpdateForm1Info!: (newForm1Info: form1DataInfoType) => void

    @form1State.State
    public currentNoticeOfAppealId: string;

    @form1State.Action
    public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void

    disableContinue = true;
    businessAccount = true;
    inactiveButtonClass = "bg-secondary text-white"; 
    activeButtonClass = "bg-success text-white"; 
    qualificationInfo = {} as form1QualificationInfoType;
    
    mounted(){
        
        this.loadAccountDetails();

    }

    public loadAccountDetails(){

        this.$http.get('/account-info/')
        .then((response) => {
            
            if(response?.data){
                const accountInfo = response.data
                this.UpdateAccountInfo(accountInfo);
                this.businessAccount = accountInfo.accountUsers.length>1;
            }
                
        },(err) => {
            console.log(err)        
        });
    }

    public disableNavigateForm1(disable: boolean, qualificationInfo: form1QualificationInfoType) {        
        this.disableContinue = disable; 
        this.qualificationInfo = qualificationInfo;      
    }

    public navigateToForm1() {

        const form1SubmissionData = {} as form1DataInfoType;
        form1SubmissionData.selfRepresenting = this.qualificationInfo.selfRepresenting;
        form1SubmissionData.appealingProvincialCourtOrder = this.qualificationInfo.appealingProvincialCourtOrder;
        form1SubmissionData.insideTimeLimit = this.qualificationInfo.insideTimeLimit;
        form1SubmissionData.appealingBankruptcy = this.qualificationInfo.appealingBankruptcy;
        form1SubmissionData.appealingFeesWaived = this.qualificationInfo.appealingFeesWaived;
        form1SubmissionData.appealingSupremeCourtMaster = this.qualificationInfo.appealingSupremeCourtMaster;
        form1SubmissionData.appealingSupremeCourtOrder = this.qualificationInfo.appealingSupremeCourtOrder;
        form1SubmissionData.appealingScFlaDivorce = this.qualificationInfo.appealingScFlaDivorce;        
        form1SubmissionData.appealTribunal = this.qualificationInfo.appealTribunal
        form1SubmissionData.requiresManualEntry = false;
        if (form1SubmissionData.appealTribunal || 
            form1SubmissionData.appealingScFlaDivorce || 
            form1SubmissionData.insideTimeLimit){
            form1SubmissionData.parties = [];
        }
        this.UpdateForm1Info(form1SubmissionData);

        this.businessAccount = this.accountInfo.accountUsers.length>1;

        this.deleteApplication();

        if (this.businessAccount){
            this.$router.push({name: "access-form1"});

        } else {            
            this.$router.push({name: "start-form1"}); 
        }       
               
    }

    public deleteApplication() { 
        if(this.currentNoticeOfAppealId){
            const data = {
                data:{ ids:[this.currentNoticeOfAppealId] }
            }
            
            this.UpdateCurrentNoticeOfAppealId(null);
            const url = '/form1/forms';
            this.$http.delete(url, data)
            .then(response => {
            }, err => {            
            })
        }
    }

}
</script>