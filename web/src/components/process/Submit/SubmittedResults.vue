<template>
    <div v-if="(formType == 'NAA')||(formType == 'NAAM')">
        <success-submit-form-1 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-1 v-else-if="result=='cancel'"/>
        <error-submit-form-1 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    <div v-else-if="formType == 'APP'">
        <success-submit-form-2 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-2 v-else-if="result=='cancel'"/>
        <error-submit-form-2 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    <div v-else-if="(formType == 'NCA')||(formType == 'NCAA')||(formType == 'NCAL')">
        <success-submit-form-3 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-3 v-else-if="result=='cancel'"/>
        <error-submit-form-3 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    <div v-else-if="(formType == 'MCH')||(formType == 'MCT')">
        <success-submit-form-4 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-4 v-else-if="result=='cancel'"/>
        <error-submit-form-4 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    <div v-else-if="formType == 'NHA'">
        <success-submit-form-5 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-5 v-else-if="result=='cancel'"/>
        <error-submit-form-5 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    <div v-else-if="(formType == 'ABA')||(formType == 'ABCA')||(formType == 'ABP')||(formType == 'ABRV')">
        <success-submit-form-6 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-6 v-else-if="result=='cancel'"/>
        <error-submit-form-6 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    <div v-else-if="formType == 'MCHU'">
        <success-submit-form-7 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-7 v-else-if="result=='cancel'"/>
        <error-submit-form-7 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    <div v-else-if="formType == 'MCV'">
        <success-submit-form-8 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-8 v-else-if="result=='cancel'"/>
        <error-submit-form-8 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    <div v-else-if="formType == 'REQ'">
        <success-submit-form-9 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-9 v-else-if="result=='cancel'"/>
        <error-submit-form-9 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>  
    <div v-else-if="(formType == 'COS')">
        <success-submit-form-17 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-17 v-else-if="result=='cancel'"/>
        <error-submit-form-17 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>      
    <div v-else-if="(formType == 'CNAC')||(formType == 'CNAT')">
        <success-submit-form-18 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-18 v-else-if="result=='cancel'"/>
        <error-submit-form-18 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    <div v-else-if="formType == 'CNWD'">
        <success-submit-form-19 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-19 v-else-if="result=='cancel'"/>
        <error-submit-form-19 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    <div v-else-if="formType == 'NOW'">
        <success-submit-form-20 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-20 v-else-if="result=='cancel'"/>
        <error-submit-form-20 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>   
    <div v-else-if="formType == 'MWF'">
        <success-submit-form-22 :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-form-22 v-else-if="result=='cancel'"/>
        <error-submit-form-22 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>  
    <div v-else-if="formType == 'MANUALSUB'">
        <success-submit-manual-form :packageInfo="packageInfo" v-if="result=='success'"/>
        <cancel-submit-manual-form v-else-if="result=='cancel'"/>
        <error-submit-manual-form :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import CancelSubmitForm1 from "./Form1/CancelSubmitForm1.vue";
import SuccessSubmitForm1 from "./Form1/SuccessSubmitForm1.vue";
import ErrorSubmitForm1 from "./Form1/ErrorSubmitForm1.vue";

import CancelSubmitForm2 from "./Form2/CancelSubmitForm2.vue";
import SuccessSubmitForm2 from "./Form2/SuccessSubmitForm2.vue";
import ErrorSubmitForm2 from "./Form2/ErrorSubmitForm2.vue";

import CancelSubmitForm3 from "./Form3/CancelSubmitForm3.vue";
import SuccessSubmitForm3 from "./Form3/SuccessSubmitForm3.vue";
import ErrorSubmitForm3 from "./Form3/ErrorSubmitForm3.vue";

import CancelSubmitForm4 from "./Form4/CancelSubmitForm4.vue";
import SuccessSubmitForm4 from "./Form4/SuccessSubmitForm4.vue";
import ErrorSubmitForm4 from "./Form4/ErrorSubmitForm4.vue";

import CancelSubmitForm5 from "./Form5/CancelSubmitForm5.vue";
import SuccessSubmitForm5 from "./Form5/SuccessSubmitForm5.vue";
import ErrorSubmitForm5 from "./Form5/ErrorSubmitForm5.vue";

