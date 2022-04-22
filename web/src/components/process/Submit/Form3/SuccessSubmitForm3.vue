<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light">            
            <form-3-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>        

        <b-card no-body bg-variant="light" border-variant="light" class="my-2 text-dark">

            <b-row class="ml-5 mb-4 mt-2" style="font-size: 2rem;">
                Form Submitted
            </b-row> 
            
            <b-card no-body class="border-white bg-white mx-5">
                <b-row class="mx-5 mt-4" style="font-size: 14px;">
                    Your Notice of Cross Appeal has been submitted and accepted. Please 
                    click on the CSO Package number below to retrieve a filed copy of your 
                    Requisition.
                </b-row>
                <b-row class="mx-5 mt-2 mb-4" style="font-size: 14px; font-weight: 700; font-style: italic;">
                    Please note that you must serve the notice of cross appeal on each 
                    party and on any other respondent named in the notice of cross appeal.
                </b-row>
                <b-row class="ml-5">
                    <b-col cols="3">
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
                    <b-col cols="3">
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
                    <b-col cols="3">
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
                    <b-col cols="3">
                        <span style="float: left; font-weight: 700">
                            Go to Filed Document:                        
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
import { Component, Vue, Prop} from 'vue-property-decorator';

import Form3ProcessHeader from "@/components/process/Form3/components/Form3ProcessHeader.vue";
import { packageInfoType } from '@/types/Information';
import { form3StatusInfoType } from '@/types/Information/Form3';

@Component({
    components:{
        Form3ProcessHeader
    }
})
export default class SuccessSubmitForm3 extends Vue {

    @Prop({required: true})
    packageInfo!: packageInfoType;

    stepsCompleted = {} as form3StatusInfoType;  
    mountedData = false; 


    mounted() {
        this.mountedData = false;
        this.stepsCompleted = {
            first: true,
            second: true,
            third: true
        } 
        this.saveApplication(this.packageInfo);               
    }

    public saveApplication(newPackageInfo: packageInfoType) {

        const data = {
            packageNumber: newPackageInfo.packageNumber,
            packageUrl: newPackageInfo.eFilingUrl 
        } 

        const url = "/form3/efiling/"+newPackageInfo.fileNumber+"/submit/";

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

    public done() {
        this.$router.push({name: "dashboard" }) 
    }
}
</script>

<style scoped lang="scss">



</style>