<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-8-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Application To Vary an Order of a Justice
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 8 - Rule 62(2)
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-8-case-information/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form8ProcessHeader from "@/components/process/Form8/components/Form8ProcessHeader.vue";
import Form8CaseInformation from "@/components/process/Form8/components/Form8CaseInformation.vue";
import { form8StatusInfoType } from '@/types/Information/Form8';

@Component({
    components:{
        Form8ProcessHeader,
        Form8CaseInformation
    }
})
export default class StartForm8 extends Vue {

    stepsCompleted = {} as form8StatusInfoType;   

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