<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light">            
            <form-22-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>        

        <b-card v-if="fileNumberExists" text-variant="dark" class="my-2 mx-5 bg-light border-light">

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

            <b-row class="ml-5 mt-3">
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
        <b-card v-else text-variant="dark" class="my-2 mx-5 bg-light border-light">

            <!-- <b-row class="ml-2" style="font-size: 2rem;">
                Submit through E-Filing
            </b-row>  -->
            
            <b-row class="ml-2 mb-5" style="font-size: 14px;">
                You have indicated that you do not currently have a Court of Appeal file number.  
                Please be advised that you will need to submit this Application For Order that 
                No Fees are Payable by saving a copy to your computer and submit it with your 
                prepared Notice of Appeal form.
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

            <b-row class="ml-5 mt-3">
                <b-col cols="7">
                    <b-button 
                        style="float: right; width: 120px; height: 50px; font-size: 20px;" 
                        variant="danger"
                        @click="cancel()"
                        >
                        Cancel
                    </b-button>
                </b-col>
                <b-col cols="5">
                    <b-button
                        style="float: left; height: 50px; font-size: 20px; opacity:1;"
                        variant="success"
                        @click="startNewForm1Document()"
                        >
                        <span style="margin:0; padding: 0;">Navigate to Notice of Appeal Form</span>
                    </b-button>
                </b-col>
            </b-row>

        </b-card>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";

import "@/store/modules/forms/form22";
const form22State = namespace("Form22");

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import { packageInfoType } from '@/types/Information';
import { form22DataInfoType, form22StatusInfoType } from '@/types/Information/Form22';

import Form22ProcessHeader from "@/components/process/Form22/components/Form22ProcessHeader.vue";
import Spinner from "@/components/utils/Spinner.vue";

@Component({
    components:{
        Form22ProcessHeader,
        Spinner
    }
})
export default class SubmitForm22 extends Vue {    

    @form22State.State
    public currentNoFeesPayableId: string;

    @form22State.State
    public form22Info: form22DataInfoType;

    @form1State.Action
    public UpdateCurrentNoticeOfAppealId!: (newCurrentNoticeOfAppealId: string) => void

    stepsCompleted = {} as form22StatusInfoType;  
    mountedData = false; 
    packageInfo = {} as packageInfoType;
    submitting = false;
    errorMsg="";   
    fileNumberExists = false;


    mounted() {
        this.mountedData = false;
        this.submitting = false;    
        this.errorMsg = ""
        this.fileNumberExists = !this.form22Info.requiresManualEntry && this.form22Info.formSevenNumber?.length > 0;
        this.stepsCompleted = {
            first: true,
            second: true,
            third: false
        }
        this.mountedData = true;
    }  

    public submit() {

        this.submitting = true;
        this.errorMsg ="";

        const url = "/form22/efiling/"+this.currentNoFeesPayableId+"/submit/";

        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }       
        
        this.$http.post(url, header)
        .then(res => {                            
            // this.submitting = false;
            if(res.data?.message=="success" && res.data?.redirectUrl){
                const eFilingUrl = res.data?.redirectUrl
                location.replace(eFilingUrl);
            }else
                this.submitting = false;
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
    
    public startNewForm1Document(){
        this.UpdateCurrentNoticeOfAppealId(null)
        this.$router.push({name: "checklist-form1" })
    }

    public cancel() {
        this.$router.push({name: "dashboard" }) 
    }
}
</script>

<style scoped lang="scss">    

</style>