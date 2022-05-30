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
            <form-14-layout v-bind:result="result"/>
        </b-card>

    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form14";
const form14State = namespace("Form14");

import { form14DataInfoType } from '@/types/Information/Form14';

import Form14Layout from "./Form14Layout.vue";
import moment from 'moment';

@Component({
    components:{        
        Form14Layout
    }
})
export default class Form14 extends Vue {

    @Prop({required: true})
    caseId!: string;
    
    @form14State.State
    public currentConsentOrderRemoveInactiveId: string;

    @form14State.State
    public form14Info!: form14DataInfoType;

    @form14State.Action
    public UpdateForm14Info!: (newForm14Info: form14DataInfoType) => void

    result = {} as form14DataInfoType;
    dataReady = false;
   
    mounted(){
        this.dataReady = false;
        this.getForm14Data(); 
    }   
           
    public onPrint() { 
        const pdf_type = "FORM"
        const pdf_name = "form14-" + this.caseId;
        const el= document.getElementById("print");

        const topLeftText    = `"COURT OF APPEAL FOR BRITISH COLUMBIA      Form 14: CONSENT ORDER TO REMOVE AN APPEAL FROM THE INACTIVE LIST"`;
        const topRightText   = `"(Rule 67(2)(b) )"`;

        const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA      Form 14: CONSENT ORDER TO REMOVE AN APPEAL FROM THE INACTIVE LIST"`;
        const bottomRightText = `" "`;
        
       
        //const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA		Rule 67(2)(b)"`;
        //const bottomRightText = `"Form 14: Order from an application to vary the order of a justice"`;        
        const url = '/form14/form-print/'+this.caseId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
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
                
        },err => {
            console.error(err);        
        });
    }

    public savePdf(){        
        const pdfType = "FORM"
        const pdfName ="Form14"
        const url = '/form14/form-print/'+this.caseId+'/?pdf_type='+pdfType
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
        this.$router.push({name: "fill-form14" })
    }

    public navigateToSubmitPage(){
        this.$emit('navigateToSubmitPage')
    }
 
    public getForm14Data() {        

        this.result = this.form14Info;
       
        this.$http.get('/form14/forms/'+this.currentConsentOrderRemoveInactiveId)
        .then((response) => {
            if(response?.data?.data){            
                            
                this.result = response.data.data
                this.UpdateForm14Info(this.result)                         
                this.dataReady = true;
                Vue.nextTick(()=> this.onPrint())
            }
                
        },(err) => {
            console.log(err)        
        });      
    }

    // public onPrintSave() { 
    //     const pdf_type = "FORM"
    //     const pdf_name = "form14-" + this.currentConsentOrderRemoveInactiveId
    //     const el= document.getElementById("print");
      
    //     const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA                    www.bccourts.ca/Court_of_Appeal/"`;
    //     const bottomRightText = `" "`;        
    //     const url = '/form14/form-print/'+this.currentConsentOrderRemoveInactiveId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0'
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
    //         link.download = "Form14.pdf";
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