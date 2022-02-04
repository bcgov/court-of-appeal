<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-18-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Change of Representation/Change of Address for Service
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 18 - Rule 86
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-18-case-information/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form18ProcessHeader from "@/components/process/Form18/components/Form18ProcessHeader.vue";
import Form18CaseInformation from "@/components/process/Form18/components/Form18CaseInformation.vue";
import { form18StatusInfoType } from '@/types/Information/Form18';

@Component({
    components:{
        Form18ProcessHeader,
        Form18CaseInformation
    }
})
export default class StartForm18 extends Vue {

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