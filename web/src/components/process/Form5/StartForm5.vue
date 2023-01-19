<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-5-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Hearing of Appeal
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 5 - Rule 33(2), 34(2)
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-5-case-information/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import Form5ProcessHeader from "@/components/process/Form5/components/Form5ProcessHeader.vue";
import Form5CaseInformation from "@/components/process/Form5/components/Form5CaseInformation.vue";
import { form5StatusInfoType } from '@/types/Information/Form5';

@Component({
    components:{
        Form5ProcessHeader,
        Form5CaseInformation
    }
})
export default class StartForm5 extends Vue {

    stepsCompleted = {} as form5StatusInfoType;   

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