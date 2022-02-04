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
            <form-18-layout v-bind:result="result"/>
        </b-card>

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form18";
const form18State = namespace("Form18");

import { form18DataInfoType } from '@/types/Information/Form18';
import Form18Layout from "./Form18Layout.vue";

@Component({
    components:{        
        Form18Layout
    }
})
export default class Form18 extends Vue {
    
    @form18State.State
    public currentNoticeOfRepChangeAddressId: string;

    @form18State.State
    public form18Info: form18DataInfoType;

    @form18State.Action
    public UpdateForm18Info!: (newForm18Info: form18DataInfoType) => void

    result = {} as form18DataInfoType;
    dataReady = false;
   
    mounted(){
        this.dataReady = false;
        this.result = this.form18Info;
        //TODO: remove above line and uncomment getForm18Data
        this.dataReady = true;
        // this.getForm18Data(); 
    }   
           
    public onPrint() { 
        const pdf_type = "NHA"
        const pdf_name = "form18-" + this.currentNoticeOfRepChangeAddressId;
        const el= document.getElementById("print");

      
        const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA"`;
        const bottomRightText = `"www.bccourts.ca/Court_of_Appeal/"`;        
        const url = '/form18/form-print/'+this.currentNoticeOfRepChangeAddressId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
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
        const pdfName ="FORM18"
        const url = '/form18/form-print/'+this.currentNoticeOfRepChangeAddressId+'/?pdf_type='+pdfType
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
        this.$router.push({name: "fill-form18" })
    }
 
    public getForm18Data() {        
       
        this.$http.get('/form18/forms/'+this.currentNoticeOfRepChangeAddressId+'/')
        .then((response) => {
            if(response?.data?.data){            
                            
                this.result = response.data.data
                this.result.completionDate = Vue.filter('beautify-date-dd/mm/yyyy')(response.data.modified);
               
                this.UpdateForm18Info(this.result)                         
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