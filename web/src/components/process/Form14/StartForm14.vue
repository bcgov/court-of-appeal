<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-14-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Consent order to remove an appeal from the inactive list
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 14
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-14-case-information/>          
            
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form14ProcessHeader from "@/components/process/Form14/components/Form14ProcessHeader.vue";
import Form14CaseInformation from "@/components/process/Form14/components/Form14CaseInformation.vue";
import { form14StatusInfoType } from '@/types/Information/Form14';

@Component({
    components:{
        Form14ProcessHeader,
        Form14CaseInformation
    }
})
export default class StartForm14 extends Vue {

    stepsCompleted = {} as form14StatusInfoType;   

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