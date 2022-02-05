<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-19-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Change of Representation/Change of Address for Service
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 19 (RULE 86)
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do You Use the Notice of Appearance (Form 2)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                If you have been served a Notice of Appeal (Form 7), and you want to respond, 
                fill out the Notice of Appearance (Form 2). If you do not respond, you will 
                not be included in future court proceedings related to this case, and will 
                not have access to the case documents filed.
            </b-row>   
            <b-row class="ml-4 mt-3" style="font-size: 14px;">
                You have 10 days to serve a filed copy of the Notice of Appearance to the 
                appellant, after receiving a Notice of Appeal.    
            </b-row>        
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-19-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form19ProcessHeader from "@/components/process/Form19/components/Form19ProcessHeader.vue";
import Form19StyleOfProceeding from "@/components/process/Form19/components/Form19StyleOfProceeding.vue";
import { form19StatusInfoType } from '@/types/Information/Form19';

@Component({
    components:{
        Form19ProcessHeader,        
        Form19StyleOfProceeding
    }
})
export default class FillForm19 extends Vue {

    stepsCompleted = {} as form19StatusInfoType;   

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