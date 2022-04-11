<template>
    <b-card v-if="dataReady" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-8-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card text-variant="dark" border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Preview Your Form
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Your can review your form here to ensure everything to correct before submitting. 
                If edits are required, you may still go back and make the necessary changes.
            </b-row>           
           
        </b-card>

        <b-card border-variant="light" bg-variant="light" class="mt-3 mx-4">
            <form-8 @navigateToSubmitPage="navigateToSubmitPage()" />            
        </b-card> 

        <b-card border-variant="light" bg-variant="light" class="mt-3 mx-4">                
            <b-button
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
import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

import Form8ProcessHeader from "@/components/process/Form8/components/Form8ProcessHeader.vue";
import Form8 from "@/components/process/Form8/components/pdf/Form8.vue"

import { form8StatusInfoType } from '@/types/Information/Form8';

@Component({
    components:{
        Form8ProcessHeader,
        Form8
    }
})
export default class PreviewForm8 extends Vue {

    @form8State.State
    public currentNoticeOfSettlementOrAbandonmentId: string;

    stepsCompleted = {} as form8StatusInfoType; 
    
    dataReady = false;

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
        this.$router.push({name: "proceed-form8"}); 
    }
}
</script>

<style scoped lang="scss">



</style>