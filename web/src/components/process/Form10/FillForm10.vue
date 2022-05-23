<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-10-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Order of a Single Justice
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 10 (Rule 66(3)(a))
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do You Use the Order of a Single Justice?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                If you have made an application in chambers before a single 
                justice, you would need to draft the order.
            </b-row>   
            <b-row class="ml-4 mt-3" style="font-size: 14px;">
                Before you can submit the order to the registry for entry, 
                you will need to have the order you prepared signed by all parties.    
            </b-row>        
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-10-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form10ProcessHeader from "@/components/process/Form10/components/Form10ProcessHeader.vue";
import Form10StyleOfProceeding from "@/components/process/Form10/components/Form10StyleOfProceeding.vue";
import { form10StatusInfoType } from '@/types/Information/Form10';

@Component({
    components:{
        Form10ProcessHeader,        
        Form10StyleOfProceeding
    }
})
export default class FillForm10 extends Vue {

    stepsCompleted = {} as form10StatusInfoType;   

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