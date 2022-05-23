<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light">            
            <form-17-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card no-body bg-variant="light" border-variant="light" class="my-2 text-dark">

            <b-row class="ml-5 mt-2 mb-4" style="font-size: 2rem;">
                E-Filing Cancelled
            </b-row>

            <b-card no-body class="border-white bg-white mx-4"> 
                <b-row class="ml-5 my-3" style="font-size: 14px;">
                    <b-col cols="10">
                        <div class="h3 text-white bg-secondary p-3 text-center" style="margin: 0.5rem 0; width:22rem; border-radius:10px; "> E-Filing has been cancelled. </div>
                    </b-col>
                    <b-col cols="2">
                        <b-button                         
                            style="margin: 1rem 2rem; float: right;" 
                            variant="success"
                            @click="done()"
                            >
                            Done
                        </b-button> 
                    </b-col>                           
                </b-row>
            </b-card>

        </b-card>

        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form17ProcessHeader from "@/components/process/Form17/components/Form17ProcessHeader.vue";
import { form17StatusInfoType } from '@/types/Information/Form17';

@Component({
    components:{
        Form17ProcessHeader
    }
})
export default class CancelSubmitForm17 extends Vue {

    stepsCompleted = {} as form17StatusInfoType;  
    mountedData = false;     

    mounted() {

        this.mountedData = false;        

        this.stepsCompleted = {
            first: true,
            second: true,
            third: false
        }
        this.mountedData = true;                   
    }    

    public done() {
        this.$router.push({name: "dashboard" }) 
    }
}
</script>

<style scoped lang="scss">



</style>