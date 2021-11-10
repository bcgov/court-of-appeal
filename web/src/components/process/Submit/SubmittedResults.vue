<template>
    <div>
        <SuccessSubmitForm2 :packageInfo="packageInfo" v-if="result=='success'"/>
        <CancelSubmitForm2 v-else-if="result=='cancel'"/>
        <ErrorSubmitForm2 :errMsg="errorMsg" v-else-if="result=='error'"/>        
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import CancelSubmitForm2 from "./CancelSubmitForm2.vue";
import SuccessSubmitForm2 from "./SuccessSubmitForm2.vue";
import ErrorSubmitForm2 from "./ErrorSubmitForm2.vue"
import { packageInfoType } from '@/types/Information';

@Component({
    components:{
        CancelSubmitForm2,
        SuccessSubmitForm2,
        ErrorSubmitForm2
    }
})
export default class SubmittedResults extends Vue {

    errorMsg = ""
    result = "" 
    packageInfo: packageInfoType = {fileNumber: "", packageNumber:"", eFilingUrl:""}

    mounted() {
        this.result = "";
        this.errorMsg = "Missing Parameters"
        this.packageInfo = {fileNumber: "", packageNumber:"", eFilingUrl:""}
        
        const caseId = this.$route.params?.id
        const result = String(this.$route.params?.result);
        
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