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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/information";
const informationState = namespace("Information");

import { supremeCourtCaseJsonDataInfoType, supremeCourtOrdersJsonInfoType } from '@/types/Information/json';
import { form7DataInfoType, form7StatesInfoType } from '@/types/Information';

import FillForm7SummaryInfo from "@/components/process/Form7/components/fillForm7/FillForm7SummaryInfo.vue";
import FillForm7CommonInfo from "@/components/process/Form7/components/fillForm7/FillForm7CommonInfo.vue";
import FillForm7StyleOfProceedingsInfo from "@/components/process/Form7/components/fillForm7/FillForm7StyleOfProceedingsInfo.vue";


@Component({
    components:{        
        FillForm7SummaryInfo,
        FillForm7CommonInfo,
        FillForm7StyleOfProceedingsInfo
    }
})
export default class FillForm7 extends Vue {    

    @Prop({required: true})
    editMode!: boolean;

    @informationState.State
    public supremeCourtOrderJson: supremeCourtOrdersJsonInfoType;

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;

    @informationState.State
    public form7Info: form7DataInfoType;

    @informationState.State
    public form7InfoStates: form7StatesInfoType;

    @informationState.Action
    public UpdateForm7Info!: (newForm7Info: form7DataInfoType) => void

    @informationState.Action
    public UpdateForm7InfoStates!: (newForm7StatesInfo: form7StatesInfoType) => void

    referenceNumber = '';    
    updatedInfo = 0;
    dataReady = false;
    fieldStates = {} as form7StatesInfoType;

    mounted() { 
        this.dataReady = false;
        if (!this.editMode){
            const form7Data = {} as form7DataInfoType;
            form7Data.fileNumber = this.supremeCourtCaseJson.fileNumber;
            form7Data.fileId = this.supremeCourtCaseJson.fileId;
            form7Data.courtClass = this.supremeCourtCaseJson.courtClassCd;
            this.UpdateForm7Info(form7Data);
        }
            
        const form7States = {} as form7StatesInfoType;
        this.UpdateForm7InfoStates(form7States); 
        this.fieldStates = {} as form7StatesInfoType;
        this.dataReady = true;                
    }    

    public checkWithinAppealPeriod(){
        return !this.supremeCourtOrderJson.isPastDeadline;
    }     

    public checkStates(){

        let stateCheck = true;
        
        this.fieldStates = this.form7InfoStates;

        this.fieldStates.appearanceDays = !(this.form7Info.appearanceDays && this.form7Info.appearanceDays>0)? false : null;
        this.fieldStates.respondents = !(this.form7Info.respondents && this.form7Info.respondents.length > 0 )? false : null;
        this.fieldStates.appellants = !(this.form7Info.appellants && this.form7Info.appellants.length > 0 )? false : null;
        this.fieldStates.orderType = !this.form7Info.orderType? false : null;
        this.fieldStates.appealedInSupremeCourt = !this.form7Info.appealedInSupremeCourt? false : null;
        this.fieldStates.makerName = (this.form7Info.appealedInSupremeCourt == 'yes' && !this.form7Info.makerName)? false : null;        
        this.fieldStates.appealNature = !this.form7Info.appealNature? false : null;
        this.fieldStates.orderSought = !this.form7Info.orderSought? false : null;
        this.fieldStates.mainAppellant = !this.form7Info.mainAppellant? false : null;
        this.fieldStates.serviceAddress = !this.form7Info.serviceAddress? false : null;

        const requiredContent = ['BC', 'B.C.', 'BRITISH COLUMBIA']               
        if (this.form7Info.serviceAddress && requiredContent.some(v => this.form7Info.serviceAddress.toUpperCase().includes(v))) {
            this.fieldStates.validServiceAddress = null;            
        } else if (this.form7Info.serviceAddress && !requiredContent.some(v => this.form7Info.serviceAddress.toUpperCase().includes(v))) {
            this.fieldStates.validServiceAddress = false;            
        }


        this.UpdateForm7InfoStates(this.fieldStates)
        this.updatedInfo ++;

        for(const field of Object.keys(this.fieldStates)){
            if(this.fieldStates[field]==false)
                stateCheck = false;
        }
        console.log(stateCheck)

        return stateCheck;            
    }

