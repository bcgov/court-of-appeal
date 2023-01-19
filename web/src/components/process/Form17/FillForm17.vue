<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-17-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Certificate of Costs
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 17 (Rule 77)
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When do I use a Certificate of Costs?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                This form is used when costs have been awarded and there has been an 
                assessment of costs before the registrar or the party liable to pay 
                costs has consented to the assessed amount.
            </b-row>
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-17-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form17ProcessHeader from "@/components/process/Form17/components/Form17ProcessHeader.vue";
import Form17StyleOfProceeding from "@/components/process/Form17/components/Form17StyleOfProceeding.vue";
import { form17StatusInfoType } from '@/types/Information/Form17';

@Component({
    components:{
        Form17ProcessHeader,        
        Form17StyleOfProceeding
    }
})
export default class FillForm17 extends Vue {

    stepsCompleted = {} as form17StatusInfoType;   

    mounted() {  
        this.stepsCompleted = {
            first: false,
            second: false,
            third: false
        }       
    }
}
</script>

<style scoped lang="scss">



</style>