<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-19-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Withdrawal of Lawyer
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 19 - Rule 87 (1)
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-19-case-information/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form19ProcessHeader from "@/components/process/Form19/components/Form19ProcessHeader.vue";
import Form19CaseInformation from "@/components/process/Form19/components/Form19CaseInformation.vue";
import { form19StatusInfoType } from '@/types/Information/Form19';

@Component({
    components:{
        Form19ProcessHeader,
        Form19CaseInformation
    }
})
export default class StartForm19 extends Vue {

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