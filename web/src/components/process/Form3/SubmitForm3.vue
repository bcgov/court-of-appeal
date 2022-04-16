<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light">            
            <form-3-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>        

        <b-card text-variant="dark" class="my-2 mx-5 bg-light border-light">

            <b-row class="ml-2" style="font-size: 2rem;">
                Submit through E-Filing
            </b-row> 
            <b-row class="ml-2 mb-5" style="font-size: 14px;">
                By submitting, you will be redirected to the E-Filing Hub.
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
            </b-row>

        </b-card>

        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { GetForm3PdfType } from "./components/Form3PdfType";

import { namespace } from "vuex-class";
import "@/store/modules/forms/form3";
const form3State = namespace("Form3");

import Form3ProcessHeader from "@/components/process/Form3/components/Form3ProcessHeader.vue";
import Spinner from "@/components/utils/Spinner.vue";
import { form3DataInfoType, form3StatusInfoType } from '@/types/Information/Form3';
import { packageInfoType } from '@/types/Information';

@Component({
    components:{
        Form3ProcessHeader,
        Spinner
    }
})
export default class SubmitForm3 extends Vue {

    @form3State.State
    public currentNoticeOfCrossAppealId: string;

    @form3State.State
    public form3Info: form3DataInfoType;

    stepsCompleted = {} as form3StatusInfoType;  
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

    public submit() {

        this.submitting = true;
        this.errorMsg =""

        const url = "/form3/efiling/"+this.currentNoticeOfCrossAppealId+"/submit/";

        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }

        const body = {
            document_type: GetForm3PdfType(this.form3Info) //"NCA"
        }

        this.$http.post(url, body, header)
        .then(res => {                            
            this.submitting = false;
            if(res.data?.message=="success" && res.data?.redirectUrl){
                const eFilingUrl = res.data?.redirectUrl
                location.replace(eFilingUrl);
            }
        }, err => {
            console.log(err.response?.data?.message);
            const generalError = " Error in submission. Please refresh the page and try again."
            if(err.response?.data?.message)
                this.errorMsg = err.response.data.message
            else if(err.response?.data?.detail)
                this.errorMsg = err.response.data.detail+generalError
            else
                this.errorMsg = generalError
            this.submitting = false;
        });        
    }

    public cancel() {
        this.$router.push({name: "dashboard" }) 
    }
}
</script>

<style scoped lang="scss">



</style>