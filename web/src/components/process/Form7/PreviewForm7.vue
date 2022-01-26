<template>
    <b-card v-if="dataReady" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-7-process-header v-bind:stepsCompleted="stepsCompleted"/>
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
            <form-7/>            
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

import Form7ProcessHeader from "@/components/process/Form7/components/Form7ProcessHeader.vue";
import Form7 from "@/components/process/Form7/components/pdf/Form7.vue"

import { form7StatusInfoType } from '@/types/Information/Form7';

@Component({
    components:{
        Form7ProcessHeader,
        Form7
    }
})
export default class PreviewForm7 extends Vue {

    stepsCompleted = {} as form7StatusInfoType; 
    
    dataReady = false;

    mounted() {
        this.dataReady = false;
        this.stepsCompleted = {
            first: true,
            second: true,
            third: false,
            fourth: false
        }
        this.dataReady = true;       
    }

    public navigateToSubmitPage() {
        this.$router.push({name: "proceed-form7"}); 
    }
}
</script>