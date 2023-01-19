<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-17-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Certificate of Costs
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 17
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-17-case-information/>          
            
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form17ProcessHeader from "@/components/process/Form17/components/Form17ProcessHeader.vue";
import Form17CaseInformation from "@/components/process/Form17/components/Form17CaseInformation.vue";
import { form17StatusInfoType } from '@/types/Information/Form17';

@Component({
    components:{
        Form17ProcessHeader,
        Form17CaseInformation
    }
})
export default class StartForm17 extends Vue {

    stepsCompleted = {} as form17StatusInfoType;   

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