import CancelSubmitForm6 from "./Form6/CancelSubmitForm6.vue";
import SuccessSubmitForm6 from "./Form6/SuccessSubmitForm6.vue";
import ErrorSubmitForm6 from "./Form6/ErrorSubmitForm6.vue";

import CancelSubmitForm7 from "./Form7/CancelSubmitForm7.vue";
import SuccessSubmitForm7 from "./Form7/SuccessSubmitForm7.vue";
import ErrorSubmitForm7 from "./Form7/ErrorSubmitForm7.vue";

import CancelSubmitForm8 from "./Form8/CancelSubmitForm8.vue";
import SuccessSubmitForm8 from "./Form8/SuccessSubmitForm8.vue";
import ErrorSubmitForm8 from "./Form8/ErrorSubmitForm8.vue";

import CancelSubmitForm9 from "./Form9/CancelSubmitForm9.vue";
import SuccessSubmitForm9 from "./Form9/SuccessSubmitForm9.vue";
import ErrorSubmitForm9 from "./Form9/ErrorSubmitForm9.vue";

import CancelSubmitForm17 from "./Form17/CancelSubmitForm17.vue";
import SuccessSubmitForm17 from "./Form17/SuccessSubmitForm17.vue";
import ErrorSubmitForm17 from "./Form17/ErrorSubmitForm17.vue";

import CancelSubmitForm18 from "./Form18/CancelSubmitForm18.vue";
import SuccessSubmitForm18 from "./Form18/SuccessSubmitForm18.vue";
import ErrorSubmitForm18 from "./Form18/ErrorSubmitForm18.vue";

import CancelSubmitForm19 from "./Form19/CancelSubmitForm19.vue";
import SuccessSubmitForm19 from "./Form19/SuccessSubmitForm19.vue";
import ErrorSubmitForm19 from "./Form19/ErrorSubmitForm19.vue";

import CancelSubmitForm20 from "./Form20/CancelSubmitForm20.vue";
import SuccessSubmitForm20 from "./Form20/SuccessSubmitForm20.vue";
import ErrorSubmitForm20 from "./Form20/ErrorSubmitForm20.vue";

import CancelSubmitForm22 from "./Form22/CancelSubmitForm22.vue";
import SuccessSubmitForm22 from "./Form22/SuccessSubmitForm22.vue";
import ErrorSubmitForm22 from "./Form22/ErrorSubmitForm22.vue";

import CancelSubmitManualForm from "./ManualForm/CancelSubmitManualForm.vue";
import SuccessSubmitManualForm from "./ManualForm/SuccessSubmitManualForm.vue";
import ErrorSubmitManualForm from "./ManualForm/ErrorSubmitManualForm.vue";
import { packageInfoType } from '@/types/Information';

@Component({
    components:{
        CancelSubmitForm1,
        SuccessSubmitForm1,
        ErrorSubmitForm1,
        CancelSubmitForm2,
        SuccessSubmitForm2,
        ErrorSubmitForm2,
        CancelSubmitForm3,
        SuccessSubmitForm3,
        ErrorSubmitForm3,
        CancelSubmitForm4,
        SuccessSubmitForm4,
        ErrorSubmitForm4,
        CancelSubmitForm5,
        SuccessSubmitForm5,
        ErrorSubmitForm5,
        CancelSubmitForm6,
        SuccessSubmitForm6,
        ErrorSubmitForm6,
        CancelSubmitForm7,
        SuccessSubmitForm7,
        ErrorSubmitForm7,
        CancelSubmitForm8,
        SuccessSubmitForm8,
        ErrorSubmitForm8,
        CancelSubmitForm9,
        SuccessSubmitForm9,
        ErrorSubmitForm9,  
        CancelSubmitForm17,
        SuccessSubmitForm17,
        ErrorSubmitForm17,      
        CancelSubmitForm18,
        SuccessSubmitForm18,
        ErrorSubmitForm18,
        CancelSubmitForm19,
        SuccessSubmitForm19,
        ErrorSubmitForm19,
        CancelSubmitForm20,
        SuccessSubmitForm20,
        ErrorSubmitForm20,
        CancelSubmitForm22,
        SuccessSubmitForm22,
        ErrorSubmitForm22,
        CancelSubmitManualForm,
        SuccessSubmitManualForm,
        ErrorSubmitManualForm
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