<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light">            
            <form-2-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>        

        <b-card text-variant="dark" class="my-2 mx-5 bg-light border-light">

            <b-row class="ml-2" style="font-size: 2rem;">
                Submit through E-Filing
            </b-row> 
            <b-row class="ml-2 mb-5" style="font-size: 14px;">
                By submitting, you will be redirected to the E-Filing Hub.
            </b-row>

            <b-row class="ml-5">
                <b-col cols="10">
                    <b-button 
                        style="float: right;" 
                        variant="danger"
                        @click="cancel()"
                        >
                        Cancel
                    </b-button>
                </b-col>
                <b-col cols="2">
                    <b-button
                        style="float: left;" 
                        variant="success"
                        @click="submit()"
                        >Submit
                        <span class="fa fa-paper-plane btn-icon-left"/>
                    </b-button>
                </b-col>
            </b-row>

        </b-card>

        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Form2ProcessHeader from "@/components/process/Form2/components/Form2ProcessHeader.vue";
import { form2StatusInfoType, packageInfoType } from '@/types/Information';

@Component({
    components:{
        Form2ProcessHeader
    }
})
export default class SubmitForm2 extends Vue {

    stepsCompleted = {} as form2StatusInfoType;  
    mountedData = false; 
    packageInfo = {} as packageInfoType;

    mounted() {
        this.mountedData = false;        

        this.stepsCompleted = {
            first: true,
            second: true,
            third: false
        }
        this.mountedData = true;         
    }  

    public submit() {
        console.log('submit-efiling');
    }

    public cancel() {
        this.$router.push({name: "dashboard" }) 
    }
}
</script>

<style scoped lang="scss">



</style>