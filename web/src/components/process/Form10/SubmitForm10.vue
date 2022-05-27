<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light">            
            <form-10-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>        

        <b-card text-variant="dark" class="my-2 mx-5 bg-light border-light">

            <b-row class="ml-2" style="font-size: 2rem;">
                Download and Print
            </b-row> 
            <b-row class="ml-2 my-2" style="font-size: 14px;">
                Before you can submit the order to the registry for entry, you will need 
                to have the order you prepared signed by all parties.  If someone 
                refuses to sign an order, you may go before the registrar to settle 
                the order pursuant to Rule 68 of the Court of Appeal Rules. 
            </b-row>
            <b-row class="ml-2 mb-5" style="font-size: 14px;">
                Once you have collected the party signatures, you can return to this 
                application to submit your order to the registry.  
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

            <!-- <b-row class="ml-5">
                <b-col cols="10">
                    <b-button 
                        style="float: right; width: 120px; height: 50px; font-size: 20px;" 
                        variant="danger"
                        @click="cancel()"
                        >
                        Cancel
                    </b-button>
                </b-col>
                <b-col cols="2">
                    <b-button
                        style="float: left; width: 120px; height: 50px; font-size: 20px; opacity:1;" 
                        :disabled="submitting"
                        variant="success"
                        @click="submit()"
                        ><spinner color="#FFF" v-if="submitting" style="margin:0; padding: 0; transform:translate(0px,-22px);"/>
                        <span v-else style="margin:0; padding: 0;">Submit
                        <span style="margin:0; padding: 0;" class="fa fa-paper-plane btn-icon-left"/></span>
                    </b-button>
                </b-col>
            </b-row> -->

        </b-card>

        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/forms/form10";
const form10State = namespace("Form10");

import Form10ProcessHeader from "@/components/process/Form10/components/Form10ProcessHeader.vue";
import Spinner from "@/components/utils/Spinner.vue";
import { packageInfoType } from '@/types/Information';
import { form10StatusInfoType } from '@/types/Information/Form10';

@Component({
    components:{
        Form10ProcessHeader,
        Spinner
    }
})
export default class SubmitForm10 extends Vue {

    @form10State.State
    public currentOrderSingleJusticeId: string;

    stepsCompleted = {} as form10StatusInfoType;  
    mountedData = false; 
    packageInfo = {} as packageInfoType;
    submitting = false;
    errorMsg=""

    mounted() {
        this.mountedData = false;    
        this.submitting = false;    
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
        const pdfName ="Form10"
        const url = '/form10/form-print/'+this.currentOrderSingleJusticeId+'/?pdf_type='+pdfType
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

    // public submit() {

    //     this.submitting = true;
    //     this.errorMsg =""

    //     const url = "/form10/efiling/"+this.currentOrderSingleJusticeId+"/submit/";

    //     const header = {
    //         responseType: "json",
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     }

    //     this.$http.post(url, header)
    //     .then(res => {                            
    //         this.submitting = false;
    //         if(res.data?.message=="success" && res.data?.redirectUrl){
    //             const eFilingUrl = res.data?.redirectUrl
    //             location.replace(eFilingUrl);
    //         }
    //     }, err => {
    //         console.log(err.response?.data?.message);
    //         const generalError = " Error in submission. Please refresh the page and try again."
    //         if(err.response?.data?.message)
    //             this.errorMsg = err.response.data.message
    //         else if(err.response?.data?.detail)
    //             this.errorMsg = err.response.data.detail+generalError
    //         else
    //             this.errorMsg = generalError
    //         this.submitting = false;
    //     });        
    // }

    public cancel() {
        this.$router.push({name: "dashboard" }) 
    }
}
</script>

<style scoped lang="scss">



</style>