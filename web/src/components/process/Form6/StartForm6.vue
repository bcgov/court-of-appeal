<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-6-process-header v-bind:stepsCompleted="stepsCompleted"/>
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
            <form-6-case-information/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form6ProcessHeader from "@/components/process/Form6/components/Form6ProcessHeader.vue";
import Form6CaseInformation from "@/components/process/Form6/components/Form6CaseInformation.vue";
import { form6StatusInfoType } from '@/types/Information/Form6';

@Component({
    components:{
        Form6ProcessHeader,
        Form6CaseInformation
    }
})
export default class StartForm6 extends Vue {

    stepsCompleted = {} as form6StatusInfoType;   

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