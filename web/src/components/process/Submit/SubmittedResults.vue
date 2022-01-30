<template>
    <div v-if="formType == 'APP'">
        <success-submit-form-2 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-2 v-else-if="result=='cancel'"/>
        <error-submit-form-2 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    <div v-else-if="formType == 'NHA'">
        <success-submit-form-5 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-5 v-else-if="result=='cancel'"/>
        <error-submit-form-5 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    <div v-else-if="formType == 'ABA'">
        <success-submit-form-6 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-6 v-else-if="result=='cancel'"/>
        <error-submit-form-6 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    <div v-else>
        <success-submit-form-7 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-7 v-else-if="result=='cancel'"/>
        <error-submit-form-7 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import CancelSubmitForm2 from "./Form2/CancelSubmitForm2.vue";
import SuccessSubmitForm2 from "./Form2/SuccessSubmitForm2.vue";
import ErrorSubmitForm2 from "./Form2/ErrorSubmitForm2.vue";

import CancelSubmitForm5 from "./Form5/CancelSubmitForm5.vue";
import SuccessSubmitForm5 from "./Form5/SuccessSubmitForm5.vue";
import ErrorSubmitForm5 from "./Form5/ErrorSubmitForm5.vue";

import CancelSubmitForm6 from "./Form6/CancelSubmitForm6.vue";
import SuccessSubmitForm6 from "./Form6/SuccessSubmitForm6.vue";
import ErrorSubmitForm6 from "./Form6/ErrorSubmitForm6.vue";

import CancelSubmitForm7 from "./Form7/CancelSubmitForm7.vue";
import SuccessSubmitForm7 from "./Form7/SuccessSubmitForm7.vue";
import ErrorSubmitForm7 from "./Form7/ErrorSubmitForm7.vue";
import { packageInfoType } from '@/types/Information';

@Component({
    components:{
        CancelSubmitForm2,
        SuccessSubmitForm2,
        ErrorSubmitForm2,
        CancelSubmitForm5,
        SuccessSubmitForm5,
        ErrorSubmitForm5,
        CancelSubmitForm6,
        SuccessSubmitForm6,
        ErrorSubmitForm6,
        CancelSubmitForm7,
        SuccessSubmitForm7,
        ErrorSubmitForm7
    }
})
export default class SubmittedResults extends Vue {

    errorMsg = ""
    result = "" 
    formType = ""    
    packageInfo: packageInfoType = {fileNumber: "", packageNumber:"", eFilingUrl:""}

    mounted() {
        this.result = "";
        this.formType = "";
        this.errorMsg = "Missing Parameters"
        this.packageInfo = {fileNumber: "", packageNumber:"", eFilingUrl:""}
        
        const caseId = this.$route.params?.id
        const result = String(this.$route.params?.result);
        this.formType = this.$route.params?.formType
        // console.log(this.$route.params)
        
        if (result == "success"){
            this.result = "error"
            const packageRef = this.$route.query?.packageRef;            
            if(packageRef){
                const packageUrl = atob(String(packageRef));
                const urlParams = new URLSearchParams(packageUrl.split('?')[1]);
                const packageNumber = urlParams.get('packageNo')
                if(packageNumber){
                    this.packageInfo = {fileNumber: caseId, packageNumber:packageNumber, eFilingUrl:packageUrl}
                    this.result = result;
                }               
            }                
        }
        else if  (result == "cancel") {             
            this.result = result;
        } 
        else {
            const packageMessage = this.$route.query?.message
            this.errorMsg = packageMessage? String(packageMessage): "An error occured while submitting your application."
            this.result = "error";
        }             
    }    

}
</script>

<style scoped lang="scss">



</style>