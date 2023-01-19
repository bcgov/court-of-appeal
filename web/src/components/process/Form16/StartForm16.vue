<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-16-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Offer To Settle Costs
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 16 - Rule 76 (1)
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-16-case-information/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form16ProcessHeader from "@/components/process/Form16/components/Form16ProcessHeader.vue";
import Form16CaseInformation from "@/components/process/Form16/components/Form16CaseInformation.vue";
import { form16StatusInfoType } from '@/types/Information/Form16';

@Component({
    components:{
        Form16ProcessHeader,
        Form16CaseInformation
    }
})
export default class StartForm16 extends Vue {

    stepsCompleted = {} as form16StatusInfoType;   

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