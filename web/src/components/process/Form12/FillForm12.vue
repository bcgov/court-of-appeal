<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-12-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Order from an application to vary the order of a justice
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 12 (Rule 66(3)(c))
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do You Use the Notice of Appearance (Form 2)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                If you have been served a Notice of Appeal (Form 1), and you want to respond, 
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
            <form-12-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form12ProcessHeader from "@/components/process/Form12/components/Form12ProcessHeader.vue";
import Form12StyleOfProceeding from "@/components/process/Form12/components/Form12StyleOfProceeding.vue";
import { form12StatusInfoType } from '@/types/Information/Form12';

@Component({
    components:{
        Form12ProcessHeader,        
        Form12StyleOfProceeding
    }
})
export default class FillForm12 extends Vue {

    stepsCompleted = {} as form12StatusInfoType;   

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