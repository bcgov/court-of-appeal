<template>
    <b-card no-body bg-variant="light" border-variant="light">        

        <fill-form-1 v-if="orderSelected" @displayResults="orderSelected = false;"/>
        <form-1-case-information-search  v-else @fillForm="startFillingForm1"/>        
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import { supremeCourtCaseJsonDataInfoType } from '@/types/Information/json';
import Form1CaseInformationSearch from './Form1CaseInformationSearch.vue';
import FillForm1 from './fillForm1/FillForm1.vue';
import { form1DataInfoType } from '@/types/Information/Form1';

@Component({
    components: {           
        Form1CaseInformationSearch,
        FillForm1
    }        
}) 
export default class Form1CaseInformation extends Vue {

    @form1State.State
    public currentNoticeOfAppealId: string;
    
    @form1State.State
    public form1Info: form1DataInfoType;

    @informationState.State
    public supremeCourtCaseJson: supremeCourtCaseJsonDataInfoType;

    @informationState.Action
    public UpdateSupremeCourtCaseJson!: (newSupremeCourtCaseJson: supremeCourtCaseJsonDataInfoType) => void 
  
    @form1State.Action
    public UpdateForm1Info!: (newForm1Info: form1DataInfoType) => void

    @form1State.Action
    public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void

    orderSelected = false;  
    
    manualNTrib = false
    manualTrib = false
    manualNorm = false

    mounted(){   
        this.determineFormType(this.form1Info)
        if (this.manualTrib || this.manualNTrib || this.currentNoticeOfAppealId) {
            this.orderSelected = true;
        } else {
            this.UpdateSupremeCourtCaseJson({} as supremeCourtCaseJsonDataInfoType);
            this.orderSelected = false;
        }        
    }

    public determineFormType(form1Info: form1DataInfoType){          
        this.manualNTrib = form1Info.appealingScFlaDivorce || form1Info.insideTimeLimit         
        this.manualTrib = form1Info.appealTribunal
        this.manualNorm = form1Info.requiresManualEntry
    }

    public startFillingForm1(levelOfCourt, locationId, fileNumber, locationName){
        
        this.determineFormType(this.form1Info)
        const form1Data = this.form1Info;
        if (this.manualNorm){
            
            form1Data.lowerCourtRegistryId = locationId;
            form1Data.lowerCourtRegistryName = locationName;            
            form1Data.lowerCourtLevelName = levelOfCourt;
            form1Data.lowerCourtInitiatingDocument = 'Notice of Civil Claim';
            form1Data.lowerCourtFileNo = fileNumber;

        } else {
            form1Data.lowerCourtStyleOfCause = this.supremeCourtCaseJson.styleOfCause;
            form1Data.lowerCourtClassName = this.supremeCourtCaseJson.courtClass;
            form1Data.lowerCourtClassCd = this.supremeCourtCaseJson.courtClassCd;
            form1Data.ceisFileId = this.supremeCourtCaseJson.fileId;
            form1Data.lowerCourtFileNo = this.supremeCourtCaseJson.courtClassCd + this.supremeCourtCaseJson.fileNumber;
            form1Data.lowerCourtRegistryId = locationId;
            form1Data.lowerCourtRegistryName = locationName;
            form1Data.lowerCourtLevelCd = this.supremeCourtCaseJson.courtClassCd;
            form1Data.lowerCourtLevelName = levelOfCourt;
            form1Data.lowerCourtInitiatingDocument = 'Notice of Civil Claim';

        }        

        this.UpdateForm1Info(form1Data); 
        this.UpdateCurrentNoticeOfAppealId(null);
        this.orderSelected = true;
    }
}
</script>

<style scoped lang="scss">



</style>