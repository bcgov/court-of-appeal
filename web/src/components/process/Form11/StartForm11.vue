<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light" header-border-variant="white">            
            <form-11-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card border-variant="light" bg-variant="light" class="my-2 mx-4">

            <b-row class="ml-5" style="font-size: 2rem;">
                Order of three or more justices
            </b-row> 
            <b-row class="ml-5" style="font-size: 14px;">
                Form 11
            </b-row>           
           
        </b-card>

        <b-card border-variant="white" bg-variant="white" class="mt-3 bg-white mx-4">
            <form-11-case-information/>         
            
        </b-card>       
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form11ProcessHeader from "@/components/process/Form11/components/Form11ProcessHeader.vue";
import Form11CaseInformation from "@/components/process/Form11/components/Form11CaseInformation.vue";
import { form11StatusInfoType } from '@/types/Information/Form11';

@Component({
    components:{
        Form11ProcessHeader,
        Form11CaseInformation
    }
})
export default class StartForm11 extends Vue {

    stepsCompleted = {} as form11StatusInfoType;   

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