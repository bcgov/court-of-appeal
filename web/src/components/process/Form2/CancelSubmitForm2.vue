<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light">            
            <form-2-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>

        <b-card no-body bg-variant="light" border-variant="light" class="my-2 text-dark">

            <b-row class="ml-5 mt-2 mb-4" style="font-size: 2rem;">
                E-Filing Cancelled
            </b-row>

            <b-card no-body class="border-white bg-white mx-4"> 
                <b-row class="ml-5 my-3" style="font-size: 14px;">
                    E-Filing has been cancelled.
                </b-row>

                <b-row class="mt-1 mb-3 mr-5">
                    <b-col cols="12">
                        <b-button 
                            style="float: right;" 
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

import Form2ProcessHeader from "@/components/process/Form2/components/Form2ProcessHeader.vue";
import { form2StatusInfoType } from '@/types/Information';

@Component({
    components:{
        Form2ProcessHeader
    }
})
export default class CancelSubmitForm2 extends Vue {

    stepsCompleted = {} as form2StatusInfoType;  
    mountedData = false;     

    mounted() {
        console.log('here')
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