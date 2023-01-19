<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-15-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Consent Order - General
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 15 (Rule 67(2)(c))
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do You Use the Consent Order - General (Form 15)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                This form of consent order may be used for any other consent 
                order except to remove an appeal from the inactive list or 
                to extend the time to file a document(s).
            </b-row>

            <b-row class="ml-4 mt-2" style="font-size: 14px;">
                The consent order would be signed by both parties and 
                then submitted to the registry for approval. 
            </b-row>
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-15-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form15ProcessHeader from "@/components/process/Form15/components/Form15ProcessHeader.vue";
import Form15StyleOfProceeding from "@/components/process/Form15/components/Form15StyleOfProceeding.vue";
import { form15StatusInfoType } from '@/types/Information/Form15';

@Component({
    components:{
        Form15ProcessHeader,        
        Form15StyleOfProceeding
    }
})
export default class FillForm15 extends Vue {

    stepsCompleted = {} as form15StatusInfoType;   

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