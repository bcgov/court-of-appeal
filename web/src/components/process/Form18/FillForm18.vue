<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-18-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Change of Representation/Change of Address for Service
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 18 (RULE 86)
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do You Use the Notice of Change of Representation/Change 
                of Address for Service (Form 18)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                If you want to change to a different lawyer or now want to represent 
                yourself.  This also can be used if your address for service has changed.
            </b-row>   
            <b-row class="ml-4 mt-3" style="font-size: 14px;">
                <i>You will need to file and serve a copy of the document on each party.</i>   
            </b-row>        
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-18-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form18ProcessHeader from "@/components/process/Form18/components/Form18ProcessHeader.vue";
import Form18StyleOfProceeding from "@/components/process/Form18/components/Form18StyleOfProceeding.vue";
import { form18StatusInfoType } from '@/types/Information/Form18';

@Component({
    components:{
        Form18ProcessHeader,        
        Form18StyleOfProceeding
    }
})
export default class FillForm18 extends Vue {

    stepsCompleted = {} as form18StatusInfoType;   

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