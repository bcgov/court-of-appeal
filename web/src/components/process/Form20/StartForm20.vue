<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-20-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Objection to Withdrawal
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 20 - Rule 87 (2)
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-20-case-information/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form20ProcessHeader from "@/components/process/Form20/components/Form20ProcessHeader.vue";
import Form20CaseInformation from "@/components/process/Form20/components/Form20CaseInformation.vue";
import { form20StatusInfoType } from '@/types/Information/Form20';

@Component({
    components:{
        Form20ProcessHeader,
        Form20CaseInformation
    }
})
export default class StartForm20 extends Vue {

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