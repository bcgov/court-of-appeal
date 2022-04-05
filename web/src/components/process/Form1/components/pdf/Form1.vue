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
            <form-1-layout v-bind:result="result"/>
        </b-card>

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import moment from 'moment';

import "@/store/modules/forms/form1";
const form1State = namespace("Form1");

import Form1Layout from "./Form1Layout.vue";
import { form1DataInfoType } from '@/types/Information/Form1';


@Component({
    components:{        
        Form1Layout
    }
})
export default class Form1 extends Vue {    
    
    @form1State.State
    public currentNoticeOfAppealId: string;  

    @form1State.Action
    public UpdateForm1Info!: (newForm1Info: form1DataInfoType) => void

    result = {} as form1DataInfoType;
    dataReady = false;
   
    mounted(){
        this.dataReady = false;
        this.getForm1Data(); 
    }   
           
    public onPrint() { 
        const pdf_type = "FORM"
        const pdf_name = "form1-" + this.currentNoticeOfAppealId;
        const el= document.getElementById("print");

      
        const bottomLeftText = `"Form 1 (`+moment().format("MMM DD, YYYY")+`)"`;
        const bottomRightText = `" "`;        
        const url = '/form1/form-print/'+this.currentNoticeOfAppealId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
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
        const pdfType = "FORM"
        const pdfName ="FORM1"
        const url = '/form1/form-print/'+this.currentNoticeOfAppealId+'/?pdf_type='+pdfType
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
        this.$router.push({name: "start-form1"});
    }

    public navigateToSubmitPage(){
        this.$emit('navigateToSubmitPage')
    }
 
    public getForm1Data() {        
       
        this.$http.get('/form1/forms/'+this.currentNoticeOfAppealId)
        .then((response) => {
            if(response?.data?.data){            
                            
                this.result = response.data.data
                this.result.completionDate = Vue.filter('beautify-date-dd/mm/yyyy')(response.data.modified);
                this.UpdateForm1Info(this.result)                         
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