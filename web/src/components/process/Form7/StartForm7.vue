<template>
    <b-card header-tag="header" style="width: 80rem;" class="mx-auto border-white bg-light">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-7-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card class="my-2 ml-4 bg-light border-light">

            <b-row style="font-size: 2rem;">
                Notice of Appeal
            </b-row> 
            <b-row style="font-size: 14px;">
                Form 7 - Rule 11 (A)
            </b-row>           
           
        </b-card>

        <b-card no-body class="mt-3 mx-2 border-light">
            <form-7-case-information/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form7ProcessHeader from "@/components/process/Form7/components/Form7ProcessHeader.vue";
import Form7CaseInformation from "@/components/process/Form7/components/Form7CaseInformation.vue";
import { form7StatusInfoType } from '@/types/Information';

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
            first: true,
            second: false,
            third: false,
            fourth: false
        }       
    }  


}
</script>

<style scoped lang="scss">



</style>