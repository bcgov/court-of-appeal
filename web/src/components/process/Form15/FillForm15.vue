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
                When Do You Use the Consent order to Remove an Appeal 
                from the Inactive List (Form 15)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                This form of order may be used only if there is no prior order 
                to remove the appeal from the inactive list and the other 
                party is consenting. If there is an any application for 
                leave to appeal that relates to the appeal, it is deemed 
                to be on the inactive appeal list during the same period.
            </b-row>

            <b-row class="ml-4 mt-4 text-secondary" style="font-size: 14px; font-style: italic;">
                Note: This form of order may not be used to reinstate appeals that 
                have been dismissed as abandoned under Rule 51. 
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