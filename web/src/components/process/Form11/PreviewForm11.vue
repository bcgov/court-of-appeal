<template>
    <b-card v-if="dataReady" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-11-process-header v-bind:stepsCompleted="stepsCompleted"/>
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
            <form-11 v-bind:caseId="currentOrderMultipleJusticesId" @navigateToSubmitPage="navigateToSubmitPage()" />            
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
import "@/store/modules/forms/form11";
const form11State = namespace("Form11");

import Form11ProcessHeader from "@/components/process/Form11/components/Form11ProcessHeader.vue";
import Form11 from "@/components/process/Form11/components/pdf/Form11.vue"

import { form11StatusInfoType } from '@/types/Information/Form11';

@Component({
    components:{
        Form11ProcessHeader,
        Form11
    }
})
export default class PreviewForm11 extends Vue {

    @form11State.State
    public currentOrderMultipleJusticesId: string;

    stepsCompleted = {} as form11StatusInfoType;
    
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
        this.$router.push({name: "proceed-form11" }); 
    }
}
</script>

<style scoped lang="scss">



</style>