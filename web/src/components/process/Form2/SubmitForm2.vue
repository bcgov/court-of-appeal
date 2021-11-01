<template>
    <b-card header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <template #header bg-variant="white" border-variant="white">            
            <form-2-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </template>

        <b-card text-variant="dark" border-variant="light" bg-variant="light" class="my-2">

            <div class="ml-5" style="font-size: 2rem;">
                Submit through E-Filing
            </div> 
            <div class="ml-5" style="font-size: 14px;">
                By submitting, you will be redirected to the E-Filing Hub.
            </div>

            <b-row >
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
                        style="float: right;" 
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
import { form2StatusInfoType } from '@/types/Information';

@Component({
    components:{
        Form2ProcessHeader
    }
})
export default class SubmitForm2 extends Vue {

    stepsCompleted = {} as form2StatusInfoType;   

    mounted() {  
        this.stepsCompleted = {
            first: true,
            second: true,
            third: false
        }       
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