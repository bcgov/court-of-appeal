<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light">            
            <form-2-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>        

        <b-card no-body v-if="submitted" bg-variant="light" border-variant="light" class="my-2 text-dark">

            <b-row class="ml-5 mb-4 mt-2" style="font-size: 2rem;">
                Form Submitted
            </b-row> 
            
            <b-card no-body class="border-white bg-white mx-4">
                <b-row class="ml-5 my-4" style="font-size: 14px;">
                    Your Notice of Appearance has been submitted and accepted.
                </b-row>
                <b-row class="ml-5">
                    <b-col cols="2">
                        <span style="float: left; font-weight: 700">
                            Package Number:                        
                        </span>
                    </b-col>
                    <b-col cols="2">
                        <span style="float: left;">
                            {{packageInfo.packageNumber}}                            
                        </span>
                    </b-col>
                </b-row>

                <b-row class="ml-5">
                    <b-col cols="2">
                        <span style="float: left; font-weight: 700">
                            Your File #:                        
                        </span>
                    </b-col>
                    <b-col cols="2">
                        <span style="float: left;">
                            {{packageInfo.fileNumber}}                            
                        </span>
                    </b-col>
                </b-row>

                <b-row class="ml-5">
                    <b-col cols="2">
                        <span style="float: left; font-weight: 700">
                            Submitted To:                        
                        </span>
                    </b-col>
                    <b-col cols="2">
                        <span style="float: left;">
                            BC Court of Appeal                            
                        </span>
                    </b-col>
                </b-row>

                <b-row class="ml-5">
                    <b-col cols="2">
                        <span style="float: left; font-weight: 700">
                            E-Filing Url:                        
                        </span>
                    </b-col>
                    <b-col cols="2">
                        <span style="float: left;">
                            <a :href="packageInfo.eFilingUrl"
                                target="_blank">{{packageInfo.packageNumber}}</a>                                                        
                        </span>
                    </b-col>
                </b-row>

                <b-row class="my-5">
                    <b-col cols="10">
                        <b-button 
                            style="float: right;" 
                            variant="success"
                            @click="cancel()"
                            >
                            Done
                        </b-button>
                    </b-col>                
                </b-row>
            </b-card>           

        </b-card>

        <b-card v-else text-variant="dark" class="my-2 mx-5 bg-light border-light">

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
    submitted = false;
    packageInfo = {} as packageInfoType;

    mounted() {
        this.mountedData = false;
        // TODO: figure out if submitting or submitted
        if (this.submitted){
            this.packageInfo.packageNumber = '15140';
            this.packageInfo.fileNumber = '66';
            this.packageInfo.eFilingUrl = 'https://dev.justice.gov.bc.ca/efilinghub/packagereview/15140?packageNo=15140';

            this.stepsCompleted = {
                first: true,
                second: true,
                third: true
            } 
            this.saveApplication(this.packageInfo);


        } else {

            this.stepsCompleted = {
                first: true,
                second: true,
                third: false
            }
            this.mountedData = true;  

        }             
    }

    public saveApplication(newPackageInfo: packageInfoType) {
        //TODO: add this endpoint
        const data = {
            packageNumber: newPackageInfo.packageNumber,
            packageUrl: newPackageInfo.eFilingUrl 
        } 

        const url = "/efiling/"+newPackageInfo.fileNumber+"/submit/";

        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }

        this.$http.put(url, data, header)
        .then(res => {                            
            this.mountedData = true;
        }, err => {
            console.error(err);
            this.mountedData = true;
        });    
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