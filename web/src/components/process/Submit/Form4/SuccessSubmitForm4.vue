<template>
    <b-card v-if="mountedData" header-tag="header" bg-variant="light" border-variant="white" style="width: 80rem;" class="mx-auto">

        <b-card-header header-bg-variant="light">            
            <form-4-process-header v-bind:stepsCompleted="stepsCompleted"/>
        </b-card-header>        

        <b-card no-body bg-variant="light" border-variant="light" class="my-2 text-dark">

            <b-row class="ml-5 mb-4 mt-2" style="font-size: 2rem;">
                Form Submitted
            </b-row> 
            
            <b-card no-body class="border-white bg-white mx-4">
                <b-row class="mx-5 mt-4" style="font-size: 14px;">
                    Your Notice of Application has been submitted and accepted. Please click on the CSO Package 
                    number below to retrieve a filed copy of your Notice of Application and supporting materials.
                </b-row>

                <div v-if="form4Data.orderList.includes('payment of security')">    
                    <h3 class="mx-5 mt-4">Payment of Security</h3>                
                    <b-row class="mx-5 mt-2 mb-4" style="font-size: 14px; font-weight: 700; font-style: italic;">
                        Please note that you must serve the notice of application and required materials on each 
                        party at least 5 business days before the application hearing date.
                    </b-row>
                </div>

                <div v-if="form4Data.orderList.includes('adducing fresh or new evidence')">    
                    <h3 class="mx-5 mt-2">Adducing Fresh or New Evidence</h3>                
                    <b-row class="mx-5 mt-2 mb-4" style="font-size: 14px; font-weight: 700; font-style: italic;">
                        Please note that you must serve the notice of application and required materials 
                        on each party at least 30 days before the appeal hearing date.
                    </b-row>
                </div>

                <div v-if="form4Data.orderList.includes('quashing an appeal or raising a preliminary objection')">  
                    <h3 class="mx-5 mt-2">Quashing an Appeal or Raising a Preliminary Objection</h3>                  
                    <b-row class="mx-5 mt-2 mb-4" style="font-size: 14px; font-weight: 700; font-style: italic;">
                        Please note that you must serve the notice of application and supporting materials on each 
                        party at least 5 business days before the application hearing date.
                    </b-row>
                </div>

                <div v-if="form4Data.orderList.includes('intervener status')"> 
                    <h3 class="mx-5 mt-2">Intervener Status</h3>                  
                    <b-row class="mx-5 mt-2 mb-4" style="font-size: 14px; font-weight: 700; font-style: italic;">
                        Please note that you must serve the notice of application and supporting materials on each 
                        party at least 5 business days before the application hearing date.
                    </b-row>
                </div>

                <div v-if="form4Data.orderList.includes('varying or cancelling an order of the registrar')">  
                    <h3 class="mx-5 mt-2">Varying or Cancelling an Order of the Registrar</h3>                  
                    <b-row class="mx-5 mt-2 mb-4" style="font-size: 14px; font-weight: 700; font-style: italic;">
                    Please note that you must serve the notice of application and supporting materials on each 
                    party at least 5 business days before the application hearing date.
                    </b-row>
                </div>

                <div v-if="generalMessage">                    
                    <b-row class="mx-5 mt-2 mb-4" style="font-size: 14px; font-weight: 700; font-style: italic;">
                    Please note that you must serve the notice of application and supporting materials on each 
                    party at least 5 business days before the application hearing date.
                    </b-row>
                </div>

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

import Form4ProcessHeader from "@/components/process/Form4/components/Form4ProcessHeader.vue";
import { packageInfoType } from '@/types/Information';
import { form4DataInfoType, form4StatusInfoType } from '@/types/Information/Form4';
@Component({
    components:{
        Form4ProcessHeader
    }
})
export default class SuccessSubmitForm4 extends Vue {

    @Prop({required: true})
    packageInfo!: packageInfoType;

    stepsCompleted = {} as form4StatusInfoType;  
    mountedData = false; 

    form4Data = {} as form4DataInfoType;
    generalMessage = true;

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

        const url = "/form4/efiling/"+newPackageInfo.fileNumber+"/submit/";

        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }

        this.$http.put(url, data, header)
        .then(res => {                            
            this.getForm4Data(newPackageInfo.fileNumber);
        }, err => {
            console.error(err);
            this.mountedData = true;
        });    
    }    

    public getForm4Data(fileNumber) {        
       
        this.$http.get('/form4/forms/'+fileNumber)
        .then((response) => {
            if(response?.data?.data){            
                            
                this.form4Data = response.data.data
                console.log(this.form4Data)
                this.generalMessage = !this.form4Data.orderList.includes('payment of security')
                                        && !this.form4Data.orderList.includes('adducing fresh or new evidence')
                                        && !this.form4Data.orderList.includes('quashing an appeal or raising a preliminary objection')
                                        && !this.form4Data.orderList.includes('intervener status')
                                        && !this.form4Data.orderList.includes('varying or cancelling an order of the registrar');
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