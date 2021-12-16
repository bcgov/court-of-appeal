<template>
    <b-card no-body bg-variant="light" border-variant="light">        

        <fill-form-7 v-if="orderSelected" v-bind:editMode="editMode" @displayResults="orderSelected = false;"/>
        <form-7-case-information-search  v-else @fillForm="orderSelected = true;"/>        
        
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
    editMode = false;

    mounted(){   
         
        if (this.$route.params.orderSelected == 'no') {
            this.UpdateSupremeCourtCaseJson({} as supremeCourtCaseJsonDataInfoType);
            this.orderSelected = false;
            this.editMode = false;
        } else {
            this.orderSelected = true;
            this.editMode = true;
        }  
        
        
    }
}
</script>

<style scoped lang="scss">



</style>