<template>
    <b-card class="ml-4 border-white">
        <p style="font-size: 1.25rem; ">Lower Court Case Information</p>

        <fill-form-7 v-if="orderSelected" @displayResults="orderSelected = false;"/>
        <form-7-case-information-search
            style="width: 100%; float: left;" 
            v-else
            @fillForm="orderSelected = true;"/>

        

        
        
    </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import { supremeCourtCaseJsonDataInfoType } from '@/types/Information/json';
import Form7CaseInformationSearch from './Form7CaseInformationSearch.vue';
import FillForm7 from './fillForm7/FillForm7.vue';

@Component({
    components: {           
        Form7CaseInformationSearch,
        FillForm7
    }        
}) 
export default class Form7CaseInformation extends Vue {

    @informationState.Action
    public UpdateSupremeCourtCaseJson!: (newSupremeCourtCaseJson: supremeCourtCaseJsonDataInfoType) => void 
  
    orderSelected = false;

    mounted(){        
        this.UpdateSupremeCourtCaseJson({} as supremeCourtCaseJsonDataInfoType)
        this.orderSelected = false;
    }
}
</script>

<style scoped lang="scss">



</style>