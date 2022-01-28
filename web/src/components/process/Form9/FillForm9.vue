<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-9-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Requisition
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 9 (RULE 65(2) and (5))
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
            <form-9-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form9ProcessHeader from "@/components/process/Form9/components/Form9ProcessHeader.vue";
import Form9StyleOfProceeding from "@/components/process/Form9/components/Form9StyleOfProceeding.vue";
import { form9StatusInfoType } from '@/types/Information/Form9';

@Component({
    components:{
        Form9ProcessHeader,        
        Form9StyleOfProceeding
    }
})
export default class FillForm9 extends Vue {

    stepsCompleted = {} as form9StatusInfoType;   

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