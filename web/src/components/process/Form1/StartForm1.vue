<template>
    <b-card header-tag="header" style="width: 80rem;" class="mx-auto border-white bg-light">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-1-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card class="my-2 ml-4 bg-light border-light">

            <b-row style="font-size: 2rem;">
                Notice of Appeal
            </b-row> 
            <b-row style="font-size: 14px;">
                Form 1 - Rule 11 (A)
            </b-row>           
           
        </b-card>

        <b-card no-body class="mt-3 mx-2 border-light">
            <form-1-case-information/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form1ProcessHeader from "@/components/process/Form1/components/Form1ProcessHeader.vue";
import Form1CaseInformation from "@/components/process/Form1/components/Form1CaseInformation.vue";
import { form1StatusInfoType } from '@/types/Information/Form1';

@Component({
    components:{
        Form1ProcessHeader,
        Form1CaseInformation
    }
})
export default class StartForm1 extends Vue {

    stepsCompleted = {} as form1StatusInfoType;   

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