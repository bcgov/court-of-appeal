<template>
    <b-card v-if="dataReady" class="bg-light border-light" >  

        <b-row>
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
            <form-4-layout v-bind:result="result"/>
        </b-card>

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form4";
const form4State = namespace("Form4");

import { form4DataInfoType } from '@/types/Information/Form4';
import Form4Layout from "./Form4Layout.vue";

@Component({
    components:{        
        Form4Layout
    }
})
export default class Form4 extends Vue {
    
    @form4State.State
    public currentNoticeOfSettlementOrAbandonmentId: string;

    @form4State.Action
    public UpdateForm4Info!: (newForm4Info: form4DataInfoType) => void

    @form4State.State
    public form4Info: form4DataInfoType;

    result = {} as form4DataInfoType;
    dataReady = false;
   
    mounted(){
        this.dataReady = false;
        this.getForm4Data(); 
    }   
           
    public onPrint() { 
        const pdf_type = "ABA"
        const pdf_name = "form4-" + this.currentNoticeOfSettlementOrAbandonmentId;
        const el= document.getElementById("print");

      
        const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA                    www.bccourts.ca/Court_of_Appeal/"`;
        const bottomRightText = `" "`;        
        const url = '/form4/form-print/'+this.currentNoticeOfSettlementOrAbandonmentId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
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
        const pdfType = "ABA"
        const pdfName ="FORM4"
        const url = '/form4/form-print/'+this.currentNoticeOfSettlementOrAbandonmentId+'/?pdf_type='+pdfType
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
        this.$router.push({name: "fill-form4" })
    }

    public navigateToSubmitPage(){
        this.$emit('navigateToSubmitPage')
    }
 
    public getForm4Data() {        
       
        this.$http.get('/form4/forms/'+this.currentNoticeOfSettlementOrAbandonmentId)
        .then((response) => {
            if(response?.data?.data){            
                            
                this.result = response.data.data
                this.result.completionDate = Vue.filter('beautify-date-dd/mm/yyyy')(response.data.modified);
               
                this.UpdateForm4Info(this.result) 
                                    
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