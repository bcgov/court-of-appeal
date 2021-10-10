<template>
<div v-if="dataReady">  

    <b-row >
        <b-col cols="10">
            <b-button 
                style="float: right;" 
                variant="primary"
                @click="navigateToEditPage()"
                ><b-icon-pencil-square class="mx-0" variant="white" scale="1" ></b-icon-pencil-square>
                Go Back and Edit
            </b-button>
        </b-col>
        <b-col cols="2">
            <b-button
                style="float: right;" 
                variant="success"
                @click="onPrint()"
                >Download PDF
                <b-icon-printer-fill class="mx-0" variant="white" scale="1" ></b-icon-printer-fill>
            </b-button>
        </b-col>
    </b-row>  
  
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
        <form-2-layout v-bind:result="result"/>
    </b-card>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/information";
import { form2DataInfoType } from '@/types/Information';
const informationState = namespace("Information");
import Form2Layout from "./Form2Layout.vue";
import moment from 'moment';

@Component({
    components:{        
        Form2Layout
    }
})
export default class Form2 extends Vue {

    @Prop({required: true})
    applicationId!: string;
    
    @informationState.State
    public form2Info: form2DataInfoType;

    result = {} as form2DataInfoType;
    dataReady = false;
   
    mounted(){
        this.dataReady = false;
        this.result = this.getForm2Data();       
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }   
           
    public onPrint() { 
        const pdf_type = Vue.filter('getPathwayPdfType')("priorityParenting")
        const pdf_name = "form2-" + this.applicationId;
        const el= document.getElementById("print");

      
        const bottomLeftText = ``;
        const bottomRightText = `" "`
        const url = '/survey-print/'+this.applicationId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
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
            const currentDate = moment().format();
            this.$store.commit("Application/setLastPrinted", currentDate); 
            
                
        },err => {
            console.error(err);        
        });
    }

    public navigateToEditPage() {
        this.$router.push({name: "fill" })
    }
 
    public getForm2Data() {   
        
        //TODO: use api GET call to gather data
        return this.form2Info;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>