<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">
              

        <b-card no-body bg-variant="light" border-variant="light" class="my-2 text-dark">
            <div style="float: right;">
                <b-icon-check-circle-fill class="icon-complete mt-2" variant="success"/>
                <span style="font-size: 2rem;" class="step-complete text-success mr-4 ml-3 mb-2">Form Submitted</span>                
            </div>            
            
            <b-card no-body class="border-white bg-white mx-5">
                <b-row class="mx-5 mt-4" style="font-size: 14px;">
                    Your Application has been submitted.  
                    Please click on the CSO Package number below to retrieve a filed copy of your document. 
                </b-row>
                <b-row class="mx-5 mt-2" style="font-size: 14px; font-weight: 700; font-style: italic;">
                    Please note that you will be notified by the registry if a hearing is required and 
                    if your application has been granted or dismissed.
                </b-row>
                
                <b-row class="mt-5 ml-5">
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

import { packageInfoType } from '@/types/Information';

@Component({
    components:{        
    }
})
export default class SuccessSubmitManualForm extends Vue {

    @Prop({required: true})
    packageInfo!: packageInfoType;


    mountedData = false; 

    mounted() {
        this.mountedData = false;
        this.saveApplication(this.packageInfo);               
    }

    public saveApplication(newPackageInfo: packageInfoType) {

        const data = {
            packageNumber: newPackageInfo.packageNumber,
            packageUrl: newPackageInfo.eFilingUrl 
        } 

        const url = "/manual-submissions/efiling/"+newPackageInfo.fileNumber+"/submit/";

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
    .step-complete {
        font-size: 20px; 
        font-weight: 700; 
        display: inline-block; 
        transform:translate(10px,-22px);
    }

    .icon-complete {
        width: 82px;
        height: 82px;
        transform:translate(15px,7px);
    }


</style>