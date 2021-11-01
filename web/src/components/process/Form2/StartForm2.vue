<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <!-- <b-card bg-variant="white" border-variant="white">            
            <form-2-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card> -->

        <template #header bg-variant="white" border-variant="white">            
            <form-2-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </template>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <div class="ml-5" style="font-size: 2rem;">
                Notice of Appearance
            </div> 
            <div class="ml-5" style="font-size: 14px;">
                Form 2
            </div>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white">

            <form-2-case-information/>
            
            
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import Form2ProcessHeader from "@/components/process/Form2/components/Form2ProcessHeader.vue";
import Form2CaseInformation from "@/components/process/Form2/components/Form2CaseInformation.vue";
import { form2StatusInfoType } from '@/types/Information';

@Component({
    components:{
        Form2ProcessHeader,
        Form2CaseInformation
    }
})
export default class StartForm2 extends Vue {

    stepsCompleted = {} as form2StatusInfoType;   

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