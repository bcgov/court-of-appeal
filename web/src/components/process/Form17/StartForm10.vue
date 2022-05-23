<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-10-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Order of a Single Justice
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 10
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-10-case-information/>          
            
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form10ProcessHeader from "@/components/process/Form10/components/Form10ProcessHeader.vue";
import Form10CaseInformation from "@/components/process/Form10/components/Form10CaseInformation.vue";
import { form10StatusInfoType } from '@/types/Information/Form10';

@Component({
    components:{
        Form10ProcessHeader,
        Form10CaseInformation
    }
})
export default class StartForm10 extends Vue {

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