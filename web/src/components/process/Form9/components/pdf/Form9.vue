<template>
    <b-card v-if="dataReady" class="bg-light border-light" >  

        <b-row>
            <b-col cols="8" class="ml-3">
                <b-button 
                    style="float: right;" 
                    variant="primary"
                    @click="navigateToEditPage()"
                    ><b-icon-pencil-square class="mx-0" variant="white" scale="1" ></b-icon-pencil-square>
                    Go Back and Edit
                </b-button>
            </b-col>
            <b-col cols="3">
                <b-button
                    style="float: left;" 
                    variant="success"
                    @click="savePdf()"
                    >Download PDF
                    <b-icon-printer-fill class="mx-0" variant="white" scale="1" ></b-icon-printer-fill>
                </b-button>
            </b-col>
        </b-row>  
    
        <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
            <form-9-layout v-bind:result="result"/>
        </b-card>

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form9";
const form9State = namespace("Form9");

import { form9DataInfoType } from '@/types/Information/Form9';
import Form9Layout from "./Form9Layout.vue";

@Component({
    components:{        
        Form9Layout
    }
})
export default class Form9 extends Vue {
    
    @form9State.State
    public currentRequisitionId: string;

    @form9State.Action
    public UpdateForm9Info!: (newForm9Info: form9DataInfoType) => void

    result = {} as form9DataInfoType;
    dataReady = false;
   
    mounted(){
        this.dataReady = false;
        this.getForm9Data(); 
    }   
           
    public onPrint() { 
        const pdf_type = "NHA"
        const pdf_name = "form9-" + this.currentRequisitionId;
        const el= document.getElementById("print");

      
        const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA"`;
        const bottomRightText = `"www.bccourts.ca/Court_of_Appeal/"`;        
        const url = '/form-print/'+this.currentRequisitionId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
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
                
        },err => {
            console.error(err);        
        });
    }

    public savePdf(){        
        const pdfType = "NHA"
        const pdfName ="FORM9"
        const url = '/form-print/'+this.currentRequisitionId+'/?pdf_type='+pdfType
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
        this.$router.push({name: "fill-form9" })
    }
 
    public getForm9Data() {        
       
        this.$http.get('/case/'+this.currentRequisitionId+'/')
        .then((response) => {
            if(response?.data?.data){            
                            
                this.result = response.data.data
                this.result.completionDate = Vue.filter('beautify-date-dd/mm/yyyy')(response.data.modified);
               
                this.UpdateForm9Info(this.result)                         
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