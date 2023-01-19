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
            <form-7-layout v-bind:result="result"/>
        </b-card>

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form7";
const form7State = namespace("Form7");

import { form7DataInfoType } from '@/types/Information/Form7';
import Form7Layout from "./Form7Layout.vue";

@Component({
    components:{        
        Form7Layout
    }
})
export default class Form7 extends Vue {

    @form7State.State
    public form7Info: form7DataInfoType;
    
    @form7State.State
    public currentNoticeOfUrgentApplicationId: string;

    @form7State.Action
    public UpdateForm7Info!: (newForm7Info: form7DataInfoType) => void

    result = {} as form7DataInfoType;
    dataReady = false;
    printReady = false;
   
    mounted(){
        this.dataReady = false;
        this.printReady = false;
        this.getForm7Data(); 
    }   
           
    public onPrint() { 
        const pdf_type = "FORM"
        const pdf_name = "form7-" + this.currentNoticeOfUrgentApplicationId;
        const el= document.getElementById("print");

      
        const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA                    www.bccourts.ca/Court_of_Appeal/"`;
        const bottomRightText = `" "`;        
        const url = '/form7/form-print/'+this.currentNoticeOfUrgentApplicationId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
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
        },err => {
            console.error(err);        
        });
    }

    public savePdf(){        
        const pdfType = "FORM"
        const pdfName ="FORM7"
        const url = '/form7/form-print/'+this.currentNoticeOfUrgentApplicationId+'/?pdf_type='+pdfType
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
        this.$router.push({name: "fill-form7" })
    }

    public navigateToSubmitPage(){
        this.$emit('navigateToSubmitPage')
    }
 
    public getForm7Data() {        
       
        this.$http.get('/form7/forms/'+this.currentNoticeOfUrgentApplicationId)
        .then((response) => {
            if(response?.data?.data){            
                            
                this.result = response.data.data
                //this.result = this.form7Info;
                this.result.completionDate = Vue.filter('beautify-date-dd/mm/yyyy')(response.data.modified);

                this.UpdateForm7Info(this.result)                         
                this.dataReady = true;
                Vue.nextTick(()=> this.onPrint())
            }
                
        },(err) => {
            console.log(err)        
        });      
    }
    
    // public onPrintSave() { 
    //     const pdf_type = "FORM"
    //     const pdf_name = "form7-" + this.currentNoticeOfUrgentApplicationId
    //     const el= document.getElementById("print");
      
    //     const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA                    www.bccourts.ca/Court_of_Appeal/"`;
    //     const bottomRightText = `" "`;        
    //     const url = '/form7/form-print/'+this.currentNoticeOfUrgentApplicationId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0'
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
    //         link.download = "FORM7.pdf";
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