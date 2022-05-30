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
            <form-19-layout v-bind:result="result"/>
        </b-card>

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form19";
const form19State = namespace("Form19");

import { form19DataInfoType } from '@/types/Information/Form19';
import Form19Layout from "./Form19Layout.vue";

@Component({
    components:{        
        Form19Layout
    }
})
export default class Form19 extends Vue {
    
    @form19State.State
    public currentNoticeOfWithdrawalOfLawyerId: string;

    @form19State.State
    public form19Info: form19DataInfoType;

    @form19State.Action
    public UpdateForm19Info!: (newForm19Info: form19DataInfoType) => void

    result = {} as form19DataInfoType;
    dataReady = false;
    printReady = false;
   
    mounted(){
        this.dataReady = false;
        this.printReady = false;       
        this.getForm19Data(); 
    }  
    
    
    public navigateToSubmitPage(){
        this.$emit('navigateToSubmitPage')
    }
           
    public onPrint() { 
        const pdf_type = "FORM"
        const pdf_name = "form19-" + this.currentNoticeOfWithdrawalOfLawyerId;
        const el= document.getElementById("print");

      
        const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA                    www.bccourts.ca/Court_of_Appeal/"`;
        const bottomRightText = `" "`;        
        const url = '/form19/form-print/'+this.currentNoticeOfWithdrawalOfLawyerId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
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
        const pdfName ="FORM19"
        const url = '/form19/form-print/'+this.currentNoticeOfWithdrawalOfLawyerId+'/?pdf_type='+pdfType
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
        this.$router.push({name: "fill-form19" })
    }
 
    public getForm19Data() {        
       
        this.$http.get('/form19/forms/'+this.currentNoticeOfWithdrawalOfLawyerId)
        .then((response) => {
            if(response?.data?.data){            
                            
                this.result = response.data.data
                this.result.completionDate = Vue.filter('beautify-date-dd/mm/yyyy')(response.data.modified);
               
                this.UpdateForm19Info(this.result)                         
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