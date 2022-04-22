<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-7-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Urgent Application
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 7 - Rule 57(2)
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-7-case-information/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form7ProcessHeader from "@/components/process/Form7/components/Form7ProcessHeader.vue";
import Form7CaseInformation from "@/components/process/Form7/components/Form7CaseInformation.vue";
import { form7StatusInfoType } from '@/types/Information/Form7';

@Component({
    components:{
        Form7ProcessHeader,
        Form7CaseInformation
    }
})
export default class StartForm7 extends Vue {

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