<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-4-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Application
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 4 (RULES 13(a), 20(3) and (4), 54(a), 58(1), 59(1), 60(2), 61(2), 63(2))
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do You Use the Notice of Application (Form 4)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                If you need to make certain applications to court 
                before your appeal comes up for hearing.
            </b-row>   
            <b-row class="ml-4 mt-3" style="font-size: 14px;">
                Please be advised that the materials required for 
                applications and timelines for filing and service may 
                vary depending on the type of application.    
            </b-row>        
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-4-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form4ProcessHeader from "@/components/process/Form4/components/Form4ProcessHeader.vue";
import Form4StyleOfProceeding from "@/components/process/Form4/components/Form4StyleOfProceeding.vue";
import { form4StatusInfoType } from '@/types/Information/Form4';

@Component({
    components:{
        Form4ProcessHeader,        
        Form4StyleOfProceeding
    }
})
export default class FillForm4 extends Vue {

    stepsCompleted = {} as form4StatusInfoType;   

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