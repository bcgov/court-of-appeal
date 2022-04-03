<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-5-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Hearing of Appeal
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 5 (RULE 33(2), 34(2))
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do You Use the Notice of Hearing (Form 5)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                If you appeal is ready for hearing, and you have booked a 
                hearing date for the appeal with the registrar, you will 
                need to fill out the Notice of Hearing form. 
            </b-row>   
            <b-row class="ml-4 mt-3" style="font-size: 14px;">
                You have 5 days after obtaining a date for the hearing of 
                the appeal from the registrar to file and serve on each party 
                the Notice of Hearing of Appeal and each attached order.    
            </b-row>        
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-5-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form5ProcessHeader from "@/components/process/Form5/components/Form5ProcessHeader.vue";
import Form5StyleOfProceeding from "@/components/process/Form5/components/Form5StyleOfProceeding.vue";
import { form5StatusInfoType } from '@/types/Information/Form5';

@Component({
    components:{
        Form5ProcessHeader,        
        Form5StyleOfProceeding
    }
})
export default class FillForm5 extends Vue {

    stepsCompleted = {} as form5StatusInfoType;   

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