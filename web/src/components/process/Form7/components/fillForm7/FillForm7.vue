<template>
    <b-card no-body border-variant="light" bg-variant="light">
       
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
                    v-model="referenceNumber">
                </b-form-input>
            </b-form-group>
        </b-card>

        <b-row>
            <b-col cols="9" style="padding-right: 0;">
                <b-button 
                    style="float: right;" 
                    variant="primary"
                    @click="saveForm(false)"
                    >
                    <i class="fas fa-save mr-1"></i>Save
                </b-button>
            </b-col>
            <b-col cols="3">
                <b-button
                    style="float: right;" 
                    variant="primary"
                    @click="navigateToPreviewPage"
                    >Preview Form
                    <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                </b-button>
            </b-col>
        </b-row> 

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/information";
const informationState = namespace("Information");

import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType, supremeCourtPartiesJsonInfoType } from '@/types/Information/json';

import FillForm7SummaryInfo from "@/components/process/Form7/components/fillForm7/FillForm7SummaryInfo.vue";
import FillForm7CommonInfo from "@/components/process/Form7/components/fillForm7/FillForm7CommonInfo.vue";
import FillForm7StyleOfProceedingsInfo from "@/components/process/Form7/components/fillForm7/FillForm7StyleOfProceedingsInfo.vue";
import { form7DataInfoType, form7PartiesInfoType } from '@/types/Information';

@Component({
    components:{        
        FillForm7SummaryInfo,
        FillForm7CommonInfo,
        FillForm7StyleOfProceedingsInfo
    }
})
export default class FillForm7 extends Vue {

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;

    @informationState.State
    public supremeCourtOrderJson: supremeCourtOrdersJsonInfoType;

    @informationState.State
    public form7Info: form7DataInfoType;

    @informationState.Action
    public UpdateForm7Info!: (newForm7Info: form7DataInfoType) => void

    referenceNumber = '';    

    mounted() {  
                     
    }   

    public checkValidAddress(){

        const requiredContent = ['BC', 'B.C.', 'BRITISH COLUMBIA']       
        if (requiredContent.some(v => this.form7Info.serviceAddress.toUpperCase().includes(v))) {
            return true;
        } else {
            return false;
        }
    }

    public checkWithinAppealPeriod(){
        return !this.supremeCourtOrderJson.isPastDeadline;
    }

    public checkStyleOfCause() {
        // TODO: 
        return true;

    }    

    public checkStates(){
        
        const phoneFormat = /^[0-9]{3}-[0-9]{3}\-[0-9]{4}((\s\x[0-9]{4})|)$/;
        const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        const postcodeFormat = /^(([A-Z][0-9][A-Z] [0-9][A-Z][0-9])|([a-z][0-9][a-z] [0-9][a-z][0-9]))?$/;

        

        // const selfRep = this.form2Info.selfRepresented

        // const phone = this.form2Info.serviceInformation.phone?.trim()
        // this.state.phone = (selfRep && phoneFormat.test(phone)==false)? false : null;

        // this.state.counselFirstName = !selfRep && !this.form2Info.serviceInformation.counselFirstName? false : null;
        // this.state.counselLastName =  !selfRep && !this.form2Info.serviceInformation.counselLastName? false : null;
        // this.state.firmName =  !selfRep && !this.form2Info.serviceInformation.firmName?  false : null;
        
        // const firmPhone = this.form2Info.serviceInformation.firmPhone?.trim()
        // this.state.firmPhone = (!selfRep && phoneFormat.test(firmPhone)==false)? false : null;
        
        // const email = this.form2Info.serviceInformation.email?.trim();
        // this.state.email =(email && !emailFormat.test(email) ||(!email && this.form2Info.useServiceEmail))? false : null;
        
        // this.state.addressLine1 = !this.form2Info.serviceInformation.addressLine1? false : null;
        // this.state.city = !this.form2Info.serviceInformation.city? false : null;

        // const postalCode = this.form2Info.serviceInformation.postalCode?.trim()
        // this.state.postalCode = !postcodeFormat.test(postalCode)? false : null;
        
        // for(const field of Object.keys(this.state)){
        //     if(this.state[field]==false)
        //         return false
        // }
        return true            
    }

