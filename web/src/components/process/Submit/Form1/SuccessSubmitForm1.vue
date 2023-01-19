<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light">            
            <form-1-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>        

        <b-card no-body bg-variant="light" border-variant="light" class="my-2 text-dark">

            <b-row class="ml-5 mb-4 mt-2" style="font-size: 2rem;">
                Form Submitted
            </b-row> 
            
            <b-card no-body class="border-white bg-white mx-4">
                <b-row class="ml-5 mt-4" style="font-size: 14px;">
                   Your Notice of Appeal form has been submitted. Please click on the CSO package number below 
                   to retrieve a filed copy of your Notice of Appeal.
                </b-row>
                <b-row class="ml-5 mt-2 mb-4" style="font-size: 14px; font-style: italic; display: inline-block;">
                    Please note that <span style="font-weight: 700; margin:0 0.25rem;"> you must file and serve the Notice of Appeal form </span> 
                    on each Respondent within 30 days after the
                    <span v-if="form1Data.appealTribunal">initial tribunal order is made unless another enactment specifies another time period.</span>
                    <span v-else> court order you are appealing was made.</span>
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

                <!-- <b-row class="ml-5">
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
                </b-row> -->

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

import Form1ProcessHeader from "@/components/process/Form1/components/Form1ProcessHeader.vue";
import { packageInfoType } from '@/types/Information';
import { form1DataInfoType, form1StatusInfoType } from '@/types/Information/Form1';

@Component({
    components:{
        Form1ProcessHeader
    }
})
export default class SuccessSubmitForm1 extends Vue {

    @Prop({required: true})
    packageInfo!: packageInfoType;

    stepsCompleted = {} as form1StatusInfoType;  
    mountedData = false; 

    form1Data = {} as form1DataInfoType;

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

        const url = "/form1/efiling/"+newPackageInfo.fileNumber+"/submit/";

        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }

        this.$http.put(url, data, header)
        .then(res => {                            
            this.getForm1Data(newPackageInfo.fileNumber);
        }, err => {
            console.error(err);
            this.mountedData = true;
        });    
    }    

    public getForm1Data(fileNumber) {        
       
        this.$http.get('/form1/forms/'+fileNumber)
        .then((response) => {
            if(response?.data?.data){            
                            
                this.form1Data = response.data.data
                console.log(this.form1Data)
                
                this.mountedData = true;
            }
                
        },(err) => {
            console.log(err)        
        });      
    }

    public done() {
        this.$router.push({name: "dashboard" }) 
    }
}
</script>

<style scoped lang="scss">



</style>