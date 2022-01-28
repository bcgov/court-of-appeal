<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-9-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Requisition
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 9 - Rule 65(2) and (5)
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-9-case-information/>
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form9ProcessHeader from "@/components/process/Form9/components/Form9ProcessHeader.vue";
import Form9CaseInformation from "@/components/process/Form9/components/Form9CaseInformation.vue";
import { form9StatusInfoType } from '@/types/Information/Form9';

@Component({
    components:{
        Form9ProcessHeader,
        Form9CaseInformation
    }
})
export default class StartForm9 extends Vue {

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