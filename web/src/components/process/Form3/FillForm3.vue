<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-3-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Notice of Cross Appeal
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 3 (RULE 9(a))
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do You Use the Notice of Cross Appeal (Form 3)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                If you are seeking to vary the order being appealed and you are 
                seeking different relief sought by the appellant as described 
                in the notice of appeal.
            </b-row>   
            <b-row class="ml-4 mt-3" style="font-size: 14px; font-weight: 700;">
                You need to file and serve the notice of cross appeal 
                within 15 days of being served with the notice of appeal.    
            </b-row>        
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-3-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form3ProcessHeader from "@/components/process/Form3/components/Form3ProcessHeader.vue";
import Form3StyleOfProceeding from "@/components/process/Form3/components/Form3StyleOfProceeding.vue";
import { form3StatusInfoType } from '@/types/Information/Form3';

@Component({
    components:{
        Form3ProcessHeader,        
        Form3StyleOfProceeding
    }
})
export default class FillForm3 extends Vue {

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