    public saveForm(draft: boolean) {

        const form7 = this.form7Info;
        form7.referenceNumber = this.referenceNumber;
        this.UpdateForm7Info(form7)
        

        if (this.checkStates() && this.checkWithinAppealPeriod() ){
            const data = this.getForm7Info();
            console.log(data)
            


        }        
       
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
        // {"parties":[{"aliases":[],"legalReps":[],"partyId":1777,"ceisPartyId":9590,"isOrganization":false,"prefix":null,"firstGivenName":"One","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":null,"appealRole":"Respondent","lowerCourtRole":"Plaintiff"},{"aliases":[],"legalReps":[],"partyId":1778,"ceisPartyId":9591,"isOrganization":false,"prefix":null,"firstGivenName":"Two","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":"Smith, J","appealRole":"Appellant","lowerCourtRole":"Defendant"}],"readOnlyUsers":"[]","readWriteUsers":"[753]","lowerCourtLevelCd":"S","lowerCourtLevelName":"Supreme Court of BC","ElectronicallyFiled":"N","id":"c23725e0-fd25-42b7-9daa-54b1007580df","lowerCourtFileNo":"S20191119","lowerCourtRegistryId":8807.0007,"lowerCourtRegistryName":"Victoria Law Courts","ceisFileId":5187,"nameOfJudge":"M.L. Drake","honorificTitle":"The Honourable Justice","dateOfJudgment":"2021-12-06T00:00:00","trialDurationDays":"1","appealSubmissionDeadline":"2022-01-05T16:00:00","lowerCourtStyleOfCause":"TEST, One v TEST, Two","lowerCourtClassName":"Supreme civil (General)","lowerCourtClassCd":"S","protectionOrder":false,"handTypedNoSearch":false,"appealingFirm":"Han Solo","appealingFirmAddress":"\nBC","manualSop":[],"toRespondents":"One Test","respondentSolicitor":"","wasSupremeAppeal":false,"savedFromPage":"form","webCatsCaseNumber":null,"accountId":438,"appealFrom":"Trial Judgment","decisionMaker":null,"partOfJudgment":null,"refOptional":null,"orderSought":"hjgjnfghj","lowerCourtInitiatingDocument":"Notice of Civil Claim","involves":"Civil Procedure","dateCreated":"2021-12-07T15:35:08.767","createdByClientId":753,"dateModified":"2021-12-07T15:35:08.767","lastModifiedByClientId":753,"dateSubmitted":null,"submittedByClientId":null,"submittedByFullName":null,"electronicallyFiled":"N","dateProcessed":null,"webCatsResultCode":null,"selfRepresenting":null,"styleOfCause":[{"aliases":[],"legalReps":[],"partyId":1777,"ceisPartyId":9590,"isOrganization":false,"prefix":null,"firstGivenName":"One","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":null,"appealRole":"Respondent","lowerCourtRole":"Plaintiff"},{"aliases":[],"legalReps":[],"partyId":1778,"ceisPartyId":9591,"isOrganization":false,"prefix":null,"firstGivenName":"Two","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":"Smith, J","appealRole":"Appellant","lowerCourtRole":"Defendant"}]}

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
        
    }

    public getForm7Info(){
        //TODO: use form7Info and create payload body
        // const form7 = this.form7Info;
        // form7.referenceNumber = this.referenceNumber;
        // this.UpdateForm7Info(form7)
        return {"parties":[{"partyId":null,"ceisPartyId":9590,"isOrganization":false,"firstGivenName":"One","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":null,"aliases":[],"legalReps":[],"lowerCourtRole":"Plaintiff","appealRole":"Respondent"},{"partyId":null,"ceisPartyId":9591,"isOrganization":false,"firstGivenName":"Two","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":"Smith, J","aliases":[],"legalReps":[],"lowerCourtRole":"Defendant","appealRole":"Appellant"}],"readOnlyUsers":"[]","readWriteUsers":"[]","lowerCourtLevelCd":"S","lowerCourtLevelName":"Supreme Court of BC","ElectronicallyFiled":"N","id":"00000000-0000-0000-0000-000000000000","lowerCourtFileNo":"S20191119","lowerCourtRegistryId":8807.0007,"lowerCourtRegistryName":"Victoria Law Courts","ceisFileId":5187,"nameOfJudge":"M.L. Drake","honorificTitle":"The Honourable Justice","dateOfJudgment":"2021-11-06T00:00:00-07:00","trialDurationDays":1,"appealSubmissionDeadline":"2021-12-06T16:00:00-08:00","lowerCourtStyleOfCause":"TEST, One v TEST, Two","lowerCourtClassName":"Supreme civil (General)","lowerCourtClassCd":"S","protectionOrder":false,"handTypedNoSearch":false,"appealingFirm":"Han Solo","appealingFirmAddress":"4 - 5 st, BC","manualSop":[],"toRespondents":"One Test","respondentSolicitor":"jhgjg","appealFrom":"Trial Judgment","wasSupremeAppeal":false,"involves":"Civil Procedure","orderSought":"juyhgjgf","styleOfCause":[{"partyId":null,"ceisPartyId":9590,"isOrganization":false,"firstGivenName":"One","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":null,"aliases":[],"legalReps":[],"lowerCourtRole":"Plaintiff","appealRole":"Respondent"},{"partyId":null,"ceisPartyId":9591,"isOrganization":false,"firstGivenName":"Two","secondGivenName":null,"thirdGivenName":null,"surname":"Test","organizationName":null,"counselName":"Smith, J","aliases":[],"legalReps":[],"lowerCourtRole":"Defendant","appealRole":"Appellant"}],"savedFromPage":"form"}
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

    .labels {
        font-size: 1.15rem; font-weight:600;
    }

</style>