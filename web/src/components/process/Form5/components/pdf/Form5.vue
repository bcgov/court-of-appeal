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
            <form-5-layout v-bind:result="result"/>
        </b-card>

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
const informationState = namespace("Information");

import "@/store/modules/forms/form5";
const form5State = namespace("Form5");

import { form5DataInfoType } from '@/types/Information/Form5';
import Form5Layout from "./Form5Layout.vue";

@Component({
    components:{        
        Form5Layout
    }
})
export default class Form5 extends Vue {   
    
    @form5State.State
    public currentNoticeOfHearingOfAppealId: string;

    @form5State.Action
    public UpdateForm5Info!: (newForm5Info: form5DataInfoType) => void

    result = {} as form5DataInfoType;
    dataReady = false;
    printReady = false;
   
    mounted(){
        this.dataReady = false;
        this.printReady = false;
        this.getForm5Data(); 
    }   

    public navigateToSubmitPage(){
        this.$emit('navigateToSubmitPage')
    }

    // public onPrintSave() { 
    //     const pdf_type = "NHA"
    //     const pdf_name = "form5-" + this.currentNoticeOfHearingOfAppealId;
    //     const el= document.getElementById("print");
      
    //     const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA                    www.bccourts.ca/Court_of_Appeal/"`;
    //     const bottomRightText = `" "`;        
    //     const url = '/form5/form-print/'+this.currentNoticeOfHearingOfAppealId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0'
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
    //         link.download = "FORM5.pdf";
    //         link.click();
    //         setTimeout(() => URL.revokeObjectURL(link.href), 1000); 
    //     },err => {
    //         console.error(err);        
    //     });
    // }

           
    public onPrint() { 
        const pdf_type = "NHA"
        const pdf_name = "form5-" + this.currentNoticeOfHearingOfAppealId;
        const el= document.getElementById("print");
      
        const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA                    www.bccourts.ca/Court_of_Appeal/"`;
        const bottomRightText = `" "`;        
        const url = '/form5/form-print/'+this.currentNoticeOfHearingOfAppealId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
        const pdfhtml = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText );

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
        const pdfType = "NHA"
        const pdfName ="FORM5"
        const url = '/form5/form-print/'+this.currentNoticeOfHearingOfAppealId+'/?pdf_type='+pdfType
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
        this.$router.push({name: "fill-form5" })
    }
 
    public getForm5Data() {        
       
        this.$http.get('/form5/forms/'+this.currentNoticeOfHearingOfAppealId)
        .then((response) => {
            if(response?.data?.data){            
                            
                this.result = response.data.data
                this.result.completionDate = Vue.filter('beautify-date-dd/mm/yyyy')(response.data.modified);
               
                this.UpdateForm5Info(this.result)                         
                this.dataReady = true;
                Vue.nextTick(()=> this.onPrint())
            }
                
        },(err) => {
            console.log(err)        
        });      
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>