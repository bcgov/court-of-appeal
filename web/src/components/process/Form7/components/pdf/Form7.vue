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
            <form-7-layout v-bind:result="result"/>
        </b-card>

    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
import { form7DataInfoType } from '@/types/Information';
const informationState = namespace("Information");
import Form7Layout from "./Form7Layout.vue";
import moment from 'moment';

@Component({
    components:{        
        Form7Layout
    }
})
export default class Form7 extends Vue {

    @Prop({required: true})
    caseId!: string;
    
    @informationState.State
    public currentCaseId: string;

    @informationState.State
    public form7Info: form7DataInfoType;

    @informationState.Action
    public UpdateForm7Info!: (newForm7Info: form7DataInfoType) => void

    result = {} as form7DataInfoType;
    dataReady = false;
   
    mounted(){
        this.dataReady = false;
        this.getForm7Data(); 
    }   
           
    public onPrint() { 
        const pdf_type = "FORM"
        const pdf_name = "form7-" + this.caseId;
        const el= document.getElementById("print");

      
        const bottomLeftText = ``;
        const bottomRightText = `" "`;        
        const url = '/form-print/'+this.caseId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
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
        const pdfName ="FORM7"
        const url = '/form-print/'+this.caseId+'/?pdf_type='+pdfType
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
        //TODO: add functionality to load page data and not start from search
        this.$router.push({name: "start-form7", params: {orderSelected: 'yes'}});
    }
 
    public getForm7Data() {        
       
        // this.$http.get('/case/'+this.currentCaseId+'/')
        // .then((response) => {
        //     if(response?.data?.data){            
                            
        //         this.result = response.data.data
        //         this.UpdateForm7Info(this.result)                         
        //         this.dataReady = true;
        //         Vue.nextTick(()=> this.onPrint())
        //     }
                
        // },(err) => {
        // console.log(err)        
        // });      
        this.result = this.form7Info;
        this.dataReady = true;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>