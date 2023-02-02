<template>
    <b-card v-if="dataReady" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-15-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card text-variant="dark" border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Preview Your Form
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                You can review your form here to ensure everything is correct before submitting. 
                If edits are required, you may still go back and make the necessary changes.
            </b-row>           
           
        </b-card>

        <b-card border-variant="light" bg-variant="light" class="mt-3 mx-4">
            <form-15 v-bind:caseId="currentConsentOrderId" @navigateToSubmitPage="navigateToSubmitPage()" @pdfReady="pdfReady=true" />            
        </b-card> 

        <b-card v-if="!pdfReady" no-body class="border-0">  
            <loading-spinner color="#000" waitingText="Loading ..." /> 
        </b-card> 

        <b-card border-variant="light" bg-variant="light" class="mt-3 mx-4">                
            <b-button
                :disabled="!pdfReady"
                style="float: right;" 
                variant="success"
                @click="navigateToSubmitPage()"
                >Proceed
                <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
            </b-button>
        </b-card>   
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import "@/store/modules/forms/form15";
const form15State = namespace("Form15");

import Form15ProcessHeader from "@/components/process/Form15/components/Form15ProcessHeader.vue";
import Form15 from "@/components/process/Form15/components/pdf/Form15.vue"

import { form15StatusInfoType } from '@/types/Information/Form15';

@Component({
    components:{
        Form15ProcessHeader,
        Form15
    }
})
export default class PreviewForm15 extends Vue {

    @form15State.State
    public currentConsentOrderId: string;

    stepsCompleted = {} as form15StatusInfoType;
    
    dataReady = false;
    pdfReady = false;

    mounted() {
        this.dataReady = false;
        this.stepsCompleted = {
            first: true,
            second: false,
            third: false
        }
        this.dataReady = true;       
    }

    public navigateToSubmitPage() {
        this.$router.push({name: "proceed-form15" }); 
    }
}
</script>

<style scoped lang="scss">



</style>