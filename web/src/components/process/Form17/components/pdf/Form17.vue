<template>
    <b-card v-if="dataReady" class="bg-light border-light" >  

        <b-row>
            <!-- <b-col cols="2" class="ml-3">
                <b-button 
                    style="float: right;" 
                    variant="primary"
                    @click="onPrintSave()"
                    >
                    Print-Save
                </b-button>
            </b-col> -->
            <b-col cols="10">
                <b-button
                    :disabled="!printReady"
                    style="float: right;" 
                    variant="success"
                    @click="navigateToSubmitPage()"
                    >Proceed
                    <b-icon-play-fill class="mx-0" variant="white" scale="1" ></b-icon-play-fill>
                </b-button>

                <b-button
                    style="float: right; margin-right:1rem;" 
                    variant="success"
                    :disabled="!printReady"
                    @click="savePdf()"
                    >Download PDF
                    <b-icon-printer-fill class="mx-0" variant="white" scale="1" ></b-icon-printer-fill>
                </b-button>

                <b-button 
                    style="float: right; margin-right:1rem;" 
                    variant="primary"
                    @click="navigateToEditPage()"
                    ><b-icon-pencil-square class="mx-0" variant="white" scale="1" ></b-icon-pencil-square>
                    Go Back and Edit
                </b-button>                
            </b-col>
        </b-row>  
    
        <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
            <form-17-layout v-bind:result="result"/>
        </b-card>

    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form17";
const form17State = namespace("Form17");

import { form17DataInfoType } from '@/types/Information/Form17';

import Form17Layout from "./Form17Layout.vue";
import moment from 'moment';

@Component({
    components:{        
        Form17Layout
    }
})
export default class Form17 extends Vue {

    @Prop({required: true})
    caseId!: string;
    
    @form17State.State
    public currentCertificateOfCostsId: string;

    @form17State.State
    public form17Info!: form17DataInfoType;

    @form17State.Action
    public UpdateForm17Info!: (newForm17Info: form17DataInfoType) => void

    result = {} as form17DataInfoType;
    dataReady = false;
    printReady = false;
   
    mounted(){
        this.dataReady = false;
        this.printReady = false;
        this.getForm17Data(); 
    }   
           
    public onPrint() { 
        const pdf_type = "FORM"
        const pdf_name = "form17-" + this.caseId;
        const el= document.getElementById("print");
        
        const topLeftText    = `"COURT OF APPEAL FOR BRITISH COLUMBIA      FORM 17: CERTIFICATE OF COSTS"`;
        const topRightText   = `"(Rule 77)"`;

        const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA      FORM 17: CERTIFICATE OF COSTS (Rule 77)"`;
        const bottomRightText = `" "`;        
        const url = '/form17/form-print/'+this.caseId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
        const pdfhtml = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText, topLeftText, topRightText);

        const body = {
            'html':pdfhtml,
            'json_data':this.result
        }       
        
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }  

        this.$http.post(url,body, options)
        .then(res => {                       
            this.printReady = true;
            this.$emit('pdfReady')   
        },err => {
            console.error(err);        
        });
    }

    public savePdf(){        
        const pdfType = "FORM"
        const pdfName ="Form17"
        const url = '/form17/form-print/'+this.caseId+'/?pdf_type='+pdfType
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

    public navigateToEditPage() {
        this.$router.push({name: "fill-form17" })
    }

    public navigateToSubmitPage(){
        this.$emit('navigateToSubmitPage')
    }
 
    public getForm17Data() {        

        this.result = this.form17Info;
       
        this.$http.get('/form17/forms/'+this.currentCertificateOfCostsId)
        .then((response) => {
            if(response?.data?.data){            
                            
                this.result = response.data.data
                this.UpdateForm17Info(this.result)                         
                this.dataReady = true;
                Vue.nextTick(()=> this.onPrint())
            }
                
        },(err) => {
            console.log(err)        
        });      
    }

    // public onPrintSave() { 
    //     const pdf_type = "FORM"
    //     const pdf_name = "form17-" + this.currentCertificateOfCostsId
    //     const el= document.getElementById("print");
      
    //     const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA                    www.bccourts.ca/Court_of_Appeal/"`;
    //     const bottomRightText = `" "`;        
    //     const url = '/form17/form-print/'+this.currentCertificateOfCostsId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0'
    //     const pdfhtml = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText );

    //     const body = {
    //         'html':pdfhtml,
    //         'json_data':this.result
    //     }       
        
    //     const options = {
    //         responseType: "blob",
    //         headers: {
    //         "Content-Type": "application/json",
    //         }
    //     }  

    //     this.$http.post(url,body, options)
    //     .then(res => {                       
    //         const blob = res.data;
    //         const link = document.createElement("a");
    //         link.href = URL.createObjectURL(blob);
    //         document.body.appendChild(link);
    //         link.download = "Form17.pdf";
    //         link.click();
    //         setTimeout(() => URL.revokeObjectURL(link.href), 1000); 
    //     },err => {
    //         console.error(err);        
    //     });
    // }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>