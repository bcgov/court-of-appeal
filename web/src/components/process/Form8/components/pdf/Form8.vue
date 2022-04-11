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
            <form-8-layout v-bind:result="result"/>
        </b-card>

    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/form8";
const form8State = namespace("Form8");

import { form8DataInfoType } from '@/types/Information/Form8';
import Form8Layout from "./Form8Layout.vue";

@Component({
    components:{        
        Form8Layout
    }
})
export default class Form8 extends Vue {
    
    @form8State.State
    public currentNoticeOfApplicationToVaryId: string;

    @form8State.Action
    public UpdateForm8Info!: (newForm8Info: form8DataInfoType) => void

    @form8State.State
    public form8Info: form8DataInfoType;

    result = {} as form8DataInfoType;
    dataReady = false;
   
    mounted(){
        this.dataReady = false;
        this.getForm8Data(); 
    }   
           
    public onPrint() { 
        const pdf_type = "MBAV"
        const pdf_name = "form8-" + this.currentNoticeOfApplicationToVaryId;
        const el= document.getElementById("print");

      
        const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA                    www.bccourts.ca/Court_of_Appeal/"`;
        const bottomRightText = `" "`;        
        const url = '/form8/form-print/'+this.currentNoticeOfApplicationToVaryId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
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
        const pdfType = "MBAV"
        const pdfName ="FORM8"
        const url = '/form8/form-print/'+this.currentNoticeOfApplicationToVaryId+'/?pdf_type='+pdfType
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
        this.$router.push({name: "fill-form8" })
    }

    public navigateToSubmitPage(){
        this.$emit('navigateToSubmitPage')
    }
 
    public getForm8Data() {        
       
        // this.$http.get('/form8/forms/'+this.currentNoticeOfApplicationToVaryId)
        // .then((response) => {
        //     if(response?.data?.data){            
                            
        //         this.result = response.data.data
        //         this.result.completionDate = Vue.filter('beautify-date-dd/mm/yyyy')(response.data.modified);
                this.result = this.form8Info;
                this.UpdateForm8Info(this.result)                         
                this.dataReady = true;
        //         Vue.nextTick(()=> this.onPrint())
        //     }
                
        // },(err) => {
        //     console.log(err)        
        // });      
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>