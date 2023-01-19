<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-9-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2">

            <b-row class="ml-5" style="font-size: 2rem;">
                Requisition
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 9 (RULE 65(2) and (5))
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="my-2 mx-4">

            <b-row class="ml-4" style="font-size: 1.25rem;">
                When Do You Use the Requisition (Form 9)?
            </b-row> 
            <b-row class="ml-4 mt-4" style="font-size: 14px;">
                If you want to adjourn an application with the 
                consent of the other party, you can file a Requisition.
            </b-row>   
            <b-row class="mx-4 mt-3" style="font-size: 14px;font-weight: 700; font-style: italic;">
                Please note that the Requisition must be filed before 2:00 p.m. of the 
                business day before the date set for the hearing of the application.      
            </b-row>
            <b-row class="mx-4 mt-3" style="font-size: 14px;">
                In addition, the Requisition can be used if an application was 
                adjourned under this rule without setting a new hearing date 
                for the application.  The party who filed the application may 
                set a new application date by filing a Requisition setting out 
                the date and time of the hearing and serving each party to the 
                application <b>at least 5 business days before the hearing date</b>.      
            </b-row>        
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 mx-4">
            <form-9-style-of-proceeding/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form9ProcessHeader from "@/components/process/Form9/components/Form9ProcessHeader.vue";
import Form9StyleOfProceeding from "@/components/process/Form9/components/Form9StyleOfProceeding.vue";
import { form9StatusInfoType } from '@/types/Information/Form9';

@Component({
    components:{
        Form9ProcessHeader,        
        Form9StyleOfProceeding
    }
})
export default class FillForm9 extends Vue {

    stepsCompleted = {} as form9StatusInfoType;   

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