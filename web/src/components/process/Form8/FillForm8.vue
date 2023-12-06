<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-8-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Application To Vary or Cancel an Order of a Justice
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 8 - Rule 62(2)
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do you Use the Notice of Application To Vary or Cancel an Order of a Justice (Form 8)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                If you wish to apply to have the court vary or cancel an order of a justice.
            </b-row>   
            <b-row class="ml-4 mt-3" style="font-size: 14px;">
                You must immediately file and serve a Notice of Application To 
                Vary or Cancel an Order of a Justice, any supporting documents, and any 
                written argument within 7 days after the order was made by a justice.    
            </b-row>        
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-8-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form8ProcessHeader from "@/components/process/Form8/components/Form8ProcessHeader.vue";
import Form8StyleOfProceeding from "@/components/process/Form8/components/Form8StyleOfProceeding.vue";
import { form8StatusInfoType } from '@/types/Information/Form8';

@Component({
    components:{
        Form8ProcessHeader,        
        Form8StyleOfProceeding
    }
})
export default class FillForm8 extends Vue {

    stepsCompleted = {} as form8StatusInfoType;   

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