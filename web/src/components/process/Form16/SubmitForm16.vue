<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light">            
            <form-16-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>        

        <b-card text-variant="dark" class="my-2 mx-5 bg-light border-light">

            <b-row class="ml-2" style="font-size: 2rem;">
                Download and Print
            </b-row> 
            <b-row class="ml-2 my-2" style="font-size: 14px;">
                You can print or download your Offer to Settle Costs to 
                serve on the other party.
            </b-row>
            <b-row class="ml-2 mb-5" style="font-size: 14px;">
                Please note that the Offer To Settle Costs cannot be 
                submitted to the Registrar until the conclusion of 
                the hearing on the assessment of costs.
            </b-row>
            <b-row>
                <b-alert
                    :show="errorMsg !=''"
                    style="margin:0 0 2rem auto;"
                    dismissible
                    variant="danger"
                > {{errorMsg}}
                </b-alert>
            </b-row>

            <b-row class="ml-5">
                <b-col cols="9">
                    <b-button 
                        style="float: right; width: 120px; font-size: 20px;" 
                        variant="danger"
                        @click="cancel()"
                        >
                        Cancel
                    </b-button>
                </b-col>
                <b-col cols="3">
                    <b-button
                        style="float: right; margin-right:1rem; font-size: 20px;" 
                        variant="success"
                        @click="savePdf()"
                        >Download PDF
                        <b-icon-printer-fill class="mx-0" variant="white" scale="1" ></b-icon-printer-fill>
                    </b-button>
                </b-col>
            </b-row>

        </b-card>

        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/forms/form16";
const form16State = namespace("Form16");

import Form16ProcessHeader from "@/components/process/Form16/components/Form16ProcessHeader.vue";
import Spinner from "@/components/utils/Spinner.vue";
import { form16DataInfoType, form16StatusInfoType } from '@/types/Information/Form16';

@Component({
    components:{
        Form16ProcessHeader,
        Spinner
    }
})
export default class SubmitForm16 extends Vue {

    @form16State.State
    public currentOfferToSettleCostsId: string;

    @form16State.State
    public form16Info: form16DataInfoType;

    stepsCompleted = {} as form16StatusInfoType;  
    mountedData = false;   
    errorMsg="";

    mounted() {
        this.mountedData = false;
        this.errorMsg = ""
        this.stepsCompleted = {
            first: true,
            second: true,
            third: false
        }
        this.mountedData = true;         
    }  

    public savePdf(){        
        const pdfType = "FORM"
        const pdfName ="Form16"
        const url = '/form16/form-print/'+this.currentOfferToSettleCostsId+'/?pdf_type='+pdfType
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }
        this.$http.get(url, options)
        .then(res => {
            const blob = res.data;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.download = pdfName+".pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);          

        },err => {
            console.error(err);
        });
    }    

    public cancel() {
        this.$router.push({name: "dashboard" }) 
    }
}
</script>

<style scoped lang="scss">



</style>