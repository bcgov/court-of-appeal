<template>
    <b-card v-if="dataReady" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <template #header bg-variant="white" border-variant="white">            
            <form-2-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </template>

        <b-card text-variant="dark" border-variant="light" bg-variant="light" class="my-2">

            <div class="ml-5" style="font-size: 2rem;">
                Preview Your Form
            </div> 
            <div class="ml-5" style="font-size: 14px;">
                Your can review your form here to ensure everything to correct before submitting. 
                If edits are required, you may still go back and make the necessary changes.
            </div>           
           
        </b-card>

        <b-card border-variant="light" bg-variant="light" class="mt-3">
            <form-2 v-bind:caseId="caseId"/>            
        </b-card> 

        <b-card border-variant="light" bg-variant="light" class="mt-3">                
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

import Form2ProcessHeader from "@/components/process/Form2/components/Form2ProcessHeader.vue";
import Form2 from "@/components/process/Form2/components/pdf/Form2.vue"

import { form2StatusInfoType } from '@/types/Information';

@Component({
    components:{
        Form2ProcessHeader,
        Form2
    }
})
export default class PreviewForm2 extends Vue {

    stepsCompleted = {} as form2StatusInfoType; 
    caseId = '';  
    dataReady = false;

    mounted() {
        this.dataReady = false;  
        this.caseId = this.$route.params.caseId;
        this.stepsCompleted = {
            first: true,
            second: false,
            third: false
        }
        this.dataReady = true;       
    }

    public navigateToSubmitPage() {
        this.$router.push({name: "proceed", params: {applicationId: this.caseId} }); 
    }
}
</script>

<style scoped lang="scss">



</style>