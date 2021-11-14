<template>
    <b-card class="ml-4 border-white">
        <p style="font-size: 1.25rem; ">Lower Court Case Information</p>

        <form-7-case-information-search
            style="width: 100%; float: left;" 
            v-if="!orderSelected"
            @fillForm="orderSelected = true;"/>

        

        
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import { form7SearchInfoType } from '@/types/Information';
import { partiesDataJsonDataType, supremeCourtCaseJsonDataInfoType } from '@/types/Information/json';
import Spinner from "@/components/utils/Spinner.vue";
import Form7CaseInformationSearch from './Form7CaseInformationSearch.vue'
import { supremeCourtLocationsInfoType } from '@/types/Common';

@Component({
    components: {           
        Form7CaseInformationSearch,
        Spinner
    }        
}) 
export default class Form7CaseInformation extends Vue {

    @informationState.Action
    public UpdateSupremeCourtCaseJson!: (newSupremeCourtCaseJson: supremeCourtCaseJsonDataInfoType) => void

    @informationState.Action
    public UpdateFileNumber!: (newFileNumber: string) => void
    
    @informationState.Action
    public UpdateCurrentCaseId!: (newCurrentCaseId: string) => void
    
    levelOfCourt = "Supreme Court of BC";

    //dataReady = false;
    searching = false;
    orderSelected = false;
    locations: supremeCourtLocationsInfoType[] = [];

    searchParams = {} as form7SearchInfoType;
    notFound = false;    
    supremeCourtCase = {} as supremeCourtCaseJsonDataInfoType;

    mounted(){
        //this.dataReady = false;
        this.UpdateSupremeCourtCaseJson({} as supremeCourtCaseJsonDataInfoType)
        this.orderSelected = false;

        //this.loadLocations();
        // this.searching = false;
        // this.dataReady = true; 
    }






}
</script>

<style scoped lang="scss">



</style>