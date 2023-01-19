<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-20-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Objection to Withdrawal
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 20 (RULE 87 (2))
            </b-row>           
           
        </b-card>

        <b-card class="my-2 mx-4 px-4 bg-white border-white">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do You Use the Notice of Objection to Withdrawal (Form 20)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px; display: inline-block;">
                If you are served with a notice of intention to withdraw by 
                your lawyer, you may object to the withdrawal by filing an 
                objection form and serving it on the lawyer who filed the 
                notice of withdrawal <b style="font-size: 14px;">within 7 days of being served</b> with the 
                Notice of Withdrawal.
            </b-row>
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-20-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form20ProcessHeader from "@/components/process/Form20/components/Form20ProcessHeader.vue";
import Form20StyleOfProceeding from "@/components/process/Form20/components/Form20StyleOfProceeding.vue";
import { form20StatusInfoType } from '@/types/Information/Form20';

@Component({
    components:{
        Form20ProcessHeader,        
        Form20StyleOfProceeding
    }
})
export default class FillForm20 extends Vue {

    stepsCompleted = {} as form20StatusInfoType;   

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