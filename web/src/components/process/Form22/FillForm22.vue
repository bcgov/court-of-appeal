<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-22-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Application For Order that No Fees are Payable
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 22 - Rule 85
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do You Use the Application For Order that No Fees are Payable (Form 22)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                This form is to be used if you want to obtain an order that no court fees are payable.<br>
                You must show that:
                <ol>
                    <li>
                        your appeal is not bound to fail, is not scandalous, frivolous 
                        or vexatious, or an abuse of court process.
                    </li>
                    <li>payment of court fees would cause you undue hardship</li>
                </ol>
            </b-row>   
            <b-row class="mx-4 mt-3" style="font-size: 14px; font-weight: 700;">
                If the registrar determines that a hearing is required, they will set the date and notify yourself.  
                The other parties will not need to receive notice of the application.    
            </b-row>        
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-22-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form22ProcessHeader from "@/components/process/Form22/components/Form22ProcessHeader.vue";
import Form22StyleOfProceeding from "@/components/process/Form22/components/Form22StyleOfProceeding.vue";
import { form22StatusInfoType } from '@/types/Information/Form22';

@Component({
    components:{
        Form22ProcessHeader,        
        Form22StyleOfProceeding
    }
})
export default class FillForm22 extends Vue {

    stepsCompleted = {} as form22StatusInfoType;   

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