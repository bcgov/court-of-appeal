<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-3-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Cross Appeal
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 3 - Rule 9(a)
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-3-case-information/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form3ProcessHeader from "@/components/process/Form3/components/Form3ProcessHeader.vue";
import Form3CaseInformation from "@/components/process/Form3/components/Form3CaseInformation.vue";
import { form3StatusInfoType } from '@/types/Information/Form3';

@Component({
    components:{
        Form3ProcessHeader,
        Form3CaseInformation
    }
})
export default class StartForm3 extends Vue {

    stepsCompleted = {} as form3StatusInfoType;   

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