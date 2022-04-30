<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-7-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Urgent Application
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 7 (RULE 57(2))
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do you Use the Notice of Urgent Application (Form 7)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                If you need to make an urgent application, you may apply to bring an 
                application on shorter notice than is otherwise required under the 
                Court of Appeal Rules.
            </b-row>   
            <b-row class="ml-4 mt-3" style="font-size: 14px;">
                You must obtain an urgent application hearing date from the Registrar.    
            </b-row>        
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-7-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form7ProcessHeader from "@/components/process/Form7/components/Form7ProcessHeader.vue";
import Form7StyleOfProceeding from "@/components/process/Form7/components/Form7StyleOfProceeding.vue";
import { form7StatusInfoType } from '@/types/Information/Form7';

@Component({
    components:{
        Form7ProcessHeader,        
        Form7StyleOfProceeding
    }
})
export default class FillForm7 extends Vue {

    stepsCompleted = {} as form7StatusInfoType;   

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