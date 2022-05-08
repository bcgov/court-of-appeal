<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header 
            header-bg-variant="light" 
            header-border-variant="white" 
            class="my-2 mx-4" 
            style="font-size: 42px; font-weight: 700;">            
            Notice of Cross Appeal Checklist
        </b-card-header>
     
        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-3-qualify-questions @disableContinue="disableNavigateForm3"/>
        </b-card>

        <div
            style="width: 30%; height: 3rem; padding:0;"
            class="mt-4 p-0"
            v-b-tooltip.hover.top.v-warning
            :title="disableContinue?'In order to proceed, you must respond to all questions and answer No to question 6 above.':''">

            <b-button 
                :class="(disableContinue?inactiveButtonClass:activeButtonClass) + ' ml-4 '"
                style="opacity:1;"                
                :disabled="disableContinue"            
                @click="navigateToForm3()"
                >
                <span style="font-size: 20px;">Continue to Notice of Appeal</span>
            </b-button> 
        </div>     
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form3";
const form3State = namespace("Form3");

import Form3QualifyQuestions from "@/components/process/Form3/components/Form3QualifyQuestions.vue";
import { form3QualificationInfoType, form3DataInfoType } from '@/types/Information/Form3';

@Component({
    components:{
        Form3QualifyQuestions
    }
})
export default class ChecklistForm3 extends Vue {    
   
    @form3State.Action
    public UpdateForm3Info!: (newForm3Info: form3DataInfoType) => void

    disableContinue = true;
    businessAccount = true;
    inactiveButtonClass = "bg-secondary text-white"; 
    activeButtonClass = "bg-success text-white"; 
    qualificationInfo = {} as form3QualificationInfoType;
    
    // mounted(){       

    // }    

    public disableNavigateForm3(disable: boolean, qualificationInfo: form3QualificationInfoType) {        
        this.disableContinue = disable; 
        this.qualificationInfo = qualificationInfo;      
    }

    public navigateToForm3() {

        const form3SubmissionData = {} as form3DataInfoType;
        form3SubmissionData.selfRepresenting = this.qualificationInfo.selfRepresenting;
        form3SubmissionData.filedNoA = this.qualificationInfo.filedNoA;
        form3SubmissionData.insideTimeLimit = this.qualificationInfo.insideTimeLimit;
        form3SubmissionData.vary = this.qualificationInfo.vary;
        form3SubmissionData.appealingFeesWaived = this.qualificationInfo.appealingFeesWaived;        
        form3SubmissionData.appealingSupremeCourtOrder = this.qualificationInfo.appealingSupremeCourtOrder;
        form3SubmissionData.appealingScFlaDivorce = this.qualificationInfo.appealingScFlaDivorce;  
        this.UpdateForm3Info(form3SubmissionData);        
        this.$router.push({name: "start-form3"});
               
    }

}
</script>