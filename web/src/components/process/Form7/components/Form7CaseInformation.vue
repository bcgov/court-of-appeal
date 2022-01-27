<template>
    <b-card no-body bg-variant="light" border-variant="light">        

        <fill-form-7 v-if="orderSelected" @displayResults="orderSelected = false;"/>
        <form-7-case-information-search  v-else @fillForm="startFillingForm7"/>        
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

import { supremeCourtCaseJsonDataInfoType } from '@/types/Information/json';
import Form7CaseInformationSearch from './Form7CaseInformationSearch.vue';
import FillForm7 from './fillForm7/FillForm7.vue';
import { form7SubmissionDataInfoType } from '@/types/Information/Form7';

@Component({
    components: {           
        Form7CaseInformationSearch,
        FillForm7
    }        
}) 
export default class Form7CaseInformation extends Vue {

    @form7State.State
    public currentNoticeOfAppealId: string;
    
    @form7State.State
    public form7SubmissionInfo: form7SubmissionDataInfoType;

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;

    @informationState.Action
    public UpdateSupremeCourtCaseJson!: (newSupremeCourtCaseJson: supremeCourtCaseJsonDataInfoType) => void 
  
    @form7State.Action
    public UpdateForm7SubmissionInfo!: (newForm7SubmissionInfo: form7SubmissionDataInfoType) => void

    @form7State.Action
    public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void

    orderSelected = false;   

    mounted(){   
         
        if (this.currentNoticeOfAppealId) {
            this.orderSelected = true;
        } else {
            this.UpdateSupremeCourtCaseJson({} as supremeCourtCaseJsonDataInfoType);
            this.orderSelected = false;
        }        
    }

    public startFillingForm7(levelOfCourt, locationId, locationName){

        const form7Data = this.form7SubmissionInfo;
        form7Data.lowerCourtStyleOfCause = this.supremeCourtCaseJson.styleOfCause;
        form7Data.lowerCourtClassName = this.supremeCourtCaseJson.courtClass;
        form7Data.lowerCourtClassCd = this.supremeCourtCaseJson.courtClassCd;
        form7Data.ceisFileId = this.supremeCourtCaseJson.fileId;
        form7Data.lowerCourtFileNo = this.supremeCourtCaseJson.courtClassCd + this.supremeCourtCaseJson.fileNumber;
        form7Data.lowerCourtRegistryId = locationId;
        form7Data.lowerCourtRegistryName = locationName;
        form7Data.lowerCourtLevelCd = this.supremeCourtCaseJson.courtClassCd;
        form7Data.lowerCourtLevelName = levelOfCourt;
        form7Data.lowerCourtInitiatingDocument = 'Notice of Civil Claim';

        this.UpdateForm7SubmissionInfo(form7Data); 
        this.UpdateCurrentNoticeOfAppealId(null);
        this.orderSelected = true;
    }
}
</script>

<style scoped lang="scss">



</style>