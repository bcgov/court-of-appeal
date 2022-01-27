<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header 
            header-bg-variant="light" 
            header-border-variant="white" 
            class="my-2 mx-4" 
            style="font-size: 42px; font-weight: 700;">            
            Notice of Appeal Checklist
        </b-card-header>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-7-did-you-know/>            
        </b-card>  

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-7-qualify-questions @disableContinue="disableNavigateForm7"/>
        </b-card>

        <div
            style="width: 30%; height: 3rem; padding:0;"
            class="mt-4 p-0"
            v-b-tooltip.hover.top.v-warning
            :title="disableContinue?'In order to proceed, you must answer No to the first five questions above.':''">

        <b-button 
            :class="(disableContinue?inactiveButtonClass:activeButtonClass) + ' ml-4 '"
            style="opacity:1;"
             
            :disabled="disableContinue"            
            @click="navigateToForm7()"
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

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

import Form7DidYouKnow from "@/components/process/Form7/components/Form7DidYouKnow.vue";
import Form7QualifyQuestions from "@/components/process/Form7/components/Form7QualifyQuestions.vue";
import { accountInfoType, form7SubmissionDataInfoType } from '@/types/Information/Form7';

@Component({
    components:{
        Form7DidYouKnow,
        Form7QualifyQuestions
    }
})
export default class ChecklistForm7 extends Vue {    
    
    @commonState.Action
    public UpdateAccountInfo!: (newAccountInfo: accountInfoType) => void
   
    @form7State.Action
    public UpdateForm7SubmissionInfo!: (newForm7SubmissionInfo: form7SubmissionDataInfoType) => void

    disableContinue = true;
    businessAccount = true;
    inactiveButtonClass = "bg-secondary text-white"; 
    activeButtonClass = "bg-success text-white"; 
    selfRepresenting = false;
    
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

    public disableNavigateForm7(disable: boolean, selfRepresenting: boolean) {        
        this.disableContinue = disable; 
        this.selfRepresenting = selfRepresenting;      
    }

    public navigateToForm7() {

        const form7SubmissionData = {} as form7SubmissionDataInfoType;
        form7SubmissionData.selfRepresenting = this.selfRepresenting;
       
        this.UpdateForm7SubmissionInfo(form7SubmissionData);

        if (this.businessAccount){
            this.$router.push({name: "access-form7"});

        } else {
            this.$router.push({name: "start-form7"}); 
        }       
               
    }

}
</script>