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

import Form7DidYouKnow from "@/components/process/Form7/components/Form7DidYouKnow.vue";
import Form7QualifyQuestions from "@/components/process/Form7/components/Form7QualifyQuestions.vue";
import { accountInfoType } from '@/types/Information';

@Component({
    components:{
        Form7DidYouKnow,
        Form7QualifyQuestions
    }
})
export default class ChecklistForm7 extends Vue {    
    
    @commonState.Action
    public UpdateAccountInfo!: (newAccountInfo: accountInfoType) => void
   
    disableContinue = true;
    businessAccount = true;
    inactiveButtonClass = "bg-secondary text-white"; 
    activeButtonClass = "bg-success text-white"; 
    
    mounted(){
        
        this.loadAccountDetails();

    }

    public loadAccountDetails(){

        //TODO: add endpoint to get data https://test.justice.gov.bc.ca/cso/ext/coa/form7/api/lookup/account 

        const data = 
        {
            
        "accountId": 394,
        "clientId": 627,
        "firmName": "AG TEST LAW FIRM",
        "firmAddress": "1222 Cherry Lane\r\nVictoria, BC  V8W 9J2\nCANADA",
        "accountUsers": [
            {
            "clientId": 617,
            "fullName": "Kathryn Thomson",
            "isAdmin": true
            },
            {
            "clientId": 627,
            "fullName": "Test white",
            "isAdmin": true
            },
            {
            "clientId": 613,
            "fullName": "Patricia White",
            "isAdmin": true
            },
            {
            "clientId": 631,
            "fullName": "Thomas Broeren",
            "isAdmin": false
            },
            {
            "clientId": 735,
            "fullName": "COA5 Tester",
            "isAdmin": false
            },
            {
            "clientId": 659,
            "fullName": "Renee Edey",
            "isAdmin": false
            },
            {
            "clientId": 665,
            "fullName": "COA1 Tester",
            "isAdmin": false
            },
            {
            "clientId": 666,
            "fullName": "COA3 Tester",
            "isAdmin": false
            },
            {
            "clientId": 667,
            "fullName": "COA4 Tester",
            "isAdmin": false
            }
        ],
        "extensionData": {
            "csoProceedUrl": "https://test.justice.gov.bc.ca/cso/filing/ext/submissionInit.do?appCd=coa/form7/forms&referenceGuid=",
            "logOutUrl": "https://test.justice.gov.bc.ca/cso/logoff.do",
            "contactUsUrl": "https://test.justice.gov.bc.ca/cso/help/help_contactUs.do",
            "returnToCsoUrl": "https://test.justice.gov.bc.ca/cso/"
        }
        }

        this.UpdateAccountInfo(data);

        this.businessAccount = data.accountUsers.length>1;

    }

    public disableNavigateForm7(disable: boolean) {
        
        this.disableContinue = disable;
        console.log(disable);
    }

    public navigateToForm7() {
        if (this.businessAccount){
            this.$router.push({name: "access-form7"});

        } else {
            this.$router.push({name: "start-form7", params: {orderSelected: 'no'}}); 
        }       
               
    }

}
</script>

<style scoped lang="scss">

</style>