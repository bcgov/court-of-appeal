<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-22-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Application For Order that No Fees are Payable
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 22 - Rule 85
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-22-case-information/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form22ProcessHeader from "@/components/process/Form22/components/Form22ProcessHeader.vue";
import Form22CaseInformation from "@/components/process/Form22/components/Form22CaseInformation.vue";
import { form22StatusInfoType } from '@/types/Information/Form22';

@Component({
    components:{
        Form22ProcessHeader,
        Form22CaseInformation
    }
})
export default class StartForm22 extends Vue {

    stepsCompleted = {} as form22StatusInfoType;   

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