<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-13-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Consent order to extend time to file a document
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 13 (Rule 67(2)(a))
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do You Use the Consent Order to Extend the 
                Time to File a Document (Form 13)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                If you need to extend the time to file a document 
                and the other party is consenting to extend the time, 
                you complete the consent order.
            </b-row>

            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                The consent order would be signed by both parties 
                and submitted with the document. 
            </b-row>
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-13-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form13ProcessHeader from "@/components/process/Form13/components/Form13ProcessHeader.vue";
import Form13StyleOfProceeding from "@/components/process/Form13/components/Form13StyleOfProceeding.vue";
import { form13StatusInfoType } from '@/types/Information/Form13';

@Component({
    components:{
        Form13ProcessHeader,        
        Form13StyleOfProceeding
    }
})
export default class FillForm13 extends Vue {

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