<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-13-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Consent order to extend time to file a document
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 13
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-13-case-information/>          
            
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form13ProcessHeader from "@/components/process/Form13/components/Form13ProcessHeader.vue";
import Form13CaseInformation from "@/components/process/Form13/components/Form13CaseInformation.vue";
import { form13StatusInfoType } from '@/types/Information/Form13';

@Component({
    components:{
        Form13ProcessHeader,
        Form13CaseInformation
    }
})
export default class StartForm13 extends Vue {

    stepsCompleted = {} as form13StatusInfoType;   

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