    public saveForm(draft: boolean) {

        const data = this.getForm7Info();
        
        // if(this.checkStates())
        // {
        //     const url = this.currentCaseId? ('/myforms/'+this.currentCaseId+'/') : '/myforms/';
        //     const method = this.currentCaseId? "put" : "post"
        //     const body = {
        //         type: "form-2",
        //         status:"Draft",
        //         description:"form2",
        //         data: this.form2Info
        //     }  

        //     const options = {
        //         method: method,
        //         url: url,
        //         data: body
        //     }

        //     this.$http(options)
        //     .then(response => {
        //         if(response.data){
        //             if(method == "post") this.UpdateCurrentCaseId(response.data.case_id);
        //             this.UpdateForm2Info(this.form2Info);
        //             if(!draft) this.navigateToPreviewPage(this.currentCaseId);                           
        //         }
        //     }, err => {
        //         const errMsg = err.response.data.error;
                
        //     })
        // }
    }

    public getForm7Info(){
        //TODO: gather info from user input
        return {"parties":[{"partyId":null,"ceisPartyId":9590,"isOrganization":false,"firstGivenName":"One","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":null,"aliases":[],"legalReps":[],"lowerCourtRole":"Plaintiff","appealRole":"Respondent"},{"partyId":null,"ceisPartyId":9591,"isOrganization":false,"firstGivenName":"Two","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":"Smith, J","aliases":[],"legalReps":[],"lowerCourtRole":"Defendant","appealRole":"Appellant"}],"readOnlyUsers":"[]","readWriteUsers":"[]","lowerCourtLevelCd":"S","lowerCourtLevelName":"Supreme Court of BC","ElectronicallyFiled":"N","id":"00000000-0000-0000-0000-000000000000","lowerCourtFileNo":"S20191119","lowerCourtRegistryId":8807.0007,"lowerCourtRegistryName":"Victoria Law Courts","ceisFileId":5187,"nameOfJudge":"M.L. Drake","honorificTitle":"The Honourable Justice","dateOfJudgement":"2021-11-06T00:00:00-07:00","trialDurationDays":1,"appealSubmissionDeadline":"2021-12-06T16:00:00-08:00","lowerCourtStyleOfCause":"TEST, One v TEST, Two","lowerCourtClassName":"Supreme civil (General)","lowerCourtClassCd":"S","protectionOrder":false,"handTypedNoSearch":false,"appealingFirm":"Han Solo","appealingFirmAddress":"4 - 5 st, BC","manualSop":[],"toRespondents":"One Test","respondentSolicitor":"jhgjg","appealFrom":"Trial Judgment","wasSupremeAppeal":false,"involves":"Civil Procedure","orderSought":"juyhgjgf","styleOfCause":[{"partyId":null,"ceisPartyId":9590,"isOrganization":false,"firstGivenName":"One","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":null,"aliases":[],"legalReps":[],"lowerCourtRole":"Plaintiff","appealRole":"Respondent"},{"partyId":null,"ceisPartyId":9591,"isOrganization":false,"firstGivenName":"Two","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":"Smith, J","aliases":[],"legalReps":[],"lowerCourtRole":"Defendant","appealRole":"Appellant"}],"savedFromPage":"form"}
    }

    public navigateToPreviewPage(caseId) {  
        
        if (this.checkStates()){
            this.$router.push({name: "preview-form7", params: {caseId: caseId}});
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
        font-size: 1rem; 
        font-weight:400;       
    }

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

    .moveButton {
        padding:0 1px 0 1px;
    }

    .closeButton {
        background-color: transparent !important;
        color: white;
        border: white;
        font-weight: 700;
        font-size: 2rem;
        padding-top: 0;
        margin-top: 0;
    }



</style>